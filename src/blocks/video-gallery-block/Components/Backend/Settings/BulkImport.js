import { useState } from "react";
import { __, sprintf, _n } from "@wordpress/i18n";
import { Button, TextareaControl, Notice, Spinner } from "@wordpress/components";

import { getVideoOembed } from "../../../utils/oembed";
import { getYoutubeId, getVimeoId } from "../../../utils/functions";

/**
 * Add many videos at once.
 *
 * Adding a gallery one video at a time is the single biggest piece of work this
 * block asks of anyone, and it is what our only one-star review is about: "I
 * added 20 videos to a page and not one of them shows the caption or title."
 * Twenty videos meant sixty fields, and the titles never filled themselves in.
 *
 * A URL per line is all this needs. Titles and posters come from the provider
 * through WordPress's own oEmbed proxy, so there is no API key to obtain and
 * nothing to configure.
 */

/** How many lookups to have in flight at once. */
const BATCH = 4;

/**
 * Lines the user pasted, cleaned up into URLs worth trying.
 *
 * @param {string} text     Raw textarea contents.
 * @param {Array}  existing Videos already in the gallery.
 * @return {{urls: Array, duplicates: number, rejected: number}} Parsed result.
 */
const parseLines = (text, existing) => {
  const already = new Set(
    (Array.isArray(existing) ? existing : [])
      .map((item) => (item?.video || "").trim())
      .filter(Boolean),
  );

  const seen = new Set();
  const urls = [];
  let duplicates = 0;
  let rejected = 0;

  text.split(/\r?\n/).forEach((line) => {
    const url = line.trim();

    if (!url) {
      return;
    }

    // http(s) or a path on this site. Anything else is a typo, not a video.
    if (!/^https?:\/\//i.test(url) && !/^\/[^/]/.test(url)) {
      rejected += 1;
      return;
    }

    if (already.has(url) || seen.has(url)) {
      duplicates += 1;
      return;
    }

    seen.add(url);
    urls.push(url);
  });

  return { urls, duplicates, rejected };
};

const isShort = (url) => /youtube\.com\/shorts\//i.test(url);

const BulkImport = ({ attributes, setAttributes, setActiveIndex }) => {
  const { videos = [], aspectRatio } = attributes;

  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState(null);

  const runImport = async () => {
    const { urls, duplicates, rejected } = parseLines(text, videos);

    if (!urls.length) {
      setReport({
        type: duplicates || rejected ? "warning" : "info",
        lines: [
          duplicates
            ? sprintf(
                /* translators: %d: number of links. */
                _n(
                  "%d link is already in this gallery.",
                  "%d links are already in this gallery.",
                  duplicates,
                  "video-gallery-block",
                ),
                duplicates,
              )
            : null,
          rejected
            ? sprintf(
                /* translators: %d: number of lines. */
                _n(
                  "%d line was not a link.",
                  "%d lines were not links.",
                  rejected,
                  "video-gallery-block",
                ),
                rejected,
              )
            : null,
          !duplicates && !rejected
            ? __("Paste one video link per line.", "video-gallery-block")
            : null,
        ].filter(Boolean),
      });
      return;
    }

    setBusy(true);
    setReport(null);

    const added = [];

    // A real timestamp, offset per video so paste order survives into
    // dateAdded: Sort Order's "Newest/Oldest First" would otherwise have
    // nothing to go on but a tie, since every video from one paste resolves
    // in the same batch.
    const importedAt = Date.now();

    // In small batches: twenty lookups fired at once is a lot to ask of a
    // shared host, and one slow provider should not hold up the rest.
    for (let i = 0; i < urls.length; i += BATCH) {
      const slice = urls.slice(i, i + BATCH);

      /* eslint-disable no-await-in-loop */
      const metas = await Promise.all(
        slice.map((url) =>
          getYoutubeId(url) || getVimeoId(url)
            ? getVideoOembed(url)
            : Promise.resolve(false),
        ),
      );
      /* eslint-enable no-await-in-loop */

      slice.forEach((url, index) => {
        const meta = metas[index] || {};
        added.push({
          video: url,
          poster: meta.thumbnail || "",
          caption: meta.title || "",
          albs: [],
          dateAdded: importedAt + added.length,
        });
      });
    }

    const titled = added.filter((item) => item.caption).length;
    const postered = added.filter((item) => item.poster).length;
    const shorts = urls.filter(isShort).length;

    const next = { videos: [...videos, ...added] };

    /*
     * All of them vertical, into a gallery that had nothing in it and no shape
     * chosen yet: the 9:16 shape is what the person meant. Anything less
     * clear-cut is left for them to set, rather than guessed at.
     */
    const adoptShortsRatio = !videos.length && !aspectRatio && shorts === urls.length;
    if (adoptShortsRatio) {
      next.aspectRatio = "9/16";
    }

    setAttributes(next);
    setActiveIndex && setActiveIndex(videos.length);
    setText("");
    setBusy(false);

    setReport({
      type: "success",
      lines: [
        sprintf(
          /* translators: %d: number of videos added. */
          _n( "%d video added.", "%d videos added.", added.length, "video-gallery-block" ),
          added.length,
        ),
        sprintf(
          /* translators: 1: titles found, 2: posters found, 3: videos added. */
          __( "%1$d of %3$d got a title, %2$d got a poster.", "video-gallery-block" ),
          titled,
          postered,
          added.length,
        ),
        adoptShortsRatio
          ? __( "All vertical — thumbnail shape set to 9:16.", "video-gallery-block" )
          : null,
        duplicates
          ? sprintf(
              /* translators: %d: number of links. */
              _n(
                "%d duplicate link skipped.",
                "%d duplicate links skipped.",
                duplicates,
                "video-gallery-block",
              ),
              duplicates,
            )
          : null,
        rejected
          ? sprintf(
              /* translators: %d: number of lines. */
              _n(
                "%d line skipped — not a link.",
                "%d lines skipped — not links.",
                rejected,
                "video-gallery-block",
              ),
              rejected,
            )
          : null,
      ].filter(Boolean),
    });
  };

  return (
    <>
      <TextareaControl
        label={__("Video links", "video-gallery-block")}
        help={__(
          "One per line. YouTube and Vimeo links bring their title and poster with them; other links are added as they are.",
          "video-gallery-block",
        )}
        value={text}
        rows={5}
        disabled={busy}
        onChange={(val) => setText(val)}
        placeholder={"https://youtu.be/…\nhttps://vimeo.com/…"}
      />

      <Button
        variant="primary"
        className="mt10 vgbImportBtn"
        disabled={busy || !text.trim()}
        onClick={runImport}>
        {busy ? (
          <>
            <Spinner />
            {__("Importing…", "video-gallery-block")}
          </>
        ) : (
          __("Import videos", "video-gallery-block")
        )}
      </Button>

      {report && (
        <Notice
          className="mt15"
          status={report.type}
          isDismissible={true}
          onRemove={() => setReport(null)}>
          {report.lines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Notice>
      )}
    </>
  );
};

export default BulkImport;
