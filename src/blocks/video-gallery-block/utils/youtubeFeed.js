import { useCallback, useEffect, useRef, useState } from "react";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { __, sprintf } from "@wordpress/i18n";

/**
 * Editor side of the YouTube channel / playlist feed.
 *
 * Everything that talks to YouTube runs on the server (includes/youtube-feed.php),
 * so the API key never reaches the browser; these hooks only call the plugin's
 * own REST routes.
 */

const errorMessage = (error) =>
  error?.message ||
  __("Something went wrong. Please try again.", "video-gallery-block");

/**
 * Whether the site has a YouTube API key, and a way for an admin to set one.
 *
 * @param {boolean} active Fetch only once the feed is actually switched on.
 */
export const useYoutubeKey = (active) => {
  const [state, setState] = useState({ loading: true, connected: false });

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    apiFetch({ path: "/vidgalblk/v1/youtube-key" })
      .then((data) => !cancelled && setState({ loading: false, ...data }))
      .catch(() => !cancelled && setState({ loading: false, connected: false }));
    return () => {
      cancelled = true;
    };
  }, [active]);

  // Resolves on success; rejects with a message the person can act on.
  const save = useCallback(async (key) => {
    try {
      const data = await apiFetch({
        path: "/vidgalblk/v1/youtube-key",
        method: "POST",
        data: { key },
      });
      setState((prev) => ({ ...prev, loading: false, ...data }));
      return data;
    } catch (error) {
      throw new Error(errorMessage(error));
    }
  }, []);

  return { ...state, save };
};

/**
 * The videos a feed currently gives, for the editor preview and status line.
 *
 * @param {Object}  args
 * @param {boolean} args.enabled Load at all (feed on, link set, key present).
 * @param {string}  args.url     Channel or playlist link.
 * @param {number}  args.refresh Hours between refreshes.
 * @param {string}  args.shorts  'all' | 'hide' | 'only'.
 *
 * Settings change the preview without asking the server again wherever that
 * can be avoided, because every request costs a round trip (several seconds on
 * a slow host):
 * - "Number of videos": the server always returns the whole list (up to 50)
 *   and the caller shows the newest N.
 * - The Shorts setting: after a channel first loads, one background request
 *   brings all three lists (all, videos only, Shorts only), kept here by link,
 *   so switching between them is immediate. A playlist (or Vimeo) has one list whatever
 *   the setting, so it is kept for all three straight away.
 */
export const useYoutubeFeed = ({ enabled, url, refresh, shorts }) => {
  const mode = shorts || "all";
  const [state, setState] = useState({ status: "idle" });
  // Guards against a slow answer for an old link or setting landing late.
  const requestRef = useRef(0);
  // Lists in hand for the current link, by Shorts mode.
  const listsRef = useRef({ url: null, byMode: {}, allRequested: false });

  const remember = (forUrl, byMode) => {
    if (listsRef.current.url !== forUrl) {
      listsRef.current = { url: forUrl, byMode: {}, allRequested: false };
    }
    Object.assign(listsRef.current.byMode, byMode);
  };

  const fetchAllModes = (forUrl) => {
    if (listsRef.current.url !== forUrl || listsRef.current.allRequested) return;
    listsRef.current.allRequested = true;

    apiFetch({
      path: addQueryArgs("/vidgalblk/v1/youtube-feed", {
        url: forUrl,
        refresh,
        shorts: mode,
        allModes: true,
      }),
    })
      .then((response) => {
        const byMode = {};
        Object.entries(response?.modes || {}).forEach(([key, videos]) => {
          if (Array.isArray(videos)) byMode[key] = { ...response, videos };
        });
        remember(forUrl, byMode);
      })
      .catch(() => {
        // Only a speed-up; a normal request still happens on switching.
        if (listsRef.current.url === forUrl) listsRef.current.allRequested = false;
      });
  };

  const load = useCallback(
    (force = false) => {
      if (!enabled || !url) {
        setState({ status: "idle" });
        return;
      }

      if (force) {
        listsRef.current = { url: null, byMode: {}, allRequested: false };
      }

      const request = ++requestRef.current;
      setState((prev) => ({ ...prev, status: "loading" }));

      apiFetch({
        path: addQueryArgs("/vidgalblk/v1/youtube-feed", {
          url,
          refresh,
          shorts: mode,
          force,
        }),
      })
        .then((data) => {
          if (request !== requestRef.current) return;
          remember(
            url,
            data?.shortsApplied
              ? { [mode]: data }
              : { all: data, hide: data, only: data },
          );
          setState({ status: "ready", data });
          if (data?.shortsApplied) fetchAllModes(url);
        })
        .catch((error) => {
          if (request !== requestRef.current) return;
          setState({
            status: "error",
            error: errorMessage(error),
            // For a single video's link: its creator's channel, to offer instead.
            suggestion: error?.data?.suggestion || null,
          });
        });
    },
    [enabled, url, refresh, mode],
  );

  useEffect(() => {
    // Already in hand: show it now, and drop any answer still on its way.
    const known =
      enabled && url && listsRef.current.url === url
        ? listsRef.current.byMode[mode]
        : null;
    if (known) {
      requestRef.current++;
      setState({ status: "ready", data: known });
      return;
    }

    // Debounced, so typing or several quick changes ask only once.
    const timer = setTimeout(() => load(false), 400);
    return () => clearTimeout(timer);
  }, [load]);

  return { ...state, reload: () => load(true) };
};

/**
 * "just now", "5 minutes ago", "3 hours ago" -- for "Updated …".
 *
 * @param {number} seconds Unix time.
 */
export const timeAgo = (seconds) => {
  if (!seconds) return "";
  const diff = Math.max(0, Math.round(Date.now() / 1000 - seconds));
  if (diff < 60) return __("just now", "video-gallery-block");
  if (diff < 3600) {
    const m = Math.round(diff / 60);
    /* translators: %d: minutes. */
    return sprintf(__("%d min ago", "video-gallery-block"), m);
  }
  const h = Math.round(diff / 3600);
  /* translators: %d: hours. */
  return sprintf(__("%d h ago", "video-gallery-block"), h);
};

/**
 * Whether a pasted feed link is Vimeo's. Vimeo needs no key, so the "Connect
 * YouTube" step does not apply to it.
 *
 * @param {string} url Pasted link.
 */
export const isVimeoFeedUrl = (url) => /(^|[/.])vimeo\.com(\/|$)/i.test((url || "").trim());

/** Google Cloud pages the setup steps link to. */
export const GOOGLE_LINKS = {
  enableApi:
    "https://console.cloud.google.com/apis/library/youtube.googleapis.com",
  credentials: "https://console.cloud.google.com/apis/credentials",
};
