/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../bpl-tools/Admin/Blocks/Block.js":
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Blocks/Block.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/utils/icons.js");

/**
	* Block Component
	*
	* @props block (required): single block data object (Object)
	* @props isPremium (required): whether the plugin is premium (Boolean)
	* @props disableBlockName (required): names of currently disabled blocks (Array)
	* @props handleCheckboxChange (required): toggle handler called with (name, checked) (Function)
	* @props isSaving (required): whether a save is in progress (Boolean)
	* @props isLinks (optional): true (Boolean)
	*/


const Block = ({
  block,
  isPremium,
  disableBlockName,
  handleCheckboxChange,
  isSaving,
  isLinks = true
}) => {
  const {
    name,
    title,
    icon,
    demo,
    docs,
    badge = '',
    required = false
  } = block;
  const isBlockPremium = !isPremium && block.isPremium;
  const disabledBlock = isBlockPremium ? false : !disableBlockName.includes(name);
  const isRequired = required === true;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `block ${!disabledBlock ? 'disabled' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icon"
  }, icon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "name"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockTitle"
  }, title), isBlockPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#pricing"
  }, "Get Pro")), isLinks && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, demo && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "actionBtn",
    href: demo,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.demoIcon), docs && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "actionBtn",
    href: docs,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.docsIcon)), badge && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockBadge"
  }, badge), isBlockPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockBadge blockProBadge"
  }, "Pro"), isRequired && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockBadge blockRequiredBadge"
  }, "Required"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "toggleSwitch",
    ...(isBlockPremium || isRequired ? {
      htmlFor: 'b-blocks-admin-pro-modal-toggle'
    } : {})
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: disabledBlock,
    ...(isBlockPremium || isRequired ? {} : {
      onChange: e => handleCheckboxChange(name, e.target.checked)
    }),
    disabled: isSaving || isBlockPremium || isRequired
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "slider"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);

/***/ }),

/***/ "../bpl-tools/Admin/Blocks/Toast.js":
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Blocks/Toast.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
	* Toast Component
	*
	* @props message (required): toast text (String)
	* @props type (required): 'loading' | 'success' | 'error' (String)
	*/


const Toast = ({
  message,
  type
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `bPlDashboardBlocksToast ${type}`
  }, type === 'loading' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null), type === 'success' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "checkmark"
  }, "\u2713"), type === 'error' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "error-icon"
  }, "\u2715"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "message"
  }, message));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toast);

/***/ }),

/***/ "../bpl-tools/Admin/Blocks/index.js":
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Blocks/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Blocks/style.scss");
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/utils/icons.js");
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Block */ "../bpl-tools/Admin/Blocks/Block.js");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Toast */ "../bpl-tools/Admin/Blocks/Toast.js");








/**
 * Blocks Component
 * Renders a management interface for enabling/disabling plugin features/blocks.
 * Includes search, categorization, and "Activate/Deactivate All" functionality.
 *
 * @param {object} props - Component props
 * @param {boolean} props.isPremium - Whether the current user is premium
 * @param {Array} props.disabledBlocks - List of currently disabled block names
 * @param {Function} props.onChange - Callback when block status changes
 * @param {Array} props.allBlocks - Array of block definitions
 * @param {string} props.status - Saving status ('loading', 'success', 'error')
 * @param {React.Component} [props.ProModal] - Modal component for Pro upsells
 * @returns {JSX.Element}
 */
const Blocks = props => {
  const {
    isPremium,
    disabledBlocks,
    onChange,
    allBlocks,
    status,
    ProModal = null,
    pageTitle = 'All Blocks'
  } = props;
  const publishedBlocks = allBlocks.filter(b => 'published' === b.status || !b.status);
  const [isSaving, setIsSaving] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [disableBlockName, setDisableBlockName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(disabledBlocks || []);
  const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [toast, setToast] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Update disabled blocks when disabledBlocks prop changes
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabledBlocks) {
      setDisableBlockName(disabledBlocks);
    }
  }, [JSON.stringify(disabledBlocks)]);

  // Update toast based on status prop
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (status === 'loading') {
      setToast({
        message: 'Loading...',
        type: 'loading'
      });
      setIsSaving(true);
    } else if (status === 'success') {
      setToast({
        message: 'Saved successfully!',
        type: 'success'
      });
      setIsSaving(false);
      setTimeout(() => setToast(null), 3000);
    } else if (status === 'error') {
      setToast({
        message: 'Failed to save',
        type: 'error'
      });
      setIsSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  }, [status]);
  const handleCheckboxChange = (blockName, isChecked) => {
    const updatedBlocksName = isChecked ? disableBlockName.filter(name => name !== blockName) : [...disableBlockName, blockName];
    setDisableBlockName(updatedBlocksName);
    onChange?.(updatedBlocksName);
    setToast({
      message: 'Saving changes...',
      type: 'loading'
    });
    setIsSaving(true);
  };
  const handleActivateAll = () => {
    setDisableBlockName([]);
    onChange?.([]);
    setToast({
      message: 'Saving changes...',
      type: 'loading'
    });
    setIsSaving(true);
  };
  const handleDeactivateAll = () => {
    // Exclude required blocks from being deactivated
    const allBlockNames = publishedBlocks.flatMap(block => {
      if (block.children && Array.isArray(block.children)) {
        return block.children.filter(child => !child.required).map(child => child.name);
      } else {
        return block.required ? [] : block.name;
      }
    });
    setDisableBlockName(allBlockNames);
    onChange?.(allBlockNames);
    setToast({
      message: 'Saving changes...',
      type: 'loading'
    });
    setIsSaving(true);
  };

  // Separate grouped blocks from individual blocks
  const groupedBlocks = [];
  const individualBlocks = [];
  publishedBlocks.forEach(block => {
    if (block.children && Array.isArray(block.children)) {
      groupedBlocks.push(block);
    } else {
      individualBlocks.push(block);
    }
  });

  // Filter blocks based on search term
  const filterBlocksBySearch = blocksToFilter => {
    return blocksToFilter.filter(block => {
      if (block.children) {
        // For grouped blocks, check if title or any child matches
        const matchesTitle = block.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesChildren = block.children.some(child => child.title?.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesTitle || matchesChildren;
      } else {
        // For individual blocks
        return block.title?.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
  };
  const filteredGroupedBlocks = filterBlocksBySearch(groupedBlocks);
  const filteredIndividualBlocks = filterBlocksBySearch(individualBlocks);
  const hasResults = filteredGroupedBlocks.length > 0 || filteredIndividualBlocks.length > 0;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardBlocks"
  }, !isPremium && ProModal && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProModal, null), toast && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Toast__WEBPACK_IMPORTED_MODULE_5__["default"], {
    message: toast.message,
    type: toast.type
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blocksTop"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, pageTitle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blocksSearch"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.searchIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: "Search...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "search-input"
  }), searchTerm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    onClick: () => setSearchTerm('')
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.closeIcon)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "bBlocksDashboardBtn actionBtn activeAllBtn",
    onClick: handleActivateAll
  }, "Activate All"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "bBlocksDashboardBtn actionBtn deActiveAllBtn",
    onClick: handleDeactivateAll
  }, "Deactivate All")), !hasResults ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "noBlocksFound"
  }, "No blocks found matching your search...") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blocksContent"
  }, filteredGroupedBlocks.map(group => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: group.title,
    className: "blocksGroup"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "groupTitle"
  }, group.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashboardBlocks"
  }, group.children.filter(child => child.status === 'published' || !child.status).map(childBlock => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Block__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: childBlock.name,
    block: childBlock,
    isPremium: isPremium,
    disableBlockName: disableBlockName,
    handleCheckboxChange: handleCheckboxChange,
    isSaving: isSaving
  }))))), filteredIndividualBlocks.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashboardBlocks"
  }, filteredIndividualBlocks.map(block => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Block__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: block.name,
    block: block,
    isPremium: isPremium,
    disableBlockName: disableBlockName,
    handleCheckboxChange: handleCheckboxChange,
    isSaving: isSaving
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Blocks);

/***/ }),

/***/ "../bpl-tools/Admin/Blocks/style.scss":
/*!********************************************!*\
  !*** ../bpl-tools/Admin/Blocks/style.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Demos/index.js":
/*!*****************************************!*\
  !*** ../bpl-tools/Admin/Demos/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Demos/style.scss");

/**
	* Demos Component
	*
	* @props name (required): plugin name shown in the page heading (String)
	* @props isPremium (required): whether the plugin is premium (Boolean)
	* @props demoInfo (required): {demos, allInOneLabel?, allInOneLink?} demo data (Object)
	*/





const CATEGORY_COLORS = ['#3b82f6',
// blue
'#10b981',
// emerald
'#8b5cf6',
// violet
'#f59e0b',
// amber
'#ec4899',
// pink
'#06b6d4',
// cyan
'#f43f5e',
// rose
'#14b8a6' // teal
];
const Demos = ({
  name,
  isPremium,
  demoInfo
}) => {
  const {
    demos
  } = demoInfo;
  const [activeCategory, setActiveCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('All');
  const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [openIndex, setOpenIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [iframeLoading, setIframeLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const categories = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ['All', ...demos.filter(d => d.children?.length > 0 || d.url && d.url !== '#').map(d => d.title)], [demos]);
  const categoryAccents = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const map = {};
    const activeCats = categories.filter(cat => cat !== 'All');
    activeCats.forEach((cat, index) => {
      map[cat] = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
    });
    return map;
  }, [categories]);
  const allCards = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const cards = [];
    demos.forEach(demo => {
      const accent = categoryAccents[demo.title];
      const processCard = cardData => ({
        ...cardData,
        category: demo.title,
        categoryIcon: demo.icon,
        accent,
        _searchTarget: `${cardData.title.toLowerCase()} ${demo.title.toLowerCase()}`
      });
      if (demo.children?.length) {
        demo.children.forEach(child => cards.push(processCard(child)));
      } else if (demo.url && demo.url !== '#') {
        cards.push(processCard(demo));
      }
    });
    return cards;
  }, [demos, categoryAccents]);
  const filtered = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const q = search.trim().toLowerCase();
    return allCards.filter(card => {
      if (activeCategory !== 'All' && card.category !== activeCategory) return false;
      if (q && !card._searchTarget.includes(q)) return false;
      return true;
    });
  }, [allCards, activeCategory, search]);
  const active = openIndex !== null ? filtered[openIndex] : null;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (active) setIframeLoading(true);
  }, [active?.url]);
  const isModalOpen = openIndex !== null;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isModalOpen) return;
    const handler = e => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex(i => Math.min(i + 1, filtered.length - 1));
      if (e.key === 'ArrowLeft') setOpenIndex(i => Math.max(i - 1, 0));
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isModalOpen, filtered.length]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardDemos"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "hero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "eyebrow"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Live Demos')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('See the %s in action'), name)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Browse ready-made demos - click any card to open a live, interactive preview.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "toolbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.searchIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: search,
    placeholder: "Search demos\u2026",
    onChange: e => setSearch(e.target.value)
  }), search && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "searchClear",
    onClick: () => setSearch(''),
    "aria-label": "Clear search"
  }, "\xD7")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "chips",
    role: "tablist"
  }, categories.map(cat => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: cat,
    type: "button",
    role: "tab",
    "aria-selected": activeCategory === cat,
    className: `chip ${activeCategory === cat ? 'isActive' : ''}`,
    style: cat !== 'All' ? {
      '--accent': categoryAccents[cat]
    } : undefined,
    onClick: () => setActiveCategory(cat)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "chipDot"
  }), cat)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "count"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, filtered.length), " ", filtered.length === 1 ? 'demo' : 'demos', activeCategory !== 'All' && ` in ${activeCategory}`, search.trim() && ` matching "${search}"`), filtered.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "empty"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.searchIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "No demos found"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Try a different search or category.")) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid"
  }, filtered.map((card, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: `${card.title}-${i}`,
    type: "button",
    className: "card",
    style: card.accent ? {
      '--accent': card.accent
    } : undefined,
    onClick: () => setOpenIndex(i)
  }, card.categoryIcon && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cardIcon"
  }, 'string' === typeof card.categoryIcon ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    dangerouslySetInnerHTML: {
      __html: card.categoryIcon
    }
  }) : card.categoryIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "cardCat"
  }, card.category), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "cardTitle"
  }, card.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "cardAction"
  }, "Preview", _utils_icons__WEBPACK_IMPORTED_MODULE_2__.arrowRightIcon)))), active && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modal",
    role: "dialog",
    "aria-modal": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modalBackdrop",
    onClick: () => setOpenIndex(null)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modalContent"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "modalHead"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modalTitleWrap"
  }, active.accent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "modalCat",
    style: {
      background: active.accent
    }
  }, active.category), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, active.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "modalProgress"
  }, openIndex + 1, " of ", filtered.length)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modalActions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "modalOpen",
    href: active.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Open in new tab", _utils_icons__WEBPACK_IMPORTED_MODULE_2__.externalIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "modalClose",
    onClick: () => setOpenIndex(null),
    "aria-label": "Close demo"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.closeIcon))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modalStage"
  }, openIndex > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "modalNav modalNavPrev",
    onClick: () => setOpenIndex(openIndex - 1),
    "aria-label": "Previous demo"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.chevronLeftIcon), iframeLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "iframeLoader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "spinner"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Loading demo\u2026")), active.type === 'iframe' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    src: active.url,
    title: `${active.title} demo`,
    sandbox: "allow-scripts allow-same-origin allow-popups allow-forms",
    onLoad: () => setIframeLoading(false)
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "imgScroll"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: active.url,
    alt: active.title,
    onLoad: () => setIframeLoading(false)
  })), openIndex < filtered.length - 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "modalNav modalNavNext",
    onClick: () => setOpenIndex(openIndex + 1),
    "aria-label": "Next demo"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.chevronRightIcon)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Demos);

/***/ }),

/***/ "../bpl-tools/Admin/Demos/style.scss":
/*!*******************************************!*\
  !*** ../bpl-tools/Admin/Demos/style.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/FeatureCompare/index.js":
/*!**************************************************!*\
  !*** ../bpl-tools/Admin/FeatureCompare/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _lib_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/fs */ "../bpl-tools/Admin/lib/fs.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/FeatureCompare/style.scss");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/icons */ "../bpl-tools/Admin/utils/icons.js");








/**
 * Free vs Pro feature comparison table — fetches live plan data, renders plan price
 * cards, a searchable feature breakdown table, and a Pro CTA banner.
 *
 * @param {string[]} props.plans				- Plan names to compare, e.g. ['free', 'pro']
 * @param {object}	props.freemius				- {product_id, public_key} — spread from dashboardInfo via props
 * @param {object}	[props.hero]				- Override hero: {eyebrow?, title?, description?}
 * @param {object}	[props.ctaBanner]			- Override CTA banner: {title?, description?, ctaLabel?}
 * @param {object}	[props.planDescriptions]	- Override plan taglines: {free?, pro?}
 */
const FeatureCompare = ({
  plans: planNames = ['free', 'pro'],
  freemius,
  hero: heroProp,
  ctaBanner: ctaBannerProp,
  planDescriptions
}) => {
  var _heroProp$eyebrow, _heroProp$title, _ctaBannerProp$title, _ctaBannerProp$descri, _ctaBannerProp$ctaLab;
  const {
    product_id,
    public_key
  } = freemius || {};
  const [product, setProduct] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [cycles, setCycles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [cycle, setCycle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!product_id) return;
    let mounted = true;
    setIsLoading(true);
    fetch(`https://api.bplugins.com/wp-json/bpl/v1/products/${product_id}`).then(r => r.ok ? r.json() : Promise.reject(`${r.status} ${r.statusText}`)).then(data => {
      if (mounted) setProduct(data);
    }).catch(() => {
      if (mounted) setProduct({});
    }).finally(() => {
      if (mounted) setIsLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [product_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!product?.id) return;
    const visiblePlans = product?.plans?.filter(p => planNames.includes(p.name)) || [];
    const proPlan = visiblePlans.find(p => p.name !== 'free') || visiblePlans[0] || {};
    const singlePrices = proPlan?.pricing?.[0];
    if (singlePrices && typeof singlePrices === 'object') {
      const c = [];
      if (singlePrices.monthly !== undefined) c.push({
        name: 'monthly',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Monthly'),
        short: '/mo'
      });
      if (singlePrices.annual !== undefined) c.push({
        name: 'annual',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Yearly'),
        short: '/yr',
        isDefault: true
      });
      if (singlePrices.lifetime !== undefined) c.push({
        name: 'lifetime',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lifetime'),
        short: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('one-time')
      });
      setCycles(c);
      setCycle(c.find(cc => cc.isDefault)?.name || c[0]?.name || '');
    } else {
      setCycles([]);
      setCycle('');
    }
  }, [product]);
  if (isLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "bPlDashboardFeatureCompare bPlDashboardFeatureCompareLoading"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fcSpinner"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading feature comparison…')));
  }
  if (!product?.id) return null;
  const visiblePlans = product?.plans?.filter(p => planNames.includes(p.name)) || [];
  const proPlan = visiblePlans.find(p => p.name !== 'free');
  const baseFeatures = visiblePlans[visiblePlans.length - 1]?.features || [];
  const features = baseFeatures.map(bf => {
    const presentIn = visiblePlans.filter(p => p.features.some(f => f.title === bf.title)).map(p => p.id);
    return {
      ...bf,
      plans: presentIn
    };
  });
  visiblePlans.forEach(p => {
    p.features.forEach(f => {
      if (!features.some(x => x.title === f.title)) {
        features.push({
          ...f,
          plans: [p.id]
        });
      }
    });
  });
  const freePlan = visiblePlans.find(p => p.name === 'free');
  features.sort((a, b) => {
    const aInFree = freePlan ? a.plans?.includes(freePlan.id) : false;
    const bInFree = freePlan ? b.plans?.includes(freePlan.id) : false;
    if (aInFree === bInFree) return 0;
    return aInFree ? -1 : 1;
  });
  let annualSavingsPct = 0;
  const samplePricing = proPlan?.pricing?.find(p => parseInt(p.licenses) === 1);
  if (samplePricing?.monthly && samplePricing?.annual) {
    const full = parseFloat(samplePricing.monthly) * 12;
    const annual = parseFloat(samplePricing.annual);
    if (full > 0) annualSavingsPct = Math.round((full - annual) / full * 100);
  }
  const proOnlyCount = features.filter(f => f.plans.length === 1 && proPlan && f.plans[0] === proPlan.id).length;
  const q = query.trim().toLowerCase();
  const filteredFeatures = q ? features.filter(f => f.title.replace(/<[^>]+>/g, '').toLowerCase().includes(q)) : features;
  const hero = {
    eyebrow: (_heroProp$eyebrow = heroProp?.eyebrow) !== null && _heroProp$eyebrow !== void 0 ? _heroProp$eyebrow : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Compare'),
    title: (_heroProp$title = heroProp?.title) !== null && _heroProp$title !== void 0 ? _heroProp$title : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free vs Pro at a glance')
  };
  const ctaBanner = {
    title: (_ctaBannerProp$title = ctaBannerProp?.title) !== null && _ctaBannerProp$title !== void 0 ? _ctaBannerProp$title : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ready to unlock everything?'),
    description: (_ctaBannerProp$descri = ctaBannerProp?.description) !== null && _ctaBannerProp$descri !== void 0 ? _ctaBannerProp$descri : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrade to Pro and get every feature, future updates, and priority support — backed by a 14 days money-back guarantee.'),
    ctaLabel: (_ctaBannerProp$ctaLab = ctaBannerProp?.ctaLabel) !== null && _ctaBannerProp$ctaLab !== void 0 ? _ctaBannerProp$ctaLab : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Pro now →')
  };
  const currentCycle = cycles.find(c => c.name === cycle);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardFeatureCompare"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "fcHero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "fcEyebrow"
  }, hero.eyebrow), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, hero.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, heroProp?.description ? heroProp.description : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('See exactly what unlocks when you upgrade.'), ' ', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, proOnlyCount), ' ', proOnlyCount === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('feature is') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('features are'), ' ', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('exclusive to Pro.')))), cycles.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fcCycleWrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fcCycle",
    role: "tablist"
  }, cycles.map(c => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: c.name,
    type: "button",
    role: "tab",
    "aria-selected": c.name === cycle,
    className: c.name === cycle ? 'isActive' : '',
    onClick: () => setCycle(c.name)
  }, c.label, c.name === 'annual' && annualSavingsPct > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "fcSave"
  }, `Save ${annualSavingsPct}%`))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fcPlans"
  }, visiblePlans.map(plan => {
    var _planDescriptions$fre, _planDescriptions$pro;
    const isFree = plan.name === 'free';
    const price = Array.isArray(plan.pricing) ? plan.pricing.find(p => parseInt(p.licenses) === 1)?.[cycle] : '0';
    const suffix = currentCycle?.short || '';
    const cycleText = currentCycle?.label || '';
    const freeDesc = (_planDescriptions$fre = planDescriptions?.free) !== null && _planDescriptions$fre !== void 0 ? _planDescriptions$fre : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free forever — all the essentials to get started.');
    const proDesc = (_planDescriptions$pro = planDescriptions?.pro) !== null && _planDescriptions$pro !== void 0 ? _planDescriptions$pro : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Everything in Free, plus advanced features and priority support.');
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: plan.id,
      className: `fcPlan is${plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fcPlanHead"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fcPlanTag"
    }, plan.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, plan.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, isFree ? freeDesc : proDesc)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fcPlanPrice"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "fcCurr"
    }, "$"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "fcAmt"
    }, isFree ? '0' : price || '—'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "fcCyc"
    }, isFree ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('forever') : suffix === (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('one-time') ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('one-time') : `${suffix} · ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('billed')} ${cycleText.toLowerCase()}`)), isFree ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fcPlanCtaHave",
      "aria-disabled": "true"
    }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.checkCircleIcon, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You Already Have It')) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: "fcPlanCta",
      onClick: e => {
        e.preventDefault();
        // eslint-disable-next-line no-undef
        new FS.Checkout({
          plugin_id: product_id,
          plan_id: plan.id,
          public_key
        }).open({
          licenses: 1,
          billing_cycle: cycle
        });
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Pro →')));
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fcTableWrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fcTableHead"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Feature breakdown')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fcSearchBox"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.searchIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filter features…'),
    value: query,
    onChange: e => setQuery(e.target.value)
  }), query && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    onClick: () => setQuery(''),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear filter')
  }, "\xD7"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fcTableScroll"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "fcTable"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Feature')), visiblePlans.map(p => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    key: p.id,
    className: p.name === 'free' ? 'isFreeCol' : 'isProCol'
  }, p.name === 'free' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, filteredFeatures.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: visiblePlans.length + 1,
    className: "fcEmpty"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No features match your search.'))) : filteredFeatures.map((feature, i) => {
    const isProOnly = proPlan && feature.plans.length === 1 && feature.plans[0] === proPlan.id;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: i,
      className: isProOnly ? 'isProOnly' : ''
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      dangerouslySetInnerHTML: {
        __html: feature.title
      }
    }), isProOnly && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "fcRowTag"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro only'))), visiblePlans.map(plan => {
      const has = feature.plans?.includes(plan.id);
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
        key: plan.id,
        className: plan.name === 'free' ? 'isFreeCol' : 'isProCol'
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: `fcCell ${has ? 'isCheck' : 'isCross'}`,
        "aria-label": has ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Included') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Not included')
      }, has ? _utils_icons__WEBPACK_IMPORTED_MODULE_5__.checkCircleIcon : _utils_icons__WEBPACK_IMPORTED_MODULE_5__.closeIcon));
    }));
  }))))), proPlan && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "fcCtaBanner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, ctaBanner.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, ctaBanner.description)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "fcPlanCta",
    onClick: e => {
      e.preventDefault();
      // eslint-disable-next-line no-undef
      new FS.Checkout({
        plugin_id: product_id,
        plan_id: proPlan.id,
        public_key
      }).open({
        licenses: 1,
        billing_cycle: cycle
      });
    }
  }, ctaBanner.ctaLabel)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeatureCompare);

/***/ }),

/***/ "../bpl-tools/Admin/FeatureCompare/style.scss":
/*!****************************************************!*\
  !*** ../bpl-tools/Admin/FeatureCompare/style.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Header/index.js":
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Header/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Header/style.scss");






/**
 * Dashboard page header — logo, plugin name, version badge, nav slot, and action buttons.
 *
 * @param {object}	props
 * @param {string}	props.name				- Plugin name displayed as <h1>
 * @param {string}	props.version				- Version string, rendered as v{version}
 * @param {boolean}	props.isPremium			- Hides "Upgrade Pro" button; switches Our Plugins to Button
 * @param {object}	[props.media]				- {logo?} — plugin logo image URL
 * @param {boolean}	[props.displayOurPlugins]	- Shows the "Our Plugins" button when true
 * @param {React.ReactNode} [props.children]		- Nav links rendered between the plugin info and action buttons
 */
const Header = props => {
  const {
    name,
    media,
    version,
    isPremium,
    displayOurPlugins,
    children
  } = props;
  const {
    logo
  } = media || {};
  const [isNavOpen, setIsNavOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Inject 'open' class onto the nav child and close menu on link click
  const enhancedChildren = react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, child => {
    if (!(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)) return child;
    const cls = child.props.className || '';
    if (!cls.includes('bPlDashboardNav')) return child;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
      className: `${cls}${isNavOpen ? ' open' : ''}`,
      onClick: e => {
        child.props.onClick?.(e);
        setIsNavOpen(false);
      }
    });
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardHeader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pluginInfo",
    wrap: true
  }, logo && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: logo,
    alt: name || 'Plugin from bPlugins'
  }), name && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, name), version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pluginVersion"
  }, "v", version)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `bplHamburger${isNavOpen ? ' open' : ''}`,
    onClick: () => setIsNavOpen(v => !v),
    "aria-label": "Toggle navigation",
    "aria-expanded": isNavOpen
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null)), enhancedChildren, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "navButtons"
  }, displayOurPlugins && (isPremium ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "#our-plugins"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.ourPluginsIcon, "Our Plugins") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "linkButton",
    href: "#our-plugins"
  }, "Our Plugins")), !isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "upgrade",
    href: "#pricing"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.upgradeProIcon, "Upgrade Pro")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "../bpl-tools/Admin/Header/style.scss":
/*!********************************************!*\
  !*** ../bpl-tools/Admin/Header/style.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/OurPlugins/index.js":
/*!**********************************************!*\
  !*** ../bpl-tools/Admin/OurPlugins/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/OurPlugins/style.scss");

/**
	* OurPlugins Component
	*
	* @props slug (required): current plugin slug, excluded from the list (String)
	* @props slugs (optional): DEFAULT_SLUGS - override the default slug list (Array)
	* @props installedPlugins (required): injected by withSelect; locally installed plugins (Array)
	*/







const DEFAULT_SLUGS = ['3d-viewer', 'html5-video-player', 'html5-audio-player', 'pdf-poster', 'document-emberdder', 'advanced-post-block', 'advance-custom-html', 'b-carousel-block', 'b-blocks', 'embed-lottie-player', 'b-slider'];
const formatCount = num => {
  if (num === undefined || num === null) return '0';
  const abs = Math.abs(num);
  if (abs >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (abs >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (abs >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(num);
};
const getDisplayName = name => {
  if (!name) return '';
  const decoded = name.replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/&#45;/g, '-');
  return decoded.split(/\s*[–\-—]\s*/)[0].trim();
};
const stripTags = s => (s || '').replace(/<[^>]+>/g, '');
const StarRow = ({
  rating = 0
}) => {
  const stars = Math.round(rating / 20);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugStars",
    "aria-label": `${(rating / 20).toFixed(1)} out of 5`
  }, [1, 2, 3, 4, 5].map(i => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    key: i,
    viewBox: "0 0 24 24",
    width: 13,
    height: 13,
    fill: i <= stars ? '#fbbf24' : '#e5e7eb'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2l2.39 6.95L22 9.27l-5.45 4.73L18.18 22 12 17.77 5.82 22l1.63-7.99L2 9.27l7.61-.32L12 2z"
  }))));
};

/**
 * Single plugin card with self-contained install/activate state.
 *
 * @param {object} props
 * @param {object} props.plugin		- Plugin data from WordPress.org API
 * @param {string} [props.path]		- Installed plugin path (e.g. 'slug/slug.php')
 * @param {string} props.initStatus	- 'notfound' | 'installed' | 'activated'
 */
const PluginCard = ({
  plugin,
  path,
  initStatus
}) => {
  const {
    name,
    slug,
    icons,
    short_description,
    version
  } = plugin;
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initStatus);
  const handleInstall = async () => {
    setStatus(status === 'installed' ? 'activating' : 'installing');
    try {
      if (status === 'installed' && path) {
        await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
          path: `/wp/v2/plugins/${path}`,
          method: 'POST',
          data: {
            status: 'active'
          }
        });
        setStatus('success');
        setTimeout(() => setStatus('activated'), 1000);
        return;
      }
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: '/wp/v2/plugins',
        method: 'POST',
        data: {
          slug,
          status: 'active'
        }
      });
      setStatus('success');
      setTimeout(() => setStatus('activated'), 1000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(status === 'installed' ? 'installed' : 'notfound'), 1400);
    }
  };
  const label = (() => {
    switch (status) {
      case 'activated':
      case 'success':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activated');
      case 'installed':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activate');
      case 'activating':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activating…');
      case 'installing':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Installing…');
      case 'error':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed');
      default:
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Install & Activate');
    }
  })();
  const isDone = status === 'activated' || status === 'success';
  const isBusy = status === 'installing' || status === 'activating';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "ourPlugCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugCardTop"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "ourPlugIcon",
    src: icons?.['1x'] || icons?.['2x'] || '',
    alt: name
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugCardId"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    dangerouslySetInnerHTML: {
      __html: getDisplayName(name)
    }
  }), version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugVer"
  }, "v", version)), isDone && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugActive"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    width: 12,
    height: 12,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
    points: "20 6 9 17 4 12"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Active'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "ourPlugDesc",
    dangerouslySetInnerHTML: {
      __html: stripTags(short_description)
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugStats"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugStat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    width: 14,
    height: 14,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
    points: "7 10 12 15 17 10"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  })), formatCount(plugin.downloaded)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugStat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(StarRow, {
    rating: plugin.rating
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, ((plugin.rating || 0) / 20).toFixed(1)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: `ourPlugCta status-${status}`,
    disabled: isDone || isBusy,
    onClick: handleInstall
  }, isBusy && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugCtaSpinner"
  }), label));
};

/**
 * Fetches and displays other bPlugins products with search, sort, and one-click install/activate.
 *
 * @param {string}		props.slug				- Current plugin slug — excluded from the list
 * @param {string[]}	[props.slugs]			- Override the default slug list
 * @param {Array}		props.installedPlugins	- Injected by withSelect; locally installed plugins
 */
const OurPlugins = ({
  slug,
  slugs: allSlugs = DEFAULT_SLUGS,
  installedPlugins
}) => {
  const [plugins, setPlugins] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [sort, setSort] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('popular');
  const slugs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (allSlugs || []).filter(s => s !== slug), [allSlugs, slug]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!slugs.length) return;
    let cancelled = false;
    setIsLoading(true);
    fetch('https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[author]=bplugins&request[per_page]=100&request[fields]=title,name,slug,icons,short_description,version,active_installs,rating,ratings,downloaded', {
      credentials: 'omit',
      mode: 'cors'
    }).then(r => r.json()).then(data => {
      if (cancelled) return;
      setPlugins((data?.plugins || []).filter(p => slugs.includes(p.slug)));
    }).catch(() => {
      if (!cancelled) setPlugins([]);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(slugs)]);
  const filteredSorted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const q = search.trim().toLowerCase();
    let list = plugins.filter(p => !q || p.name.toLowerCase().includes(q) || (p.short_description || '').toLowerCase().includes(q));
    if (sort === 'popular') list.sort((a, b) => (b.active_installs || 0) - (a.active_installs || 0));
    if (sort === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === 'name') list.sort((a, b) => getDisplayName(a.name).localeCompare(getDisplayName(b.name)));
    return list;
  }, [plugins, search, sort]);
  if (isLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "bPlDashboardOurPlugins bPlDashboardOurPluginsLoading"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "ourPlugSpinner"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Fetching plugins from the WordPress directory…')));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardOurPlugins"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "ourPlugHero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugEyebrow"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Made by bPlugins')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Discover more plugins from our team')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hand-crafted WordPress plugins built with the same care and quality. Install any of them with a single click.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugToolbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugSearch"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search plugins…'),
    value: search,
    onChange: e => setSearch(e.target.value)
  }), search && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => setSearch(''),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear search')
  }, "\xD7")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugSortLabel"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sort by')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugSort",
    role: "tablist"
  }, [{
    key: 'popular',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Popular')
  }, {
    key: 'rating',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top Rated')
  }, {
    key: 'name',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('A–Z')
  }].map(opt => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: opt.key,
    type: "button",
    role: "tab",
    "aria-selected": sort === opt.key,
    className: sort === opt.key ? 'isActive' : '',
    onClick: () => setSort(opt.key)
  }, opt.label)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "ourPlugCount"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, filteredSorted.length), ' ', filteredSorted.length === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('plugin') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('plugins'), search && ` ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('matching')} "${search}"`), filteredSorted.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugEmpty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    width: 36,
    height: 36,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No plugins match')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Try a different keyword.'))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugGrid"
  }, filteredSorted.map(plugin => {
    var _installedPlugins$fin;
    const installed = (_installedPlugins$fin = installedPlugins?.find(i => i?.plugin?.includes(plugin.slug))) !== null && _installedPlugins$fin !== void 0 ? _installedPlugins$fin : null;
    const activated = installed ? installed.status === 'active' : false;
    const initStatus = activated ? 'activated' : installed ? 'installed' : 'notfound';
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginCard, {
      key: plugin.slug,
      plugin: plugin,
      path: installed?.plugin,
      initStatus: initStatus
    });
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.withSelect)(select => {
  const {
    getPlugins
  } = select('core');
  return {
    installedPlugins: getPlugins?.({
      per_page: -1
    })
  };
})(OurPlugins));

/***/ }),

/***/ "../bpl-tools/Admin/OurPlugins/style.scss":
/*!************************************************!*\
  !*** ../bpl-tools/Admin/OurPlugins/style.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Overview/VideoPlayer.js":
/*!**************************************************!*\
  !*** ../bpl-tools/Admin/Overview/VideoPlayer.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _utils_video__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/video */ "../bpl-tools/Admin/utils/video.js");

/**
	* VideoPlayer Component
	*
	* @props src (required): video URL (String)
	* @props width (optional): '100%' (String)
	* @props height (optional): 'auto' (String)
	* @props autoPlay (optional): false (Boolean)
	* @props muted (optional): false (Boolean)
	* @props loop (optional): false (Boolean)
	* @props poster (optional): null - poster image URL (String)
	* @props isYoutube (optional): false (Boolean)
	* @props title (optional): 'Video' - iframe title, used for YouTube sources (String)
	*/




const VideoPlayer = ({
  src,
  width = '100%',
  height = 'auto',
  autoPlay = false,
  muted = false,
  loop = false,
  poster = null,
  isYoutube = false,
  title = 'Video'
}) => {
  const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const previewVideoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const progressBarRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const volumeBarRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  // const previewCanvasRef = useRef(null)

  const [isPlaying, setIsPlaying] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [currentTime, setCurrentTime] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [duration, setDuration] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [volume, setVolume] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [isMuted, setIsMuted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(muted);
  const [isDragging, setIsDragging] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showControls, setShowControls] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  // const [previewTime, setPreviewTime] = useState(0)
  // const [showPreview, setShowPreview] = useState(false)
  // const [previewPosition, setPreviewPosition] = useState(0)

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      // Setup preview video
      if (previewVideoRef.current) {
        previewVideoRef.current.src = src;
        previewVideoRef.current.muted = true;
      }
    };
    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
    };

    // keep the overlay in sync when playback is driven by autoPlay or native controls
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isDragging, src]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleKeyDown = e => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  const handleProgressClick = e => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const progress = (e.clientX - rect.left) / rect.width;
    const time = progress * duration;
    videoRef.current.currentTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(time);
  };
  const handleProgressMouseDown = e => {
    setIsDragging(true);
    handleProgressClick(e);
  };

  // const handleProgressMouseMove = (e) => {
  //	if (!progressBarRef.current || !duration) return

  //	const rect = progressBarRef.current.getBoundingClientRect()
  //	const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  //	const time = progress * duration
  //	const position = (e.clientX - rect.left)

  //	setPreviewTime(time)
  //	setPreviewPosition(position)
  //	setShowPreview(true)

  //	// Update preview video time
  //	if (previewVideoRef.current && previewVideoRef.current.readyState >= 2) {
  //	previewVideoRef.current.currentTime = time
  //	}
  // }

  // const handleProgressMouseEnter = () => {
  //	setShowPreview(true)
  // }

  // const handleProgressMouseLeave = () => {
  //	setShowPreview(false)
  // }

  const handleVolumeClick = e => {
    const rect = volumeBarRef.current.getBoundingClientRect();
    const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    if (newVolume > 0) {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };
  const handleVolumeMouseDown = e => {
    setIsDragging(true);
    handleVolumeClick(e);
  };
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const progressPercentage = duration ? currentTime / duration * 100 : 0;
  const volumePercentage = volume * 100;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleMouseMove = e => {
      if (isDragging) {
        if (e.target.closest('.progress-bar')) {
          handleProgressClick(e);
        } else if (e.target.closest('.volume-bar')) {
          handleVolumeClick(e);
        }
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: containerRef,
    className: "bPlVideoPlayer",
    style: {
      width,
      height
    },
    onMouseEnter: () => setShowControls(true),
    onMouseLeave: () => setShowControls(!isPlaying)
  }, isYoutube ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoPlayerYoutube"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    src: (0,_utils_video__WEBPACK_IMPORTED_MODULE_2__.getYoutubeEmbedSrc)(src, {
      autoplay: autoPlay
    }),
    frameBorder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true,
    style: {
      width,
      height
    },
    title: title
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    ref: videoRef,
    className: "video-element",
    src: src,
    poster: poster,
    autoPlay: autoPlay,
    muted: muted,
    loop: loop,
    onClick: togglePlay,
    preload: "metadata"
  }, "Your browser does not support the video tag."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    ref: previewVideoRef,
    className: "preview-video",
    muted: true,
    preload: "metadata",
    style: {
      display: 'none'
    }
  }), !isPlaying && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "center-play-btn",
    onClick: togglePlay
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "play-icon"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.playFillIcon)), isPlaying && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "center-play-btn pause",
    onClick: togglePlay
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "play-icon"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.pauseFillIcon)), isLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "loading-spinner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "spinner"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `video-controls ${showControls ? 'visible' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "control-btn play-pause-btn",
    onClick: togglePlay
  }, isPlaying ? _utils_icons__WEBPACK_IMPORTED_MODULE_1__.playPauseIcon : _utils_icons__WEBPACK_IMPORTED_MODULE_1__.playIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "time-display"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "current-time"
  }, formatTime(currentTime)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "separator"
  }, "/"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "duration"
  }, formatTime(duration))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: progressBarRef,
    className: "progress-bar",
    onClick: handleProgressClick,
    onMouseDown: handleProgressMouseDown
    // onMouseMove={handleProgressMouseMove}
    // onMouseEnter={handleProgressMouseEnter}
    // onMouseLeave={handleProgressMouseLeave}
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-filled",
    style: {
      width: `${progressPercentage}%`
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-handle",
    style: {
      left: `${progressPercentage}%`
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "control-btn volume-btn",
    onClick: toggleMute
  }, isMuted || volume === 0 ? _utils_icons__WEBPACK_IMPORTED_MODULE_1__.volumeMutedIcon : _utils_icons__WEBPACK_IMPORTED_MODULE_1__.volumeOnIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-slider"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: volumeBarRef,
    className: "volume-bar",
    onClick: handleVolumeClick,
    onMouseDown: handleVolumeMouseDown
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-filled",
    style: {
      width: `${volumePercentage}%`
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-handle",
    style: {
      left: `${volumePercentage}%`
    }
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "control-btn fullscreen-btn",
    onClick: toggleFullscreen
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.fullscreenIcon))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoPlayer);

/***/ }),

/***/ "../bpl-tools/Admin/Pricing/index.js":
/*!*******************************************!*\
  !*** ../bpl-tools/Admin/Pricing/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getFeatures: () => (/* binding */ getFeatures)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _lib_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/fs */ "../bpl-tools/Admin/lib/fs.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Pricing/style.scss");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/icons */ "../bpl-tools/Admin/utils/icons.js");

/**
	* Pricing Component
	*
	* @props pricingInfo (required): {pluginId, planId, licenses, cycles?, button, featured, logo?, hero?, included?, trustBadges?, faqs?} plan config (Object). cycles: which billing cycle tabs to show, e.g. ['monthly', 'annual', 'lifetime'] (default all)
	* @props options (required): extra options forwarded to FS.Checkout.open() (Object)
	*/







const getFeatures = (plans, planId) => {
  const freeFeatures = plans.find(p => p.name === 'free')?.features?.map(f => f.title);
  const proFeatures = plans.find(p => p.name === 'pro')?.features?.filter(f => !freeFeatures.includes(f.title)).map(f => f.title);
  const features = {
    'free': freeFeatures,
    'pro': proFeatures
  };
  const planName = plans.find(p => parseInt(p.id) === parseInt(planId))?.name;
  const planFeatures = features[planName] || plans.find(p => parseInt(p.id) === parseInt(planId))?.features?.map(f => f.title);
  return planFeatures || [];
};
const cycleMeta = {
  monthly: {
    suffix: '/mo'
  },
  annual: {
    suffix: '/yr'
  },
  lifetime: {
    suffix: ''
  }
};
const formatPrice = amount => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '—';
  return Number.isInteger(num) ? String(num) : num.toFixed(2);
};
const Pricing = ({
  pricingInfo,
  options
}) => {
  var _heroProp$eyebrow, _heroProp$title, _heroProp$description, _includedProp$tag, _includedProp$title, _includedProp$descrip;
  const {
    pluginId,
    planId,
    licenses,
    cycles: enabledCycles = ['monthly', 'annual', 'lifetime'],
    button,
    featured,
    logo,
    hero: heroProp,
    included: includedProp,
    trustBadges: customTrustBadges,
    faqs: customFaqs
  } = pricingInfo;
  const [product, setProduct] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [isProductLoading, setIsProductLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [cycles, setCycles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [cycle, setCycle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [openFaq, setOpenFaq] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!pluginId) return;
    let mounted = true;
    setIsProductLoading(true);
    fetch(`https://api.bplugins.com/wp-json/bpl/v1/products/${pluginId}`).then(r => r.ok ? r.json() : Promise.reject(`${r.status} ${r.statusText}`)).then(data => {
      if (mounted) setProduct(data);
    }).catch(() => {
      if (mounted) setProduct({});
    }).finally(() => {
      if (mounted) setIsProductLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [pluginId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!product?.id || !planId) return;
    const {
      plans
    } = product;
    const plan = plans?.find(p => parseInt(p.id) === parseInt(planId)) || plans?.[0] || {};
    const singlePrices = plan?.pricing?.[0];
    if (singlePrices && typeof singlePrices === 'object') {
      const all = [];
      if (singlePrices.monthly !== undefined) all.push({
        name: 'monthly',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Monthly')
      });
      if (singlePrices.annual !== undefined) all.push({
        name: 'annual',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Yearly'),
        isDefault: true
      });
      if (singlePrices.lifetime !== undefined) all.push({
        name: 'lifetime',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lifetime')
      });
      const filtered = all.filter(cc => enabledCycles.includes(cc.name));
      const c = filtered.length ? filtered : all; // fall back to all if config filters everything out
      setCycles(c);
      setCycle(c.find(cc => cc.isDefault)?.name || c[0]?.name || '');
    } else {
      setCycles([]);
      setCycle('');
    }
  }, [product, planId]);
  if (isProductLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "bPlDashboardPricing bPlDashboardPricingLoading"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pricingLoadingSpinner"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading the latest pricing…')));
  }
  if (!product?.id) return null;
  const {
    plans
  } = product;
  const plan = plans?.find(p => parseInt(p.id) === parseInt(planId)) || plans?.[0] || {};
  const pricing = plan?.pricing || [];
  const visiblePricing = licenses?.length > 0 ? pricing.filter(p => {
    var _p$licenses;
    return licenses.includes((_p$licenses = p?.licenses) !== null && _p$licenses !== void 0 ? _p$licenses : null);
  }) : pricing;
  const samplePrice = visiblePricing[0];
  let annualSavingsPct = 0;
  if (samplePrice?.monthly && samplePrice?.annual) {
    const fullYear = parseFloat(samplePrice.monthly) * 12;
    const annual = parseFloat(samplePrice.annual);
    if (fullYear > 0) annualSavingsPct = Math.round((fullYear - annual) / fullYear * 100);
  }
  const sharedFeatures = getFeatures(plans, planId);
  const annualSavingsLabel = annualSavingsPct > 0 ? `Save ${annualSavingsPct}%` : '';
  const isLifetimeOnly = cycles.length === 1 && cycles[0]?.name === 'lifetime';
  const hero = {
    eyebrow: (_heroProp$eyebrow = heroProp?.eyebrow) !== null && _heroProp$eyebrow !== void 0 ? _heroProp$eyebrow : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pricing'),
    title: (_heroProp$title = heroProp?.title) !== null && _heroProp$title !== void 0 ? _heroProp$title : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pick the plan that fits your project'),
    description: (_heroProp$description = heroProp?.description) !== null && _heroProp$description !== void 0 ? _heroProp$description : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Same powerful features on every plan — just choose how many sites you need. Upgrade or downgrade any time.')
  };
  const included = {
    tag: (_includedProp$tag = includedProp?.tag) !== null && _includedProp$tag !== void 0 ? _includedProp$tag : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Same on every plan'),
    title: (_includedProp$title = includedProp?.title) !== null && _includedProp$title !== void 0 ? _includedProp$title : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Everything you get, on every license'),
    description: (_includedProp$descrip = includedProp?.description) !== null && _includedProp$descrip !== void 0 ? _includedProp$descrip : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Every feature is available on every license tier. The only difference is how many sites you can activate the plugin on.')
  };
  const trustBadges = customTrustBadges || [{
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('14 days money back'),
    body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Risk-free purchase'),
    icon: _utils_icons__WEBPACK_IMPORTED_MODULE_5__.moneyBackIcon
  }, {
    title: isLifetimeOnly ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lifetime updates') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Plugins updates'),
    body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('On every plan'),
    icon: _utils_icons__WEBPACK_IMPORTED_MODULE_5__.refreshIcon
  }, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Priority support'),
    body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get help when you need it'),
    icon: _utils_icons__WEBPACK_IMPORTED_MODULE_5__.chatIcon
  }, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Secure checkout'),
    body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Powered by Freemius'),
    icon: _utils_icons__WEBPACK_IMPORTED_MODULE_5__.lockIcon
  }];
  const faqs = customFaqs || [{
    q: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Can I upgrade my plan later?'),
    a: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Yes — you can upgrade any time from your account. We prorate the difference automatically.')
  }, isLifetimeOnly ? {
    q: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Will I receive updates if I purchase a lifetime license?'),
    a: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Yes, a lifetime license holds lifetime updates and never expires, ensuring you always have access to the latest features and bug fixes without recurring fees.')
  } : {
    q: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('What happens after my license expires?'),
    a: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The plugin keeps working forever. You only lose access to premium features, updates and premium support unless you renew.')
  }, {
    q: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Do you offer refunds?'),
    a: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Absolutely. Every plan is backed by a 14 days no-questions-asked money-back guarantee.')
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardPricing"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "pricingHero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "pricingEyebrow"
  }, hero.eyebrow), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, hero.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, hero.description)), cycles.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pricingCycleWrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pricingCycle",
    role: "tablist"
  }, cycles.map(c => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: c.name,
    type: "button",
    role: "tab",
    "aria-selected": c.name === cycle,
    className: c.name === cycle ? 'isActive' : '',
    onClick: () => setCycle(c.name)
  }, c.label, c.name === 'annual' && annualSavingsLabel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "pricingSave"
  }, annualSavingsLabel))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pricingPlans"
  }, visiblePricing.length ? visiblePricing.map((price, index) => {
    const licensesCount = price?.licenses;
    const isFeatured = featured?.selected === (licensesCount || 'null');
    const amount = price?.[cycle];
    const cycleInfo = cycleMeta[cycle] || {
      suffix: ''
    };
    const numericAmount = parseFloat(amount);
    const monthlyEquivalent = cycle === 'annual' && price?.annual ? parseFloat(price.annual) / 12 : null;
    const perSite = licensesCount && !isNaN(numericAmount) ? numericAmount / licensesCount : null;
    const planLabel = !licensesCount ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unlimited Sites') : licensesCount === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Single Site') : `${licensesCount} ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sites')}`;
    const planTagline = !licensesCount ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('For agencies & enterprise') : licensesCount === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('For solo creators') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('For freelancers');
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: `pricingPlan ${isFeatured ? 'isFeatured' : ''}`
    }, isFeatured && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pricingBadge"
    }, featured?.text || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Most Popular')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pricingPlanHead"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, planLabel), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, planTagline)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pricingPriceWrap"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pricingPrice"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "pricingCurrency"
    }, "$"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "pricingAmount"
    }, formatPrice(amount)), cycleInfo.suffix && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "pricingSuffix"
    }, cycleInfo.suffix)), perSite !== null && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "pricingEquiv"
    }, "\u2248 $", formatPrice(perSite), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('per site')), !licensesCount && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "pricingEquiv"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Use on every site you build.')), monthlyEquivalent !== null && cycle === 'annual' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "pricingEquiv"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Billed yearly'), " \xB7 $", formatPrice(monthlyEquivalent), "/mo"), cycle === 'lifetime' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "pricingEquiv"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('One-time payment, pay once forever.')), cycle === 'monthly' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "pricingEquiv"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Billed monthly, cancel anytime.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: "pricingCta",
      onClick: e => {
        e.preventDefault();
        new _lib_fs__WEBPACK_IMPORTED_MODULE_3__["default"].Checkout({
          plugin_id: product.id,
          plan_id: planId,
          public_key: product.public_key
        }).open({
          image: logo || product.icon,
          title: product.title,
          licenses: licensesCount,
          billing_cycle: cycle,
          ...options
        });
      }
    }, button.label));
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "pricingEmpty"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No plans available right now.'))), sharedFeatures.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "pricingIncluded"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "pricingIncludedHead"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "pricingIncludedTag"
  }, included.tag), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, included.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, included.description)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "pricingIncludedGrid"
  }, sharedFeatures.map((f, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "pricingIncludedCheck"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.checkCircleIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    dangerouslySetInnerHTML: {
      __html: f
    }
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "pricingTrust"
  }, trustBadges.map((b, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: i,
    className: "pricingTrustItem"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "pricingTrustIcon"
  }, b.icon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, b.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, b.body))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "pricingFaq"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Frequently asked questions')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pricingFaqList"
  }, faqs.map((f, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: i,
    className: `pricingFaqItem ${openFaq === i ? 'isOpen' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "pricingFaqQ",
    "aria-expanded": openFaq === i,
    onClick: () => setOpenFaq(openFaq === i ? null : i)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, f.q), _utils_icons__WEBPACK_IMPORTED_MODULE_5__.chevronDownIcon), openFaq === i && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pricingFaqA"
  }, f.a))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pricing);

/***/ }),

/***/ "../bpl-tools/Admin/Pricing/style.scss":
/*!*********************************************!*\
  !*** ../bpl-tools/Admin/Pricing/style.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Settings/index.js":
/*!********************************************!*\
  !*** ../bpl-tools/Admin/Settings/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useWPAjax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useWPAjax */ "../bpl-tools/hooks/useWPAjax.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Settings/style.scss");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/icons */ "../bpl-tools/Admin/utils/icons.js");







/**
 * Uninstall-data management page — toggle to permanently delete plugin data on uninstall.
 * Requires a PHP AJAX handler whose action name matches `ajaxAction`.
 *
 * @param {object}	props
 * @param {string} props.name					- Plugin name shown in description text
 * @param {boolean} props.deleteDataOnUninstall - Current setting value (from PHP option)
 * @param {string} props.uninstallNonce			- wp_create_nonce('bPlLicenseActivation')
 * @param {string} props.ajaxAction				- WP Ajax action to call on toggle (e.g. 'apbSaveUninstallOption')
 * @param {string} [props.version]				- Plugin version shown in the status strip
 * @param {string[]} [props.cleanupItems]		- Overrides default list of items deleted on uninstall
 */
const Settings = ({
  name,
  deleteDataOnUninstall,
  uninstallNonce,
  version,
  ajaxAction = '',
  cleanupItems
}) => {
  const [enabled, setEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(deleteDataOnUninstall);
  const [notice, setNotice] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [showConfirm, setShowConfirm] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [confirmInput, setConfirmInput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    data,
    saveData,
    isLoading,
    error
  } = (0,_hooks_useWPAjax__WEBPACK_IMPORTED_MODULE_2__["default"])(ajaxAction, {
    nonce: uninstallNonce
  }, false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (data) {
      setEnabled(data.enabled);
      setNotice(data.message || '');
      const t = setTimeout(() => setNotice(''), 4000);
      return () => clearTimeout(t);
    }
  }, [data]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (error) setNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to save setting.'));
  }, [error]);
  const defaultCleanupItems = [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All plugin posts and custom post types'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Plugin settings and options'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout configuration and meta data'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Taxonomy terms and associations'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All tracking and analytics data')];
  const items = cleanupItems || defaultCleanupItems;
  const requestToggle = () => {
    if (isLoading) return;
    if (!enabled) {
      setConfirmInput('');
      setShowConfirm(true);
      return;
    }
    setNotice('');
    saveData({
      enabled: String(false)
    });
  };
  const confirmEnable = () => {
    if (confirmInput.trim().toUpperCase() !== 'DELETE') return;
    setShowConfirm(false);
    setNotice('');
    saveData({
      enabled: String(true)
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardSettings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "settingsHero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "settingsEyebrow"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Manage plugin preferences')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`Control how ${name} behaves on your site. Destructive options live in their own clearly-marked zone.`))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "settingsStatus"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsStatusIcon"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.shieldIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsStatusBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data deletion is enabled') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Your data is protected')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All plugin data will be permanently removed if the plugin is uninstalled.') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Even if you deactivate or uninstall the plugin, your settings and data stay intact.'))), version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "settingsVer"
  }, "v", version)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: `settingsCard dangerZone ${enabled ? 'isArmed' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "settingsCardHead"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dangerBadge"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.alertIcon, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Danger Zone')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Delete plugin data on uninstall')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`When enabled, every piece of ${name} data is wiped from your database the moment the plugin is uninstalled.`)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsCardBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "cleanupLabel"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('What will be permanently deleted:')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "cleanupList"
  }, items.map((item, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "cleanupDot"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.trashIcon), item))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsWarn"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.alertIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This action cannot be undone. Deactivating the plugin alone is non-destructive — your data is only deleted when you also click "Delete" on the plugins screen.')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "settingsCardFoot"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "toggleRow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "settingsToggle"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: !!enabled,
    onChange: requestToggle,
    disabled: isLoading,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Toggle data deletion on uninstall')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "toggleSlider"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "toggleLabel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deletion is ON') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deletion is OFF')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data will be removed on uninstall') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data will be preserved on uninstall')))), isLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "settingsSaving"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Saving…')))), notice && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `settingsToast ${enabled ? 'warning' : 'success'}`,
    role: "status"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.checkCircleIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, notice), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => setNotice(''),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dismiss')
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.closeIcon)), showConfirm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsConfirmModal",
    role: "dialog",
    "aria-modal": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "confirmBackdrop",
    onClick: () => setShowConfirm(false)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "confirmContent"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "confirmIcon"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.trashIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable data deletion on uninstall?')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "confirmClose",
    onClick: () => setShowConfirm(false),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close')
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.closeIcon)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "confirmBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Switching this on means that the next time this plugin is uninstalled, all data, configurations, and settings will be permanently removed from your database.')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "confirmCallout"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.alertIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('There is no recovery once data is deleted. Make sure you have a recent backup.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "confirmField"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Type'), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, "DELETE"), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('to confirm')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: confirmInput,
    onChange: e => setConfirmInput(e.target.value),
    placeholder: "DELETE",
    autoFocus: true
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "confirmCancel",
    onClick: () => setShowConfirm(false)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "confirmAction",
    onClick: confirmEnable,
    disabled: confirmInput.trim().toUpperCase() !== 'DELETE'
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.trashIcon, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable deletion'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);

/***/ }),

/***/ "../bpl-tools/Admin/Settings/style.scss":
/*!**********************************************!*\
  !*** ../bpl-tools/Admin/Settings/style.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Welcome/Changelog/index.js":
/*!*****************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Changelog/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/Changelog/style.scss");

/**
	* Changelog Component
	*
	* @props slug (required): WordPress.org slug - builds the read-more link (String)
	* @props changelogs (required): [{type, version, list}] changelog entries (Array)
	* @props limit (optional): 5 - max entries shown (Number)
	* @props loadMoreLabel (optional): read-more button text; omit to hide (String)
	*/



const BADGE_MAP = {
  new: 'new',
  add: 'new',
  update: 'update',
  improve: 'improvement',
  improvement: 'improvement',
  fix: 'fix',
  fixing: 'fix',
  fixed: 'fix',
  remove: 'fix'
};
const processItem = html => html.replace(/^<strong>([^<]+)<\/strong>/i, (_, label) => {
  const clean = label.replace(':', '').trim();
  const cls = BADGE_MAP[clean.toLowerCase()] || 'default';
  return `<strong class="changelogBadge ${cls}">${clean}</strong>`;
});
const Changelog = props => {
  const {
    slug,
    changelogs,
    limit = 5,
    loadMoreLabel
  } = props;
  return changelogs?.length && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardChangelog bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Release Notes(Changelog)..."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "allChangelogs"
  }, changelogs?.slice(0, limit)?.map((changelog, index) => {
    const {
      type,
      version,
      list
    } = changelog;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: `changelog ${type}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      className: "list"
    }, list?.map((item, token) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: token,
      dangerouslySetInnerHTML: {
        __html: processItem(item)
      }
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "time"
    }, version));
  })), loadMoreLabel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "mt20",
    target: "_blank",
    rel: "noopener noreferrer",
    href: `https://wordpress.org/plugins/${slug}/#developers`
  }, loadMoreLabel)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Changelog);

/***/ }),

/***/ "../bpl-tools/Admin/Welcome/Changelog/style.scss":
/*!*******************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Changelog/style.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Welcome/GettingStarted/index.js":
/*!**********************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/GettingStarted/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Overview_VideoPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Overview/VideoPlayer */ "../bpl-tools/Admin/Overview/VideoPlayer.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/GettingStarted/style.scss");







/**
 * Tabbed getting-started guide. Renders tab buttons and a sliding step list.
 *
 * @param {object}		props
 * @param {object[]}	props.tabs		- Tab definitions: [{key, label, icon?, video?, isYoutube?, docs?, steps: [{num, title, body, link?: {url, label}}]}]
 * `body` is rendered as HTML via dangerouslySetInnerHTML.
 * A tab with `video` gets a "Watch Video" button that slides in next to the docs link and opens the video in a modal.
 * A tab with `docs` overrides the bottom documentation link with its own tab-specific URL and heading.
 * @param {object}		[props.pages]	- {docs?} — URL for the "Open Documentation" link at the bottom
 */
const GettingStarted = ({
  tabs = [],
  pages
}) => {
  const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [direction, setDirection] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1); // 1 = moved right, -1 = moved left
  const [showVideo, setShowVideo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  if (!tabs?.length) return null;
  const activeTab = tabs[active] || {};
  const {
    video,
    docs: tabDocs,
    label
  } = activeTab;
  const docsUrl = tabDocs || pages?.docs || 'https://bplugins.com/docs/';
  const changeTab = index => {
    if (index === active) return;
    setShowVideo(false);
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardGettingStarted bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Getting Started')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pick how you\'d like to start with the plugin - the steps below adapt to your workflow.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tabsNav",
    role: "tablist"
  }, tabs.map((tab, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: tab.key,
    type: "button",
    role: "tab",
    "aria-selected": active === index,
    className: `tab ${active === index ? 'isActive' : ''}`,
    onClick: () => changeTab(index)
  }, tab.icon && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tabIcon"
  }, tab.icon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, tab.label)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tabsViewport"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tabsTrack",
    style: {
      transform: `translateX(-${active * 100}%)`
    }
  }, tabs.map(tab => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: tab.key,
    className: "tabPanel",
    role: "tabpanel",
    "aria-hidden": tabs[active].key !== tab.key
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "steps"
  }, tab.steps.map(step => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: step.num,
    className: "step"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "stepNum"
  }, step.num), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "stepBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, step.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: step.body
    }
  }), step.link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "stepLink",
    href: step.link.url
  }, step.link.label, " \u2192"))))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "docs"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, tabDocs ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Read the %s Documentation'), label) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Read the Full Documentation')), !tabDocs && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Browse guides, settings reference, and examples for every feature.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "docsActions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "docsBtn",
    href: docsUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Read Documentation →')), video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: activeTab.key,
    type: "button",
    className: `videoBtn ${direction > 0 ? 'fromRight' : 'fromLeft'}`,
    onClick: () => setShowVideo(true),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Watch Tutorial')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 668 534"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "#ff0333",
    d: "m544.3 7.3c-63-4.6-134-7-210.3-7-76.3 0-147.3 2.4-210.3 7-16.6 1.3-32.8 5.7-47.8 13-15 7.2-28.5 17.2-39.8 29.4-11.3 12.3-20.2 26.5-26.3 42-6 15.5-9.1 32-9.1 48.6v253.4c-0.1 16.6 3 33.2 9 48.7 6.1 15.6 15 29.8 26.3 42.1 11.3 12.2 24.8 22.3 39.8 29.5 15 7.3 31.2 11.7 47.9 13 63 4.7 133.3 7 210.3 7 77 0 147.3-2.3 210.3-7 16.7-1.3 32.9-5.7 47.9-13 15-7.2 28.5-17.3 39.8-29.5 11.3-12.3 20.2-26.5 26.3-42.1 6-15.5 9.1-32.1 9-48.7v-253.4c0-16.6-3.1-33.1-9.1-48.6-6.1-15.5-15-29.7-26.3-42-11.3-12.2-24.8-22.2-39.8-29.4-15-7.3-31.2-11.7-47.8-13z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "#fff",
    d: "m267.3 196.3v141.4c0 2.9 0.8 5.9 2.3 8.4 1.5 2.6 3.6 4.7 6.2 6.2 2.6 1.4 5.5 2.2 8.5 2.1 2.9 0 5.8-0.9 8.4-2.4l117.6-70.7c2.4-1.5 4.4-3.6 5.8-6.1 1.4-2.5 2.1-5.3 2.1-8.2 0-2.9-0.7-5.7-2.1-8.2-1.4-2.5-3.4-4.6-5.8-6.1l-117.6-70.7c-2.6-1.5-5.5-2.4-8.4-2.4-3-0.1-5.9 0.7-8.5 2.1-2.6 1.5-4.7 3.6-6.2 6.2-1.5 2.5-2.3 5.5-2.3 8.4z"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Watch Tutorial')))), showVideo && video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModal"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModalContent"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "closeModal",
    onClick: () => setShowVideo(false)
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.closeIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Overview_VideoPlayer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    src: video,
    isYoutube: true,
    autoPlay: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModalOverlay",
    onClick: () => setShowVideo(false)
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GettingStarted);

/***/ }),

/***/ "../bpl-tools/Admin/Welcome/GettingStarted/style.scss":
/*!************************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/GettingStarted/style.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Welcome/Info/index.js":
/*!************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Info/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/Info/style.scss");

/**
	* Info Component
	*
	* @props slug (required): plugin slug - builds the review link (String)
	* @props pages (required): pages config (Object)
	* @props helpItems (optional): override default help cards; each {image?, titleIcon?, title, description, link, linkText} (Array)
	*/




const defaultHelpItems = (slug, pages) => [{
  title: 'Need any Assistance?',
  description: 'Our Expert Support Team is always ready to help you out promptly.',
  link: 'https://bplugins.com/support/',
  linkText: 'Contact Support'
}, {
  titleIcon: _utils_icons__WEBPACK_IMPORTED_MODULE_2__.facebookIcon,
  title: 'Join Our Community',
  description: 'Get tutorials, plugin updates, feature announcements, and support from other WordPress users.',
  link: 'https://facebook.com/groups/1828495198556137',
  linkText: 'Join Now →'
}, {
  title: 'Request a Feature',
  description: 'Have an idea that would make this plugin even better? Let us know — we love hearing from you.',
  link: 'https://bplugins.com/support/',
  linkText: 'Submit Request →'
}, {
  title: 'Loving This Plugin? ⭐',
  description: "We're a small team pouring our heart into this plugin — your honest review keeps us going and helps others discover it. It only takes 30 seconds.",
  link: slug ? `https://wordpress.org/support/plugin/${slug}/reviews/#new-post` : '',
  linkText: 'Leave a Review'
}];
const Info = ({
  slug,
  pages,
  helpItems
}) => {
  const items = helpItems || defaultHelpItems(slug, pages);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardWelcomeInfo"
  }, items.filter(item => item.link).map((item, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "infoCard bPlDashboardCard"
  }, item.image && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.image,
    alt: item.title
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, item.title, item.titleIcon && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "titleIcon"
  }, item.titleIcon)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.description), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: item.link,
    target: "_blank",
    rel: "noopener noreferrer"
  }, item.linkText))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Info);

/***/ }),

/***/ "../bpl-tools/Admin/Welcome/Info/style.scss":
/*!**************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Info/style.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Welcome/Overview/index.js":
/*!****************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Overview/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _Overview_VideoPlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Overview/VideoPlayer */ "../bpl-tools/Admin/Overview/VideoPlayer.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/Overview/style.scss");

/**
	* Overview Component
	*
	* @props name (required): plugin name (String)
	* @props version (required): plugin version (String)
	* @props description (required): tagline text (String)
	* @props isPremium (required): whether the plugin is premium (Boolean)
	* @props media (required): {thumbnail?, video?, isYoutube?} (Object)
	* @props pages (required): {landing?} - enables "View Demos" button (Object)
	* @props startButton (required): {label, url} - primary CTA button (Object)
	* @props keywords (required): chip labels shown below the tagline (Array)
	* @props keywordsLabel (required): label before keyword chips (String)
	* @props currentUser (required): injected by withSelect from the WP core store (Object)
	*/








const Overview = props => {
  const {
    name,
    version,
    description,
    isPremium,
    media,
    pages,
    startButton,
    currentUser,
    keywords,
    keywordsLabel
  } = props;
  const {
    thumbnail,
    video,
    isYoutube
  } = media || {};
  const [showVideo, setShowVideo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const firstName = currentUser?.name ? currentUser.name.split(/\s+/)[0] : '';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardWelcomeOverview bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "statusRow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "activeStatus"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "statusDot",
    "aria-hidden": "true"
  }), "Plugin active"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `planBadge ${isPremium ? 'isPro' : 'isFree'}`
  }, isPremium && _utils_icons__WEBPACK_IMPORTED_MODULE_5__.crownIcon, isPremium ? 'Pro Plan' : 'Free Plan'), version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "versionBadge"
  }, "v", version)), name && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Welcome to ", name), description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tagline"
  }, firstName ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "Hi ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, firstName), ", ", description) : description), thumbnail && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "banner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: thumbnail,
    alt: name
  }), video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "playBtn",
    onClick: () => setShowVideo(true),
    "aria-label": "Play product walkthrough"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.playIcon), video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bannerCaption"
  }, "Watch quick start \xB7 2 min")), keywords?.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "keywords"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "keywordsLabel"
  }, keywordsLabel), keywords.map(f => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    key: f,
    className: "formatChip"
  }, f))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "actionButtons"
  }, startButton?.url && startButton?.label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "primaryBtn",
    href: startButton.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.plusIcon, startButton.label), pages?.docs && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "secondaryBtn",
    href: pages.docs,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.questionIcon, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Read Documentation')), pages?.landing && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "secondaryBtn",
    href: pages.landing,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.gridIcon, "View Demos"), !isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "ghostBtn",
    href: "#pricing"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.crownIcon, "Upgrade to Pro", _utils_icons__WEBPACK_IMPORTED_MODULE_5__.arrowRightIcon)), showVideo && video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModal"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModalContent"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "closeModal",
    onClick: () => setShowVideo(false),
    "aria-label": "Close video"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.closeIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Overview_VideoPlayer__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: video,
    src: video,
    isYoutube: isYoutube,
    autoPlay: true,
    title: `${name} walkthrough`
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModalOverlay",
    onClick: () => setShowVideo(false)
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.withSelect)(select => ({
  currentUser: select('core').getCurrentUser?.()
}))(Overview));

/***/ }),

/***/ "../bpl-tools/Admin/Welcome/Overview/style.scss":
/*!******************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Overview/style.scss ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Welcome/ProAds/index.js":
/*!**************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/ProAds/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/ProAds/style.scss");





/**
 * ProAds — upgrade prompt shown to free users on the Welcome page.
 *
 * @param {object}		props
 * @param {string}		props.name
 * @param {object}		props.media			- {proThumbnail}
 * @param {string[]}	props.proFeatures
 */
const ProAds = props => {
  const {
    name,
    media,
    proFeatures
  } = props;
  const {
    proThumbnail
  } = media || {};
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardWelcomeProAds bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Go ", name, " Pro & Unlock More!"), proFeatures?.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, proFeatures.map((f, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.checkIcon), f))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "#pricing"
  }, "View Pricing Plan")), proThumbnail && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: proThumbnail,
    alt: `${name} Pro features`
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProAds);

/***/ }),

/***/ "../bpl-tools/Admin/Welcome/ProAds/style.scss":
/*!****************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/ProAds/style.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Welcome/index.js":
/*!*******************************************!*\
  !*** ../bpl-tools/Admin/Welcome/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Changelog: () => (/* reexport safe */ _Changelog__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   GettingStarted: () => (/* reexport safe */ _GettingStarted__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   Info: () => (/* reexport safe */ _Info__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   Overview: () => (/* reexport safe */ _Overview__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   ProAds: () => (/* reexport safe */ _ProAds__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/style.scss");
/* harmony import */ var _Overview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Overview */ "../bpl-tools/Admin/Welcome/Overview/index.js");
/* harmony import */ var _GettingStarted__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GettingStarted */ "../bpl-tools/Admin/Welcome/GettingStarted/index.js");
/* harmony import */ var _ProAds__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProAds */ "../bpl-tools/Admin/Welcome/ProAds/index.js");
/* harmony import */ var _Changelog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Changelog */ "../bpl-tools/Admin/Welcome/Changelog/index.js");
/* harmony import */ var _Info__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Info */ "../bpl-tools/Admin/Welcome/Info/index.js");








/**
 * Full Welcome page — composes Overview, GettingStarted, Changelog, ProAds, and Info.
 *
 * Spread both `dashboardInfo` and `welcomeInfo(adminUrl)` as props:
 *	<Welcome {...props} {...welcomeInfo(adminUrl)} />
 *
 * @param {object}		props
 * @param {string}		props.name
 * @param {string}		props.version
 * @param {string}		props.description
 * @param {boolean}		props.isPremium
 * @param {string}		props.slug						- WordPress.org slug (for review link)
 * @param {object}		props.media						- {logo, thumbnail, proThumbnail?, video?, isYoutube?}
 * @param {object}		props.pages						- {org?, docs?, pricing?, landing?}
 * @param {object}		[props.startButton]				- {label, url}
 * @param {string[]}	[props.keywords]				- Chip labels in the hero card (e.g. ['Grid', 'Masonry'])
 * @param {string}		[props.keywordsLabel]			- Label before keyword chips (e.g. 'Layouts')
 * @param {object}		[props.gettingStarted]			- {tabs: [{key, label, icon?, video?, isYoutube?, videoLabel?, steps}]} — omit to hide
 * @param {object[]}	[props.changelogs]				- [{version, type, list}] — omit to hide Changelog panel
 * @param {number}		[props.changelogsLimit]			- Max entries shown initially (default 5)
 * @param {string}		[props.changelogsReadMoreLabel]	- "Read more" button text; omit to hide
 * @param {string[]}	[props.proFeatures]				- Pro feature bullets shown in ProAds (free users only)
 * @param {object[]}	[props.helpItems]				- Override Info panel cards
 */
const Welcome = props => {
  const {
    isPremium,
    gettingStarted,
    pages,
    changelogsLimit,
    changelogsReadMoreLabel
  } = props;
  const hasTabs = gettingStarted?.tabs?.length > 0;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardWelcome"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `heroRow ${hasTabs ? '' : 'singleCol'}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Overview__WEBPACK_IMPORTED_MODULE_2__["default"], {
    ...props
  }), hasTabs && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GettingStarted__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ...gettingStarted,
    pages: pages
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "contentRow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Changelog__WEBPACK_IMPORTED_MODULE_5__["default"], {
    ...props,
    limit: changelogsLimit,
    loadMoreLabel: changelogsReadMoreLabel
  }), !isPremium ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ProAds__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ...props
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Info__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ...props
  })), !isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Info__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ...props
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Welcome);

/***/ }),

/***/ "../bpl-tools/Admin/Welcome/style.scss":
/*!*********************************************!*\
  !*** ../bpl-tools/Admin/Welcome/style.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/lib/fs.js":
/*!************************************!*\
  !*** ../bpl-tools/Admin/lib/fs.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-undef */

var __FSCheckoutGlobalInternal__ = function (h) {
  "use strict";

  var G = Object.defineProperty,
    Q = Object.defineProperties;
  var z = Object.getOwnPropertyDescriptors;
  var S = Object.getOwnPropertySymbols;
  var P = Object.prototype.hasOwnProperty,
    O = Object.prototype.propertyIsEnumerable;
  var v = (h, a, d) => a in h ? G(h, a, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: d
    }) : h[a] = d,
    I = (h, a) => {
      for (var d in a || (a = {})) P.call(a, d) && v(h, d, a[d]);
      if (S) for (var d of S(a)) O.call(a, d) && v(h, d, a[d]);
      return h;
    },
    A = (h, a) => Q(h, z(a));
  var D = (h, a) => {
    var d = {};
    for (var u in h) P.call(h, u) && a.indexOf(u) < 0 && (d[u] = h[u]);
    if (h != null && S) for (var u of S(h)) a.indexOf(u) < 0 && O.call(h, u) && (d[u] = h[u]);
    return d;
  };
  var l = (h, a, d) => v(h, typeof a != "symbol" ? a + "" : a, d);
  const a = {
    Log(...i) {
      console && console.log && console.log(...i);
    },
    Error(...i) {
      console && console.error && console.error(...i);
    },
    Warn(...i) {
      console && console.warn && console.warn(...i);
    },
    Debug(...i) {
      console && console.debug && console.debug(...i);
    }
  };
  function d(i, t) {
    const e = i.contentWindow,
      s = i.src,
      o = {};
    if (!e || !s) return null;
    const n = function (r) {
      if (!(r && r.origin && r.origin.indexOf("js.stripe.com") > 0 || r.origin.indexOf("www.paypal.com") > 0) && r.origin === t && r && r.data && typeof r.data == "string" && r.data.charAt(0) === "{") try {
        const c = JSON.parse(r.data);
        typeof c == "object" && c.type && o[c.type] && o[c.type].forEach(m => {
          m(c.data);
        });
      } catch (c) {
        a.Error(c);
      }
    };
    return window.addEventListener("message", n), {
      on(r, c) {
        o[r] || (o[r] = []), o[r].push(c);
      },
      one(r, c, m = !1) {
        m && delete o[r], !o[r] && this.on(r, c);
      },
      destroy() {
        window.removeEventListener("message", n);
      },
      post(r, c) {
        e.postMessage(JSON.stringify({
          type: r,
          data: c
        }), s.replace(/([^:]+:\/\/[^/]+).*/, "$1"));
      }
    };
  }
  const u = 2147483647;
  function $() {
    const i = function () {
      return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    };
    return i() + i() + "-" + i() + "-" + i() + "-" + i() + "-" + i() + i() + i();
  }
  function N() {
    let i = !1;
    try {
      const t = navigator.userAgent.toLowerCase();
      /edge\/|trident\/|msie /.test(t) ? i = !0 : t.indexOf("safari") !== -1 && (t.indexOf("chrome") > -1 || (i = !0));
    } catch (t) {}
    return i;
  }
  function x(i) {
    return typeof i == "undefined" || typeof i == "function" || typeof i == "object" && i !== null;
  }
  function M(i) {
    return x(i) ? null : i === null ? "null" : i === !0 ? "1" : i === !1 ? "0" : encodeURIComponent(i).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+");
  }
  function U(i) {
    const t = [];
    return Object.keys(i).forEach(e => {
      const s = i[e],
        o = M(s);
      o !== null && t.push(`${e}=${o}`);
    }), t.join("&");
  }
  function B(i) {
    return i.pageY <= 20;
  }
  function y() {
    return typeof window == "undefined";
  }
  function w(i, t) {
    if (i == null) throw new Error(t);
  }
  class T {
    constructor(t) {
      l(this, "styleElement");
      l(this, "bodyScrollDisableClassName");
      l(this, "isFlashingBrowser");
      l(this, "overflow", {
        x: 0,
        y: 0
      });
      l(this, "metaColorSchemeValue", null);
      l(this, "metaColorSchemeElement", null);
      this.guid = t, this.bodyScrollDisableClassName = `is-fs-checkout-open-${this.guid}`, this.styleElement = document.createElement("style"), this.styleElement.textContent += this.getBasicStyle(), this.isFlashingBrowser = N() || !y() && !!document.querySelector("#___gatsby"), this.metaColorSchemeElement = document.head.querySelector('meta[name="color-scheme"]');
    }
    addStyle(t) {
      this.styleElement.textContent += t;
    }
    attach() {
      return document.head.appendChild(this.styleElement), this;
    }
    remove() {
      return document.head.removeChild(this.styleElement), this;
    }
    disableBodyScroll() {
      this.backupScrollPosition(), document.body.classList.add(this.bodyScrollDisableClassName);
    }
    enableBodyScroll() {
      document.body.classList.remove(this.bodyScrollDisableClassName), this.restoreScrollPosition();
    }
    disableMetaColorScheme() {
      this.metaColorSchemeElement && (this.metaColorSchemeValue = this.metaColorSchemeElement.getAttribute("content"), this.metaColorSchemeElement.setAttribute("content", "light"));
    }
    enableMetaColorScheme() {
      this.metaColorSchemeElement && this.metaColorSchemeValue && (this.metaColorSchemeElement.setAttribute("content", this.metaColorSchemeValue), this.metaColorSchemeValue = null);
    }
    getBasicStyle() {
      return `body.${this.bodyScrollDisableClassName} { overflow: hidden !important; }`;
    }
    backupScrollPosition() {
      this.overflow = {
        x: document.documentElement.scrollTop,
        y: document.documentElement.scrollLeft
      };
    }
    restoreScrollPosition() {
      document.documentElement.scrollTop = this.overflow.x, document.documentElement.scrollLeft = this.overflow.y;
    }
  }
  class q {
    constructor(t, e, s = "Loading Freemius Checkout") {
      l(this, "loaderElement");
      l(this, "isOpen", !1);
      l(this, "loaderElementId");
      this.style = t, this.loaderElementId = `fs-loader-${this.style.guid}`, this.loaderElement = document.createElement("div"), this.loaderElement.id = this.loaderElementId, this.loaderElement.innerHTML = `<img src="${e}" alt="${s}" />`, this.style.addStyle(this.getStyle());
    }
    show() {
      return this.isOpen ? this : (this.loaderElement.classList.add("show"), document.body.appendChild(this.loaderElement), this.isOpen = !0, this);
    }
    hide() {
      return this.isOpen ? (this.loaderElement.classList.remove("show"), document.body.removeChild(this.loaderElement), this.isOpen = !1, this) : this;
    }
    getStyle() {
      return `#${this.loaderElementId} { display: none; position: fixed; z-index: ${u - 1}; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; text-align: left; background: rgba(0, 0, 0, 0.6); transition: opacity 200ms ease-out; will-change: opacity; opacity: 0; } #${this.loaderElementId}.show { opacity: 1; display: block; } #${this.loaderElementId} img { position: absolute; top: 40%; left: 50%; width: auto; height: auto; margin-left: -25px; background: #fff; padding: 10px; border-radius: 50%; box-shadow: 2px 2px 2px rgba(0,0,0,0.1); }`;
    }
  }
  class R {
    constructor(t, e, s, o, n) {
      l(this, "postman", null);
      l(this, "iFrame");
      l(this, "loadedEventListeners", new Set());
      l(this, "closedEventListeners", new Set());
      this.baseUrl = t, this.visibleClass = o, this.checkoutEvents = n, this.iFrame = this.attachIFrame(t, e, s), this.addEventListeners();
    }
    close() {
      var t;
      (t = this.postman) == null || t.post("close", null);
    }
    onClosed(t) {
      this.closedEventListeners.add(t);
    }
    onLoaded(t) {
      this.loadedEventListeners.add(t);
    }
    addToExitIntent(t) {
      t.addListener(() => {
        var e, s, o;
        (e = this.postman) == null || e.post("exit_intent", null), (o = (s = this.checkoutEvents).onExitIntent) == null || o.call(s);
      });
    }
    attachIFrame(t, e, s) {
      const o = `${t}/?${U(e)}#${encodeURIComponent(document.location.href)}`,
        n = document.createElement("iframe");
      return n.id = s, n.src = o, n.setAttribute("allowTransparency", "true"), n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("style", "background: rgba(0,0,0,0.003); border: 0 none transparent;"), n.setAttribute("frameborder", "0"), n.setAttribute("data-testid", n.id), document.body.appendChild(n), n;
    }
    addEventListeners() {
      var c, m, E, k, F;
      const {
        success: t,
        purchaseCompleted: e,
        cancel: s,
        track: o,
        afterOpen: n,
        afterClose: r
      } = this.checkoutEvents;
      this.postman = d(this.iFrame, this.baseUrl), (c = this.postman) == null || c.one("upgraded", p => {
        try {
          t == null || t(p);
        } catch (g) {
          a.Error(g);
        }
        this.dispatchOnClosed(), this.removeIFrameAndPostman(), r == null || r();
      }, !0), (m = this.postman) == null || m.one("purchaseCompleted", p => {
        try {
          e == null || e(p);
        } catch (g) {
          a.Error(g);
        }
      }, !0), (E = this.postman) == null || E.one("canceled", () => {
        try {
          s == null || s();
        } catch (p) {
          a.Error(p);
        }
        this.dispatchOnClosed(), this.removeIFrameAndPostman(), r == null || r();
      }, !0), (k = this.postman) == null || k.on("track", p => {
        try {
          o == null || o(p.event, p);
        } catch (g) {
          a.Error(g);
        }
      }), (F = this.postman) == null || F.one("loaded", () => {
        var p;
        this.dispatchOnLoaded(), (p = this.iFrame) == null || p.classList.add(this.visibleClass);
        try {
          n == null || n();
        } catch (g) {
          a.Error(g);
        }
      }, !0);
    }
    removeIFrameAndPostman() {
      var t;
      (t = this.postman) == null || t.destroy(), this.postman = null, this.iFrame.remove(), this.closedEventListeners.clear(), this.loadedEventListeners.clear();
    }
    dispatchOnLoaded() {
      this.loadedEventListeners.forEach(t => t());
    }
    dispatchOnClosed() {
      this.closedEventListeners.forEach(t => t());
    }
  }
  const b = class b {
    constructor(t, e, s) {
      l(this, "iFrameID");
      this.style = t, this.options = e, this.baseUrl = s, this.iFrameID = `fs-checkout-page-${this.style.guid}`;
    }
    create(t) {
      const e = I(I({}, this.options), t);
      return new R(this.baseUrl, this.getQueryParams(e), this.iFrameID, b.VISIBLE_CLASS, e);
    }
    addStyle() {
      this.style.addStyle(this.getStyle());
    }
    getQueryParams(t) {
      const e = {
        mode: "dialog",
        guid: this.style.guid,
        _fs_checkout: !0
      };
      Object.entries(t).forEach(([o, n]) => {
        x(n) || (e[o] = n);
      });
      const {
        sandbox: s
      } = t;
      return s && s.ctx && s.token && (e.s_ctx_ts = s.ctx, e.sandbox = s.token), e;
    }
    getStyle() {
      return `#${this.iFrameID} { z-index: ${u - 1}; background: rgba(0,0,0,0.003); border: 0 none transparent; visibility: ${this.style.isFlashingBrowser ? "hidden" : "visible"}; margin: 0; padding: 0; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; overflow: hidden; } #${this.iFrameID}.${b.VISIBLE_CLASS} { visibility: visible; }`;
    }
  };
  l(b, "VISIBLE_CLASS", "show");
  let _ = b;
  class V {
    constructor(t, e, s, o, n) {
      l(this, "checkoutIFrameBuilder");
      l(this, "checkoutIFrame", null);
      this.style = t, this.exitIntent = e, this.loader = s, this.checkoutIFrameBuilder = new _(this.style, n, o), this.checkoutIFrameBuilder.addStyle();
    }
    isOpen() {
      return this.checkoutIFrame !== null;
    }
    open(t) {
      return this.isOpen() ? this : (this.style.disableBodyScroll(), this.style.disableMetaColorScheme(), this.loader.show(), this.exitIntent.attach(), this.checkoutIFrame = this.checkoutIFrameBuilder.create(t), this.checkoutIFrame.onLoaded(this.onLoaded.bind(this)), this.checkoutIFrame.onClosed(this.onClosed.bind(this)), this.checkoutIFrame.addToExitIntent(this.exitIntent), this);
    }
    close() {
      var t;
      return (t = this.checkoutIFrame) == null || t.close(), this;
    }
    onLoaded() {
      this.loader.hide();
    }
    onClosed() {
      this.checkoutIFrame = null, this.loader.hide(), this.style.enableBodyScroll(), this.style.enableMetaColorScheme(), this.exitIntent.detach();
    }
  }
  class j {
    constructor(t) {
      l(this, "exitIntentId");
      l(this, "exitIntentDiv", null);
      l(this, "clearExitIntentListener", null);
      l(this, "listeners", []);
      this.style = t, this.exitIntentId = `fs-exit-intent-${this.style.guid}`, this.style.addStyle(this.getStyle());
    }
    isAttached() {
      return this.exitIntentDiv !== null;
    }
    addListener(...t) {
      this.listeners.push(...t);
    }
    attach(...t) {
      if (t && this.addListener(...t), this.isAttached()) return this;
      this.exitIntentDiv = document.createElement("div"), this.exitIntentDiv.id = this.exitIntentId, document.body.appendChild(this.exitIntentDiv);
      const e = document.documentElement;
      let s = null;
      const o = 300,
        n = c => {
          B(c) && (s = window.setTimeout(() => {
            try {
              this.fireListeners();
            } catch (m) {
              a.Error(m);
            }
          }, o));
        },
        r = () => {
          s && (clearTimeout(s), s = null);
        };
      return e.addEventListener("mouseleave", n), e.addEventListener("mouseenter", r), this.clearExitIntentListener = () => {
        s && (clearTimeout(s), s = null), e.removeEventListener("mouseleave", n), e.removeEventListener("mouseenter", r);
      }, this;
    }
    detach() {
      var t, e;
      return this.isAttached() ? ((t = this.exitIntentDiv) == null || t.remove(), this.exitIntentDiv = null, (e = this.clearExitIntentListener) == null || e.call(this), this) : this;
    }
    fireListeners() {
      this.listeners.forEach(t => {
        t();
      });
    }
    getStyle() {
      return `#${this.exitIntentId} { z-index: ${u}; border: 0; background: transparent; position: fixed; padding: 0; margin: 0; height: 10px; left: 0; right: 0; width: 100%; top: 0; }`;
    }
  }
  const f = class f {
    constructor(t) {
      l(this, "queryParams", null);
      this.url = t, this.queryParams = this.parseQueryStringForCart();
    }
    hasCart() {
      return this.queryParams !== null;
    }
    getPluginID() {
      return w(this.queryParams, f.NO_CART_FOUND_MESSAGE), this.queryParams.__fs_plugin_id;
    }
    getPluginPublicKey() {
      return w(this.queryParams, f.NO_CART_FOUND_MESSAGE), this.queryParams.__fs_plugin_public_key;
    }
    matchesPluginID(t) {
      const e = Number.parseInt(this.getPluginID(), 10),
        s = Number.parseInt(t.toString(), 10);
      return Number.isFinite(e) && Number.isFinite(s) && e === s;
    }
    getCheckoutOptions() {
      w(this.queryParams, f.NO_CART_FOUND_MESSAGE);
      const t = {
        plugin_id: "",
        public_key: ""
      };
      return Object.entries(this.queryParams).forEach(([e, s]) => {
        e === "__fs_plugin_id" ? t.plugin_id = s : e === "__fs_plugin_public_key" ? t.public_key = s : t[e] = s;
      }), t;
    }
    parseQueryStringForCart() {
      const t = "__fs_authorization",
        e = new URLSearchParams(this.url.search);
      if (!e.has(t)) return null;
      const s = {};
      return e.forEach((o, n) => {
        n.startsWith("__fs_") && (s[n] = o);
      }), s;
    }
  };
  l(f, "NO_CART_FOUND_MESSAGE", "No cart was found");
  let C = f;
  class L {
    constructor(t, e = !0, s = "https://checkout.freemius.com") {
      l(this, "options", {
        plugin_id: 0,
        public_key: ""
      });
      l(this, "guid");
      l(this, "style");
      l(this, "loader");
      l(this, "checkoutPopup");
      l(this, "exitIntent");
      l(this, "cart");
      var E;
      this.baseUrl = s;
      const m = t,
        {
          plugin_id: o,
          product_id: n,
          public_key: r
        } = m,
        c = D(m, ["plugin_id", "product_id", "public_key"]);
      if (!o && !n) throw new Error("Must provide a product_id to options.");
      if (!r) throw new Error("Must provide the public_key to options.");
      this.options = A(I({}, c), {
        public_key: r,
        plugin_id: n != null ? n : o
      }), this.guid = $(), !y() && (this.style = new T(this.guid), this.loader = new q(this.style, (E = t.loadingImageUrl) != null ? E : `${this.baseUrl}/assets/img/spinner.svg`, t.loadingImageAlt), this.exitIntent = new j(this.style), this.checkoutPopup = new V(this.style, this.exitIntent, this.loader, this.baseUrl, this.options), this.style.attach(), this.cart = new C(new URL(window.location.href)), e && this.recoverCart());
    }
    open(t) {
      var e, s;
      if (!y()) {
        if ((e = this.checkoutPopup) != null && e.isOpen()) {
          a.Warn("Checkout popup already open. Please close it first before opening it again.");
          return;
        }
        (s = this.checkoutPopup) == null || s.open(t);
      }
    }
    close() {
      var t;
      y() || (t = this.checkoutPopup) == null || t.close();
    }
    destroy() {
      var t;
      y() || (this.close(), (t = this.style) == null || t.remove());
    }
    getGuid() {
      return this.guid;
    }
    recoverCart() {
      var t, e;
      if ((t = this.cart) != null && t.hasCart() && (e = this.cart) != null && e.matchesPluginID(this.options.plugin_id)) {
        const s = this.cart.getCheckoutOptions();
        this.open(s);
      }
    }
  }
  return window.FS = window.FS || {}, window.FS.Checkout = L, window.FS.postman = d, window.FS.Logger = a, h.Checkout = L, Object.defineProperty(h, Symbol.toStringTag, {
    value: "Module"
  }), h;
}({});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.FS);

/***/ }),

/***/ "../bpl-tools/Admin/utils/icons.js":
/*!*****************************************!*\
  !*** ../bpl-tools/Admin/utils/icons.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alertIcon: () => (/* binding */ alertIcon),
/* harmony export */   angelDownIcon: () => (/* binding */ angelDownIcon),
/* harmony export */   arrowRightIcon: () => (/* binding */ arrowRightIcon),
/* harmony export */   chatIcon: () => (/* binding */ chatIcon),
/* harmony export */   checkCircleIcon: () => (/* binding */ checkCircleIcon),
/* harmony export */   checkIcon: () => (/* binding */ checkIcon),
/* harmony export */   chevronDownIcon: () => (/* binding */ chevronDownIcon),
/* harmony export */   chevronLeftIcon: () => (/* binding */ chevronLeftIcon),
/* harmony export */   chevronRightIcon: () => (/* binding */ chevronRightIcon),
/* harmony export */   circleCheckIcon: () => (/* binding */ circleCheckIcon),
/* harmony export */   closeIcon: () => (/* binding */ closeIcon),
/* harmony export */   copyIcon: () => (/* binding */ copyIcon),
/* harmony export */   crownIcon: () => (/* binding */ crownIcon),
/* harmony export */   defaultIcon: () => (/* binding */ defaultIcon),
/* harmony export */   externalIcon: () => (/* binding */ externalIcon),
/* harmony export */   facebookIcon: () => (/* binding */ facebookIcon),
/* harmony export */   fullscreenIcon: () => (/* binding */ fullscreenIcon),
/* harmony export */   gridIcon: () => (/* binding */ gridIcon),
/* harmony export */   hideLicenseIcon: () => (/* binding */ hideLicenseIcon),
/* harmony export */   infoIcon: () => (/* binding */ infoIcon),
/* harmony export */   keyIcon: () => (/* binding */ keyIcon),
/* harmony export */   linkIcon: () => (/* binding */ linkIcon),
/* harmony export */   lockIcon: () => (/* binding */ lockIcon),
/* harmony export */   moneyBackIcon: () => (/* binding */ moneyBackIcon),
/* harmony export */   ourPluginsIcon: () => (/* binding */ ourPluginsIcon),
/* harmony export */   pauseFillIcon: () => (/* binding */ pauseFillIcon),
/* harmony export */   playFillIcon: () => (/* binding */ playFillIcon),
/* harmony export */   playIcon: () => (/* binding */ playIcon),
/* harmony export */   playPauseIcon: () => (/* binding */ playPauseIcon),
/* harmony export */   pluginIcon: () => (/* binding */ pluginIcon),
/* harmony export */   plusIcon: () => (/* binding */ plusIcon),
/* harmony export */   questionIcon: () => (/* binding */ questionIcon),
/* harmony export */   ratingIcon: () => (/* binding */ ratingIcon),
/* harmony export */   refreshIcon: () => (/* binding */ refreshIcon),
/* harmony export */   searchAltIcon: () => (/* binding */ searchAltIcon),
/* harmony export */   searchIcon: () => (/* binding */ searchIcon),
/* harmony export */   shieldIcon: () => (/* binding */ shieldIcon),
/* harmony export */   showLicenseIcon: () => (/* binding */ showLicenseIcon),
/* harmony export */   trashIcon: () => (/* binding */ trashIcon),
/* harmony export */   upgradeProIcon: () => (/* binding */ upgradeProIcon),
/* harmony export */   volumeMutedIcon: () => (/* binding */ volumeMutedIcon),
/* harmony export */   volumeOnIcon: () => (/* binding */ volumeOnIcon),
/* harmony export */   warningIcon: () => (/* binding */ warningIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const trashIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "3 6 5 6 21 6"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "10",
  y1: "11",
  x2: "10",
  y2: "17"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "14",
  y1: "11",
  x2: "14",
  y2: "17"
}));
const alertIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "9",
  x2: "12",
  y2: "13"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "17",
  x2: "12.01",
  y2: "17"
}));
const shieldIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "9 12 11 14 15 10"
}));
const checkCircleIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "20 6 9 17 4 12"
}));
const closeIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}));
const searchIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "11",
  cy: "11",
  r: "7"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "21",
  y1: "21",
  x2: "16.65",
  y2: "16.65"
}));
const searchAltIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
}));
const externalIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "15 3 21 3 21 9"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "10",
  y1: "14",
  x2: "21",
  y2: "3"
}));
const arrowRightIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "12 5 19 12 12 19"
}));
const chevronLeftIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "15 18 9 12 15 6"
}));
const chevronRightIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "9 18 15 12 9 6"
}));
const defaultIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "3",
  width: "7",
  height: "7",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "3",
  width: "7",
  height: "7",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "14",
  width: "7",
  height: "7",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "14",
  width: "7",
  height: "7",
  rx: "1"
}));
const gridIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "3",
  width: "7",
  height: "7",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "3",
  width: "7",
  height: "7",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "14",
  width: "7",
  height: "7",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "14",
  width: "7",
  height: "7",
  rx: "1"
}));
const crownIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 17l3-9 4 5 2-7 2 7 4-5 3 9"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "3",
  y1: "21",
  x2: "21",
  y2: "21"
}));
const plusIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "5",
  x2: "12",
  y2: "19"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
}));
const ourPluginsIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M224 32C241.7 32 256 46.3 256 64L256 160L384 160L384 64C384 46.3 398.3 32 416 32C433.7 32 448 46.3 448 64L448 160L512 160C529.7 160 544 174.3 544 192C544 209.7 529.7 224 512 224L512 288C512 383.1 442.8 462.1 352 477.3L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 477.3C197.2 462.1 128 383.1 128 288L128 224C110.3 224 96 209.7 96 192C96 174.3 110.3 160 128 160L192 160L192 64C192 46.3 206.3 32 224 32z"
}));
const upgradeProIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 11 13",
  stroke: "currentColor",
  strokeLinecap: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2.5 5.16931V3.16931C2.49936 2.5198 2.73579 1.89239 3.16492 1.40483C3.59404 0.917267 4.18636 0.603088 4.8307 0.521257C5.47503 0.439426 6.12708 0.595571 6.66446 0.960383C7.20184 1.3252 7.5876 1.87359 7.74933 2.50264M5.16667 8.50264C5.34348 8.50264 5.51305 8.43241 5.63807 8.30738C5.76309 8.18236 5.83333 8.01279 5.83333 7.83598C5.83333 7.65917 5.76309 7.4896 5.63807 7.36457C5.51305 7.23955 5.34348 7.16931 5.16667 7.16931C4.98986 7.16931 4.82029 7.23955 4.69526 7.36457C4.57024 7.4896 4.5 7.65917 4.5 7.83598C4.5 8.01279 4.57024 8.18236 4.69526 8.30738C4.82029 8.43241 4.98986 8.50264 5.16667 8.50264ZM5.16667 8.50264V10.5026M1.56667 5.16931H8.76667C9.35333 5.16931 9.83333 5.64931 9.83333 6.23598V10.9026C9.83333 11.7826 9.11333 12.5026 8.23333 12.5026H2.1C1.22 12.5026 0.5 11.7826 0.5 10.9026V6.23598C0.5 5.64931 0.98 5.16931 1.56667 5.16931Z"
}));
const ratingIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"
}));
const facebookIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 292 512",
  fill: "#1877F2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m66 299.3v212.7h116v-212.7h86.5l18-97.8h-104.5v-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 0.4 37 1.2v-88.7c-14.3-3.9-49.3-7.9-69.5-7.9-106.9 0-156.2 50.5-156.2 159.4v42.1h-66v97.8z"
}));
const angelDownIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  className: "angelDown",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"
}));
const warningIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"
}));
const playFillIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M8 5v14l11-7z"
}));
const pauseFillIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  className: "video-player-pause-icon",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
}));
const playPauseIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
}));
const volumeMutedIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
}));
const volumeOnIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
}));
const fullscreenIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
}));
const playIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"
}));
const showLicenseIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 3L21 21",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10.5 10.677a2 2 0 002.823 2.823",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 01-1.078 1.5",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}));
const hideLicenseIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M12 5C7.52 5 3.73 7.61 1 12c2.73 4.39 6.52 7 11 7s8.27-2.61 11-7c-2.73-4.39-6.52-7-11-7z",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "12",
  cy: "12",
  r: "3",
  stroke: "currentColor",
  strokeWidth: "2"
}));
const pluginIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M8 12a4 4 0 100-8 4 4 0 000 8zm8 8a4 4 0 100-8 4 4 0 000 8zm-8 0a4 4 0 100-8 4 4 0 000 8z"
}));
const linkIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
}));
const questionIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "17",
  x2: "12.01",
  y2: "17"
}));
const circleCheckIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M22 11.08V12a10 10 0 11-5.93-9.14"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "22 4 12 14.01 9 11.01"
}));
const checkIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  className: "check",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 -960 960 960"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"
}));
const chevronDownIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "6 9 12 15 18 9"
}));
const moneyBackIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M12 2L4 6v6c0 5 3.5 9.6 8 10 4.5-.4 8-5 8-10V6l-8-4z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "9 12 11 14 15 10"
}));
const refreshIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "23 4 23 10 17 10"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "1 20 1 14 7 14"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
}));
const chatIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
}));
const lockIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "11",
  width: "18",
  height: "11",
  rx: "2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M7 11V7a5 5 0 0110 0v4"
}));
const keyIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
}));
const copyIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "9",
  y: "9",
  width: "13",
  height: "13",
  rx: "2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
}));
const infoIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "16",
  x2: "12",
  y2: "12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "8",
  x2: "12.01",
  y2: "8"
}));

/***/ }),

/***/ "../bpl-tools/Admin/utils/video.js":
/*!*****************************************!*\
  !*** ../bpl-tools/Admin/utils/video.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getYoutubeEmbedSrc: () => (/* binding */ getYoutubeEmbedSrc)
/* harmony export */ });
/**
 * Build a YouTube embed URL from any YouTube share/watch/short URL.
 * Returns the original url untouched when no 11-char video id can be found.
 *
 * @param {string}	url
 * @param {object}	[options]
 * @param {boolean}	[options.autoplay=true]
 * @return {string}
 */
const getYoutubeEmbedSrc = (url, {
  autoplay = true
} = {}) => {
  const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  const short = url.match(/youtu\.be\/([^#&?]+)/);
  const id = match && match[2]?.length === 11 ? match[2] : short && short[1]?.length === 11 ? short[1] : '';
  return id ? `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1` : url;
};

/***/ }),

/***/ "../bpl-tools/Components/Button/Button.js":
/*!************************************************!*\
  !*** ../bpl-tools/Components/Button/Button.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Components/Button/style.scss");

/**
	* Button Component
	* Renders a button or anchor element based on the presence of an onClick/href.
	*
	* @props type (optional): 'button' (String)
	* @props href (optional): Anchor href; renders an <a> when set (String)
	* @props target (optional): Anchor target (String)
	* @props onClick (optional): Button click handler (Function)
	* @props className (optional): Additional CSS classes (String)
	* @props variant (optional): 'primary' Button style variant (String)
	* @props size (optional): '' Button size (String)
	* @props children (optional): Button content (Node)
	* @props disabled (optional): false (Boolean)
	*/


const Button = ({
  type = 'button',
  href = '',
  target = '',
  onClick = null,
  className,
  variant = 'primary',
  size = '',
  children,
  disabled = false,
  ...props
}) => {
  const cls = `bPlButton ${variant ? `variant-${variant}` : ''} ${size ? `size-${size}` : ''} ${className ? className : ''} ${disabled ? 'bPlButton-disabled' : ''}`;
  return 'function' === typeof onClick || !href ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: type,
    className: cls,
    ...props,
    onClick: onClick
  }, children) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: href,
    target: target,
    className: cls,
    ...props
  }, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "../bpl-tools/Components/Button/style.scss":
/*!*************************************************!*\
  !*** ../bpl-tools/Components/Button/style.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/hooks/useWPAjax.js":
/*!***************************************!*\
  !*** ../bpl-tools/hooks/useWPAjax.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useWPAjax = (action, params = {}, set = true) => {
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isError, setIsError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  if (!wp.ajax) {
    // eslint-disable-next-line no-console
    console.error('Please use wp-util as a dependency');
    return;
  }
  const sendRequest = (payload = {}) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    wp.ajax.post(action, {
      ...params,
      ...payload
    }).done(res => {
      setIsLoading(false);
      setData(res);
    }).fail(error => {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    });
  };
  const request = (payload = {}) => {
    sendRequest(payload);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (set) {
      sendRequest(params);
    }
  }, []);
  return {
    data,
    saveData: request,
    refetch: request,
    isLoading,
    isError,
    error
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWPAjax);

/***/ }),

/***/ "../bpl-tools/utils/data.js":
/*!**********************************!*\
  !*** ../bpl-tools/utils/data.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contentColor: () => (/* binding */ contentColor),
/* harmony export */   deskBreakpoint: () => (/* binding */ deskBreakpoint),
/* harmony export */   gradient: () => (/* binding */ gradient),
/* harmony export */   mobileBreakpoint: () => (/* binding */ mobileBreakpoint),
/* harmony export */   primaryColor: () => (/* binding */ primaryColor),
/* harmony export */   primaryColor100: () => (/* binding */ primaryColor100),
/* harmony export */   primaryColor1000: () => (/* binding */ primaryColor1000),
/* harmony export */   primaryColor200: () => (/* binding */ primaryColor200),
/* harmony export */   primaryColor300: () => (/* binding */ primaryColor300),
/* harmony export */   primaryColor400: () => (/* binding */ primaryColor400),
/* harmony export */   primaryColor500: () => (/* binding */ primaryColor500),
/* harmony export */   primaryColor600: () => (/* binding */ primaryColor600),
/* harmony export */   primaryColor700: () => (/* binding */ primaryColor700),
/* harmony export */   primaryColor800: () => (/* binding */ primaryColor800),
/* harmony export */   primaryColor900: () => (/* binding */ primaryColor900),
/* harmony export */   secondaryColor: () => (/* binding */ secondaryColor),
/* harmony export */   tabBreakpoint: () => (/* binding */ tabBreakpoint),
/* harmony export */   titleColor: () => (/* binding */ titleColor)
/* harmony export */ });
const deskBreakpoint = '@media only screen and (min-width: 1025px)';
const tabBreakpoint = '@media only screen and (max-width: 1024px)';
const mobileBreakpoint = '@media only screen and (max-width: 640px)';
const primaryColor = '#146EF5';
const primaryColor100 = '#e7f0fe';
const primaryColor200 = '#b6d2fc';
const primaryColor300 = '#85b4fa';
const primaryColor400 = '#5495f8';
const primaryColor500 = '#2377f6';
const primaryColor600 = '#095edc';
const primaryColor700 = '#0749ab';
const primaryColor800 = '#05347a';
const primaryColor900 = '#031f49';
const primaryColor1000 = '#010a18';
const secondaryColor = '#FF7A00';
const titleColor = '#070127';
const contentColor = '#485781';
const gradient = 'linear-gradient(135deg, #0040E3, #18D4FD)';

/***/ }),

/***/ "../bpl-tools/utils/icons.js":
/*!***********************************!*\
  !*** ../bpl-tools/utils/icons.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bookIcon: () => (/* binding */ bookIcon),
/* harmony export */   checkIcon: () => (/* binding */ checkIcon),
/* harmony export */   circleCheckIcon: () => (/* binding */ circleCheckIcon),
/* harmony export */   closeIcon: () => (/* binding */ closeIcon),
/* harmony export */   copyIcon: () => (/* binding */ copyIcon),
/* harmony export */   crownIcon: () => (/* binding */ crownIcon),
/* harmony export */   demoIcon: () => (/* binding */ demoIcon),
/* harmony export */   desktopIcon: () => (/* binding */ desktopIcon),
/* harmony export */   docsIcon: () => (/* binding */ docsIcon),
/* harmony export */   externalIcon: () => (/* binding */ externalIcon),
/* harmony export */   filterIcon: () => (/* binding */ filterIcon),
/* harmony export */   gearIcon: () => (/* binding */ gearIcon),
/* harmony export */   gripIcon: () => (/* binding */ gripIcon),
/* harmony export */   headsetIcon: () => (/* binding */ headsetIcon),
/* harmony export */   heartFillIcon: () => (/* binding */ heartFillIcon),
/* harmony export */   heartIcon: () => (/* binding */ heartIcon),
/* harmony export */   linkIcon: () => (/* binding */ linkIcon),
/* harmony export */   listIcon: () => (/* binding */ listIcon),
/* harmony export */   minusIcon: () => (/* binding */ minusIcon),
/* harmony export */   mobileIcon: () => (/* binding */ mobileIcon),
/* harmony export */   nextIcon: () => (/* binding */ nextIcon),
/* harmony export */   playIcon: () => (/* binding */ playIcon),
/* harmony export */   pluginIcon: () => (/* binding */ pluginIcon),
/* harmony export */   plusIcon: () => (/* binding */ plusIcon),
/* harmony export */   prevIcon: () => (/* binding */ prevIcon),
/* harmony export */   questionIcon: () => (/* binding */ questionIcon),
/* harmony export */   rightArrowIcon: () => (/* binding */ rightArrowIcon),
/* harmony export */   scrollIcon: () => (/* binding */ scrollIcon),
/* harmony export */   searchIcon: () => (/* binding */ searchIcon),
/* harmony export */   starIcon: () => (/* binding */ starIcon),
/* harmony export */   tabletIcon: () => (/* binding */ tabletIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "../bpl-tools/utils/data.js");


const desktopIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 15,
  height: 15,
  viewBox: "0 0 548.172 548.172"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: _data__WEBPACK_IMPORTED_MODULE_1__.primaryColor,
  d: "M534.75 49.965c-8.945-8.945-19.694-13.422-32.261-13.422H45.681c-12.562 0-23.313 4.477-32.264 13.422C4.471 58.913 0 69.663 0 82.226v310.633c0 12.566 4.471 23.315 13.417 32.265 8.951 8.945 19.702 13.414 32.264 13.414h155.318c0 7.231-1.524 14.661-4.57 22.269-3.044 7.614-6.09 14.273-9.136 19.981-3.042 5.715-4.565 9.897-4.565 12.56 0 4.948 1.807 9.24 5.424 12.847 3.615 3.621 7.898 5.435 12.847 5.435h146.179c4.949 0 9.233-1.813 12.848-5.435 3.62-3.606 5.427-7.898 5.427-12.847 0-2.468-1.526-6.611-4.571-12.415-3.046-5.801-6.092-12.566-9.134-20.267-3.046-7.71-4.569-15.085-4.569-22.128h155.318c12.56 0 23.309-4.469 32.254-13.414 8.949-8.949 13.422-19.698 13.422-32.265V82.226c.003-12.563-4.474-23.313-13.423-32.261zm-23.123 269.803c0 2.475-.903 4.613-2.711 6.424-1.81 1.804-3.952 2.707-6.427 2.707H45.681c-2.473 0-4.615-.903-6.423-2.707-1.807-1.817-2.712-3.949-2.712-6.424V82.226c0-2.475.902-4.615 2.712-6.423 1.809-1.805 3.951-2.712 6.423-2.712h456.815c2.471 0 4.617.904 6.42 2.712 1.808 1.809 2.711 3.949 2.711 6.423v237.542z"
}));
const tabletIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 15,
  height: 15,
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: _data__WEBPACK_IMPORTED_MODULE_1__.primaryColor,
  d: "M394.667 0H117.333C87.936 0 64 23.936 64 53.333v405.333C64 488.064 87.936 512 117.333 512h277.333C424.064 512 448 488.064 448 458.667V53.333C448 23.936 424.064 0 394.667 0zM256 480c-11.755 0-21.333-9.579-21.333-21.333s9.579-21.333 21.333-21.333 21.333 9.579 21.333 21.333S267.755 480 256 480zm149.333-64c0 5.888-4.779 10.667-10.667 10.667H117.333c-5.888 0-10.667-4.779-10.667-10.667V53.333c0-5.888 4.779-10.667 10.667-10.667h277.333c5.888 0 10.667 4.779 10.667 10.667V416z"
}));
const mobileIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 15,
  height: 15,
  viewBox: "0 0 503.604 503.604"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: _data__WEBPACK_IMPORTED_MODULE_1__.primaryColor,
  d: "M337.324 0H167.192c-28.924 0-53.5 23.584-53.5 52.5v398.664c0 28.916 24.056 52.44 52.98 52.44l170.412-.184c28.92 0 52.58-23.528 52.58-52.448l.248-398.5C389.908 23.452 366.364 0 337.324 0zM227.68 31.476h49.36c4.336 0 7.868 3.52 7.868 7.868 0 4.348-3.532 7.868-7.868 7.868h-49.36a7.865 7.865 0 01-7.868-7.868 7.865 7.865 0 017.868-7.868zm-29.66 2.504c2.916-2.912 8.224-2.952 11.136 0a7.973 7.973 0 012.324 5.588c0 2.048-.864 4.088-2.324 5.548-1.452 1.46-3.504 2.32-5.548 2.32-2.084 0-4.088-.86-5.588-2.32-1.452-1.456-2.28-3.5-2.28-5.548-.004-2.088.828-4.132 2.28-5.588zm52.752 454.028c-12.984 0-23.544-10.568-23.544-23.548 0-12.984 10.56-23.548 23.544-23.548s23.544 10.564 23.544 23.548c0 12.98-10.564 23.548-23.544 23.548zm114.716-63.1H141.232V74.756h224.256v350.152z"
}));
const scrollIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 14,
  height: 14,
  viewBox: "0 0 330 330"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M100.606 229.393c-5.857-5.857-15.355-5.857-21.213 0-5.858 5.857-5.858 15.355 0 21.213l75 75A14.954 14.954 0 00165 330a14.95 14.95 0 0010.606-4.394l75-75c5.858-5.857 5.858-15.355 0-21.213-5.857-5.857-15.355-5.857-21.213 0L180 278.787V51.212l49.394 49.394A14.95 14.95 0 00240 105a14.95 14.95 0 0010.606-4.394c5.858-5.857 5.858-15.355 0-21.213l-75-75c-5.857-5.858-15.355-5.858-21.213 0l-75 75c-5.858 5.857-5.858 15.355 0 21.213 5.857 5.857 15.355 5.857 21.213 0L150 51.212v227.574l-49.394-49.393z"
}));
const gearIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  viewBox: "0 0 430.848 430.848"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M286.244,249.537l10.992-45.639c0.035-0.143,0.071-0.285,0.109-0.428c2.909-10.867,11.469-19.426,22.339-22.338 l33.347-8.936c-5.472-6.525-13.678-10.682-22.839-10.682h-9.837c-2.511-7.895-5.7-15.59-9.515-22.957l6.96-6.959 c11.622-11.623,11.622-30.535,0-42.156L296.76,68.4c-5.631-5.629-13.117-8.73-21.079-8.73c-7.961,0-15.447,3.102-21.078,8.732 l-6.96,6.959c-7.369-3.814-15.064-7.004-22.956-9.516V56.01c0-16.436-13.372-29.807-29.808-29.807h-29.758 c-16.436,0-29.808,13.371-29.808,29.807v9.836c-7.893,2.512-15.588,5.701-22.957,9.516l-6.96-6.961 c-5.631-5.629-13.117-8.73-21.078-8.73c-7.961,0-15.447,3.102-21.079,8.732L42.2,89.443c-11.622,11.621-11.622,30.533,0,42.156 l6.959,6.959c-3.815,7.367-7.004,15.063-9.515,22.957h-9.837C13.372,161.516,0,174.887,0,191.324v29.758 c0,16.436,13.372,29.807,29.808,29.807h9.837c2.511,7.895,5.7,15.588,9.515,22.957l-6.96,6.959 c-11.623,11.623-11.623,30.533,0,42.158l21.041,21.039c5.632,5.631,13.118,8.732,21.079,8.732s15.447-3.102,21.077-8.732 l6.96-6.959c7.366,3.815,15.061,7.002,22.957,9.514v9.838c0,16.436,13.372,29.809,29.808,29.809h25.809 c-2.388-5.691-3.644-11.852-3.645-18.209c-0.002-12.572,4.892-24.391,13.781-33.279L286.244,249.537z M180,286.201 c-44.112,0-80-35.887-80-79.998c0-44.113,35.888-80.002,80-80.002s80,35.889,80,80.002C260,250.314,224.112,286.201,180,286.201z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M425.267,218.734l-0.319-0.32c-0.939-0.941-2.189-1.428-3.541-1.469c-1.326,0-2.598,0.525-3.536,1.465l-21.596,21.596 c-3.304,3.305-7.699,5.125-12.375,5.125c-4.676,0-9.072-1.82-12.379-5.129c-3.307-3.305-5.128-7.701-5.128-12.377 c0.001-4.676,1.821-9.072,5.126-12.377l21.596-21.596c0.939-0.939,1.465-2.213,1.464-3.539c-0.001-1.328-0.53-2.6-1.47-3.537 l-0.314-0.313c-3.605-3.605-8.399-5.592-13.499-5.592c-1.665,0-3.325,0.219-4.936,0.65l-44.348,11.885 c-6.568,1.76-11.741,6.932-13.498,13.496c-0.011,0.041-0.021,0.08-0.031,0.121l-11.817,49.063l-87.667,87.666 c-6.528,6.527-10.122,15.207-10.121,24.44c0.002,9.232,3.598,17.91,10.126,24.439l2.088,2.088 c6.528,6.529,15.209,10.125,24.443,10.125h0c9.231,0,17.909-3.594,24.437-10.121l87.667-87.666l49.061-11.816 c0.041-0.01,0.082-0.022,0.122-0.031c6.563-1.758,11.735-6.928,13.497-13.496l11.883-44.352 C431.959,230.598,430.066,223.535,425.267,218.734z M257.26,368.406c-1.888,1.889-4.399,2.93-7.071,2.93 c-2.671,0-5.183-1.041-7.072-2.932c-1.887-1.885-2.928-4.397-2.928-7.068c-0.001-2.672,1.041-5.185,2.931-7.072 c1.886-1.887,4.398-2.928,7.069-2.928c2.672,0,5.184,1.041,7.072,2.93c1.887,1.885,2.928,4.396,2.928,7.068 C260.189,364.006,259.148,366.518,257.26,368.406z M316.194,305.935L274.82,347.31c-1.416,1.416-3.3,2.197-5.303,2.197 c-2.003,0-3.887-0.781-5.303-2.197c-1.417-1.416-2.197-3.299-2.197-5.303s0.78-3.887,2.197-5.303l41.374-41.375 c1.417-1.418,3.3-2.197,5.303-2.197s3.887,0.779,5.303,2.197c1.417,1.416,2.197,3.299,2.197,5.303S317.611,304.519,316.194,305.935 z"
}));
const bookIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 448 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
}));
const headsetIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z"
}));
const starIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 576 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
}));
const rightArrowIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 448 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
}));
const copyIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 18,
  height: 18,
  viewBox: "0 0 448 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"
}));
const closeIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 -960 960 960"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"
}));
const gripIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 320 512",
  width: 16,
  height: 16
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"
}));
const listIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  stroke: "currentColor",
  fill: "currentColor",
  strokeWidth: "0",
  viewBox: "0 0 512 512",
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
}));
const minusIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"
}));
const plusIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"
}));
const prevIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
}));
const nextIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
}));
const checkIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  className: "check",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 -960 960 960"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"
}));
const circleCheckIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z"
}));
const searchIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "18px",
  height: "18px"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10 2a8 8 0 105.29 13.71l5 5a1 1 0 001.42-1.42l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
}));
const demoIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: 25,
  height: 25,
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M4.66667 12.25H11.9C11.9928 12.25 12.0818 12.2131 12.1475 12.1475C12.2131 12.0818 12.25 11.9928 12.25 11.9V2.1C12.25 2.00717 12.2131 1.91815 12.1475 1.85251C12.0818 1.78687 11.9928 1.75 11.9 1.75H2.1C2.00717 1.75 1.91815 1.78687 1.85251 1.85251C1.78687 1.91815 1.75 2.00717 1.75 2.1V9.33333M5.83333 3.5H10.5M3.5 3.5H4.08333M2.04167 11.9583L7 7M7 7V9.33333M7 7H4.66667",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const docsIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: 25,
  height: 25,
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M11.6667 6.99999V3.35357C11.6667 3.30753 11.6577 3.26193 11.6401 3.21939C11.6225 3.17684 11.5966 3.1382 11.564 3.10566L9.72771 1.26932C9.66213 1.20367 9.57317 1.16674 9.48037 1.16666H2.68337C2.59055 1.16666 2.50152 1.20353 2.43589 1.26917C2.37025 1.33481 2.33337 1.42383 2.33337 1.51666V12.4833C2.33337 12.5761 2.37025 12.6652 2.43589 12.7308C2.50152 12.7964 2.59055 12.8333 2.68337 12.8333H6.41671M4.66671 5.83332H9.33337M4.66671 3.49999H7.00004M4.66671 8.16666H6.41671",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M9.33337 3.14999V1.37315C9.33345 1.33237 9.3456 1.29251 9.36829 1.25862C9.39099 1.22473 9.42321 1.19832 9.4609 1.18272C9.49859 1.16712 9.54005 1.16303 9.58006 1.17097C9.62007 1.17891 9.65683 1.19852 9.68571 1.22732L11.606 3.14765C11.6351 3.17642 11.655 3.21321 11.6631 3.25331C11.6712 3.29341 11.6672 3.33502 11.6515 3.37283C11.6359 3.41063 11.6093 3.44291 11.5752 3.46556C11.5412 3.48821 11.5011 3.5002 11.4602 3.49999H9.68337C9.59055 3.49999 9.50152 3.46311 9.43589 3.39748C9.37025 3.33184 9.33337 3.24281 9.33337 3.14999V3.14999Z",
  fill: "#6A72A5",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10.4731 9.88165L11.0565 9.29832C11.1172 9.23754 11.1893 9.18932 11.2687 9.15643C11.3481 9.12353 11.4331 9.1066 11.5191 9.1066C11.605 9.1066 11.6901 9.12353 11.7694 9.15643C11.8488 9.18932 11.9209 9.23754 11.9816 9.29832C12.1042 9.42095 12.1731 9.58723 12.1731 9.76061C12.1731 9.93399 12.1042 10.1003 11.9816 10.2229L11.3983 10.8062M10.4731 9.88107L8.7284 11.6258C8.64116 11.7133 8.58397 11.8263 8.56506 11.9484L8.42273 12.8567L9.33098 12.7149C9.45309 12.696 9.56605 12.6388 9.65356 12.5516L11.3977 10.8062M10.4731 9.88107L11.3983 10.8062",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const playIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"
}));
const questionIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 240C302.3 240 288 254.3 288 272C288 285.3 277.3 296 264 296C250.7 296 240 285.3 240 272C240 227.8 275.8 192 320 192C364.2 192 400 227.8 400 272C400 319.2 364 339.2 344 346.5L344 350.3C344 363.6 333.3 374.3 320 374.3C306.7 374.3 296 363.6 296 350.3L296 342.2C296 321.7 310.8 307 326.1 302C332.5 299.9 339.3 296.5 344.3 291.7C348.6 287.5 352 281.7 352 272.1C352 254.4 337.7 240.1 320 240.1zM288 432C288 414.3 302.3 400 320 400C337.7 400 352 414.3 352 432C352 449.7 337.7 464 320 464C302.3 464 288 449.7 288 432z"
}));
const pluginIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M224 32C241.7 32 256 46.3 256 64L256 160L384 160L384 64C384 46.3 398.3 32 416 32C433.7 32 448 46.3 448 64L448 160L512 160C529.7 160 544 174.3 544 192C544 209.7 529.7 224 512 224L512 288C512 383.1 442.8 462.1 352 477.3L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 477.3C197.2 462.1 128 383.1 128 288L128 224C110.3 224 96 209.7 96 192C96 174.3 110.3 160 128 160L192 160L192 64C192 46.3 206.3 32 224 32z"
}));
const linkIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M451.5 160C434.9 160 418.8 164.5 404.7 172.7C388.9 156.7 370.5 143.3 350.2 133.2C378.4 109.2 414.3 96 451.5 96C537.9 96 608 166 608 252.5C608 294 591.5 333.8 562.2 363.1L491.1 434.2C461.8 463.5 422 480 380.5 480C294.1 480 224 410 224 323.5C224 322 224 320.5 224.1 319C224.6 301.3 239.3 287.4 257 287.9C274.7 288.4 288.6 303.1 288.1 320.8C288.1 321.7 288.1 322.6 288.1 323.4C288.1 374.5 329.5 415.9 380.6 415.9C405.1 415.9 428.6 406.2 446 388.8L517.1 317.7C534.4 300.4 544.2 276.8 544.2 252.3C544.2 201.2 502.8 159.8 451.7 159.8zM307.2 237.3C305.3 236.5 303.4 235.4 301.7 234.2C289.1 227.7 274.7 224 259.6 224C235.1 224 211.6 233.7 194.2 251.1L123.1 322.2C105.8 339.5 96 363.1 96 387.6C96 438.7 137.4 480.1 188.5 480.1C205 480.1 221.1 475.7 235.2 467.5C251 483.5 269.4 496.9 289.8 507C261.6 530.9 225.8 544.2 188.5 544.2C102.1 544.2 32 474.2 32 387.7C32 346.2 48.5 306.4 77.8 277.1L148.9 206C178.2 176.7 218 160.2 259.5 160.2C346.1 160.2 416 230.8 416 317.1C416 318.4 416 319.7 416 321C415.6 338.7 400.9 352.6 383.2 352.2C365.5 351.8 351.6 337.1 352 319.4C352 318.6 352 317.9 352 317.1C352 283.4 334 253.8 307.2 237.5z"
}));
const crownIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 544 432"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m297 71.2c9.2-7.3 15-18.6 15-31.2 0-22.1-17.9-40-40-40-22.1 0-40 17.9-40 40 0 12.6 5.9 23.9 15 31.2l-68.4 107.6c-10 15.7-31.3 19.6-46.2 8.4l-59.5-44.5c4.5-6.4 7.1-14.3 7.1-22.7 0-22.1-17.9-40-40-40-22.1 0-40 17.9-40 40 0 21.8 17.5 39.6 39.2 40l32.6 217.5c4.7 31.3 31.6 54.5 63.3 54.5h273.8c31.7 0 58.6-23.2 63.3-54.5l32.6-217.5c21.7-0.4 39.2-18.2 39.2-40 0-22.1-17.9-40-40-40-22.1 0-40 17.9-40 40 0 8.4 2.6 16.3 7.1 22.7l-59.4 44.6c-14.9 11.2-36.2 7.3-46.2-8.4z"
}));
const externalIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m290.4 19.8c5-12 16.7-19.8 29.6-19.8h160c17.7 0 32 14.3 32 32v160c0 12.9-7.8 24.6-19.8 29.6-12 5-25.7 2.2-34.9-6.9l-57.3-57.4-153.4 153.3c-12.5 12.5-32.8 12.5-45.3 0-12.5-12.5-12.5-32.8 0-45.3l153.4-153.3-57.3-57.4c-9.2-9.2-11.9-22.9-6.9-34.9zm-290.4 156.2c0-44.2 35.8-80 80-80h80c17.7 0 32 14.3 32 32 0 17.7-14.3 32-32 32h-80c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16h256c8.8 0 16-7.2 16-16v-80c0-17.7 14.3-32 32-32 17.7 0 32 14.3 32 32v80c0 44.2-35.8 80-80 80h-256c-44.2 0-80-35.8-80-80z"
}));
const heartIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 448"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m271 55.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1-15.6 0-30.8-4.7-43.1-14.1-36.5-27.8-89.7-74.3-133.8-127.8-36.2-43.9-79.1-104.3-79.1-172.9 0-73.5 59.6-133.1 133.1-133.1 42.7 0 82.9 20.5 107.9 55.1l15 20.7zm107.9-7.1c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9-7.7 0-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2 6.1 0 10.8-1.8 14-4.2 34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1z"
}));
const heartFillIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 448"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m241 55.1l15 20.7 15-20.7c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1v2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1-15.5 0-30.8-4.6-43.1-14.1-73-55.7-212.9-186-212.9-298.2v-2.6c0-73.5 59.6-133.1 133.1-133.1 42.7 0 82.9 20.5 107.9 55.1z"
}));
const filterIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512",
  fill: "currentColor"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
}));

/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./node_modules/react-router/dist/development/chunk-KNED5TY2.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/react-router/dist/development/chunk-KNED5TY2.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Action: () => (/* binding */ Action),
/* harmony export */   Await: () => (/* binding */ Await),
/* harmony export */   BrowserRouter: () => (/* binding */ BrowserRouter),
/* harmony export */   DataRouterContext: () => (/* binding */ DataRouterContext),
/* harmony export */   DataRouterStateContext: () => (/* binding */ DataRouterStateContext),
/* harmony export */   ErrorResponseImpl: () => (/* binding */ ErrorResponseImpl),
/* harmony export */   FetchersContext: () => (/* binding */ FetchersContext),
/* harmony export */   Form: () => (/* binding */ Form),
/* harmony export */   FrameworkContext: () => (/* binding */ FrameworkContext),
/* harmony export */   HashRouter: () => (/* binding */ HashRouter),
/* harmony export */   HistoryRouter: () => (/* binding */ HistoryRouter),
/* harmony export */   IDLE_BLOCKER: () => (/* binding */ IDLE_BLOCKER),
/* harmony export */   IDLE_FETCHER: () => (/* binding */ IDLE_FETCHER),
/* harmony export */   IDLE_NAVIGATION: () => (/* binding */ IDLE_NAVIGATION),
/* harmony export */   Link: () => (/* binding */ Link),
/* harmony export */   Links: () => (/* binding */ Links),
/* harmony export */   LocationContext: () => (/* binding */ LocationContext),
/* harmony export */   MemoryRouter: () => (/* binding */ MemoryRouter),
/* harmony export */   Meta: () => (/* binding */ Meta),
/* harmony export */   NavLink: () => (/* binding */ NavLink),
/* harmony export */   Navigate: () => (/* binding */ Navigate),
/* harmony export */   NavigationContext: () => (/* binding */ NavigationContext),
/* harmony export */   Outlet: () => (/* binding */ Outlet),
/* harmony export */   PrefetchPageLinks: () => (/* binding */ PrefetchPageLinks),
/* harmony export */   RemixErrorBoundary: () => (/* binding */ RemixErrorBoundary),
/* harmony export */   Route: () => (/* binding */ Route),
/* harmony export */   RouteContext: () => (/* binding */ RouteContext),
/* harmony export */   Router: () => (/* binding */ Router),
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider),
/* harmony export */   Routes: () => (/* binding */ Routes),
/* harmony export */   Scripts: () => (/* binding */ Scripts),
/* harmony export */   ScrollRestoration: () => (/* binding */ ScrollRestoration),
/* harmony export */   ServerMode: () => (/* binding */ ServerMode),
/* harmony export */   ServerRouter: () => (/* binding */ ServerRouter),
/* harmony export */   SingleFetchRedirectSymbol: () => (/* binding */ SingleFetchRedirectSymbol),
/* harmony export */   StaticRouter: () => (/* binding */ StaticRouter),
/* harmony export */   StaticRouterProvider: () => (/* binding */ StaticRouterProvider),
/* harmony export */   ViewTransitionContext: () => (/* binding */ ViewTransitionContext),
/* harmony export */   createBrowserHistory: () => (/* binding */ createBrowserHistory),
/* harmony export */   createBrowserRouter: () => (/* binding */ createBrowserRouter),
/* harmony export */   createClientRoutes: () => (/* binding */ createClientRoutes),
/* harmony export */   createClientRoutesWithHMRRevalidationOptOut: () => (/* binding */ createClientRoutesWithHMRRevalidationOptOut),
/* harmony export */   createCookie: () => (/* binding */ createCookie),
/* harmony export */   createCookieSessionStorage: () => (/* binding */ createCookieSessionStorage),
/* harmony export */   createHashRouter: () => (/* binding */ createHashRouter),
/* harmony export */   createMemoryRouter: () => (/* binding */ createMemoryRouter),
/* harmony export */   createMemorySessionStorage: () => (/* binding */ createMemorySessionStorage),
/* harmony export */   createPath: () => (/* binding */ createPath),
/* harmony export */   createRequestHandler: () => (/* binding */ createRequestHandler),
/* harmony export */   createRouter: () => (/* binding */ createRouter),
/* harmony export */   createRoutesFromChildren: () => (/* binding */ createRoutesFromChildren),
/* harmony export */   createRoutesFromElements: () => (/* binding */ createRoutesFromElements),
/* harmony export */   createRoutesStub: () => (/* binding */ createRoutesStub),
/* harmony export */   createSearchParams: () => (/* binding */ createSearchParams),
/* harmony export */   createSession: () => (/* binding */ createSession),
/* harmony export */   createSessionStorage: () => (/* binding */ createSessionStorage),
/* harmony export */   createStaticHandler: () => (/* binding */ createStaticHandler2),
/* harmony export */   createStaticRouter: () => (/* binding */ createStaticRouter),
/* harmony export */   data: () => (/* binding */ data),
/* harmony export */   decodeViaTurboStream: () => (/* binding */ decodeViaTurboStream),
/* harmony export */   deserializeErrors: () => (/* binding */ deserializeErrors2),
/* harmony export */   generatePath: () => (/* binding */ generatePath),
/* harmony export */   getPatchRoutesOnNavigationFunction: () => (/* binding */ getPatchRoutesOnNavigationFunction),
/* harmony export */   getSingleFetchDataStrategy: () => (/* binding */ getSingleFetchDataStrategy),
/* harmony export */   href: () => (/* binding */ href),
/* harmony export */   invariant: () => (/* binding */ invariant),
/* harmony export */   isCookie: () => (/* binding */ isCookie),
/* harmony export */   isRouteErrorResponse: () => (/* binding */ isRouteErrorResponse),
/* harmony export */   isSession: () => (/* binding */ isSession),
/* harmony export */   mapRouteProperties: () => (/* binding */ mapRouteProperties),
/* harmony export */   matchPath: () => (/* binding */ matchPath),
/* harmony export */   matchRoutes: () => (/* binding */ matchRoutes),
/* harmony export */   parsePath: () => (/* binding */ parsePath),
/* harmony export */   redirect: () => (/* binding */ redirect),
/* harmony export */   redirectDocument: () => (/* binding */ redirectDocument),
/* harmony export */   renderMatches: () => (/* binding */ renderMatches),
/* harmony export */   replace: () => (/* binding */ replace),
/* harmony export */   resolvePath: () => (/* binding */ resolvePath),
/* harmony export */   setDevServerHooks: () => (/* binding */ setDevServerHooks),
/* harmony export */   shouldHydrateRouteLoader: () => (/* binding */ shouldHydrateRouteLoader),
/* harmony export */   unstable_RouterContextProvider: () => (/* binding */ unstable_RouterContextProvider),
/* harmony export */   unstable_createContext: () => (/* binding */ unstable_createContext),
/* harmony export */   useActionData: () => (/* binding */ useActionData),
/* harmony export */   useAsyncError: () => (/* binding */ useAsyncError),
/* harmony export */   useAsyncValue: () => (/* binding */ useAsyncValue),
/* harmony export */   useBeforeUnload: () => (/* binding */ useBeforeUnload),
/* harmony export */   useBlocker: () => (/* binding */ useBlocker),
/* harmony export */   useFetcher: () => (/* binding */ useFetcher),
/* harmony export */   useFetchers: () => (/* binding */ useFetchers),
/* harmony export */   useFogOFWarDiscovery: () => (/* binding */ useFogOFWarDiscovery),
/* harmony export */   useFormAction: () => (/* binding */ useFormAction),
/* harmony export */   useHref: () => (/* binding */ useHref),
/* harmony export */   useInRouterContext: () => (/* binding */ useInRouterContext),
/* harmony export */   useLinkClickHandler: () => (/* binding */ useLinkClickHandler),
/* harmony export */   useLoaderData: () => (/* binding */ useLoaderData),
/* harmony export */   useLocation: () => (/* binding */ useLocation),
/* harmony export */   useMatch: () => (/* binding */ useMatch),
/* harmony export */   useMatches: () => (/* binding */ useMatches),
/* harmony export */   useNavigate: () => (/* binding */ useNavigate),
/* harmony export */   useNavigation: () => (/* binding */ useNavigation),
/* harmony export */   useNavigationType: () => (/* binding */ useNavigationType),
/* harmony export */   useOutlet: () => (/* binding */ useOutlet),
/* harmony export */   useOutletContext: () => (/* binding */ useOutletContext),
/* harmony export */   useParams: () => (/* binding */ useParams),
/* harmony export */   usePrompt: () => (/* binding */ usePrompt),
/* harmony export */   useResolvedPath: () => (/* binding */ useResolvedPath),
/* harmony export */   useRevalidator: () => (/* binding */ useRevalidator),
/* harmony export */   useRouteError: () => (/* binding */ useRouteError),
/* harmony export */   useRouteLoaderData: () => (/* binding */ useRouteLoaderData),
/* harmony export */   useRoutes: () => (/* binding */ useRoutes),
/* harmony export */   useScrollRestoration: () => (/* binding */ useScrollRestoration),
/* harmony export */   useSearchParams: () => (/* binding */ useSearchParams),
/* harmony export */   useSubmit: () => (/* binding */ useSubmit),
/* harmony export */   useViewTransitionState: () => (/* binding */ useViewTransitionState)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var turbo_stream__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! turbo-stream */ "./node_modules/turbo-stream/dist/turbo-stream.mjs");
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie */ "./node_modules/react-router/node_modules/cookie/dist/index.js");
/* harmony import */ var set_cookie_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! set-cookie-parser */ "./node_modules/set-cookie-parser/lib/set-cookie.js");
/**
 * react-router v7.5.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);

// lib/router/history.ts
var Action = /* @__PURE__ */ ((Action2) => {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
  return Action2;
})(Action || {});
var PopStateEventType = "popstate";
function createMemoryHistory(options = {}) {
  let { initialEntries = ["/"], initialIndex, v5Compat = false } = options;
  let entries;
  entries = initialEntries.map(
    (entry, index2) => createMemoryLocation(
      entry,
      typeof entry === "string" ? null : entry.state,
      index2 === 0 ? "default" : void 0
    )
  );
  let index = clampIndex(
    initialIndex == null ? entries.length - 1 : initialIndex
  );
  let action = "POP" /* Pop */;
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state = null, key) {
    let location = createLocation(
      entries ? getCurrentLocation().pathname : "/",
      to,
      state,
      key
    );
    warning(
      location.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        to
      )}`
    );
    return location;
  }
  function createHref2(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref: createHref2,
    createURL(to) {
      return new URL(createHref2(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = "PUSH" /* Push */;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({ action, location: nextLocation, delta: 1 });
      }
    },
    replace(to, state) {
      action = "REPLACE" /* Replace */;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({ action, location: nextLocation, delta: 0 });
      }
    },
    go(delta) {
      action = "POP" /* Pop */;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({ action, location: nextLocation, delta });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
function createBrowserHistory(options = {}) {
  function createBrowserLocation(window2, globalHistory) {
    let { pathname, search, hash } = window2.location;
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(
    createBrowserLocation,
    createBrowserHref,
    null,
    options
  );
}
function createHashHistory(options = {}) {
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substring(1));
    if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
      pathname = "/" + pathname;
    }
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base");
    let href2 = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href;
      let hashIndex = url.indexOf("#");
      href2 = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href2 + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(
      location.pathname.charAt(0) === "/",
      `relative pathnames are not supported in hash history.push(${JSON.stringify(
        to
      )})`
    );
  }
  return getUrlBasedHistory(
    createHashLocation,
    createHashHref,
    validateHashLocation,
    options
  );
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to, state = null, key) {
  let location = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to === "string" ? parsePath(to) : to,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  };
  return location;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
  let { window: window2 = document.defaultView, v5Compat = false } = options;
  let globalHistory = window2.history;
  let action = "POP" /* Pop */;
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState({ ...globalHistory.state, idx: index }, "");
  }
  function getIndex() {
    let state = globalHistory.state || { idx: null };
    return state.idx;
  }
  function handlePop() {
    action = "POP" /* Pop */;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({ action, location: history.location, delta });
    }
  }
  function push(to, state) {
    action = "PUSH" /* Push */;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 1 });
    }
  }
  function replace2(to, state) {
    action = "REPLACE" /* Replace */;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 0 });
    }
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href2 = typeof to === "string" ? to : createPath(to);
    href2 = href2.replace(/ $/, "%20");
    invariant(
      base,
      `No window.location.(origin|href) available to create URL for href: ${href2}`
    );
    return new URL(href2, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref2(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace: replace2,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}

// lib/router/utils.ts
function unstable_createContext(defaultValue) {
  return { defaultValue };
}
var _map;
var unstable_RouterContextProvider = class {
  constructor(init) {
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
    if (init) {
      for (let [context, value] of init) {
        this.set(context, value);
      }
    }
  }
  get(context) {
    if (__privateGet(this, _map).has(context)) {
      return __privateGet(this, _map).get(context);
    }
    if (context.defaultValue !== void 0) {
      return context.defaultValue;
    }
    throw new Error("No value found for context");
  }
  set(context, value) {
    __privateGet(this, _map).set(context, value);
  }
};
_map = new WeakMap();
var unsupportedLazyRouteObjectKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function isUnsupportedLazyRouteObjectKey(key) {
  return unsupportedLazyRouteObjectKeys.has(
    key
  );
}
var unsupportedLazyRouteFunctionKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "unstable_middleware",
  "children"
]);
function isUnsupportedLazyRouteFunctionKey(key) {
  return unsupportedLazyRouteFunctionKeys.has(
    key
  );
}
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes, mapRouteProperties2, parentPath = [], manifest = {}) {
  return routes.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(
      route.index !== true || !route.children,
      `Cannot specify children on an index route`
    );
    invariant(
      !manifest[id],
      `Found a route id collision on id "${id}".  Route id's must be globally unique within Data Router usages`
    );
    if (isIndexRoute(route)) {
      let indexRoute = {
        ...route,
        ...mapRouteProperties2(route),
        id
      };
      manifest[id] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = {
        ...route,
        ...mapRouteProperties2(route),
        id,
        children: void 0
      };
      manifest[id] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(
          route.children,
          mapRouteProperties2,
          treePath,
          manifest
        );
      }
      return pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let { route, pathname, params } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "") {
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    if (route.path === "" || !route.path?.includes("?")) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
      remainingPathname
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function generatePath(originalPath, params = {}) {
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(
      false,
      `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
    );
    path = path.replace(/\*$/, "/*");
  }
  const prefix = path.startsWith("/") ? "/" : "";
  const stringify = (p) => p == null ? "" : typeof p === "string" ? p : String(p);
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1;
    if (isLastSegment && segment === "*") {
      const star = "*";
      return stringify(params[star]);
    }
    const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
    if (keyMatch) {
      const [, key, optional] = keyMatch;
      let param = params[key];
      invariant(optional === "?" || param != null, `Missing ":${key}" param`);
      return stringify(param);
    }
    return segment.replace(/\?$/g, "");
  }).filter((segment) => !!segment);
  return prefix + segments.join("/");
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (_, paramName, isOptional) => {
      params.push({ paramName, isOptional: isOptional != null });
      return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
    }
  );
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else {
  }
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var DataWithResponseInit = class {
  constructor(data2, init) {
    this.type = "DataWithResponseInit";
    this.data = data2;
    this.init = init || null;
  }
};
function data(data2, init) {
  return new DataWithResponseInit(
    data2,
    typeof init === "number" ? { status: init } : init
  );
}
var redirect = (url, init = 302) => {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, { ...responseInit, headers });
};
var redirectDocument = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Reload-Document", "true");
  return response;
};
var replace = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Replace", "true");
  return response;
};
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}

// lib/router/router.ts
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
var validMutationMethods = new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
var IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
var ResetLoaderDataSymbol = Symbol("ResetLoaderData");
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
  const isBrowser2 = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  invariant(
    init.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let mapRouteProperties2 = init.mapRouteProperties || defaultMapRouteProperties;
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(
    init.routes,
    mapRouteProperties2,
    void 0,
    manifest
  );
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  let dataStrategyImpl = init.dataStrategy || defaultDataStrategyWithMiddleware;
  let future = {
    unstable_middleware: false,
    ...init.future
  };
  let unlistenHistory = null;
  let subscribers = /* @__PURE__ */ new Set();
  let savedScrollPositions2 = null;
  let getScrollRestorationKey2 = null;
  let getScrollPosition = null;
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialMatchesIsFOW = false;
  let initialErrors = null;
  if (initialMatches == null && !init.patchRoutesOnNavigation) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let { matches, route } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = { [route.id]: error };
  }
  if (initialMatches && !init.hydrationData) {
    let fogOfWar = checkFogOfWar(
      initialMatches,
      dataRoutes,
      init.history.location.pathname
    );
    if (fogOfWar.active) {
      initialMatches = null;
    }
  }
  let initialized;
  if (!initialMatches) {
    initialized = false;
    initialMatches = [];
    let fogOfWar = checkFogOfWar(
      null,
      dataRoutes,
      init.history.location.pathname
    );
    if (fogOfWar.active && fogOfWar.matches) {
      initialMatchesIsFOW = true;
      initialMatches = fogOfWar.matches;
    }
  } else if (initialMatches.some((m) => m.route.lazy)) {
    initialized = false;
  } else if (!initialMatches.some((m) => m.route.loader)) {
    initialized = true;
  } else {
    let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
    let errors = init.hydrationData ? init.hydrationData.errors : null;
    if (errors) {
      let idx = initialMatches.findIndex(
        (m) => errors[m.route.id] !== void 0
      );
      initialized = initialMatches.slice(0, idx + 1).every((m) => !shouldLoadRouteOnHydration(m.route, loaderData, errors));
    } else {
      initialized = initialMatches.every(
        (m) => !shouldLoadRouteOnHydration(m.route, loaderData, errors)
      );
    }
  }
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  };
  let pendingAction = "POP" /* Pop */;
  let pendingPreventScrollReset = false;
  let pendingNavigationController;
  let pendingViewTransitionEnabled = false;
  let appliedViewTransitions = /* @__PURE__ */ new Map();
  let removePageHideEventListener = null;
  let isUninterruptedRevalidation = false;
  let isRevalidationRequired = false;
  let cancelledFetcherLoads = /* @__PURE__ */ new Set();
  let fetchControllers = /* @__PURE__ */ new Map();
  let incrementingLoadId = 0;
  let pendingNavigationLoadId = -1;
  let fetchReloadIds = /* @__PURE__ */ new Map();
  let fetchRedirectIds = /* @__PURE__ */ new Set();
  let fetchLoadMatches = /* @__PURE__ */ new Map();
  let activeFetchers = /* @__PURE__ */ new Map();
  let fetchersQueuedForDeletion = /* @__PURE__ */ new Set();
  let blockerFunctions = /* @__PURE__ */ new Map();
  let unblockBlockerHistoryUpdate = void 0;
  let pendingRevalidationDfd = null;
  function initialize() {
    unlistenHistory = init.history.listen(
      ({ action: historyAction, location, delta }) => {
        if (unblockBlockerHistoryUpdate) {
          unblockBlockerHistoryUpdate();
          unblockBlockerHistoryUpdate = void 0;
          return;
        }
        warning(
          blockerFunctions.size === 0 || delta != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let blockerKey = shouldBlockNavigation({
          currentLocation: state.location,
          nextLocation: location,
          historyAction
        });
        if (blockerKey && delta != null) {
          let nextHistoryUpdatePromise = new Promise((resolve) => {
            unblockBlockerHistoryUpdate = resolve;
          });
          init.history.go(delta * -1);
          updateBlocker(blockerKey, {
            state: "blocked",
            location,
            proceed() {
              updateBlocker(blockerKey, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location
              });
              nextHistoryUpdatePromise.then(() => init.history.go(delta));
            },
            reset() {
              let blockers = new Map(state.blockers);
              blockers.set(blockerKey, IDLE_BLOCKER);
              updateState({ blockers });
            }
          });
          return;
        }
        return startNavigation(historyAction, location);
      }
    );
    if (isBrowser2) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    if (!state.initialized) {
      startNavigation("POP" /* Pop */, state.location, {
        initialHydration: true
      });
    }
    return router;
  }
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }
  function updateState(newState, opts = {}) {
    state = {
      ...state,
      ...newState
    };
    let unmountedFetchers = [];
    let mountedFetchers = [];
    state.fetchers.forEach((fetcher, key) => {
      if (fetcher.state === "idle") {
        if (fetchersQueuedForDeletion.has(key)) {
          unmountedFetchers.push(key);
        } else {
          mountedFetchers.push(key);
        }
      }
    });
    fetchersQueuedForDeletion.forEach((key) => {
      if (!state.fetchers.has(key) && !fetchControllers.has(key)) {
        unmountedFetchers.push(key);
      }
    });
    [...subscribers].forEach(
      (subscriber) => subscriber(state, {
        deletedFetchers: unmountedFetchers,
        viewTransitionOpts: opts.viewTransitionOpts,
        flushSync: opts.flushSync === true
      })
    );
    unmountedFetchers.forEach((key) => deleteFetcher(key));
    mountedFetchers.forEach((key) => state.fetchers.delete(key));
  }
  function completeNavigation(location, newState, { flushSync } = {}) {
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && location.state?._isRedirect !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        actionData = null;
      }
    } else if (isActionReload) {
      actionData = state.actionData;
    } else {
      actionData = null;
    }
    let loaderData = newState.loaderData ? mergeLoaderData(
      state.loaderData,
      newState.loaderData,
      newState.matches || [],
      newState.errors
    ) : state.loaderData;
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
    }
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && location.state?._isRedirect !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = void 0;
    }
    if (isUninterruptedRevalidation) {
    } else if (pendingAction === "POP" /* Pop */) {
    } else if (pendingAction === "PUSH" /* Push */) {
      init.history.push(location, location.state);
    } else if (pendingAction === "REPLACE" /* Replace */) {
      init.history.replace(location, location.state);
    }
    let viewTransitionOpts;
    if (pendingAction === "POP" /* Pop */) {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      } else if (appliedViewTransitions.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: location,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location.pathname);
      } else {
        toPaths = /* @__PURE__ */ new Set([location.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(
      {
        ...newState,
        // matches, errors, fetchers go through as-is
        actionData,
        loaderData,
        historyAction: pendingAction,
        location,
        initialized: true,
        navigation: IDLE_NAVIGATION,
        revalidation: "idle",
        restoreScrollPosition: getSavedScrollPosition(
          location,
          newState.matches || state.matches
        ),
        preventScrollReset,
        blockers
      },
      {
        viewTransitionOpts,
        flushSync: flushSync === true
      }
    );
    pendingAction = "POP" /* Pop */;
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    pendingRevalidationDfd?.resolve();
    pendingRevalidationDfd = null;
  }
  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      to,
      opts?.fromRouteId,
      opts?.relative
    );
    let { path, submission, error } = normalizeNavigateOptions(
      false,
      normalizedPath,
      opts
    );
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = {
      ...nextLocation,
      ...init.history.encodeLocation(nextLocation)
    };
    let userReplace = opts && opts.replace != null ? opts.replace : void 0;
    let historyAction = "PUSH" /* Push */;
    if (userReplace === true) {
      historyAction = "REPLACE" /* Replace */;
    } else if (userReplace === false) {
    } else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      historyAction = "REPLACE" /* Replace */;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
    let flushSync = (opts && opts.flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          });
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({ blockers });
        }
      });
      return;
    }
    await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.viewTransition,
      flushSync
    });
  }
  function revalidate() {
    if (!pendingRevalidationDfd) {
      pendingRevalidationDfd = createDeferred();
    }
    interruptActiveLoads();
    updateState({ revalidation: "loading" });
    let promise = pendingRevalidationDfd.promise;
    if (state.navigation.state === "submitting") {
      return promise;
    }
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return promise;
    }
    startNavigation(
      pendingAction || state.historyAction,
      state.navigation.location,
      {
        overrideNavigation: state.navigation,
        // Proxy through any rending view transition
        enableViewTransition: pendingViewTransitionEnabled === true
      }
    );
    return promise;
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = opts?.initialHydration && state.matches && state.matches.length > 0 && !initialMatchesIsFOW ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      state.matches
    ) : matchRoutes(routesToUse, location, basename);
    let flushSync = (opts && opts.flushSync) === true;
    if (matches && state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, { matches }, { flushSync });
      return;
    }
    let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      let { error, notFoundMatches, route } = handleNavigational404(
        location.pathname
      );
      completeNavigation(
        location,
        {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        },
        { flushSync }
      );
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(
      init.history,
      location,
      pendingNavigationController.signal,
      opts && opts.submission
    );
    let scopedContext = new unstable_RouterContextProvider(
      init.unstable_getContext ? await init.unstable_getContext() : void 0
    );
    let pendingActionResult;
    if (opts && opts.pendingError) {
      pendingActionResult = [
        findNearestBoundary(matches).route.id,
        { type: "error" /* error */, error: opts.pendingError }
      ];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionResult = await handleAction(
        request,
        location,
        opts.submission,
        matches,
        scopedContext,
        fogOfWar.active,
        { replace: opts.replace, flushSync }
      );
      if (actionResult.shortCircuited) {
        return;
      }
      if (actionResult.pendingActionResult) {
        let [routeId, result] = actionResult.pendingActionResult;
        if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
          pendingNavigationController = null;
          completeNavigation(location, {
            matches: actionResult.matches,
            loaderData: {},
            errors: {
              [routeId]: result.error
            }
          });
          return;
        }
      }
      matches = actionResult.matches || matches;
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(location, opts.submission);
      flushSync = false;
      fogOfWar.active = false;
      request = createClientSideRequest(
        init.history,
        request.url,
        request.signal
      );
    }
    let {
      shortCircuited,
      matches: updatedMatches,
      loaderData,
      errors
    } = await handleLoaders(
      request,
      location,
      matches,
      scopedContext,
      fogOfWar.active,
      loadingNavigation,
      opts && opts.submission,
      opts && opts.fetcherSubmission,
      opts && opts.replace,
      opts && opts.initialHydration === true,
      flushSync,
      pendingActionResult
    );
    if (shortCircuited) {
      return;
    }
    pendingNavigationController = null;
    completeNavigation(location, {
      matches: updatedMatches || matches,
      ...getActionDataForCommit(pendingActionResult),
      loaderData,
      errors
    });
  }
  async function handleAction(request, location, submission, matches, scopedContext, isFogOfWar, opts = {}) {
    interruptActiveLoads();
    let navigation = getSubmittingNavigation(location, submission);
    updateState({ navigation }, { flushSync: opts.flushSync === true });
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        location.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          pendingActionResult: [
            boundaryId,
            {
              type: "error" /* error */,
              error: discoverResult.error
            }
          ]
        };
      } else if (!discoverResult.matches) {
        let { notFoundMatches, error, route } = handleNavigational404(
          location.pathname
        );
        return {
          matches: notFoundMatches,
          pendingActionResult: [
            route.id,
            {
              type: "error" /* error */,
              error
            }
          ]
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: "error" /* error */,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let results = await callDataStrategy(
        "action",
        request,
        [actionMatch],
        matches,
        scopedContext,
        null
      );
      result = results[actionMatch.route.id];
      if (!result) {
        for (let match of matches) {
          if (results[match.route.id]) {
            result = results[match.route.id];
            break;
          }
        }
      }
      if (request.signal.aborted) {
        return { shortCircuited: true };
      }
    }
    if (isRedirectResult(result)) {
      let replace2;
      if (opts && opts.replace != null) {
        replace2 = opts.replace;
      } else {
        let location2 = normalizeRedirectLocation(
          result.response.headers.get("Location"),
          new URL(request.url),
          basename
        );
        replace2 = location2 === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, true, {
        submission,
        replace: replace2
      });
      return { shortCircuited: true };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      if ((opts && opts.replace) !== true) {
        pendingAction = "PUSH" /* Push */;
      }
      return {
        matches,
        pendingActionResult: [boundaryMatch.route.id, result]
      };
    }
    return {
      matches,
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  async function handleLoaders(request, location, matches, scopedContext, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace2, initialHydration, flushSync, pendingActionResult) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    let shouldUpdateNavigationState = !isUninterruptedRevalidation && !initialHydration;
    if (isFogOfWar) {
      if (shouldUpdateNavigationState) {
        let actionData = getUpdatedActionData(pendingActionResult);
        updateState(
          {
            navigation: loadingNavigation,
            ...actionData !== void 0 ? { actionData } : {}
          },
          {
            flushSync
          }
        );
      }
      let discoverResult = await discoverRoutes(
        matches,
        location.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          loaderData: {},
          errors: {
            [boundaryId]: discoverResult.error
          }
        };
      } else if (!discoverResult.matches) {
        let { error, notFoundMatches, route } = handleNavigational404(
          location.pathname
        );
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(
      init.history,
      state,
      matches,
      activeSubmission,
      location,
      initialHydration === true,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      pendingActionResult
    );
    pendingNavigationLoadId = ++incrementingLoadId;
    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      completeNavigation(
        location,
        {
          matches,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? { [pendingActionResult[0]]: pendingActionResult[1].error } : null,
          ...getActionDataForCommit(pendingActionResult),
          ...updatedFetchers2 ? { fetchers: new Map(state.fetchers) } : {}
        },
        { flushSync }
      );
      return { shortCircuited: true };
    }
    if (shouldUpdateNavigationState) {
      let updates = {};
      if (!isFogOfWar) {
        updates.navigation = loadingNavigation;
        let actionData = getUpdatedActionData(pendingActionResult);
        if (actionData !== void 0) {
          updates.actionData = actionData;
        }
      }
      if (revalidatingFetchers.length > 0) {
        updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
      }
      updateState(updates, { flushSync });
    }
    revalidatingFetchers.forEach((rf) => {
      abortFetcher(rf.key);
      if (rf.controller) {
        fetchControllers.set(rf.key, rf.controller);
      }
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      matches,
      matchesToLoad,
      revalidatingFetchers,
      request,
      scopedContext
    );
    if (request.signal.aborted) {
      return { shortCircuited: true };
    }
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      pendingActionResult,
      revalidatingFetchers,
      fetcherResults
    );
    if (initialHydration && state.errors) {
      errors = { ...state.errors, ...errors };
    }
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return {
      matches,
      loaderData,
      errors,
      ...shouldUpdateFetchers ? { fetchers: new Map(state.fetchers) } : {}
    };
  }
  function getUpdatedActionData(pendingActionResult) {
    if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
      return {
        [pendingActionResult[0]]: pendingActionResult[1].data
      };
    } else if (state.actionData) {
      if (Object.keys(state.actionData).length === 0) {
        return null;
      } else {
        return state.actionData;
      }
    }
  }
  function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
    revalidatingFetchers.forEach((rf) => {
      let fetcher = state.fetchers.get(rf.key);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        fetcher ? fetcher.data : void 0
      );
      state.fetchers.set(rf.key, revalidatingFetcher);
    });
    return new Map(state.fetchers);
  }
  async function fetch2(key, routeId, href2, opts) {
    abortFetcher(key);
    let flushSync = (opts && opts.flushSync) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      href2,
      routeId,
      opts?.relative
    );
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      setFetcherError(
        key,
        routeId,
        getInternalRouterError(404, { pathname: normalizedPath }),
        { flushSync }
      );
      return;
    }
    let { path, submission, error } = normalizeNavigateOptions(
      true,
      normalizedPath,
      opts
    );
    if (error) {
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    let match = getTargetMatch(matches, path);
    let scopedContext = new unstable_RouterContextProvider(
      init.unstable_getContext ? await init.unstable_getContext() : void 0
    );
    let preventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      await handleFetcherAction(
        key,
        routeId,
        path,
        match,
        matches,
        scopedContext,
        fogOfWar.active,
        flushSync,
        preventScrollReset,
        submission
      );
      return;
    }
    fetchLoadMatches.set(key, { routeId, path });
    await handleFetcherLoader(
      key,
      routeId,
      path,
      match,
      matches,
      scopedContext,
      fogOfWar.active,
      flushSync,
      preventScrollReset,
      submission
    );
  }
  async function handleFetcherAction(key, routeId, path, match, requestMatches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    function detectAndHandle405Error(m) {
      if (!m.route.action && !m.route.lazy) {
        let error = getInternalRouterError(405, {
          method: submission.formMethod,
          pathname: path,
          routeId
        });
        setFetcherError(key, routeId, error, { flushSync });
        return true;
      }
      return false;
    }
    if (!isFogOfWar && detectAndHandle405Error(match)) {
      return;
    }
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal,
      submission
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        requestMatches,
        path,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        requestMatches = discoverResult.matches;
        match = getTargetMatch(requestMatches, path);
        if (detectAndHandle405Error(match)) {
          return;
        }
      }
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let actionResults = await callDataStrategy(
      "action",
      fetchRequest,
      [match],
      requestMatches,
      scopedContext,
      key
    );
    let actionResult = actionResults[match.route.id];
    if (fetchRequest.signal.aborted) {
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      }
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, false, {
            fetcherSubmission: submission,
            preventScrollReset
          });
        }
      }
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(
      init.history,
      nextLocation,
      abortController.signal
    );
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(
      init.history,
      state,
      matches,
      submission,
      nextLocation,
      false,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      [match.route.id, actionResult]
    );
    revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
      let staleKey = rf.key;
      let existingFetcher2 = state.fetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        existingFetcher2 ? existingFetcher2.data : void 0
      );
      state.fetchers.set(staleKey, revalidatingFetcher);
      abortFetcher(staleKey);
      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({ fetchers: new Map(state.fetchers) });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
    abortController.signal.addEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      matches,
      matchesToLoad,
      revalidatingFetchers,
      revalidationRequest,
      scopedContext
    );
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      void 0,
      revalidatingFetchers,
      fetcherResults
    );
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    abortStaleFetchLoads(loadId);
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      updateState({
        errors,
        loaderData: mergeLoaderData(
          state.loaderData,
          loaderData,
          matches,
          errors
        ),
        fetchers: new Map(state.fetchers)
      });
      isRevalidationRequired = false;
    }
  }
  async function handleFetcherLoader(key, routeId, path, match, matches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(
      key,
      getLoadingFetcher(
        submission,
        existingFetcher ? existingFetcher.data : void 0
      ),
      { flushSync }
    );
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        path,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        matches = discoverResult.matches;
        match = getTargetMatch(matches, path);
      }
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let results = await callDataStrategy(
      "loader",
      fetchRequest,
      [match],
      matches,
      scopedContext,
      key
    );
    let result = results[match.route.id];
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      updateFetcherState(key, getDoneFetcher(void 0));
      return;
    }
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result, false, {
          preventScrollReset
        });
        return;
      }
    }
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  async function startRedirectNavigation(request, redirect2, isNavigation, {
    submission,
    fetcherSubmission,
    preventScrollReset,
    replace: replace2
  } = {}) {
    if (redirect2.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location = redirect2.response.headers.get("Location");
    invariant(location, "Expected a Location header on the redirect Response");
    location = normalizeRedirectLocation(
      location,
      new URL(request.url),
      basename
    );
    let redirectLocation = createLocation(state.location, location, {
      _isRedirect: true
    });
    if (isBrowser2) {
      let isDocumentReload = false;
      if (redirect2.response.headers.has("X-Remix-Reload-Document")) {
        isDocumentReload = true;
      } else if (ABSOLUTE_URL_REGEX.test(location)) {
        const url = init.history.createURL(location);
        isDocumentReload = // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace2) {
          routerWindow.location.replace(location);
        } else {
          routerWindow.location.assign(location);
        }
        return;
      }
    }
    pendingNavigationController = null;
    let redirectNavigationType = replace2 === true || redirect2.response.headers.has("X-Remix-Replace") ? "REPLACE" /* Replace */ : "PUSH" /* Push */;
    let { formMethod, formAction, formEncType } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect2.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectNavigationType, redirectLocation, {
        submission: {
          ...activeSubmission,
          formAction: location
        },
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    } else {
      let overrideNavigation = getLoadingNavigation(
        redirectLocation,
        submission
      );
      await startNavigation(redirectNavigationType, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    }
  }
  async function callDataStrategy(type, request, matchesToLoad, matches, scopedContext, fetcherKey) {
    let results;
    let dataResults = {};
    try {
      results = await callDataStrategyImpl(
        dataStrategyImpl,
        type,
        request,
        matchesToLoad,
        matches,
        fetcherKey,
        manifest,
        mapRouteProperties2,
        scopedContext
      );
    } catch (e) {
      matchesToLoad.forEach((m) => {
        dataResults[m.route.id] = {
          type: "error" /* error */,
          error: e
        };
      });
      return dataResults;
    }
    for (let [routeId, result] of Object.entries(results)) {
      if (isRedirectDataStrategyResult(result)) {
        let response = result.result;
        dataResults[routeId] = {
          type: "redirect" /* redirect */,
          response: normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            routeId,
            matches,
            basename
          )
        };
      } else {
        dataResults[routeId] = await convertDataStrategyResultToDataResult(
          result
        );
      }
    }
    return dataResults;
  }
  async function callLoadersAndMaybeResolveData(matches, matchesToLoad, fetchersToLoad, request, scopedContext) {
    let loaderResultsPromise = callDataStrategy(
      "loader",
      request,
      matchesToLoad,
      matches,
      scopedContext,
      null
    );
    let fetcherResultsPromise = Promise.all(
      fetchersToLoad.map(async (f) => {
        if (f.matches && f.match && f.controller) {
          let results = await callDataStrategy(
            "loader",
            createClientSideRequest(init.history, f.path, f.controller.signal),
            [f.match],
            f.matches,
            scopedContext,
            f.key
          );
          let result = results[f.match.route.id];
          return { [f.key]: result };
        } else {
          return Promise.resolve({
            [f.key]: {
              type: "error" /* error */,
              error: getInternalRouterError(404, {
                pathname: f.path
              })
            }
          });
        }
      })
    );
    let loaderResults = await loaderResultsPromise;
    let fetcherResults = (await fetcherResultsPromise).reduce(
      (acc, r) => Object.assign(acc, r),
      {}
    );
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true;
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.add(key);
      }
      abortFetcher(key);
    });
  }
  function updateFetcherState(key, fetcher, opts = {}) {
    state.fetchers.set(key, fetcher);
    updateState(
      { fetchers: new Map(state.fetchers) },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function setFetcherError(key, routeId, error, opts = {}) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState(
      {
        errors: {
          [boundaryMatch.route.id]: error
        },
        fetchers: new Map(state.fetchers)
      },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function getFetcher(key) {
    activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
    if (fetchersQueuedForDeletion.has(key)) {
      fetchersQueuedForDeletion.delete(key);
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    fetchersQueuedForDeletion.delete(key);
    cancelledFetcherLoads.delete(key);
    state.fetchers.delete(key);
  }
  function queueFetcherForDeletion(key) {
    let count = (activeFetchers.get(key) || 0) - 1;
    if (count <= 0) {
      activeFetchers.delete(key);
      fetchersQueuedForDeletion.add(key);
    } else {
      activeFetchers.set(key, count);
    }
    updateState({ fetchers: new Map(state.fetchers) });
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    if (controller) {
      controller.abort();
      fetchControllers.delete(key);
    }
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, `Expected fetcher: ${key}`);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, `Expected fetcher: ${key}`);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(
      blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked",
      `Invalid blocker state transition: ${blocker.state} -> ${newBlocker.state}`
    );
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({ blockers });
  }
  function shouldBlockNavigation({
    currentLocation,
    nextLocation,
    historyAction
  }) {
    if (blockerFunctions.size === 0) {
      return;
    }
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      return;
    }
    if (blockerFunction({ currentLocation, nextLocation, historyAction })) {
      return blockerKey;
    }
  }
  function handleNavigational404(pathname) {
    let error = getInternalRouterError(404, { pathname });
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let { matches, route } = getShortCircuitMatches(routesToUse);
    return { notFoundMatches: matches, route, error };
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions2 = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey2 = getKey || null;
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({ restoreScrollPosition: y });
      }
    }
    return () => {
      savedScrollPositions2 = null;
      getScrollPosition = null;
      getScrollRestorationKey2 = null;
    };
  }
  function getScrollKey(location, matches) {
    if (getScrollRestorationKey2) {
      let key = getScrollRestorationKey2(
        location,
        matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData))
      );
      return key || location.key;
    }
    return location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions2 && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions2[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions2) {
      let key = getScrollKey(location, matches);
      let y = savedScrollPositions2[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function checkFogOfWar(matches, routesToUse, pathname) {
    if (init.patchRoutesOnNavigation) {
      if (!matches) {
        let fogMatches = matchRoutesImpl(
          routesToUse,
          pathname,
          basename,
          true
        );
        return { active: true, matches: fogMatches || [] };
      } else {
        if (Object.keys(matches[0].params).length > 0) {
          let partialMatches = matchRoutesImpl(
            routesToUse,
            pathname,
            basename,
            true
          );
          return { active: true, matches: partialMatches };
        }
      }
    }
    return { active: false, matches: null };
  }
  async function discoverRoutes(matches, pathname, signal, fetcherKey) {
    if (!init.patchRoutesOnNavigation) {
      return { type: "success", matches };
    }
    let partialMatches = matches;
    while (true) {
      let isNonHMR = inFlightDataRoutes == null;
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let localManifest = manifest;
      try {
        await init.patchRoutesOnNavigation({
          signal,
          path: pathname,
          matches: partialMatches,
          fetcherKey,
          patch: (routeId, children) => {
            if (signal.aborted) return;
            patchRoutesImpl(
              routeId,
              children,
              routesToUse,
              localManifest,
              mapRouteProperties2
            );
          }
        });
      } catch (e) {
        return { type: "error", error: e, partialMatches };
      } finally {
        if (isNonHMR && !signal.aborted) {
          dataRoutes = [...dataRoutes];
        }
      }
      if (signal.aborted) {
        return { type: "aborted" };
      }
      let newMatches = matchRoutes(routesToUse, pathname, basename);
      if (newMatches) {
        return { type: "success", matches: newMatches };
      }
      let newPartialMatches = matchRoutesImpl(
        routesToUse,
        pathname,
        basename,
        true
      );
      if (!newPartialMatches || partialMatches.length === newPartialMatches.length && partialMatches.every(
        (m, i) => m.route.id === newPartialMatches[i].route.id
      )) {
        return { type: "success", matches: null };
      }
      partialMatches = newPartialMatches;
    }
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(
      newRoutes,
      mapRouteProperties2,
      void 0,
      manifest
    );
  }
  function patchRoutes(routeId, children) {
    let isNonHMR = inFlightDataRoutes == null;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    patchRoutesImpl(
      routeId,
      children,
      routesToUse,
      manifest,
      mapRouteProperties2
    );
    if (isNonHMR) {
      dataRoutes = [...dataRoutes];
      updateState({});
    }
  }
  router = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher: queueFetcherForDeletion,
    dispose,
    getBlocker,
    deleteBlocker,
    patchRoutes,
    _internalFetchControllers: fetchControllers,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  };
  return router;
}
function createStaticHandler(routes, opts) {
  invariant(
    routes.length > 0,
    "You must provide a non-empty routes array to createStaticHandler"
  );
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let mapRouteProperties2 = opts?.mapRouteProperties || defaultMapRouteProperties;
  let dataRoutes = convertRoutesToDataRoutes(
    routes,
    mapRouteProperties2,
    void 0,
    manifest
  );
  async function query(request, {
    requestContext,
    filterMatchesToLoad,
    skipLoaderErrorBubbling,
    skipRevalidation,
    dataStrategy,
    unstable_respond: respond
  } = {}) {
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    requestContext = requestContext != null ? requestContext : new unstable_RouterContextProvider();
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, { method });
      let { matches: methodNotAllowedMatches, route } = getShortCircuitMatches(dataRoutes);
      let staticContext = {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
      return respond ? respond(staticContext) : staticContext;
    } else if (!matches) {
      let error = getInternalRouterError(404, { pathname: location.pathname });
      let { matches: notFoundMatches, route } = getShortCircuitMatches(dataRoutes);
      let staticContext = {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
      return respond ? respond(staticContext) : staticContext;
    }
    if (respond && matches.some(
      (m) => m.route.unstable_middleware || typeof m.route.lazy === "object" && m.route.lazy.unstable_middleware
    )) {
      invariant(
        requestContext instanceof unstable_RouterContextProvider,
        "When using middleware in `staticHandler.query()`, any provided `requestContext` must be an instance of `unstable_RouterContextProvider`"
      );
      try {
        await loadLazyMiddlewareForMatches(
          matches,
          manifest,
          mapRouteProperties2
        );
        let renderedStaticContext;
        let response = await runMiddlewarePipeline(
          {
            request,
            matches,
            params: matches[0].params,
            // If we're calling middleware then it must be enabled so we can cast
            // this to the proper type knowing it's not an `AppLoadContext`
            context: requestContext
          },
          true,
          async () => {
            let result2 = await queryImpl(
              request,
              location,
              matches,
              requestContext,
              dataStrategy || null,
              skipLoaderErrorBubbling === true,
              null,
              filterMatchesToLoad || null,
              skipRevalidation === true
            );
            if (isResponse(result2)) {
              return result2;
            }
            renderedStaticContext = { location, basename, ...result2 };
            let res = await respond(renderedStaticContext);
            return res;
          },
          async (error, routeId) => {
            if (isResponse(error)) {
              return error;
            }
            if (renderedStaticContext) {
              if (routeId in renderedStaticContext.loaderData) {
                renderedStaticContext.loaderData[routeId] = void 0;
              }
              return respond(
                getStaticContextFromError(
                  dataRoutes,
                  renderedStaticContext,
                  error,
                  findNearestBoundary(matches, routeId).route.id
                )
              );
            } else {
              let loaderIdx = matches.findIndex((m) => m.route.loader);
              let boundary = loaderIdx >= 0 ? findNearestBoundary(matches, matches[loaderIdx].route.id) : findNearestBoundary(matches);
              return respond({
                matches,
                location,
                basename,
                loaderData: {},
                actionData: null,
                errors: {
                  [boundary.route.id]: error
                },
                statusCode: isRouteErrorResponse(error) ? error.status : 500,
                actionHeaders: {},
                loaderHeaders: {}
              });
            }
          }
        );
        invariant(isResponse(response), "Expected a response in query()");
        return response;
      } catch (e) {
        if (isResponse(e)) {
          return e;
        }
        throw e;
      }
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      dataStrategy || null,
      skipLoaderErrorBubbling === true,
      null,
      filterMatchesToLoad || null,
      skipRevalidation === true
    );
    if (isResponse(result)) {
      return result;
    }
    return { location, basename, ...result };
  }
  async function queryRoute(request, {
    routeId,
    requestContext,
    dataStrategy,
    unstable_respond: respond
  } = {}) {
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    requestContext = requestContext != null ? requestContext : new unstable_RouterContextProvider();
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, { method });
    } else if (!matches) {
      throw getInternalRouterError(404, { pathname: location.pathname });
    }
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      throw getInternalRouterError(404, { pathname: location.pathname });
    }
    if (respond && matches.some(
      (m) => m.route.unstable_middleware || typeof m.route.lazy === "object" && m.route.lazy.unstable_middleware
    )) {
      invariant(
        requestContext instanceof unstable_RouterContextProvider,
        "When using middleware in `staticHandler.queryRoute()`, any provided `requestContext` must be an instance of `unstable_RouterContextProvider`"
      );
      await loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2);
      let response = await runMiddlewarePipeline(
        {
          request,
          matches,
          params: matches[0].params,
          // If we're calling middleware then it must be enabled so we can cast
          // this to the proper type knowing it's not an `AppLoadContext`
          context: requestContext
        },
        true,
        async () => {
          let result2 = await queryImpl(
            request,
            location,
            matches,
            requestContext,
            dataStrategy || null,
            false,
            match,
            null,
            false
          );
          if (isResponse(result2)) {
            return respond(result2);
          }
          let error2 = result2.errors ? Object.values(result2.errors)[0] : void 0;
          if (error2 !== void 0) {
            throw error2;
          }
          let value = result2.actionData ? Object.values(result2.actionData)[0] : Object.values(result2.loaderData)[0];
          return typeof value === "string" ? new Response(value) : Response.json(value);
        },
        (error2) => {
          if (isResponse(error2)) {
            return respond(error2);
          }
          return new Response(String(error2), {
            status: 500,
            statusText: "Unexpected Server Error"
          });
        }
      );
      return response;
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      dataStrategy || null,
      false,
      match,
      null,
      false
    );
    if (isResponse(result)) {
      return result;
    }
    let error = result.errors ? Object.values(result.errors)[0] : void 0;
    if (error !== void 0) {
      throw error;
    }
    if (result.actionData) {
      return Object.values(result.actionData)[0];
    }
    if (result.loaderData) {
      return Object.values(result.loaderData)[0];
    }
    return void 0;
  }
  async function queryImpl(request, location, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, filterMatchesToLoad, skipRevalidation) {
    invariant(
      request.signal,
      "query()/queryRoute() requests must contain an AbortController signal"
    );
    try {
      if (isMutationMethod(request.method)) {
        let result2 = await submit(
          request,
          matches,
          routeMatch || getTargetMatch(matches, location),
          requestContext,
          dataStrategy,
          skipLoaderErrorBubbling,
          routeMatch != null,
          filterMatchesToLoad,
          skipRevalidation
        );
        return result2;
      }
      let result = await loadRouteData(
        request,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        routeMatch,
        filterMatchesToLoad
      );
      return isResponse(result) ? result : {
        ...result,
        actionData: null,
        actionHeaders: {}
      };
    } catch (e) {
      if (isDataStrategyResult(e) && isResponse(e.result)) {
        if (e.type === "error" /* error */) {
          throw e.result;
        }
        return e.result;
      }
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, dataStrategy, skipLoaderErrorBubbling, isRouteRequest, filterMatchesToLoad, skipRevalidation) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: "error" /* error */,
        error
      };
    } else {
      let results = await callDataStrategy(
        "action",
        request,
        [actionMatch],
        matches,
        isRouteRequest,
        requestContext,
        dataStrategy
      );
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest);
      }
    }
    if (isRedirectResult(result)) {
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isRouteRequest) {
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: { [actionMatch.route.id]: result.data },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }
    if (skipRevalidation) {
      if (isErrorResult(result)) {
        let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
        return {
          statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
          actionData: null,
          actionHeaders: {
            ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
          },
          matches,
          loaderData: {},
          errors: {
            [boundaryMatch.route.id]: result.error
          },
          loaderHeaders: {}
        };
      } else {
        return {
          actionData: {
            [actionMatch.route.id]: result.data
          },
          actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {},
          matches,
          loaderData: {},
          errors: null,
          statusCode: result.statusCode || 200,
          loaderHeaders: {}
        };
      }
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let handlerContext2 = await loadRouteData(
        loaderRequest,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        null,
        filterMatchesToLoad,
        [boundaryMatch.route.id, result]
      );
      return {
        ...handlerContext2,
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: {
          ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
        }
      };
    }
    let handlerContext = await loadRouteData(
      loaderRequest,
      matches,
      requestContext,
      dataStrategy,
      skipLoaderErrorBubbling,
      null,
      filterMatchesToLoad
    );
    return {
      ...handlerContext,
      actionData: {
        [actionMatch.route.id]: result.data
      },
      // action status codes take precedence over loader status codes
      ...result.statusCode ? { statusCode: result.statusCode } : {},
      actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {}
    };
  }
  async function loadRouteData(request, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, filterMatchesToLoad, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !routeMatch?.route.loader && !routeMatch?.route.lazy) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch?.route.id
      });
    }
    let requestMatches = routeMatch ? [routeMatch] : pendingActionResult && isErrorResult(pendingActionResult[1]) ? getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]) : matches;
    let matchesToLoad = requestMatches.filter(
      (m) => (m.route.loader || m.route.lazy) && (!filterMatchesToLoad || filterMatchesToLoad(m))
    );
    if (matchesToLoad.length === 0) {
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce(
          (acc, m) => Object.assign(acc, { [m.route.id]: null }),
          {}
        ),
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {}
      };
    }
    let results = await callDataStrategy(
      "loader",
      request,
      matchesToLoad,
      matches,
      isRouteRequest,
      requestContext,
      dataStrategy
    );
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest);
    }
    let handlerContext = processRouteLoaderData(
      matches,
      results,
      pendingActionResult,
      true,
      skipLoaderErrorBubbling
    );
    let executedLoaders = new Set(
      matchesToLoad.map((match) => match.route.id)
    );
    matches.forEach((match) => {
      if (!executedLoaders.has(match.route.id)) {
        handlerContext.loaderData[match.route.id] = null;
      }
    });
    return {
      ...handlerContext,
      matches
    };
  }
  async function callDataStrategy(type, request, matchesToLoad, matches, isRouteRequest, requestContext, dataStrategy) {
    let results = await callDataStrategyImpl(
      dataStrategy || defaultDataStrategy,
      type,
      request,
      matchesToLoad,
      matches,
      null,
      manifest,
      mapRouteProperties2,
      requestContext
    );
    let dataResults = {};
    await Promise.all(
      matches.map(async (match) => {
        if (!(match.route.id in results)) {
          return;
        }
        let result = results[match.route.id];
        if (isRedirectDataStrategyResult(result)) {
          let response = result.result;
          throw normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            match.route.id,
            matches,
            basename
          );
        }
        if (isResponse(result.result) && isRouteRequest) {
          throw result;
        }
        dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result);
      })
    );
    return dataResults;
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes, handlerContext, error, boundaryId) {
  let errorBoundaryId = boundaryId || handlerContext._deepestRenderedBoundaryId || routes[0].id;
  return {
    ...handlerContext,
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [errorBoundaryId]: error
    }
  };
}
function throwStaticHandlerAbortedError(request, isRouteRequest) {
  if (request.signal.reason !== void 0) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(
    `${method}() call aborted without an \`AbortSignal.reason\`: ${request.method} ${request.url}`
  );
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location, matches, basename, to, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(
    to ? to : ".",
    getResolveToMatches(contextualMatches),
    stripBasename(location.pathname, basename) || location.pathname,
    relative === "path"
  );
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch) {
    let nakedIndex = hasNakedIndexQuery(path.search);
    if (activeRouteMatch.route.index && !nakedIndex) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } else if (!activeRouteMatch.route.index && nakedIndex) {
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function normalizeNavigateOptions(isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts)) {
    return { path };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, { method: opts.formMethod })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, { type: "invalid-body" })
  });
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = rawFormMethod.toUpperCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce(
          (acc, [name, value]) => `${acc}${name}=${value}
`,
          ""
        )
      ) : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json,
            text: void 0
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(
    typeof FormData === "function",
    "FormData is not available in this environment"
  );
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod)) {
    return { path, submission };
  }
  let parsedPath = parsePath(path);
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = `?${searchParams}`;
  return { path: createPath(parsedPath), submission };
}
function getLoaderMatchesUntilBoundary(matches, boundaryId, includeBoundary = false) {
  let index = matches.findIndex((m) => m.route.id === boundaryId);
  if (index >= 0) {
    return matches.slice(0, includeBoundary ? index + 1 : index);
  }
  return matches;
}
function getMatchesToLoad(history, state, matches, submission, location, initialHydration, isRevalidationRequired, cancelledFetcherLoads, fetchersQueuedForDeletion, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  let boundaryMatches = matches;
  if (initialHydration && state.errors) {
    boundaryMatches = getLoaderMatchesUntilBoundary(
      matches,
      Object.keys(state.errors)[0],
      true
    );
  } else if (pendingActionResult && isErrorResult(pendingActionResult[1])) {
    boundaryMatches = getLoaderMatchesUntilBoundary(
      matches,
      pendingActionResult[0]
    );
  }
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
  let shouldSkipRevalidation = actionStatus && actionStatus >= 400;
  let navigationMatches = boundaryMatches.filter((match, index) => {
    let { route } = match;
    if (route.lazy) {
      return true;
    }
    if (route.loader == null) {
      return false;
    }
    if (initialHydration) {
      return shouldLoadRouteOnHydration(route, state.loaderData, state.errors);
    }
    if (isNewLoader(state.loaderData, state.matches[index], match)) {
      return true;
    }
    let currentRouteMatch = state.matches[index];
    let nextRouteMatch = match;
    return shouldRevalidateLoader(match, {
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params,
      ...submission,
      actionResult,
      actionStatus,
      defaultShouldRevalidate: shouldSkipRevalidation ? false : (
        // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
        isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
        currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
      )
    });
  });
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    if (initialHydration || !matches.some((m) => m.route.id === f.routeId) || fetchersQueuedForDeletion.has(key)) {
      return;
    }
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    let fetcher = state.fetchers.get(key);
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    let shouldRevalidate = false;
    if (fetchRedirectIds.has(key)) {
      shouldRevalidate = false;
    } else if (cancelledFetcherLoads.has(key)) {
      cancelledFetcherLoads.delete(key);
      shouldRevalidate = true;
    } else if (fetcher && fetcher.state !== "idle" && fetcher.data === void 0) {
      shouldRevalidate = isRevalidationRequired;
    } else {
      shouldRevalidate = shouldRevalidateLoader(fetcherMatch, {
        currentUrl,
        currentParams: state.matches[state.matches.length - 1].params,
        nextUrl,
        nextParams: matches[matches.length - 1].params,
        ...submission,
        actionResult,
        actionStatus,
        defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
      });
    }
    if (shouldRevalidate) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
    }
  });
  return [navigationMatches, revalidatingFetchers];
}
function shouldLoadRouteOnHydration(route, loaderData, errors) {
  if (route.lazy) {
    return true;
  }
  if (!route.loader) {
    return false;
  }
  let hasData = loaderData != null && loaderData[route.id] !== void 0;
  let hasError = errors != null && errors[route.id] !== void 0;
  if (!hasData && hasError) {
    return false;
  }
  if (typeof route.loader === "function" && route.loader.hydrate === true) {
    return true;
  }
  return !hasData && !hasError;
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match.route.id !== currentMatch.route.id
  );
  let isMissingData = !currentLoaderData.hasOwnProperty(match.route.id);
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
function patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties2) {
  let childrenToPatch;
  if (routeId) {
    let route = manifest[routeId];
    invariant(
      route,
      `No route found to patch children into: routeId = ${routeId}`
    );
    if (!route.children) {
      route.children = [];
    }
    childrenToPatch = route.children;
  } else {
    childrenToPatch = routesToUse;
  }
  let uniqueChildren = children.filter(
    (newRoute) => !childrenToPatch.some(
      (existingRoute) => isSameRoute(newRoute, existingRoute)
    )
  );
  let newRoutes = convertRoutesToDataRoutes(
    uniqueChildren,
    mapRouteProperties2,
    [routeId || "_", "patch", String(childrenToPatch?.length || "0")],
    manifest
  );
  childrenToPatch.push(...newRoutes);
}
function isSameRoute(newRoute, existingRoute) {
  if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) {
    return true;
  }
  if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) {
    return false;
  }
  if ((!newRoute.children || newRoute.children.length === 0) && (!existingRoute.children || existingRoute.children.length === 0)) {
    return true;
  }
  return newRoute.children.every(
    (aChild, i) => existingRoute.children?.some((bChild) => isSameRoute(aChild, bChild))
  );
}
var lazyRoutePropertyCache = /* @__PURE__ */ new WeakMap();
var loadLazyRouteProperty = ({
  key,
  route,
  manifest,
  mapRouteProperties: mapRouteProperties2
}) => {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!routeToUpdate.lazy || typeof routeToUpdate.lazy !== "object") {
    return;
  }
  let lazyFn = routeToUpdate.lazy[key];
  if (!lazyFn) {
    return;
  }
  let cache = lazyRoutePropertyCache.get(routeToUpdate);
  if (!cache) {
    cache = {};
    lazyRoutePropertyCache.set(routeToUpdate, cache);
  }
  let cachedPromise = cache[key];
  if (cachedPromise) {
    return cachedPromise;
  }
  let propertyPromise = (async () => {
    let isUnsupported = isUnsupportedLazyRouteObjectKey(key);
    let staticRouteValue = routeToUpdate[key];
    let isStaticallyDefined = staticRouteValue !== void 0 && key !== "hasErrorBoundary";
    if (isUnsupported) {
      warning(
        !isUnsupported,
        "Route property " + key + " is not a supported lazy route property. This property will be ignored."
      );
      cache[key] = Promise.resolve();
    } else if (isStaticallyDefined) {
      warning(
        false,
        `Route "${routeToUpdate.id}" has a static property "${key}" defined. The lazy property will be ignored.`
      );
    } else {
      let value = await lazyFn();
      if (value != null) {
        Object.assign(routeToUpdate, { [key]: value });
        Object.assign(routeToUpdate, mapRouteProperties2(routeToUpdate));
      }
    }
    if (typeof routeToUpdate.lazy === "object") {
      routeToUpdate.lazy[key] = void 0;
      if (Object.values(routeToUpdate.lazy).every((value) => value === void 0)) {
        routeToUpdate.lazy = void 0;
      }
    }
  })();
  cache[key] = propertyPromise;
  return propertyPromise;
};
var lazyRouteFunctionCache = /* @__PURE__ */ new WeakMap();
function loadLazyRoute(route, type, manifest, mapRouteProperties2) {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!route.lazy) {
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  }
  if (typeof route.lazy === "function") {
    let cachedPromise = lazyRouteFunctionCache.get(routeToUpdate);
    if (cachedPromise) {
      return {
        lazyRoutePromise: cachedPromise,
        lazyHandlerPromise: cachedPromise
      };
    }
    let lazyRoutePromise2 = (async () => {
      invariant(
        typeof route.lazy === "function",
        "No lazy route function found"
      );
      let lazyRoute = await route.lazy();
      let routeUpdates = {};
      for (let lazyRouteProperty in lazyRoute) {
        let lazyValue = lazyRoute[lazyRouteProperty];
        if (lazyValue === void 0) {
          continue;
        }
        let isUnsupported = isUnsupportedLazyRouteFunctionKey(lazyRouteProperty);
        let staticRouteValue = routeToUpdate[lazyRouteProperty];
        let isStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        lazyRouteProperty !== "hasErrorBoundary";
        if (isUnsupported) {
          warning(
            !isUnsupported,
            "Route property " + lazyRouteProperty + " is not a supported property to be returned from a lazy route function. This property will be ignored."
          );
        } else if (isStaticallyDefined) {
          warning(
            !isStaticallyDefined,
            `Route "${routeToUpdate.id}" has a static property "${lazyRouteProperty}" defined but its lazy function is also returning a value for this property. The lazy route property "${lazyRouteProperty}" will be ignored.`
          );
        } else {
          routeUpdates[lazyRouteProperty] = lazyValue;
        }
      }
      Object.assign(routeToUpdate, routeUpdates);
      Object.assign(routeToUpdate, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...mapRouteProperties2(routeToUpdate),
        lazy: void 0
      });
    })();
    lazyRouteFunctionCache.set(routeToUpdate, lazyRoutePromise2);
    return {
      lazyRoutePromise: lazyRoutePromise2,
      lazyHandlerPromise: lazyRoutePromise2
    };
  }
  let lazyKeys = Object.keys(route.lazy);
  let lazyPropertyPromises = [];
  let lazyHandlerPromise = void 0;
  for (let key of lazyKeys) {
    let promise = loadLazyRouteProperty({
      key,
      route,
      manifest,
      mapRouteProperties: mapRouteProperties2
    });
    if (promise) {
      lazyPropertyPromises.push(promise);
      if (key === type) {
        lazyHandlerPromise = promise;
      }
    }
  }
  let lazyRoutePromise = Promise.all(lazyPropertyPromises).then(() => {
  });
  return {
    lazyRoutePromise,
    lazyHandlerPromise
  };
}
function isNonNullable(value) {
  return value !== void 0;
}
function loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2) {
  let promises = matches.map(({ route }) => {
    if (typeof route.lazy !== "object" || !route.lazy.unstable_middleware) {
      return void 0;
    }
    return loadLazyRouteProperty({
      key: "unstable_middleware",
      route,
      manifest,
      mapRouteProperties: mapRouteProperties2
    });
  }).filter(isNonNullable);
  return promises.length > 0 ? Promise.all(promises) : void 0;
}
async function defaultDataStrategy(args) {
  let matchesToLoad = args.matches.filter((m) => m.shouldLoad);
  let keyedResults = {};
  let results = await Promise.all(matchesToLoad.map((m) => m.resolve()));
  results.forEach((result, i) => {
    keyedResults[matchesToLoad[i].route.id] = result;
  });
  return keyedResults;
}
async function defaultDataStrategyWithMiddleware(args) {
  if (!args.matches.some((m) => m.route.unstable_middleware)) {
    return defaultDataStrategy(args);
  }
  return runMiddlewarePipeline(
    args,
    false,
    () => defaultDataStrategy(args),
    (error, routeId) => ({ [routeId]: { type: "error", result: error } })
  );
}
async function runMiddlewarePipeline(args, propagateResult, handler, errorHandler) {
  let { matches, request, params, context } = args;
  let middlewareState = {
    handlerResult: void 0
  };
  try {
    let tuples = matches.flatMap(
      (m) => m.route.unstable_middleware ? m.route.unstable_middleware.map((fn) => [m.route.id, fn]) : []
    );
    let result = await callRouteMiddleware(
      { request, params, context },
      tuples,
      propagateResult,
      middlewareState,
      handler
    );
    return propagateResult ? result : middlewareState.handlerResult;
  } catch (e) {
    if (!middlewareState.middlewareError) {
      throw e;
    }
    let result = await errorHandler(
      middlewareState.middlewareError.error,
      middlewareState.middlewareError.routeId
    );
    if (propagateResult || !middlewareState.handlerResult) {
      return result;
    }
    return Object.assign(middlewareState.handlerResult, result);
  }
}
async function callRouteMiddleware(args, middlewares, propagateResult, middlewareState, handler, idx = 0) {
  let { request } = args;
  if (request.signal.aborted) {
    if (request.signal.reason) {
      throw request.signal.reason;
    }
    throw new Error(
      `Request aborted without an \`AbortSignal.reason\`: ${request.method} ${request.url}`
    );
  }
  let tuple = middlewares[idx];
  if (!tuple) {
    middlewareState.handlerResult = await handler();
    return middlewareState.handlerResult;
  }
  let [routeId, middleware] = tuple;
  let nextCalled = false;
  let nextResult = void 0;
  let next = async () => {
    if (nextCalled) {
      throw new Error("You may only call `next()` once per middleware");
    }
    nextCalled = true;
    let result = await callRouteMiddleware(
      args,
      middlewares,
      propagateResult,
      middlewareState,
      handler,
      idx + 1
    );
    if (propagateResult) {
      nextResult = result;
      return nextResult;
    }
  };
  try {
    let result = await middleware(
      {
        request: args.request,
        params: args.params,
        context: args.context
      },
      next
    );
    if (nextCalled) {
      if (result === void 0) {
        return nextResult;
      } else {
        return result;
      }
    } else {
      return next();
    }
  } catch (error) {
    if (!middlewareState.middlewareError) {
      middlewareState.middlewareError = { routeId, error };
    } else if (middlewareState.middlewareError.error !== error) {
      middlewareState.middlewareError = { routeId, error };
    }
    throw error;
  }
}
async function callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties2, scopedContext) {
  let loadMiddlewarePromise = loadLazyMiddlewareForMatches(
    matches,
    manifest,
    mapRouteProperties2
  );
  let lazyRoutePromises = matches.map(
    (m) => loadLazyRoute(m.route, type, manifest, mapRouteProperties2)
  );
  if (loadMiddlewarePromise) {
    await loadMiddlewarePromise;
  }
  let dsMatches = matches.map((match, i) => {
    let { lazyRoutePromise, lazyHandlerPromise } = lazyRoutePromises[i];
    let shouldLoad = matchesToLoad.some((m) => m.route.id === match.route.id);
    let resolve = async (handlerOverride) => {
      if (handlerOverride && request.method === "GET" && (match.route.lazy || match.route.loader)) {
        shouldLoad = true;
      }
      return shouldLoad ? callLoaderOrAction({
        type,
        request,
        match,
        lazyHandlerPromise,
        lazyRoutePromise,
        handlerOverride,
        scopedContext
      }) : Promise.resolve({ type: "data" /* data */, result: void 0 });
    };
    return {
      ...match,
      shouldLoad,
      resolve
    };
  });
  let results = await dataStrategyImpl({
    matches: dsMatches,
    request,
    params: matches[0].params,
    fetcherKey,
    context: scopedContext
  });
  let allLazyRoutePromises = lazyRoutePromises.flatMap(
    (promiseMap) => Object.values(promiseMap).filter(isNonNullable)
  );
  try {
    await Promise.all(allLazyRoutePromises);
  } catch (e) {
  }
  return results;
}
async function callLoaderOrAction({
  type,
  request,
  match,
  lazyHandlerPromise,
  lazyRoutePromise,
  handlerOverride,
  scopedContext
}) {
  let result;
  let onReject;
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(
          new Error(
            `You cannot call the handler for a route which defines a boolean "${type}" [routeId: ${match.route.id}]`
          )
        );
      }
      return handler(
        {
          request,
          params: match.params,
          context: scopedContext
        },
        ...ctx !== void 0 ? [ctx] : []
      );
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler());
        return { type: "data", result: val };
      } catch (e) {
        return { type: "error", result: e };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = match.route[type];
    if (lazyHandlerPromise || lazyRoutePromise) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          // Ensure all lazy route promises are resolved before continuing
          lazyHandlerPromise,
          lazyRoutePromise
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await lazyHandlerPromise;
        handler = match.route[type];
        if (handler) {
          [result] = await Promise.all([runHandler(handler), lazyRoutePromise]);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return { type: "data" /* data */, result: void 0 };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
  } catch (e) {
    return { type: "error" /* error */, result: e };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  let { result, type } = dataStrategyResult;
  if (isResponse(result)) {
    let data2;
    try {
      let contentType = result.headers.get("Content-Type");
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        if (result.body == null) {
          data2 = null;
        } else {
          data2 = await result.json();
        }
      } else {
        data2 = await result.text();
      }
    } catch (e) {
      return { type: "error" /* error */, error: e };
    }
    if (type === "error" /* error */) {
      return {
        type: "error" /* error */,
        error: new ErrorResponseImpl(result.status, result.statusText, data2),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: "data" /* data */,
      data: data2,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === "error" /* error */) {
    if (isDataWithResponseInit(result)) {
      if (result.data instanceof Error) {
        return {
          type: "error" /* error */,
          error: result.data,
          statusCode: result.init?.status,
          headers: result.init?.headers ? new Headers(result.init.headers) : void 0
        };
      }
      return {
        type: "error" /* error */,
        error: new ErrorResponseImpl(
          result.init?.status || 500,
          void 0,
          result.data
        ),
        statusCode: isRouteErrorResponse(result) ? result.status : void 0,
        headers: result.init?.headers ? new Headers(result.init.headers) : void 0
      };
    }
    return {
      type: "error" /* error */,
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : void 0
    };
  }
  if (isDataWithResponseInit(result)) {
    return {
      type: "data" /* data */,
      data: result.data,
      statusCode: result.init?.status,
      headers: result.init?.headers ? new Headers(result.init.headers) : void 0
    };
  }
  return { type: "data" /* data */, data: result };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename) {
  let location = response.headers.get("Location");
  invariant(
    location,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  );
  if (!ABSOLUTE_URL_REGEX.test(location)) {
    let trimmedMatches = matches.slice(
      0,
      matches.findIndex((m) => m.route.id === routeId) + 1
    );
    location = normalizeTo(
      new URL(request.url),
      trimmedMatches,
      basename,
      location
    );
    response.headers.set("Location", location);
  }
  return response;
}
function normalizeRedirectLocation(location, currentUrl, basename) {
  if (ABSOLUTE_URL_REGEX.test(location)) {
    let normalizedLocation = location;
    let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return url.pathname + url.search + url.hash;
    }
  }
  return location;
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = { signal };
  if (submission && isMutationMethod(submission.formMethod)) {
    let { formMethod, formEncType } = submission;
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({ "Content-Type": formEncType });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, isStaticHandler = false, skipLoaderErrorBubbling = false) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  matches.forEach((match) => {
    if (!(match.route.id in results)) {
      return;
    }
    let id = match.route.id;
    let result = results[id];
    invariant(
      !isRedirectResult(result),
      "Cannot handle redirect results in processLoaderData"
    );
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      if (!isStaticHandler) {
        loaderData[id] = ResetLoaderDataSymbol;
      }
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      loaderData[id] = result.data;
      if (result.statusCode && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = { [pendingActionResult[0]]: pendingError };
    loaderData[pendingActionResult[0]] = void 0;
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults) {
  let { loaderData, errors } = processRouteLoaderData(
    matches,
    results,
    pendingActionResult
  );
  revalidatingFetchers.forEach((rf) => {
    let { key, match, controller } = rf;
    let result = fetcherResults[key];
    invariant(result, "Did not find corresponding fetcher result");
    if (controller && controller.signal.aborted) {
      return;
    } else if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match?.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = {
          ...errors,
          [boundaryMatch.route.id]: result.error
        };
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      state.fetchers.set(key, doneFetcher);
    }
  });
  return { loaderData, errors };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = Object.entries(newLoaderData).filter(([, v]) => v !== ResetLoaderDataSymbol).reduce((merged, [k, v]) => {
    merged[k] = v;
    return merged;
  }, {});
  for (let match of matches) {
    let id = match.route.id;
    if (!newLoaderData.hasOwnProperty(id) && loaderData.hasOwnProperty(id) && match.route.loader) {
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors && errors.hasOwnProperty(id)) {
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  let route = routes.length === 1 ? routes[0] : routes.find((r) => r.index || !r.path || r.path === "/") || {
    id: `__shim-error-route__`
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route
      }
    ],
    route
  };
}
function getInternalRouterError(status, {
  pathname,
  routeId,
  method,
  type,
  message
} = {}) {
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method} request to "${pathname}" but did not provide a \`loader\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = `Route "${routeId}" does not match URL "${pathname}"`;
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = `No route matches URL "${pathname}"`;
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method.toUpperCase()} request to "${pathname}" but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (method) {
      errorMessage = `Invalid request method "${method.toUpperCase()}"`;
    }
  }
  return new ErrorResponseImpl(
    status || 500,
    statusText,
    new Error(errorMessage),
    true
  );
}
function findRedirect(results) {
  let entries = Object.entries(results);
  for (let i = entries.length - 1; i >= 0; i--) {
    let [key, result] = entries[i];
    if (isRedirectResult(result)) {
      return { key, result };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath({ ...parsedPath, hash: "" });
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    return true;
  } else if (b.hash !== "") {
    return true;
  }
  return false;
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === "data" /* data */ || result.type === "error" /* error */);
}
function isRedirectDataStrategyResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isErrorResult(result) {
  return result.type === "error" /* error */;
}
function isRedirectResult(result) {
  return (result && result.type) === "redirect" /* redirect */;
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(result) {
  return isResponse(result) && isRedirectStatusCode(result.status) && result.headers.has("Location");
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toUpperCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toUpperCase());
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let { formMethod, formAction, formEncType, text, formData, json } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: void 0,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: void 0,
      text: void 0
    };
  } else if (json !== void 0) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json,
      text: void 0
    };
  }
}
function getLoadingNavigation(location, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    return navigation;
  }
}
function getSubmittingNavigation(location, submission) {
  let navigation = {
    state: "submitting",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data2) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data: data2
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: data2
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
  return fetcher;
}
function getDoneFetcher(data2) {
  let fetcher = {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: data2
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(
      TRANSITIONS_STORAGE_KEY
    );
    if (sessionPositions) {
      let json = JSON.parse(sessionPositions);
      for (let [k, v] of Object.entries(json || {})) {
        if (v && Array.isArray(v)) {
          transitions.set(k, new Set(v || []));
        }
      }
    }
  } catch (e) {
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json = {};
    for (let [k, v] of transitions) {
      json[k] = [...v];
    }
    try {
      _window.sessionStorage.setItem(
        TRANSITIONS_STORAGE_KEY,
        JSON.stringify(json)
      );
    } catch (error) {
      warning(
        false,
        `Failed to save applied view transitions in sessionStorage (${error}).`
      );
    }
  }
}
function createDeferred() {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = async (val) => {
      res(val);
      try {
        await promise;
      } catch (e) {
      }
    };
    reject = async (error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {
      }
    };
  });
  return {
    promise,
    //@ts-ignore
    resolve,
    //@ts-ignore
    reject
  };
}

// lib/components.tsx


// lib/context.ts

var DataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var ViewTransitionContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
RouteErrorContext.displayName = "RouteError";

// lib/hooks.tsx

var ENABLE_DEV_WARNINGS = true;
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator: navigator2 } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).location;
}
function useNavigationType() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).navigationType;
}
function useMatch(pattern) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useMatch() may be used only in the context of a <Router> component.`
  );
  let { pathname } = useLocation();
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => matchPath(pattern, decodePath(pathname)),
    [pathname, pattern]
  );
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext).static;
  if (!isStatic) {
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  let { basename, navigator: navigator2 } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator2.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator2.replace : navigator2.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator2,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
var OutletContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
function useOutletContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext).outlet;
  if (outlet) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(OutletContext.Provider, { value: context }, outlet);
  }
  return outlet;
}
function useParams() {
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator: navigator2, static: isStatic } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let { matches: parentMatches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  if (ENABLE_DEV_WARNINGS) {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    invariant(
      parentPathnameBase === "/" || parsedLocationArg.pathname?.startsWith(parentPathnameBase),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
    );
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = !isStatic && dataRouterState && dataRouterState.matches && dataRouterState.matches.length > 0 ? dataRouterState.matches : matchRoutes(routes, { pathname: remainingPathname });
  if (ENABLE_DEV_WARNINGS) {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterState,
    future
  );
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      LocationContext.Provider,
      {
        value: {
          location: {
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: "default",
            ...location
          },
          navigationType: "POP" /* Pop */
        }
      },
      renderedMatches
    );
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  if (ENABLE_DEV_WARNINGS) {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error(
      "React Router caught the following error during render",
      error,
      errorInfo
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      RouteErrorContext.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterState = null, future = null) {
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState?.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && errors?.[m.route.id] !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          warningOnce(
            "route-fallback",
            false,
            "No `HydrateFallback` element provided to render during initial hydration"
          );
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        RenderedRoute,
        {
          match,
          routeContext: {
            outlet,
            matches: matches2,
            isDataRoute: dataRouterState != null
          },
          children
        }
      );
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      RenderErrorBoundary,
      {
        location: dataRouterState.location,
        revalidation: dataRouterState.revalidation,
        component: errorElement,
        error,
        children: getChildren(),
        routeContext: { outlet: null, matches: matches2, isDataRoute: true }
      }
    ) : getChildren();
  }, null);
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId("useRouteId" /* UseRouteId */);
}
function useNavigation() {
  let state = useDataRouterState("useNavigation" /* UseNavigation */);
  return state.navigation;
}
function useRevalidator() {
  let dataRouterContext = useDataRouterContext("useRevalidator" /* UseRevalidator */);
  let state = useDataRouterState("useRevalidator" /* UseRevalidator */);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      async revalidate() {
        await dataRouterContext.router.revalidate();
      },
      state: state.revalidation
    }),
    [dataRouterContext.router, state.revalidation]
  );
}
function useMatches() {
  let { matches, loaderData } = useDataRouterState(
    "useMatches" /* UseMatches */
  );
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)),
    [matches, loaderData]
  );
}
function useLoaderData() {
  let state = useDataRouterState("useLoaderData" /* UseLoaderData */);
  let routeId = useCurrentRouteId("useLoaderData" /* UseLoaderData */);
  return state.loaderData[routeId];
}
function useRouteLoaderData(routeId) {
  let state = useDataRouterState("useRouteLoaderData" /* UseRouteLoaderData */);
  return state.loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState("useActionData" /* UseActionData */);
  let routeId = useCurrentRouteId("useLoaderData" /* UseLoaderData */);
  return state.actionData ? state.actionData[routeId] : void 0;
}
function useRouteError() {
  let error = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteErrorContext);
  let state = useDataRouterState("useRouteError" /* UseRouteError */);
  let routeId = useCurrentRouteId("useRouteError" /* UseRouteError */);
  if (error !== void 0) {
    return error;
  }
  return state.errors?.[routeId];
}
function useAsyncValue() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value?._data;
}
function useAsyncError() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value?._error;
}
var blockerId = 0;
function useBlocker(shouldBlock) {
  let { router, basename } = useDataRouterContext("useBlocker" /* UseBlocker */);
  let state = useDataRouterState("useBlocker" /* UseBlocker */);
  let [blockerKey, setBlockerKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState("");
  let blockerFunction = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (arg) => {
      if (typeof shouldBlock !== "function") {
        return !!shouldBlock;
      }
      if (basename === "/") {
        return shouldBlock(arg);
      }
      let { currentLocation, nextLocation, historyAction } = arg;
      return shouldBlock({
        currentLocation: {
          ...currentLocation,
          pathname: stripBasename(currentLocation.pathname, basename) || currentLocation.pathname
        },
        nextLocation: {
          ...nextLocation,
          pathname: stripBasename(nextLocation.pathname, basename) || nextLocation.pathname
        },
        historyAction
      });
    },
    [basename, shouldBlock]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let key = String(++blockerId);
    setBlockerKey(key);
    return () => router.deleteBlocker(key);
  }, [router]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blockerKey !== "") {
      router.getBlocker(blockerKey, blockerFunction);
    }
  }, [router, blockerKey, blockerFunction]);
  return blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : IDLE_BLOCKER;
}
function useNavigateStable() {
  let { router } = useDataRouterContext("useNavigate" /* UseNavigateStable */);
  let id = useCurrentRouteId("useNavigate" /* UseNavigateStable */);
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}

// lib/server-runtime/warnings.ts
var alreadyWarned2 = {};
function warnOnce(condition, message) {
  if (!condition && !alreadyWarned2[message]) {
    alreadyWarned2[message] = true;
    console.warn(message);
  }
}

// lib/components.tsx
var ENABLE_DEV_WARNINGS2 = true;
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.hasErrorBoundary || route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    if (ENABLE_DEV_WARNINGS2) {
      if (route.element) {
        warning(
          false,
          "You should not include both `Component` and `element` on your route - `Component` will be used."
        );
      }
    }
    Object.assign(updates, {
      element: react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    if (ENABLE_DEV_WARNINGS2) {
      if (route.hydrateFallbackElement) {
        warning(
          false,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
        );
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    if (ENABLE_DEV_WARNINGS2) {
      if (route.errorElement) {
        warning(
          false,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
        );
      }
    }
    Object.assign(updates, {
      errorElement: react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
function createMemoryRouter(routes, opts) {
  return createRouter({
    basename: opts?.basename,
    unstable_getContext: opts?.unstable_getContext,
    future: opts?.future,
    history: createMemoryHistory({
      initialEntries: opts?.initialEntries,
      initialIndex: opts?.initialIndex
    }),
    hydrationData: opts?.hydrationData,
    routes,
    mapRouteProperties,
    dataStrategy: opts?.dataStrategy,
    patchRoutesOnNavigation: opts?.patchRoutesOnNavigation
  }).initialize();
}
var Deferred = class {
  constructor() {
    this.status = "pending";
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (value) => {
        if (this.status === "pending") {
          this.status = "resolved";
          resolve(value);
        }
      };
      this.reject = (reason) => {
        if (this.status === "pending") {
          this.status = "rejected";
          reject(reason);
        }
      };
    });
  }
};
function RouterProvider({
  router,
  flushSync: reactDomFlushSyncImpl
}) {
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(router.state);
  let [pendingState, setPendingState] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [vtContext, setVtContext] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    isTransitioning: false
  });
  let [renderDfd, setRenderDfd] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [transition, setTransition] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [interruption, setInterruption] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let fetcherData = react__WEBPACK_IMPORTED_MODULE_0__.useRef(/* @__PURE__ */ new Map());
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState, { deletedFetchers, flushSync, viewTransitionOpts }) => {
      newState.fetchers.forEach((fetcher, key) => {
        if (fetcher.data !== void 0) {
          fetcherData.current.set(key, fetcher.data);
        }
      });
      deletedFetchers.forEach((key) => fetcherData.current.delete(key));
      warnOnce(
        flushSync === false || reactDomFlushSyncImpl != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let isViewTransitionAvailable = router.window != null && router.window.document != null && typeof router.window.document.startViewTransition === "function";
      warnOnce(
        viewTransitionOpts == null || isViewTransitionAvailable,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      );
      if (!viewTransitionOpts || !isViewTransitionAvailable) {
        if (reactDomFlushSyncImpl && flushSync) {
          reactDomFlushSyncImpl(() => setStateImpl(newState));
        } else {
          react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
        }
        return;
      }
      if (reactDomFlushSyncImpl && flushSync) {
        reactDomFlushSyncImpl(() => {
          if (transition) {
            renderDfd && renderDfd.resolve();
            transition.skipTransition();
          }
          setVtContext({
            isTransitioning: true,
            flushSync: true,
            currentLocation: viewTransitionOpts.currentLocation,
            nextLocation: viewTransitionOpts.nextLocation
          });
        });
        let t = router.window.document.startViewTransition(() => {
          reactDomFlushSyncImpl(() => setStateImpl(newState));
        });
        t.finished.finally(() => {
          reactDomFlushSyncImpl(() => {
            setRenderDfd(void 0);
            setTransition(void 0);
            setPendingState(void 0);
            setVtContext({ isTransitioning: false });
          });
        });
        reactDomFlushSyncImpl(() => setTransition(t));
        return;
      }
      if (transition) {
        renderDfd && renderDfd.resolve();
        transition.skipTransition();
        setInterruption({
          state: newState,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      } else {
        setPendingState(newState);
        setVtContext({
          isTransitioning: true,
          flushSync: false,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      }
    },
    [router.window, reactDomFlushSyncImpl, transition, renderDfd]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (vtContext.isTransitioning && !vtContext.flushSync) {
      setRenderDfd(new Deferred());
    }
  }, [vtContext]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (renderDfd && pendingState && router.window) {
      let newState = pendingState;
      let renderPromise = renderDfd.promise;
      let transition2 = router.window.document.startViewTransition(async () => {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
        await renderPromise;
      });
      transition2.finished.finally(() => {
        setRenderDfd(void 0);
        setTransition(void 0);
        setPendingState(void 0);
        setVtContext({ isTransitioning: false });
      });
      setTransition(transition2);
    }
  }, [pendingState, renderDfd, router.window]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
      renderDfd.resolve();
    }
  }, [renderDfd, transition, state.location, pendingState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!vtContext.isTransitioning && interruption) {
      setPendingState(interruption.state);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: interruption.currentLocation,
        nextLocation: interruption.nextLocation
      });
      setInterruption(void 0);
    }
  }, [vtContext.isTransitioning, interruption]);
  let navigator2 = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: (n) => router.navigate(n),
      push: (to, state2, opts) => router.navigate(to, {
        state: state2,
        preventScrollReset: opts?.preventScrollReset
      }),
      replace: (to, state2, opts) => router.navigate(to, {
        replace: true,
        state: state2,
        preventScrollReset: opts?.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      router,
      navigator: navigator2,
      static: false,
      basename
    }),
    [router, navigator2, basename]
  );
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(FetchersContext.Provider, { value: fetcherData.current }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ViewTransitionContext.Provider, { value: vtContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator: navigator2
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      MemoizedDataRoutes,
      {
        routes: router.routes,
        future: router.future,
        state
      }
    )
  ))))), null);
}
var MemoizedDataRoutes = react__WEBPACK_IMPORTED_MODULE_0__.memo(DataRoutes);
function DataRoutes({
  routes,
  future,
  state
}) {
  return useRoutesImpl(routes, void 0, state, future);
}
function MemoryRouter({
  basename,
  children,
  initialEntries,
  initialIndex
}) {
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = createMemoryHistory({
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
    },
    [setStateImpl]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    }
  );
}
function Navigate({
  to,
  replace: replace2,
  state,
  relative
}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    `<Navigate> may be used only in the context of a <Router> component.`
  );
  let { static: isStatic } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  warning(
    !isStatic,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`
  );
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(
    to,
    getResolveToMatches(matches),
    locationPathname,
    relative === "path"
  );
  let jsonPath = JSON.stringify(path);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    navigate(JSON.parse(jsonPath), { replace: replace2, state, relative });
  }, [navigate, jsonPath, relative, replace2, state]);
  return null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(_props) {
  invariant(
    false,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`
  );
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP" /* Pop */,
  navigator: navigator2,
  static: staticProp = false
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      basename,
      navigator: navigator2,
      static: staticProp,
      future: {}
    }),
    [basename, navigator2, staticProp]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  warning(
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, { children, value: locationContext }));
}
function Routes({
  children,
  location
}) {
  return useRoutes(createRoutesFromChildren(children), location);
}
function Await({
  children,
  errorElement,
  resolve
}) {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitErrorBoundary, { resolve, errorElement }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResolveAwait, null, children));
}
var AwaitErrorBoundary = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, errorInfo) {
    console.error(
      "<Await> caught the following error during render",
      error,
      errorInfo
    );
  }
  render() {
    let { children, errorElement, resolve } = this.props;
    let promise = null;
    let status = 0 /* pending */;
    if (!(resolve instanceof Promise)) {
      status = 1 /* success */;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", { get: () => true });
      Object.defineProperty(promise, "_data", { get: () => resolve });
    } else if (this.state.error) {
      status = 2 /* error */;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {
      });
      Object.defineProperty(promise, "_tracked", { get: () => true });
      Object.defineProperty(promise, "_error", { get: () => renderError });
    } else if (resolve._tracked) {
      promise = resolve;
      status = "_error" in promise ? 2 /* error */ : "_data" in promise ? 1 /* success */ : 0 /* pending */;
    } else {
      status = 0 /* pending */;
      Object.defineProperty(resolve, "_tracked", { get: () => true });
      promise = resolve.then(
        (data2) => Object.defineProperty(resolve, "_data", { get: () => data2 }),
        (error) => Object.defineProperty(resolve, "_error", { get: () => error })
      );
    }
    if (status === 2 /* error */ && !errorElement) {
      throw promise._error;
    }
    if (status === 2 /* error */) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, { value: promise, children: errorElement });
    }
    if (status === 1 /* success */) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, { value: promise, children });
    }
    throw promise;
  }
};
function ResolveAwait({
  children
}) {
  let data2 = useAsyncValue();
  let toRender = typeof children === "function" ? children(data2) : children;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, toRender);
}
function createRoutesFromChildren(children, parentPath = []) {
  let routes = [];
  react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children, (element, index) => {
    if (!react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
      routes.push.apply(
        routes,
        createRoutesFromChildren(element.props.children, treePath)
      );
      return;
    }
    invariant(
      element.type === Route,
      `[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    );
    invariant(
      !element.props.index || !element.props.children,
      "An index route cannot have child routes."
    );
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      hydrateFallbackElement: element.props.hydrateFallbackElement,
      HydrateFallback: element.props.HydrateFallback,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.hasErrorBoundary === true || element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(
        element.props.children,
        treePath
      );
    }
    routes.push(route);
  });
  return routes;
}
var createRoutesFromElements = createRoutesFromChildren;
function renderMatches(matches) {
  return _renderMatches(matches);
}

// lib/dom/lib.tsx


// lib/dom/dom.ts
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
function createSearchParams(init = "") {
  return new URLSearchParams(
    typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo2, key) => {
      let value = init[key];
      return memo2.concat(
        Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
      );
    }, [])
  );
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    defaultSearchParams.forEach((_, key) => {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    });
  }
  return searchParams;
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}

// lib/dom/ssr/components.tsx


// lib/dom/ssr/invariant.ts
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}

// lib/dom/ssr/routeModules.ts
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    /* unsupported import.meta.hot */ undefined) {}
    window.location.reload();
    return new Promise(() => {
    });
  }
}

// lib/dom/ssr/links.ts
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    let module = routeModules[match.route.id];
    let route = manifest.routes[match.route.id];
    return [
      route && route.css ? route.css.map((href2) => ({ rel: "stylesheet", href: href2 })) : [],
      module?.links?.() || []
    ];
  }).flat(2);
  let preloads = getModuleLinkHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
function getRouteCssDescriptors(route) {
  if (!route.css) return [];
  return route.css.map((href2) => ({ rel: "stylesheet", href: href2 }));
}
async function prefetchRouteCss(route) {
  if (!route.css) return;
  let descriptors = getRouteCssDescriptors(route);
  await Promise.all(descriptors.map(prefetchStyleLink));
}
async function prefetchStyleLinks(route, routeModule) {
  if (!route.css && !routeModule.links || !isPreloadSupported()) return;
  let descriptors = [];
  if (route.css) {
    descriptors.push(...getRouteCssDescriptors(route));
  }
  if (routeModule.links) {
    descriptors.push(...routeModule.links());
  }
  if (descriptors.length === 0) return;
  let styleLinks = [];
  for (let descriptor of descriptors) {
    if (!isPageLinkDescriptor(descriptor) && descriptor.rel === "stylesheet") {
      styleLinks.push({
        ...descriptor,
        rel: "preload",
        as: "style"
      });
    }
  }
  await Promise.all(styleLinks.map(prefetchStyleLink));
}
async function prefetchStyleLink(descriptor) {
  return new Promise((resolve) => {
    if (descriptor.media && !window.matchMedia(descriptor.media).matches || document.querySelector(
      `link[rel="stylesheet"][href="${descriptor.href}"]`
    )) {
      return resolve();
    }
    let link = document.createElement("link");
    Object.assign(link, descriptor);
    function removeLink() {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    }
    link.onload = () => {
      removeLink();
      resolve();
    };
    link.onerror = () => {
      removeLink();
      resolve();
    };
    document.head.appendChild(link);
  });
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: currentMatches[0]?.params || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  let preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
    if (alreadyModulePreload) {
      return deduped;
    }
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
var _isPreloadSupported;
function isPreloadSupported() {
  if (_isPreloadSupported !== void 0) {
    return _isPreloadSupported;
  }
  let el = document.createElement("link");
  _isPreloadSupported = el.relList.supports("preload");
  el = null;
  return _isPreloadSupported;
}

// lib/dom/ssr/markup.ts
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
function createHtml(html) {
  return { __html: html };
}

// lib/dom/ssr/single-fetch.tsx



// lib/dom/ssr/data.ts
async function createRequestInit(request) {
  let init = { signal: request.signal };
  if (request.method !== "GET") {
    init.method = request.method;
    let contentType = request.headers.get("Content-Type");
    if (contentType && /\bapplication\/json\b/.test(contentType)) {
      init.headers = { "Content-Type": contentType };
      init.body = JSON.stringify(await request.json());
    } else if (contentType && /\btext\/plain\b/.test(contentType)) {
      init.headers = { "Content-Type": contentType };
      init.body = await request.text();
    } else if (contentType && /\bapplication\/x-www-form-urlencoded\b/.test(contentType)) {
      init.body = new URLSearchParams(await request.text());
    } else {
      init.body = await request.formData();
    }
  }
  return init;
}

// lib/dom/ssr/single-fetch.tsx
var SingleFetchRedirectSymbol = Symbol("SingleFetchRedirect");
function StreamTransfer({
  context,
  identifier,
  reader,
  textDecoder,
  nonce
}) {
  if (!context.renderMeta || !context.renderMeta.didRenderScripts) {
    return null;
  }
  if (!context.renderMeta.streamCache) {
    context.renderMeta.streamCache = {};
  }
  let { streamCache } = context.renderMeta;
  let promise = streamCache[identifier];
  if (!promise) {
    promise = streamCache[identifier] = reader.read().then((result) => {
      streamCache[identifier].result = {
        done: result.done,
        value: textDecoder.decode(result.value, { stream: true })
      };
    }).catch((e) => {
      streamCache[identifier].error = e;
    });
  }
  if (promise.error) {
    throw promise.error;
  }
  if (promise.result === void 0) {
    throw promise;
  }
  let { done, value } = promise.result;
  let scriptTag = value ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `window.__reactRouterContext.streamController.enqueue(${escapeHtml(
          JSON.stringify(value)
        )});`
      }
    }
  ) : null;
  if (done) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, scriptTag, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "script",
      {
        nonce,
        dangerouslySetInnerHTML: {
          __html: `window.__reactRouterContext.streamController.close();`
        }
      }
    ));
  } else {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, scriptTag, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      StreamTransfer,
      {
        context,
        identifier: identifier + 1,
        reader,
        textDecoder,
        nonce
      }
    )));
  }
}
function handleMiddlewareError(error, routeId) {
  return { [routeId]: { type: "error", result: error } };
}
function getSingleFetchDataStrategy(manifest, routeModules, ssr, basename, getRouter) {
  return async (args) => {
    let { request, matches, fetcherKey } = args;
    if (request.method !== "GET") {
      return runMiddlewarePipeline(
        args,
        false,
        () => singleFetchActionStrategy(request, matches, basename),
        handleMiddlewareError
      );
    }
    if (!ssr) {
      let foundRevalidatingServerLoader = matches.some(
        (m) => m.shouldLoad && manifest.routes[m.route.id]?.hasLoader && !manifest.routes[m.route.id]?.hasClientLoader
      );
      if (!foundRevalidatingServerLoader) {
        return runMiddlewarePipeline(
          args,
          false,
          () => nonSsrStrategy(manifest, request, matches, basename),
          handleMiddlewareError
        );
      }
    }
    if (fetcherKey) {
      return runMiddlewarePipeline(
        args,
        false,
        () => singleFetchLoaderFetcherStrategy(request, matches, basename),
        handleMiddlewareError
      );
    }
    return runMiddlewarePipeline(
      args,
      false,
      () => singleFetchLoaderNavigationStrategy(
        manifest,
        routeModules,
        ssr,
        getRouter(),
        request,
        matches,
        basename
      ),
      handleMiddlewareError
    );
  };
}
async function singleFetchActionStrategy(request, matches, basename) {
  let actionMatch = matches.find((m) => m.shouldLoad);
  invariant2(actionMatch, "No action match found");
  let actionStatus = void 0;
  let result = await actionMatch.resolve(async (handler) => {
    let result2 = await handler(async () => {
      let url = singleFetchUrl(request.url, basename);
      let init = await createRequestInit(request);
      let { data: data2, status } = await fetchAndDecode(url, init);
      actionStatus = status;
      return unwrapSingleFetchResult(
        data2,
        actionMatch.route.id
      );
    });
    return result2;
  });
  if (isResponse(result.result) || isRouteErrorResponse(result.result)) {
    return { [actionMatch.route.id]: result };
  }
  return {
    [actionMatch.route.id]: {
      type: result.type,
      result: data(result.result, actionStatus)
    }
  };
}
async function nonSsrStrategy(manifest, request, matches, basename) {
  let matchesToLoad = matches.filter((m) => m.shouldLoad);
  let url = stripIndexParam(singleFetchUrl(request.url, basename));
  let init = await createRequestInit(request);
  let results = {};
  await Promise.all(
    matchesToLoad.map(
      (m) => m.resolve(async (handler) => {
        try {
          let result = manifest.routes[m.route.id]?.hasClientLoader ? await fetchSingleLoader(handler, url, init, m.route.id) : await handler();
          results[m.route.id] = { type: "data", result };
        } catch (e) {
          results[m.route.id] = { type: "error", result: e };
        }
      })
    )
  );
  return results;
}
async function singleFetchLoaderNavigationStrategy(manifest, routeModules, ssr, router, request, matches, basename) {
  let routesParams = /* @__PURE__ */ new Set();
  let foundOptOutRoute = false;
  let routeDfds = matches.map(() => createDeferred2());
  let routesLoadedPromise = Promise.all(routeDfds.map((d) => d.promise));
  let singleFetchDfd = createDeferred2();
  let url = stripIndexParam(singleFetchUrl(request.url, basename));
  let init = await createRequestInit(request);
  let results = {};
  let resolvePromise = Promise.all(
    matches.map(
      async (m, i) => m.resolve(async (handler) => {
        routeDfds[i].resolve();
        let manifestRoute = manifest.routes[m.route.id];
        if (!m.shouldLoad) {
          if (!router.state.initialized) {
            return;
          }
          if (m.route.id in router.state.loaderData && manifestRoute && m.route.shouldRevalidate) {
            if (manifestRoute.hasLoader) {
              foundOptOutRoute = true;
            }
            return;
          }
        }
        if (manifestRoute && manifestRoute.hasClientLoader) {
          if (manifestRoute.hasLoader) {
            foundOptOutRoute = true;
          }
          try {
            let result = await fetchSingleLoader(
              handler,
              url,
              init,
              m.route.id
            );
            results[m.route.id] = { type: "data", result };
          } catch (e) {
            results[m.route.id] = { type: "error", result: e };
          }
          return;
        }
        if (manifestRoute && manifestRoute.hasLoader) {
          routesParams.add(m.route.id);
        }
        try {
          let result = await handler(async () => {
            let data2 = await singleFetchDfd.promise;
            return unwrapSingleFetchResults(data2, m.route.id);
          });
          results[m.route.id] = {
            type: "data",
            result
          };
        } catch (e) {
          results[m.route.id] = {
            type: "error",
            result: e
          };
        }
      })
    )
  );
  await routesLoadedPromise;
  if ((!router.state.initialized || routesParams.size === 0) && !window.__reactRouterHdrActive) {
    singleFetchDfd.resolve({});
  } else {
    try {
      if (ssr && foundOptOutRoute && routesParams.size > 0) {
        url.searchParams.set(
          "_routes",
          matches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
        );
      }
      let data2 = await fetchAndDecode(url, init);
      singleFetchDfd.resolve(data2.data);
    } catch (e) {
      singleFetchDfd.reject(e);
    }
  }
  await resolvePromise;
  return results;
}
async function singleFetchLoaderFetcherStrategy(request, matches, basename) {
  let fetcherMatch = matches.find((m) => m.shouldLoad);
  invariant2(fetcherMatch, "No fetcher match found");
  let result = await fetcherMatch.resolve(async (handler) => {
    let url = stripIndexParam(singleFetchUrl(request.url, basename));
    let init = await createRequestInit(request);
    return fetchSingleLoader(handler, url, init, fetcherMatch.route.id);
  });
  return { [fetcherMatch.route.id]: result };
}
function fetchSingleLoader(handler, url, init, routeId) {
  return handler(async () => {
    let singleLoaderUrl = new URL(url);
    singleLoaderUrl.searchParams.set("_routes", routeId);
    let { data: data2 } = await fetchAndDecode(singleLoaderUrl, init);
    return unwrapSingleFetchResults(data2, routeId);
  });
}
function stripIndexParam(url) {
  let indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  return url;
}
function singleFetchUrl(reqUrl, basename) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (url.pathname === "/") {
    url.pathname = "_root.data";
  } else if (basename && stripBasename(url.pathname, basename) === "/") {
    url.pathname = `${basename.replace(/\/$/, "")}/_root.data`;
  } else {
    url.pathname = `${url.pathname.replace(/\/$/, "")}.data`;
  }
  return url;
}
async function fetchAndDecode(url, init) {
  let res = await fetch(url, init);
  if (res.status === 404 && !res.headers.has("X-Remix-Response")) {
    throw new ErrorResponseImpl(404, "Not Found", true);
  }
  const NO_BODY_STATUS_CODES2 = /* @__PURE__ */ new Set([100, 101, 204, 205]);
  if (NO_BODY_STATUS_CODES2.has(res.status)) {
    if (!init.method || init.method === "GET") {
      return { status: res.status, data: {} };
    } else {
      return { status: res.status, data: { data: void 0 } };
    }
  }
  invariant2(res.body, "No response body to decode");
  try {
    let decoded = await decodeViaTurboStream(res.body, window);
    return { status: res.status, data: decoded.value };
  } catch (e) {
    throw new Error("Unable to decode turbo-stream response");
  }
}
function decodeViaTurboStream(body, global2) {
  return (0,turbo_stream__WEBPACK_IMPORTED_MODULE_1__.decode)(body, {
    plugins: [
      (type, ...rest) => {
        if (type === "SanitizedError") {
          let [name, message, stack] = rest;
          let Constructor = Error;
          if (name && name in global2 && typeof global2[name] === "function") {
            Constructor = global2[name];
          }
          let error = new Constructor(message);
          error.stack = stack;
          return { value: error };
        }
        if (type === "ErrorResponse") {
          let [data2, status, statusText] = rest;
          return {
            value: new ErrorResponseImpl(status, statusText, data2)
          };
        }
        if (type === "SingleFetchRedirect") {
          return { value: { [SingleFetchRedirectSymbol]: rest[0] } };
        }
        if (type === "SingleFetchClassInstance") {
          return { value: rest[0] };
        }
        if (type === "SingleFetchFallback") {
          return { value: void 0 };
        }
      }
    ]
  });
}
function unwrapSingleFetchResults(results, routeId) {
  let redirect2 = results[SingleFetchRedirectSymbol];
  if (redirect2) {
    return unwrapSingleFetchResult(redirect2, routeId);
  }
  return results[routeId] !== void 0 ? unwrapSingleFetchResult(results[routeId], routeId) : null;
}
function unwrapSingleFetchResult(result, routeId) {
  if ("error" in result) {
    throw result.error;
  } else if ("redirect" in result) {
    let headers = {};
    if (result.revalidate) {
      headers["X-Remix-Revalidate"] = "yes";
    }
    if (result.reload) {
      headers["X-Remix-Reload-Document"] = "yes";
    }
    if (result.replace) {
      headers["X-Remix-Replace"] = "yes";
    }
    throw redirect(result.redirect, { status: result.status, headers });
  } else if ("data" in result) {
    return result.data;
  } else {
    throw new Error(`No response found for routeId "${routeId}"`);
  }
}
function createDeferred2() {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = async (val) => {
      res(val);
      try {
        await promise;
      } catch (e) {
      }
    };
    reject = async (error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {
      }
    };
  });
  return {
    promise,
    //@ts-ignore
    resolve,
    //@ts-ignore
    reject
  };
}

// lib/dom/ssr/fog-of-war.ts


// lib/dom/ssr/routes.tsx


// lib/dom/ssr/errorBoundaries.tsx

var RemixErrorBoundary = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = { error: props.error || null, location: props.location };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return { error: props.error || null, location: props.location };
    }
    return { error: props.error || state.error, location: state.location };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        RemixRootDefaultErrorBoundary,
        {
          error: this.state.error,
          isOutsideRemixApp: true
        }
      );
    } else {
      return this.props.children;
    }
  }
};
function RemixRootDefaultErrorBoundary({
  error,
  isOutsideRemixApp
}) {
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
        console.log(
          "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
        );
      `
      }
    }
  );
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(BoundaryShell, { title: "Unhandled Thrown Response!" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", { style: { fontSize: "24px" } }, error.status, " ", error.statusText), heyDeveloper);
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    BoundaryShell,
    {
      title: "Application Error!",
      isOutsideRemixApp
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"),
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "pre",
      {
        style: {
          padding: "2rem",
          background: "hsla(10, 50%, 50%, 0.1)",
          color: "red",
          overflow: "auto"
        }
      },
      errorInstance.stack
    ),
    heyDeveloper
  );
}
function BoundaryShell({
  title,
  renderScripts,
  isOutsideRemixApp,
  children
}) {
  let { routeModules } = useFrameworkContext();
  if (routeModules.root?.Layout && !isOutsideRemixApp) {
    return children;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("html", { lang: "en" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("head", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { charSet: "utf-8" }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover"
    }
  ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("title", null, title)), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("body", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, children, renderScripts ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Scripts, null) : null)));
}

// lib/dom/ssr/fallback.tsx

function RemixRootDefaultHydrateFallback() {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(BoundaryShell, { title: "Loading...", renderScripts: true }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://remix.run/route/hydrate-fallback " +
                "for more information."
              );
            `
      }
    }
  ));
}

// lib/dom/ssr/routes.tsx
function groupRoutesByParentId(manifest) {
  let routes = {};
  Object.values(manifest).forEach((route) => {
    if (route) {
      let parentId = route.parentId || "";
      if (!routes[parentId]) {
        routes[parentId] = [];
      }
      routes[parentId].push(route);
    }
  });
  return routes;
}
function getRouteComponents(route, routeModule, isSpaMode) {
  let Component4 = getRouteModuleComponent(routeModule);
  let HydrateFallback = routeModule.HydrateFallback && (!isSpaMode || route.id === "root") ? routeModule.HydrateFallback : route.id === "root" ? RemixRootDefaultHydrateFallback : void 0;
  let ErrorBoundary = routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RemixRootDefaultErrorBoundary, { error: useRouteError() }) : void 0;
  if (route.id === "root" && routeModule.Layout) {
    return {
      ...Component4 ? {
        element: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(routeModule.Layout, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component4, null))
      } : { Component: Component4 },
      ...ErrorBoundary ? {
        errorElement: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(routeModule.Layout, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary, null))
      } : { ErrorBoundary },
      ...HydrateFallback ? {
        hydrateFallbackElement: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(routeModule.Layout, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(HydrateFallback, null))
      } : { HydrateFallback }
    };
  }
  return { Component: Component4, ErrorBoundary, HydrateFallback };
}
function createServerRoutes(manifest, routeModules, future, isSpaMode, parentId = "", routesByParentId = groupRoutesByParentId(manifest), spaModeLazyPromise = Promise.resolve({ Component: () => null })) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id];
    invariant2(
      routeModule,
      "No `routeModule` available to create server routes"
    );
    let dataRoute = {
      ...getRouteComponents(route, routeModule, isSpaMode),
      caseSensitive: route.caseSensitive,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModule.handle,
      // For SPA Mode, all routes are lazy except root.  However we tell the
      // router root is also lazy here too since we don't need a full
      // implementation - we just need a `lazy` prop to tell the RR rendering
      // where to stop which is always at the root route in SPA mode
      lazy: isSpaMode ? () => spaModeLazyPromise : void 0,
      // For partial hydration rendering, we need to indicate when the route
      // has a loader/clientLoader, but it won't ever be called during the static
      // render, so just give it a no-op function so we can render down to the
      // proper fallback
      loader: route.hasLoader || route.hasClientLoader ? () => null : void 0
      // We don't need middleware/action/shouldRevalidate on these routes since
      // they're for a static render
    };
    let children = createServerRoutes(
      manifest,
      routeModules,
      future,
      isSpaMode,
      route.id,
      routesByParentId,
      spaModeLazyPromise
    );
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function createClientRoutesWithHMRRevalidationOptOut(needsRevalidation, manifest, routeModulesCache, initialState, ssr, isSpaMode) {
  return createClientRoutes(
    manifest,
    routeModulesCache,
    initialState,
    ssr,
    isSpaMode,
    "",
    groupRoutesByParentId(manifest),
    needsRevalidation
  );
}
function preventInvalidServerHandlerCall(type, route) {
  if (type === "loader" && !route.hasLoader || type === "action" && !route.hasAction) {
    let fn = type === "action" ? "serverAction()" : "serverLoader()";
    let msg = `You are trying to call ${fn} on a route that does not have a server ${type} (routeId: "${route.id}")`;
    console.error(msg);
    throw new ErrorResponseImpl(400, "Bad Request", new Error(msg), true);
  }
}
function noActionDefinedError(type, routeId) {
  let article = type === "clientAction" ? "a" : "an";
  let msg = `Route "${routeId}" does not have ${article} ${type}, but you are trying to submit to it. To fix this, please add ${article} \`${type}\` function to the route`;
  console.error(msg);
  throw new ErrorResponseImpl(405, "Method Not Allowed", new Error(msg), true);
}
function createClientRoutes(manifest, routeModulesCache, initialState, ssr, isSpaMode, parentId = "", routesByParentId = groupRoutesByParentId(manifest), needsRevalidation) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModulesCache[route.id];
    function fetchServerHandler(singleFetch) {
      invariant2(
        typeof singleFetch === "function",
        "No single fetch function available for route handler"
      );
      return singleFetch();
    }
    function fetchServerLoader(singleFetch) {
      if (!route.hasLoader) return Promise.resolve(null);
      return fetchServerHandler(singleFetch);
    }
    function fetchServerAction(singleFetch) {
      if (!route.hasAction) {
        throw noActionDefinedError("action", route.id);
      }
      return fetchServerHandler(singleFetch);
    }
    function prefetchModule(modulePath) {
      import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        modulePath
      );
    }
    function prefetchRouteModuleChunks(route2) {
      if (route2.clientActionModule) {
        prefetchModule(route2.clientActionModule);
      }
      if (route2.clientLoaderModule) {
        prefetchModule(route2.clientLoaderModule);
      }
    }
    async function prefetchStylesAndCallHandler(handler) {
      let cachedModule = routeModulesCache[route.id];
      let linkPrefetchPromise = cachedModule ? prefetchStyleLinks(route, cachedModule) : Promise.resolve();
      try {
        return handler();
      } finally {
        await linkPrefetchPromise;
      }
    }
    let dataRoute = {
      id: route.id,
      index: route.index,
      path: route.path
    };
    if (routeModule) {
      Object.assign(dataRoute, {
        ...dataRoute,
        ...getRouteComponents(route, routeModule, isSpaMode),
        unstable_middleware: routeModule.unstable_clientMiddleware,
        handle: routeModule.handle,
        shouldRevalidate: getShouldRevalidateFunction(
          routeModule,
          route,
          ssr,
          needsRevalidation
        )
      });
      let hasInitialData = initialState && initialState.loaderData && route.id in initialState.loaderData;
      let initialData = hasInitialData ? initialState?.loaderData?.[route.id] : void 0;
      let hasInitialError = initialState && initialState.errors && route.id in initialState.errors;
      let initialError = hasInitialError ? initialState?.errors?.[route.id] : void 0;
      let isHydrationRequest = needsRevalidation == null && (routeModule.clientLoader?.hydrate === true || !route.hasLoader);
      dataRoute.loader = async ({ request, params, context }, singleFetch) => {
        try {
          let result = await prefetchStylesAndCallHandler(async () => {
            invariant2(
              routeModule,
              "No `routeModule` available for critical-route loader"
            );
            if (!routeModule.clientLoader) {
              return fetchServerLoader(singleFetch);
            }
            return routeModule.clientLoader({
              request,
              params,
              context,
              async serverLoader() {
                preventInvalidServerHandlerCall("loader", route);
                if (isHydrationRequest) {
                  if (hasInitialData) {
                    return initialData;
                  }
                  if (hasInitialError) {
                    throw initialError;
                  }
                }
                return fetchServerLoader(singleFetch);
              }
            });
          });
          return result;
        } finally {
          isHydrationRequest = false;
        }
      };
      dataRoute.loader.hydrate = shouldHydrateRouteLoader(
        route,
        routeModule,
        isSpaMode
      );
      dataRoute.action = ({ request, params, context }, singleFetch) => {
        return prefetchStylesAndCallHandler(async () => {
          invariant2(
            routeModule,
            "No `routeModule` available for critical-route action"
          );
          if (!routeModule.clientAction) {
            if (isSpaMode) {
              throw noActionDefinedError("clientAction", route.id);
            }
            return fetchServerAction(singleFetch);
          }
          return routeModule.clientAction({
            request,
            params,
            context,
            async serverAction() {
              preventInvalidServerHandlerCall("action", route);
              return fetchServerAction(singleFetch);
            }
          });
        });
      };
    } else {
      if (!route.hasClientLoader) {
        dataRoute.loader = (_, singleFetch) => prefetchStylesAndCallHandler(() => {
          return fetchServerLoader(singleFetch);
        });
      }
      if (!route.hasClientAction) {
        dataRoute.action = (_, singleFetch) => prefetchStylesAndCallHandler(() => {
          if (isSpaMode) {
            throw noActionDefinedError("clientAction", route.id);
          }
          return fetchServerAction(singleFetch);
        });
      }
      let lazyRoutePromise;
      async function getLazyRoute() {
        if (lazyRoutePromise) {
          return await lazyRoutePromise;
        }
        lazyRoutePromise = (async () => {
          if (route.clientLoaderModule || route.clientActionModule) {
            await new Promise((resolve) => setTimeout(resolve, 0));
          }
          let routeModulePromise = loadRouteModuleWithBlockingLinks(
            route,
            routeModulesCache
          );
          prefetchRouteModuleChunks(route);
          return await routeModulePromise;
        })();
        return await lazyRoutePromise;
      }
      dataRoute.lazy = {
        loader: route.hasClientLoader ? async () => {
          let { clientLoader } = route.clientLoaderModule ? await import(
            /* @vite-ignore */
            /* webpackIgnore: true */
            route.clientLoaderModule
          ) : await getLazyRoute();
          invariant2(clientLoader, "No `clientLoader` export found");
          return (args, singleFetch) => clientLoader({
            ...args,
            async serverLoader() {
              preventInvalidServerHandlerCall("loader", route);
              return fetchServerLoader(singleFetch);
            }
          });
        } : void 0,
        action: route.hasClientAction ? async () => {
          let clientActionPromise = route.clientActionModule ? import(
            /* @vite-ignore */
            /* webpackIgnore: true */
            route.clientActionModule
          ) : getLazyRoute();
          prefetchRouteModuleChunks(route);
          let { clientAction } = await clientActionPromise;
          invariant2(clientAction, "No `clientAction` export found");
          return (args, singleFetch) => clientAction({
            ...args,
            async serverAction() {
              preventInvalidServerHandlerCall("action", route);
              return fetchServerAction(singleFetch);
            }
          });
        } : void 0,
        unstable_middleware: route.hasClientMiddleware ? async () => {
          let { unstable_clientMiddleware } = route.clientMiddlewareModule ? await import(
            /* @vite-ignore */
            /* webpackIgnore: true */
            route.clientMiddlewareModule
          ) : await getLazyRoute();
          invariant2(
            unstable_clientMiddleware,
            "No `unstable_clientMiddleware` export found"
          );
          return unstable_clientMiddleware;
        } : void 0,
        shouldRevalidate: async () => {
          let lazyRoute = await getLazyRoute();
          return getShouldRevalidateFunction(
            lazyRoute,
            route,
            ssr,
            needsRevalidation
          );
        },
        handle: async () => (await getLazyRoute()).handle,
        // No need to wrap these in layout since the root route is never
        // loaded via route.lazy()
        Component: async () => (await getLazyRoute()).Component,
        ErrorBoundary: route.hasErrorBoundary ? async () => (await getLazyRoute()).ErrorBoundary : void 0
      };
    }
    let children = createClientRoutes(
      manifest,
      routeModulesCache,
      initialState,
      ssr,
      isSpaMode,
      route.id,
      routesByParentId,
      needsRevalidation
    );
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function getShouldRevalidateFunction(route, manifestRoute, ssr, needsRevalidation) {
  if (needsRevalidation) {
    return wrapShouldRevalidateForHdr(
      manifestRoute.id,
      route.shouldRevalidate,
      needsRevalidation
    );
  }
  if (!ssr && manifestRoute.hasLoader && !manifestRoute.hasClientLoader) {
    if (route.shouldRevalidate) {
      let fn = route.shouldRevalidate;
      return (opts) => fn({ ...opts, defaultShouldRevalidate: false });
    } else {
      return () => false;
    }
  }
  if (ssr && route.shouldRevalidate) {
    let fn = route.shouldRevalidate;
    return (opts) => fn({ ...opts, defaultShouldRevalidate: true });
  }
  return route.shouldRevalidate;
}
function wrapShouldRevalidateForHdr(routeId, routeShouldRevalidate, needsRevalidation) {
  let handledRevalidation = false;
  return (arg) => {
    if (!handledRevalidation) {
      handledRevalidation = true;
      return needsRevalidation.has(routeId);
    }
    return routeShouldRevalidate ? routeShouldRevalidate(arg) : arg.defaultShouldRevalidate;
  };
}
async function loadRouteModuleWithBlockingLinks(route, routeModules) {
  let routeModulePromise = loadRouteModule(route, routeModules);
  let prefetchRouteCssPromise = prefetchRouteCss(route);
  let routeModule = await routeModulePromise;
  await Promise.all([
    prefetchRouteCssPromise,
    prefetchStyleLinks(route, routeModule)
  ]);
  return {
    Component: getRouteModuleComponent(routeModule),
    ErrorBoundary: routeModule.ErrorBoundary,
    unstable_clientMiddleware: routeModule.unstable_clientMiddleware,
    clientAction: routeModule.clientAction,
    clientLoader: routeModule.clientLoader,
    handle: routeModule.handle,
    links: routeModule.links,
    meta: routeModule.meta,
    shouldRevalidate: routeModule.shouldRevalidate
  };
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null) return void 0;
  let isEmptyObject = typeof routeModule.default === "object" && Object.keys(routeModule.default).length === 0;
  if (!isEmptyObject) {
    return routeModule.default;
  }
}
function shouldHydrateRouteLoader(route, routeModule, isSpaMode) {
  return isSpaMode && route.id !== "root" || routeModule.clientLoader != null && (routeModule.clientLoader.hydrate === true || route.hasLoader !== true);
}

// lib/dom/ssr/fog-of-war.ts
var nextPaths = /* @__PURE__ */ new Set();
var discoveredPathsMaxSize = 1e3;
var discoveredPaths = /* @__PURE__ */ new Set();
var URL_LIMIT = 7680;
function isFogOfWarEnabled(ssr) {
  return ssr === true;
}
function getPartialManifest({ sri, ...manifest }, router) {
  let routeIds = new Set(router.state.matches.map((m) => m.route.id));
  let segments = router.state.location.pathname.split("/").filter(Boolean);
  let paths = ["/"];
  segments.pop();
  while (segments.length > 0) {
    paths.push(`/${segments.join("/")}`);
    segments.pop();
  }
  paths.forEach((path) => {
    let matches = matchRoutes(router.routes, path, router.basename);
    if (matches) {
      matches.forEach((m) => routeIds.add(m.route.id));
    }
  });
  let initialRoutes = [...routeIds].reduce(
    (acc, id) => Object.assign(acc, { [id]: manifest.routes[id] }),
    {}
  );
  return {
    ...manifest,
    routes: initialRoutes,
    sri: sri ? true : void 0
  };
}
function getPatchRoutesOnNavigationFunction(manifest, routeModules, ssr, isSpaMode, basename) {
  if (!isFogOfWarEnabled(ssr)) {
    return void 0;
  }
  return async ({ path, patch, signal, fetcherKey }) => {
    if (discoveredPaths.has(path)) {
      return;
    }
    await fetchAndApplyManifestPatches(
      [path],
      fetcherKey ? window.location.href : path,
      manifest,
      routeModules,
      ssr,
      isSpaMode,
      basename,
      patch,
      signal
    );
  };
}
function useFogOFWarDiscovery(router, manifest, routeModules, ssr, isSpaMode) {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!isFogOfWarEnabled(ssr) || navigator.connection?.saveData === true) {
      return;
    }
    function registerElement(el) {
      let path = el.tagName === "FORM" ? el.getAttribute("action") : el.getAttribute("href");
      if (!path) {
        return;
      }
      let pathname = el.tagName === "A" ? el.pathname : new URL(path, window.location.origin).pathname;
      if (!discoveredPaths.has(pathname)) {
        nextPaths.add(pathname);
      }
    }
    async function fetchPatches() {
      document.querySelectorAll("a[data-discover], form[data-discover]").forEach(registerElement);
      let lazyPaths = Array.from(nextPaths.keys()).filter((path) => {
        if (discoveredPaths.has(path)) {
          nextPaths.delete(path);
          return false;
        }
        return true;
      });
      if (lazyPaths.length === 0) {
        return;
      }
      try {
        await fetchAndApplyManifestPatches(
          lazyPaths,
          null,
          manifest,
          routeModules,
          ssr,
          isSpaMode,
          router.basename,
          router.patchRoutes
        );
      } catch (e) {
        console.error("Failed to fetch manifest patches", e);
      }
    }
    let debouncedFetchPatches = debounce(fetchPatches, 100);
    fetchPatches();
    let observer = new MutationObserver(() => debouncedFetchPatches());
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-discover", "href", "action"]
    });
    return () => observer.disconnect();
  }, [ssr, isSpaMode, manifest, routeModules, router]);
}
var MANIFEST_VERSION_STORAGE_KEY = "react-router-manifest-version";
async function fetchAndApplyManifestPatches(paths, errorReloadPath, manifest, routeModules, ssr, isSpaMode, basename, patchRoutes, signal) {
  let manifestPath = `${basename != null ? basename : "/"}/__manifest`.replace(
    /\/+/g,
    "/"
  );
  let url = new URL(manifestPath, window.location.origin);
  paths.sort().forEach((path) => url.searchParams.append("p", path));
  url.searchParams.set("version", manifest.version);
  if (url.toString().length > URL_LIMIT) {
    nextPaths.clear();
    return;
  }
  let serverPatches;
  try {
    let res = await fetch(url, { signal });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    } else if (res.status === 204 && res.headers.has("X-Remix-Reload-Document")) {
      if (!errorReloadPath) {
        console.warn(
          "Detected a manifest version mismatch during eager route discovery. The next navigation/fetch to an undiscovered route will result in a new document navigation to sync up with the latest manifest."
        );
        return;
      }
      if (sessionStorage.getItem(MANIFEST_VERSION_STORAGE_KEY) === manifest.version) {
        console.error(
          "Unable to discover routes due to manifest version mismatch."
        );
        return;
      }
      sessionStorage.setItem(MANIFEST_VERSION_STORAGE_KEY, manifest.version);
      window.location.href = errorReloadPath;
      throw new Error("Detected manifest version mismatch, reloading...");
    } else if (res.status >= 400) {
      throw new Error(await res.text());
    }
    sessionStorage.removeItem(MANIFEST_VERSION_STORAGE_KEY);
    serverPatches = await res.json();
  } catch (e) {
    if (signal?.aborted) return;
    throw e;
  }
  let knownRoutes = new Set(Object.keys(manifest.routes));
  let patches = Object.values(serverPatches).reduce((acc, route) => {
    if (route && !knownRoutes.has(route.id)) {
      acc[route.id] = route;
    }
    return acc;
  }, {});
  Object.assign(manifest.routes, patches);
  paths.forEach((p) => addToFifoQueue(p, discoveredPaths));
  let parentIds = /* @__PURE__ */ new Set();
  Object.values(patches).forEach((patch) => {
    if (patch && (!patch.parentId || !patches[patch.parentId])) {
      parentIds.add(patch.parentId);
    }
  });
  parentIds.forEach(
    (parentId) => patchRoutes(
      parentId || null,
      createClientRoutes(patches, routeModules, null, ssr, isSpaMode, parentId)
    )
  );
}
function addToFifoQueue(path, queue) {
  if (queue.size >= discoveredPathsMaxSize) {
    let first = queue.values().next().value;
    queue.delete(first);
  }
  queue.add(path);
}
function debounce(callback, wait) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), wait);
  };
}

// lib/dom/ssr/components.tsx
function useDataRouterContext2() {
  let context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function getActiveMatches(matches, errors, isSpaMode) {
  if (isSpaMode && !isHydrated) {
    return [matches[0]];
  }
  if (errors) {
    let errorIdx = matches.findIndex((m) => errors[m.route.id] !== void 0);
    return matches.slice(0, errorIdx + 1);
  }
  return matches;
}
function Links() {
  let { isSpaMode, manifest, routeModules, criticalCss } = useFrameworkContext();
  let { errors, matches: routerMatches } = useDataRouterStateContext();
  let matches = getActiveMatches(routerMatches, errors, isSpaMode);
  let keyedLinks = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getKeyedLinksForMatches(matches, routeModules, manifest),
    [matches, routeModules, manifest]
  );
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, typeof criticalCss === "string" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("style", { dangerouslySetInnerHTML: { __html: criticalCss } }) : null, typeof criticalCss === "object" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { rel: "stylesheet", href: criticalCss.href }) : null, keyedLinks.map(
    ({ key, link }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrefetchPageLinks, { key, ...link }) : /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { key, ...link })
  ));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let { router } = useDataRouterContext2();
  let matches = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrefetchPageLinksImpl, { page, matches, ...dataLinkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { manifest, routeModules } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(page, basename);
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename,
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, dataHrefs.map((href2) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { key: href2, rel: "prefetch", as: "fetch", href: href2, ...linkProps })), moduleHrefs.map((href2) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { key: href2, rel: "modulepreload", href: href2, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { key, ...link })
  )));
}
function Meta() {
  let { isSpaMode, routeModules } = useFrameworkContext();
  let {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext();
  let location = useLocation();
  let _matches = getActiveMatches(routerMatches, errors, isSpaMode);
  let error = null;
  if (errors) {
    error = errors[_matches[_matches.length - 1].route.id];
  }
  let meta = [];
  let leafMeta = null;
  let matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i];
    let routeId = _match.route.id;
    let data2 = loaderData[routeId];
    let params = _match.params;
    let routeModule = routeModules[routeId];
    let routeMeta = [];
    let match = {
      id: routeId,
      data: data2,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    matches[i] = match;
    if (routeModule?.meta) {
      routeMeta = typeof routeModule.meta === "function" ? routeModule.meta({
        data: data2,
        params,
        location,
        matches,
        error
      }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta;
    } else if (leafMeta) {
      routeMeta = [...leafMeta];
    }
    routeMeta = routeMeta || [];
    if (!Array.isArray(routeMeta)) {
      throw new Error(
        "The route at " + _match.route.path + " returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://remix.run/route/meta"
      );
    }
    match.meta = routeMeta;
    matches[i] = match;
    meta = [...routeMeta];
    leafMeta = meta;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, meta.flat().map((metaProps) => {
    if (!metaProps) {
      return null;
    }
    if ("tagName" in metaProps) {
      let { tagName, ...rest } = metaProps;
      if (!isValidMetaTag(tagName)) {
        console.warn(
          `A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`
        );
        return null;
      }
      let Comp = tagName;
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Comp, { key: JSON.stringify(rest), ...rest });
    }
    if ("title" in metaProps) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("title", { key: "title" }, String(metaProps.title));
    }
    if ("charset" in metaProps) {
      metaProps.charSet ?? (metaProps.charSet = metaProps.charset);
      delete metaProps.charset;
    }
    if ("charSet" in metaProps && metaProps.charSet != null) {
      return typeof metaProps.charSet === "string" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { key: "charSet", charSet: metaProps.charSet }) : null;
    }
    if ("script:ld+json" in metaProps) {
      try {
        let json = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
          "script",
          {
            key: `script:ld+json:${json}`,
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: json }
          }
        );
      } catch (err) {
        return null;
      }
    }
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { key: JSON.stringify(metaProps), ...metaProps });
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName === "string" && /^(meta|link)$/.test(tagName);
}
var isHydrated = false;
function Scripts(props) {
  let { manifest, serverHandoffString, isSpaMode, ssr, renderMeta } = useFrameworkContext();
  let { router, static: isStatic, staticContext } = useDataRouterContext2();
  let { matches: routerMatches } = useDataRouterStateContext();
  let enableFogOfWar = isFogOfWarEnabled(ssr);
  if (renderMeta) {
    renderMeta.didRenderScripts = true;
  }
  let matches = getActiveMatches(routerMatches, null, isSpaMode);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    isHydrated = true;
  }, []);
  let initialScripts = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let streamScript = "window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());";
    let contextScript = staticContext ? `window.__reactRouterContext = ${serverHandoffString};${streamScript}` : " ";
    let routeModulesScript = !isStatic ? " " : `${manifest.hmr?.runtime ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}${!enableFogOfWar ? `import ${JSON.stringify(manifest.url)}` : ""};
${matches.map((match, routeIndex) => {
      let routeVarName = `route${routeIndex}`;
      let manifestEntry = manifest.routes[match.route.id];
      invariant2(manifestEntry, `Route ${match.route.id} not found in manifest`);
      let {
        clientActionModule,
        clientLoaderModule,
        clientMiddlewareModule,
        hydrateFallbackModule,
        module
      } = manifestEntry;
      let chunks = [
        ...clientActionModule ? [
          {
            module: clientActionModule,
            varName: `${routeVarName}_clientAction`
          }
        ] : [],
        ...clientLoaderModule ? [
          {
            module: clientLoaderModule,
            varName: `${routeVarName}_clientLoader`
          }
        ] : [],
        ...clientMiddlewareModule ? [
          {
            module: clientMiddlewareModule,
            varName: `${routeVarName}_clientMiddleware`
          }
        ] : [],
        ...hydrateFallbackModule ? [
          {
            module: hydrateFallbackModule,
            varName: `${routeVarName}_HydrateFallback`
          }
        ] : [],
        { module, varName: `${routeVarName}_main` }
      ];
      if (chunks.length === 1) {
        return `import * as ${routeVarName} from ${JSON.stringify(module)};`;
      }
      let chunkImportsSnippet = chunks.map((chunk) => `import * as ${chunk.varName} from "${chunk.module}";`).join("\n");
      let mergedChunksSnippet = `const ${routeVarName} = {${chunks.map((chunk) => `...${chunk.varName}`).join(",")}};`;
      return [chunkImportsSnippet, mergedChunksSnippet].join("\n");
    }).join("\n")}
  ${enableFogOfWar ? (
      // Inline a minimal manifest with the SSR matches
      `window.__reactRouterManifest = ${JSON.stringify(
        getPartialManifest(manifest, router),
        null,
        2
      )};`
    ) : ""}
  window.__reactRouterRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "script",
      {
        ...props,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: createHtml(contextScript),
        type: void 0
      }
    ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "script",
      {
        ...props,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: createHtml(routeModulesScript),
        type: "module",
        async: true
      }
    ));
  }, []);
  let preloads = isHydrated ? [] : dedupe(
    manifest.entry.imports.concat(
      getModuleLinkHrefs(matches, manifest, {
        includeHydrateFallback: true
      })
    )
  );
  let sri = typeof manifest.sri === "object" ? manifest.sri : {};
  return isHydrated ? null : /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, typeof manifest.sri === "object" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      "rr-importmap": "",
      type: "importmap",
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: JSON.stringify({
          integrity: sri
        })
      }
    }
  ) : null, !enableFogOfWar ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.url,
      crossOrigin: props.crossOrigin,
      integrity: sri[manifest.url],
      suppressHydrationWarning: true
    }
  ) : null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.entry.module,
      crossOrigin: props.crossOrigin,
      integrity: sri[manifest.entry.module],
      suppressHydrationWarning: true
    }
  ), preloads.map((path) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      key: path,
      rel: "modulepreload",
      href: path,
      crossOrigin: props.crossOrigin,
      integrity: sri[path],
      suppressHydrationWarning: true
    }
  )), initialScripts);
}
function dedupe(array) {
  return [...new Set(array)];
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

// lib/dom/lib.tsx
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser) {
    window.__reactRouterVersion = "7.5.0";
  }
} catch (e) {
}
function createBrowserRouter(routes, opts) {
  return createRouter({
    basename: opts?.basename,
    unstable_getContext: opts?.unstable_getContext,
    future: opts?.future,
    history: createBrowserHistory({ window: opts?.window }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes,
    mapRouteProperties,
    dataStrategy: opts?.dataStrategy,
    patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
    window: opts?.window
  }).initialize();
}
function createHashRouter(routes, opts) {
  return createRouter({
    basename: opts?.basename,
    unstable_getContext: opts?.unstable_getContext,
    future: opts?.future,
    history: createHashHistory({ window: opts?.window }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes,
    mapRouteProperties,
    dataStrategy: opts?.dataStrategy,
    patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
    window: opts?.window
  }).initialize();
}
function parseHydrationData() {
  let state = window?.__staticRouterHydrationData;
  if (state && state.errors) {
    state = {
      ...state,
      errors: deserializeErrors(state.errors)
    };
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new ErrorResponseImpl(
        val.status,
        val.statusText,
        val.data,
        val.internal === true
      );
    } else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = "";
            serialized[key] = error;
          } catch (e) {
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = "";
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function BrowserRouter({
  basename,
  children,
  window: window2
}) {
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
    },
    [setStateImpl]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    }
  );
}
function HashRouter({ basename, children, window: window2 }) {
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = createHashHistory({ window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
    },
    [setStateImpl]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    }
  );
}
function HistoryRouter({
  basename,
  children,
  history
}) {
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
    },
    [setStateImpl]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    }
  );
}
HistoryRouter.displayName = "unstable_HistoryRouter";
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    ...rest
  }, forwardedRef) {
    let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
    let absoluteHref;
    let isExternal = false;
    if (typeof to === "string" && isAbsolute) {
      absoluteHref = to;
      if (isBrowser) {
        try {
          let currentUrl = new URL(window.location.href);
          let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
          let path = stripBasename(targetUrl.pathname, basename);
          if (targetUrl.origin === currentUrl.origin && path != null) {
            to = path + targetUrl.search + targetUrl.hash;
          } else {
            isExternal = true;
          }
        } catch (e) {
          warning(
            false,
            `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
          );
        }
      }
    }
    let href2 = useHref(to, { relative });
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: absoluteHref || href2,
          onClick: isExternal || reloadDocument ? onClick : handleClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, link, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrefetchPageLinks, { page: href2 })) : link;
  }
);
Link.displayName = "Link";
var NavLink = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location = useLocation();
    let routerState = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
    let { navigator: navigator2, basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    ...props
  }, forwardedRef) => {
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = submitter?.getAttribute("formmethod") || method;
      submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition
      });
    };
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function ScrollRestoration({
  getKey,
  storageKey,
  ...props
}) {
  let remixContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FrameworkContext);
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  useScrollRestoration({ getKey, storageKey });
  let ssrKey = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => {
      if (!remixContext || !getKey) return null;
      let userKey = getScrollRestorationKey(
        location,
        matches,
        basename,
        getKey
      );
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (!remixContext || remixContext.isSpaMode) {
    return null;
  }
  let restoreScroll = ((storageKey2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key = Math.random().toString(32).slice(2);
      window.history.replaceState({ key }, "");
    }
    try {
      let positions = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
      let storedY = positions[restoreKey || window.history.state.key];
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY);
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(storageKey2);
    }
  }).toString();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      ...props,
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: `(${restoreScroll})(${JSON.stringify(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY
        )}, ${JSON.stringify(ssrKey)})`
      }
    }
  );
}
ScrollRestoration.displayName = "ScrollRestoration";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useDataRouterState2(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError2(hookName));
  return state;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  state,
  preventScrollReset,
  relative,
  viewTransition
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
        navigate(to, {
          replace: replace2,
          state,
          preventScrollReset,
          relative,
          viewTransition
        });
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition
    ]
  );
}
function useSearchParams(defaultInit) {
  warning(
    typeof URLSearchParams !== "undefined",
    `You cannot use the \`useSearchParams\` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.`
  );
  let defaultSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  let location = useLocation();
  let searchParams = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      getSearchParamsForLocation(
        location.search,
        hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current
      )
    ),
    [location.search]
  );
  let navigate = useNavigate();
  let setSearchParams = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (nextInit, navigateOptions) => {
      const newSearchParams = createSearchParams(
        typeof nextInit === "function" ? nextInit(searchParams) : nextInit
      );
      hasSetSearchParamsRef.current = true;
      navigate("?" + newSearchParams, navigateOptions);
    },
    [navigate, searchParams]
  );
  return [searchParams, setSearchParams];
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3("useSubmit" /* UseSubmit */);
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await router.fetch(key, currentRouteId, options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await router.navigate(options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [router, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let routeContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useFetcher({
  key
} = {}) {
  let { router } = useDataRouterContext3("useFetcher" /* UseFetcher */);
  let state = useDataRouterState2("useFetcher" /* UseFetcher */);
  let fetcherData = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FetchersContext);
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeId = route.matches[route.matches.length - 1]?.route.id;
  invariant(fetcherData, `useFetcher must be used inside a FetchersContext`);
  invariant(route, `useFetcher must be used inside a RouteContext`);
  invariant(
    routeId != null,
    `useFetcher can only be used on routes that contain a unique "id"`
  );
  let defaultKey = react__WEBPACK_IMPORTED_MODULE_0__.useId();
  let [fetcherKey, setFetcherKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState(key || defaultKey);
  if (key && key !== fetcherKey) {
    setFetcherKey(key);
  }
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    router.getFetcher(fetcherKey);
    return () => router.deleteFetcher(fetcherKey);
  }, [router, fetcherKey]);
  let load = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (href2, opts) => {
      invariant(routeId, "No routeId available for fetcher.load()");
      await router.fetch(fetcherKey, routeId, href2, opts);
    },
    [fetcherKey, routeId, router]
  );
  let submitImpl = useSubmit();
  let submit = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (target, opts) => {
      await submitImpl(target, {
        ...opts,
        navigate: false,
        fetcherKey
      });
    },
    [fetcherKey, submitImpl]
  );
  let FetcherForm = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let FetcherForm2 = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Form, { ...props, navigate: false, fetcherKey, ref });
      }
    );
    FetcherForm2.displayName = "fetcher.Form";
    return FetcherForm2;
  }, [fetcherKey]);
  let fetcher = state.fetchers.get(fetcherKey) || IDLE_FETCHER;
  let data2 = fetcherData.get(fetcherKey);
  let fetcherWithComponents = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      Form: FetcherForm,
      submit,
      load,
      ...fetcher,
      data: data2
    }),
    [FetcherForm, submit, load, fetcher, data2]
  );
  return fetcherWithComponents;
}
function useFetchers() {
  let state = useDataRouterState2("useFetchers" /* UseFetchers */);
  return Array.from(state.fetchers.entries()).map(([key, fetcher]) => ({
    ...fetcher,
    key
  }));
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
function getScrollRestorationKey(location, matches, basename, getKey) {
  let key = null;
  if (getKey) {
    if (basename !== "/") {
      key = getKey(
        {
          ...location,
          pathname: stripBasename(location.pathname, basename) || location.pathname
        },
        matches
      );
    } else {
      key = getKey(location, matches);
    }
  }
  if (key == null) {
    key = location.key;
  }
  return key;
}
function useScrollRestoration({
  getKey,
  storageKey
} = {}) {
  let { router } = useDataRouterContext3("useScrollRestoration" /* UseScrollRestoration */);
  let { restoreScrollPosition, preventScrollReset } = useDataRouterState2(
    "useScrollRestoration" /* UseScrollRestoration */
  );
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  let navigation = useNavigation();
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  usePageHide(
    react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
      if (navigation.state === "idle") {
        let key = getScrollRestorationKey(location, matches, basename, getKey);
        savedScrollPositions[key] = window.scrollY;
      }
      try {
        sessionStorage.setItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY,
          JSON.stringify(savedScrollPositions)
        );
      } catch (error) {
        warning(
          false,
          `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`
        );
      }
      window.history.scrollRestoration = "auto";
    }, [navigation.state, getKey, basename, location, matches, storageKey])
  );
  if (typeof document !== "undefined") {
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY
        );
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
      }
    }, [storageKey]);
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      let disableScrollRestoration = router?.enableScrollRestoration(
        savedScrollPositions,
        () => window.scrollY,
        getKey ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename, getKey) : void 0
      );
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename, getKey]);
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      if (restoreScrollPosition === false) {
        return;
      }
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      if (location.hash) {
        let el = document.getElementById(
          decodeURIComponent(location.hash.slice(1))
        );
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      if (preventScrollReset === true) {
        return;
      }
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
function useBeforeUnload(callback, options) {
  let { capture } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? { capture } : void 0;
    window.addEventListener("beforeunload", callback, opts);
    return () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
function usePageHide(callback, options) {
  let { capture } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? { capture } : void 0;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function usePrompt({
  when,
  message
}) {
  let blocker = useBlocker(when);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);
      if (proceed) {
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
}
function useViewTransitionState(to, opts = {}) {
  let vtContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext3(
    "useViewTransitionState" /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative: opts.relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}

// lib/dom/server.tsx

function StaticRouter({
  basename,
  children,
  location: locationProp = "/"
}) {
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let action = "POP" /* Pop */;
  let location = {
    pathname: locationProp.pathname || "/",
    search: locationProp.search || "",
    hash: locationProp.hash || "",
    state: locationProp.state != null ? locationProp.state : null,
    key: locationProp.key || "default"
  };
  let staticNavigator = getStatelessNavigator();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location,
      navigationType: action,
      navigator: staticNavigator,
      static: true
    }
  );
}
function StaticRouterProvider({
  context,
  router,
  hydrate = true,
  nonce
}) {
  invariant(
    router && context,
    "You must provide `router` and `context` to <StaticRouterProvider>"
  );
  let dataRouterContext = {
    router,
    navigator: getStatelessNavigator(),
    static: true,
    staticContext: context,
    basename: context.basename || "/"
  };
  let fetchersContext = /* @__PURE__ */ new Map();
  let hydrateScript = "";
  if (hydrate !== false) {
    let data2 = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors(context.errors)
    };
    let json = htmlEscape(JSON.stringify(JSON.stringify(data2)));
    hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json});`;
  }
  let { state } = dataRouterContext.router;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(FetchersContext.Provider, { value: fetchersContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ViewTransitionContext.Provider, { value: { isTransitioning: false } }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename: dataRouterContext.basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator: dataRouterContext.navigator,
      static: dataRouterContext.static
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      DataRoutes2,
      {
        routes: router.routes,
        future: router.future,
        state
      }
    )
  ))))), hydrateScript ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      suppressHydrationWarning: true,
      nonce,
      dangerouslySetInnerHTML: { __html: hydrateScript }
    }
  ) : null);
}
function DataRoutes2({
  routes,
  future,
  state
}) {
  return useRoutesImpl(routes, void 0, state, future);
}
function serializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = { ...val, __type: "RouteErrorResponse" };
    } else if (val instanceof Error) {
      serialized[key] = {
        message: val.message,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.
        ...val.name !== "Error" ? {
          __subType: val.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(
        `You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`
      );
    },
    replace(to) {
      throw new Error(
        `You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`
      );
    },
    go(delta) {
      throw new Error(
        `You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`
      );
    },
    back() {
      throw new Error(
        `You cannot use navigator.back() on the server because it is a stateless environment.`
      );
    },
    forward() {
      throw new Error(
        `You cannot use navigator.forward() on the server because it is a stateless environment.`
      );
    }
  };
}
function createStaticHandler2(routes, opts) {
  return createStaticHandler(routes, {
    ...opts,
    mapRouteProperties
  });
}
function createStaticRouter(routes, context, opts = {}) {
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(
    routes,
    mapRouteProperties,
    void 0,
    manifest
  );
  let matches = context.matches.map((match) => {
    let route = manifest[match.route.id] || match.route;
    return {
      ...match,
      route
    };
  });
  let msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
  return {
    get basename() {
      return context.basename;
    },
    get future() {
      return {
        unstable_middleware: false,
        ...opts?.future
      };
    },
    get state() {
      return {
        historyAction: "POP" /* Pop */,
        location: context.location,
        matches,
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: context.errors,
        initialized: true,
        navigation: IDLE_NAVIGATION,
        restoreScrollPosition: null,
        preventScrollReset: false,
        revalidation: "idle",
        fetchers: /* @__PURE__ */ new Map(),
        blockers: /* @__PURE__ */ new Map()
      };
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return void 0;
    },
    initialize() {
      throw msg("initialize");
    },
    subscribe() {
      throw msg("subscribe");
    },
    enableScrollRestoration() {
      throw msg("enableScrollRestoration");
    },
    navigate() {
      throw msg("navigate");
    },
    fetch() {
      throw msg("fetch");
    },
    revalidate() {
      throw msg("revalidate");
    },
    createHref,
    encodeLocation,
    getFetcher() {
      return IDLE_FETCHER;
    },
    deleteFetcher() {
      throw msg("deleteFetcher");
    },
    dispose() {
      throw msg("dispose");
    },
    getBlocker() {
      return IDLE_BLOCKER;
    },
    deleteBlocker() {
      throw msg("deleteBlocker");
    },
    patchRoutes() {
      throw msg("patchRoutes");
    },
    _internalFetchControllers: /* @__PURE__ */ new Map(),
    _internalSetRoutes() {
      throw msg("_internalSetRoutes");
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : createPath(to);
}
function encodeLocation(to) {
  let href2 = typeof to === "string" ? to : createPath(to);
  href2 = href2.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX3.test(href2) ? new URL(href2) : new URL(href2, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}
var ABSOLUTE_URL_REGEX3 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var ESCAPE_LOOKUP2 = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX2 = /[&><\u2028\u2029]/g;
function htmlEscape(str) {
  return str.replace(ESCAPE_REGEX2, (match) => ESCAPE_LOOKUP2[match]);
}

// lib/dom/ssr/server.tsx

function ServerRouter({
  context,
  url,
  nonce
}) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  let { manifest, routeModules, criticalCss, serverHandoffString } = context;
  let routes = createServerRoutes(
    manifest.routes,
    routeModules,
    context.future,
    context.isSpaMode
  );
  context.staticHandlerContext.loaderData = {
    ...context.staticHandlerContext.loaderData
  };
  for (let match of context.staticHandlerContext.matches) {
    let routeId = match.route.id;
    let route = routeModules[routeId];
    let manifestRoute = context.manifest.routes[routeId];
    if (route && manifestRoute && shouldHydrateRouteLoader(manifestRoute, route, context.isSpaMode) && (route.HydrateFallback || !manifestRoute.hasLoader)) {
      delete context.staticHandlerContext.loaderData[routeId];
    }
  }
  let router = createStaticRouter(routes, context.staticHandlerContext);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    FrameworkContext.Provider,
    {
      value: {
        manifest,
        routeModules,
        criticalCss,
        serverHandoffString,
        future: context.future,
        ssr: context.ssr,
        isSpaMode: context.isSpaMode,
        serializeError: context.serializeError,
        renderMeta: context.renderMeta
      }
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RemixErrorBoundary, { location: router.state.location }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      StaticRouterProvider,
      {
        router,
        context: context.staticHandlerContext,
        hydrate: false
      }
    ))
  ), context.serverHandoffStream ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    StreamTransfer,
    {
      context,
      identifier: 0,
      reader: context.serverHandoffStream.getReader(),
      textDecoder: new TextDecoder(),
      nonce
    }
  )) : null);
}

// lib/dom/ssr/routes-test-stub.tsx

function createRoutesStub(routes, unstable_getContext) {
  return function RoutesTestStub({
    initialEntries,
    initialIndex,
    hydrationData,
    future
  }) {
    let routerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
    let remixContextRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
    if (routerRef.current == null) {
      remixContextRef.current = {
        future: {
          unstable_subResourceIntegrity: future?.unstable_subResourceIntegrity === true,
          unstable_middleware: future?.unstable_middleware === true
        },
        manifest: {
          routes: {},
          entry: { imports: [], module: "" },
          url: "",
          version: ""
        },
        routeModules: {},
        ssr: false,
        isSpaMode: false
      };
      let patched = processRoutes(
        // @ts-expect-error `StubRouteObject` is stricter about `loader`/`action`
        // types compared to `AgnosticRouteObject`
        convertRoutesToDataRoutes(routes, (r) => r),
        remixContextRef.current.manifest,
        remixContextRef.current.routeModules
      );
      routerRef.current = createMemoryRouter(patched, {
        unstable_getContext,
        initialEntries,
        initialIndex,
        hydrationData
      });
    }
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(FrameworkContext.Provider, { value: remixContextRef.current }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouterProvider, { router: routerRef.current }));
  };
}
function processRoutes(routes, manifest, routeModules, parentId) {
  return routes.map((route) => {
    if (!route.id) {
      throw new Error(
        "Expected a route.id in @remix-run/testing processRoutes() function"
      );
    }
    let newRoute = {
      id: route.id,
      path: route.path,
      index: route.index,
      Component: route.Component,
      HydrateFallback: route.HydrateFallback,
      ErrorBoundary: route.ErrorBoundary,
      action: route.action,
      loader: route.loader,
      handle: route.handle,
      shouldRevalidate: route.shouldRevalidate
    };
    let entryRoute = {
      id: route.id,
      path: route.path,
      index: route.index,
      parentId,
      hasAction: route.action != null,
      hasLoader: route.loader != null,
      // When testing routes, you should be stubbing loader/action/middleware,
      // not trying to re-implement the full loader/clientLoader/SSR/hydration
      // flow. That is better tested via E2E tests.
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasErrorBoundary: route.ErrorBoundary != null,
      // any need for these?
      module: "build/stub-path-to-module.js",
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0
    };
    manifest.routes[newRoute.id] = entryRoute;
    routeModules[route.id] = {
      default: route.Component || Outlet,
      ErrorBoundary: route.ErrorBoundary || void 0,
      handle: route.handle,
      links: route.links,
      meta: route.meta,
      shouldRevalidate: route.shouldRevalidate
    };
    if (route.children) {
      newRoute.children = processRoutes(
        route.children,
        manifest,
        routeModules,
        newRoute.id
      );
    }
    return newRoute;
  });
}

// lib/server-runtime/cookies.ts


// lib/server-runtime/crypto.ts
var encoder = new TextEncoder();
var sign = async (value, secret) => {
  let data2 = encoder.encode(value);
  let key = await createKey2(secret, ["sign"]);
  let signature = await crypto.subtle.sign("HMAC", key, data2);
  let hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(
    /=+$/,
    ""
  );
  return value + "." + hash;
};
var unsign = async (cookie, secret) => {
  let index = cookie.lastIndexOf(".");
  let value = cookie.slice(0, index);
  let hash = cookie.slice(index + 1);
  let data2 = encoder.encode(value);
  let key = await createKey2(secret, ["verify"]);
  let signature = byteStringToUint8Array(atob(hash));
  let valid = await crypto.subtle.verify("HMAC", key, signature, data2);
  return valid ? value : false;
};
var createKey2 = async (secret, usages) => crypto.subtle.importKey(
  "raw",
  encoder.encode(secret),
  { name: "HMAC", hash: "SHA-256" },
  false,
  usages
);
function byteStringToUint8Array(byteString) {
  let array = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    array[i] = byteString.charCodeAt(i);
  }
  return array;
}

// lib/server-runtime/cookies.ts
var createCookie = (name, cookieOptions = {}) => {
  let { secrets = [], ...options } = {
    path: "/",
    sameSite: "lax",
    ...cookieOptions
  };
  warnOnceAboutExpiresCookie(name, options.expires);
  return {
    get name() {
      return name;
    },
    get isSigned() {
      return secrets.length > 0;
    },
    get expires() {
      return typeof options.maxAge !== "undefined" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
    },
    async parse(cookieHeader, parseOptions) {
      if (!cookieHeader) return null;
      let cookies = (0,cookie__WEBPACK_IMPORTED_MODULE_2__.parse)(cookieHeader, { ...options, ...parseOptions });
      if (name in cookies) {
        let value = cookies[name];
        if (typeof value === "string" && value !== "") {
          let decoded = await decodeCookieValue(value, secrets);
          return decoded;
        } else {
          return "";
        }
      } else {
        return null;
      }
    },
    async serialize(value, serializeOptions) {
      return (0,cookie__WEBPACK_IMPORTED_MODULE_2__.serialize)(
        name,
        value === "" ? "" : await encodeCookieValue(value, secrets),
        {
          ...options,
          ...serializeOptions
        }
      );
    }
  };
};
var isCookie = (object) => {
  return object != null && typeof object.name === "string" && typeof object.isSigned === "boolean" && typeof object.parse === "function" && typeof object.serialize === "function";
};
async function encodeCookieValue(value, secrets) {
  let encoded = encodeData(value);
  if (secrets.length > 0) {
    encoded = await sign(encoded, secrets[0]);
  }
  return encoded;
}
async function decodeCookieValue(value, secrets) {
  if (secrets.length > 0) {
    for (let secret of secrets) {
      let unsignedValue = await unsign(value, secret);
      if (unsignedValue !== false) {
        return decodeData(unsignedValue);
      }
    }
    return null;
  }
  return decodeData(value);
}
function encodeData(value) {
  return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));
}
function decodeData(value) {
  try {
    return JSON.parse(decodeURIComponent(myEscape(atob(value))));
  } catch (error) {
    return {};
  }
}
function myEscape(value) {
  let str = value.toString();
  let result = "";
  let index = 0;
  let chr, code;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (/[\w*+\-./@]/.exec(chr)) {
      result += chr;
    } else {
      code = chr.charCodeAt(0);
      if (code < 256) {
        result += "%" + hex(code, 2);
      } else {
        result += "%u" + hex(code, 4).toUpperCase();
      }
    }
  }
  return result;
}
function hex(code, length) {
  let result = code.toString(16);
  while (result.length < length) result = "0" + result;
  return result;
}
function myUnescape(value) {
  let str = value.toString();
  let result = "";
  let index = 0;
  let chr, part;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (chr === "%") {
      if (str.charAt(index) === "u") {
        part = str.slice(index + 1, index + 5);
        if (/^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 5;
          continue;
        }
      } else {
        part = str.slice(index, index + 2);
        if (/^[\da-f]{2}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 2;
          continue;
        }
      }
    }
    result += chr;
  }
  return result;
}
function warnOnceAboutExpiresCookie(name, expires) {
  warnOnce(
    !expires,
    `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`
  );
}

// lib/server-runtime/entry.ts
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo2, routeId) => {
    let route = manifest[routeId];
    if (route) {
      memo2[routeId] = route.module;
    }
    return memo2;
  }, {});
}

// lib/server-runtime/mode.ts
var ServerMode = /* @__PURE__ */ ((ServerMode2) => {
  ServerMode2["Development"] = "development";
  ServerMode2["Production"] = "production";
  ServerMode2["Test"] = "test";
  return ServerMode2;
})(ServerMode || {});
function isServerMode(value) {
  return value === "development" /* Development */ || value === "production" /* Production */ || value === "test" /* Test */;
}

// lib/server-runtime/errors.ts
function sanitizeError(error, serverMode) {
  if (error instanceof Error && serverMode !== "development" /* Development */) {
    let sanitized = new Error("Unexpected Server Error");
    sanitized.stack = void 0;
    return sanitized;
  }
  return error;
}
function sanitizeErrors(errors, serverMode) {
  return Object.entries(errors).reduce((acc, [routeId, error]) => {
    return Object.assign(acc, { [routeId]: sanitizeError(error, serverMode) });
  }, {});
}
function serializeError(error, serverMode) {
  let sanitized = sanitizeError(error, serverMode);
  return {
    message: sanitized.message,
    stack: sanitized.stack
  };
}
function serializeErrors2(errors, serverMode) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = { ...val, __type: "RouteErrorResponse" };
    } else if (val instanceof Error) {
      let sanitized = sanitizeError(val, serverMode);
      serialized[key] = {
        message: sanitized.message,
        stack: sanitized.stack,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.  This will only apply
        // in dev mode since all production errors are sanitized to normal
        // Error instances
        ...sanitized.name !== "Error" ? {
          __subType: sanitized.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}

// lib/server-runtime/routeMatching.ts
function matchServerRoutes(routes, pathname, basename) {
  let matches = matchRoutes(
    routes,
    pathname,
    basename
  );
  if (!matches) return null;
  return matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route
  }));
}

// lib/server-runtime/data.ts
async function callRouteHandler(handler, args) {
  let result = await handler({
    request: stripRoutesParam(stripIndexParam2(args.request)),
    params: args.params,
    context: args.context
  });
  if (isDataWithResponseInit(result) && result.init && result.init.status && isRedirectStatusCode(result.init.status)) {
    throw new Response(null, result.init);
  }
  return result;
}
function stripIndexParam2(request) {
  let url = new URL(request.url);
  let indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  let init = {
    method: request.method,
    body: request.body,
    headers: request.headers,
    signal: request.signal
  };
  if (init.body) {
    init.duplex = "half";
  }
  return new Request(url.href, init);
}
function stripRoutesParam(request) {
  let url = new URL(request.url);
  url.searchParams.delete("_routes");
  let init = {
    method: request.method,
    body: request.body,
    headers: request.headers,
    signal: request.signal
  };
  if (init.body) {
    init.duplex = "half";
  }
  return new Request(url.href, init);
}

// lib/server-runtime/invariant.ts
function invariant3(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    console.error(
      "The following error is a bug in React Router; please open an issue! https://github.com/remix-run/react-router/issues/new/choose"
    );
    throw new Error(message);
  }
}

// lib/server-runtime/routes.ts
function groupRoutesByParentId2(manifest) {
  let routes = {};
  Object.values(manifest).forEach((route) => {
    if (route) {
      let parentId = route.parentId || "";
      if (!routes[parentId]) {
        routes[parentId] = [];
      }
      routes[parentId].push(route);
    }
  });
  return routes;
}
function createRoutes(manifest, parentId = "", routesByParentId = groupRoutesByParentId2(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => ({
    ...route,
    children: createRoutes(manifest, route.id, routesByParentId)
  }));
}
function createStaticHandlerDataRoutes(manifest, future, parentId = "", routesByParentId = groupRoutesByParentId2(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let commonRoute = {
      // Always include root due to default boundaries
      hasErrorBoundary: route.id === "root" || route.module.ErrorBoundary != null,
      id: route.id,
      path: route.path,
      unstable_middleware: route.module.unstable_middleware,
      // Need to use RR's version in the param typed here to permit the optional
      // context even though we know it'll always be provided in remix
      loader: route.module.loader ? async (args) => {
        if (args.request.headers.has("X-React-Router-Prerender-Data")) {
          const preRenderedData = args.request.headers.get(
            "X-React-Router-Prerender-Data"
          );
          let encoded = preRenderedData ? decodeURI(preRenderedData) : preRenderedData;
          invariant3(encoded, "Missing prerendered data for route");
          let uint8array = new TextEncoder().encode(encoded);
          let stream = new ReadableStream({
            start(controller) {
              controller.enqueue(uint8array);
              controller.close();
            }
          });
          let decoded = await decodeViaTurboStream(stream, global);
          let data2 = decoded.value;
          invariant3(
            data2 && route.id in data2,
            "Unable to decode prerendered data"
          );
          let result = data2[route.id];
          invariant3("data" in result, "Unable to process prerendered data");
          return result.data;
        }
        let val = await callRouteHandler(route.module.loader, args);
        return val;
      } : void 0,
      action: route.module.action ? (args) => callRouteHandler(route.module.action, args) : void 0,
      handle: route.module.handle
    };
    return route.index ? {
      index: true,
      ...commonRoute
    } : {
      caseSensitive: route.caseSensitive,
      children: createStaticHandlerDataRoutes(
        manifest,
        future,
        route.id,
        routesByParentId
      ),
      ...commonRoute
    };
  });
}

// lib/server-runtime/markup.ts
var ESCAPE_LOOKUP3 = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX3 = /[&><\u2028\u2029]/g;
function escapeHtml2(html) {
  return html.replace(ESCAPE_REGEX3, (match) => ESCAPE_LOOKUP3[match]);
}

// lib/server-runtime/serverHandoff.ts
function createServerHandoffString(serverHandoff) {
  return escapeHtml2(JSON.stringify(serverHandoff));
}

// lib/server-runtime/dev.ts
var globalDevServerHooksKey = "__reactRouterDevServerHooks";
function setDevServerHooks(devServerHooks) {
  globalThis[globalDevServerHooksKey] = devServerHooks;
}
function getDevServerHooks() {
  return globalThis[globalDevServerHooksKey];
}

// lib/server-runtime/single-fetch.ts


// lib/server-runtime/headers.ts

function getDocumentHeaders(build, context) {
  let boundaryIdx = context.errors ? context.matches.findIndex((m) => context.errors[m.route.id]) : -1;
  let matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches;
  let errorHeaders;
  if (boundaryIdx >= 0) {
    let { actionHeaders, actionData, loaderHeaders, loaderData } = context;
    context.matches.slice(boundaryIdx).some((match) => {
      let id = match.route.id;
      if (actionHeaders[id] && (!actionData || !actionData.hasOwnProperty(id))) {
        errorHeaders = actionHeaders[id];
      } else if (loaderHeaders[id] && !loaderData.hasOwnProperty(id)) {
        errorHeaders = loaderHeaders[id];
      }
      return errorHeaders != null;
    });
  }
  return matches.reduce((parentHeaders, match, idx) => {
    let { id } = match.route;
    let route = build.routes[id];
    invariant3(route, `Route with id "${id}" not found in build`);
    let routeModule = route.module;
    let loaderHeaders = context.loaderHeaders[id] || new Headers();
    let actionHeaders = context.actionHeaders[id] || new Headers();
    let includeErrorHeaders = errorHeaders != null && idx === matches.length - 1;
    let includeErrorCookies = includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders;
    if (routeModule.headers == null) {
      let headers2 = new Headers(parentHeaders);
      if (includeErrorCookies) {
        prependCookies(errorHeaders, headers2);
      }
      prependCookies(actionHeaders, headers2);
      prependCookies(loaderHeaders, headers2);
      return headers2;
    }
    let headers = new Headers(
      routeModule.headers ? typeof routeModule.headers === "function" ? routeModule.headers({
        loaderHeaders,
        parentHeaders,
        actionHeaders,
        errorHeaders: includeErrorHeaders ? errorHeaders : void 0
      }) : routeModule.headers : void 0
    );
    if (includeErrorCookies) {
      prependCookies(errorHeaders, headers);
    }
    prependCookies(actionHeaders, headers);
    prependCookies(loaderHeaders, headers);
    prependCookies(parentHeaders, headers);
    return headers;
  }, new Headers());
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  if (parentSetCookieString) {
    let cookies = (0,set_cookie_parser__WEBPACK_IMPORTED_MODULE_3__.splitCookiesString)(parentSetCookieString);
    let childCookies = new Set(childHeaders.getSetCookie());
    cookies.forEach((cookie) => {
      if (!childCookies.has(cookie)) {
        childHeaders.append("Set-Cookie", cookie);
      }
    });
  }
}

// lib/server-runtime/single-fetch.ts
var NO_BODY_STATUS_CODES = /* @__PURE__ */ new Set([100, 101, 204, 205, 304]);
var SINGLE_FETCH_REDIRECT_STATUS = 202;
async function singleFetchAction(build, serverMode, staticHandler, request, handlerUrl, loadContext, handleError) {
  try {
    let respond2 = function(context) {
      let headers = getDocumentHeaders(build, context);
      if (isRedirectStatusCode(context.statusCode) && headers.has("Location")) {
        return generateSingleFetchResponse(request, build, serverMode, {
          result: getSingleFetchRedirect(
            context.statusCode,
            headers,
            build.basename
          ),
          headers,
          status: SINGLE_FETCH_REDIRECT_STATUS
        });
      }
      if (context.errors) {
        Object.values(context.errors).forEach((err) => {
          if (!isRouteErrorResponse(err) || err.error) {
            handleError(err);
          }
        });
        context.errors = sanitizeErrors(context.errors, serverMode);
      }
      let singleFetchResult;
      if (context.errors) {
        singleFetchResult = { error: Object.values(context.errors)[0] };
      } else {
        singleFetchResult = {
          data: Object.values(context.actionData || {})[0]
        };
      }
      return generateSingleFetchResponse(request, build, serverMode, {
        result: singleFetchResult,
        headers,
        status: context.statusCode
      });
    };
    var respond = respond2;
    let handlerRequest = new Request(handlerUrl, {
      method: request.method,
      body: request.body,
      headers: request.headers,
      signal: request.signal,
      ...request.body ? { duplex: "half" } : void 0
    });
    let result = await staticHandler.query(handlerRequest, {
      requestContext: loadContext,
      skipLoaderErrorBubbling: true,
      skipRevalidation: true,
      unstable_respond: respond2
    });
    if (!isResponse(result)) {
      result = respond2(result);
    }
    if (isRedirectResponse(result)) {
      return generateSingleFetchResponse(request, build, serverMode, {
        result: getSingleFetchRedirect(
          result.status,
          result.headers,
          build.basename
        ),
        headers: result.headers,
        status: SINGLE_FETCH_REDIRECT_STATUS
      });
    }
    return result;
  } catch (error) {
    handleError(error);
    return generateSingleFetchResponse(request, build, serverMode, {
      result: { error },
      headers: new Headers(),
      status: 500
    });
  }
}
async function singleFetchLoaders(build, serverMode, staticHandler, request, handlerUrl, loadContext, handleError) {
  try {
    let respond2 = function(context) {
      let headers = getDocumentHeaders(build, context);
      if (isRedirectStatusCode(context.statusCode) && headers.has("Location")) {
        return generateSingleFetchResponse(request, build, serverMode, {
          result: {
            [SingleFetchRedirectSymbol]: getSingleFetchRedirect(
              context.statusCode,
              headers,
              build.basename
            )
          },
          headers,
          status: SINGLE_FETCH_REDIRECT_STATUS
        });
      }
      if (context.errors) {
        Object.values(context.errors).forEach((err) => {
          if (!isRouteErrorResponse(err) || err.error) {
            handleError(err);
          }
        });
        context.errors = sanitizeErrors(context.errors, serverMode);
      }
      let results = {};
      let loadedMatches = new Set(
        context.matches.filter(
          (m) => loadRouteIds ? loadRouteIds.has(m.route.id) : m.route.loader != null
        ).map((m) => m.route.id)
      );
      if (context.errors) {
        for (let [id, error] of Object.entries(context.errors)) {
          results[id] = { error };
        }
      }
      for (let [id, data2] of Object.entries(context.loaderData)) {
        if (!(id in results) && loadedMatches.has(id)) {
          results[id] = { data: data2 };
        }
      }
      return generateSingleFetchResponse(request, build, serverMode, {
        result: results,
        headers,
        status: context.statusCode
      });
    };
    var respond = respond2;
    let handlerRequest = new Request(handlerUrl, {
      headers: request.headers,
      signal: request.signal
    });
    let routesParam = new URL(request.url).searchParams.get("_routes");
    let loadRouteIds = routesParam ? new Set(routesParam.split(",")) : null;
    let result = await staticHandler.query(handlerRequest, {
      requestContext: loadContext,
      filterMatchesToLoad: (m) => !loadRouteIds || loadRouteIds.has(m.route.id),
      skipLoaderErrorBubbling: true,
      unstable_respond: respond2
    });
    if (!isResponse(result)) {
      result = respond2(result);
    }
    if (isRedirectResponse(result)) {
      return generateSingleFetchResponse(request, build, serverMode, {
        result: {
          [SingleFetchRedirectSymbol]: getSingleFetchRedirect(
            result.status,
            result.headers,
            build.basename
          )
        },
        headers: result.headers,
        status: SINGLE_FETCH_REDIRECT_STATUS
      });
    }
    return result;
  } catch (error) {
    handleError(error);
    return generateSingleFetchResponse(request, build, serverMode, {
      result: { root: { error } },
      headers: new Headers(),
      status: 500
    });
  }
}
function generateSingleFetchResponse(request, build, serverMode, {
  result,
  headers,
  status
}) {
  let resultHeaders = new Headers(headers);
  resultHeaders.set("X-Remix-Response", "yes");
  if (NO_BODY_STATUS_CODES.has(status)) {
    return new Response(null, { status, headers: resultHeaders });
  }
  resultHeaders.set("Content-Type", "text/x-script");
  return new Response(
    encodeViaTurboStream(
      result,
      request.signal,
      build.entry.module.streamTimeout,
      serverMode
    ),
    {
      status: status || 200,
      headers: resultHeaders
    }
  );
}
function getSingleFetchRedirect(status, headers, basename) {
  let redirect2 = headers.get("Location");
  if (basename) {
    redirect2 = stripBasename(redirect2, basename) || redirect2;
  }
  return {
    redirect: redirect2,
    status,
    revalidate: (
      // Technically X-Remix-Revalidate isn't needed here - that was an implementation
      // detail of ?_data requests as our way to tell the front end to revalidate when
      // we didn't have a response body to include that information in.
      // With single fetch, we tell the front end via this revalidate boolean field.
      // However, we're respecting it for now because it may be something folks have
      // used in their own responses
      // TODO(v3): Consider removing or making this official public API
      headers.has("X-Remix-Revalidate") || headers.has("Set-Cookie")
    ),
    reload: headers.has("X-Remix-Reload-Document"),
    replace: headers.has("X-Remix-Replace")
  };
}
function encodeViaTurboStream(data2, requestSignal, streamTimeout, serverMode) {
  let controller = new AbortController();
  let timeoutId = setTimeout(
    () => controller.abort(new Error("Server Timeout")),
    typeof streamTimeout === "number" ? streamTimeout : 4950
  );
  requestSignal.addEventListener("abort", () => clearTimeout(timeoutId));
  return (0,turbo_stream__WEBPACK_IMPORTED_MODULE_1__.encode)(data2, {
    signal: controller.signal,
    plugins: [
      (value) => {
        if (value instanceof Error) {
          let { name, message, stack } = serverMode === "production" /* Production */ ? sanitizeError(value, serverMode) : value;
          return ["SanitizedError", name, message, stack];
        }
        if (value instanceof ErrorResponseImpl) {
          let { data: data3, status, statusText } = value;
          return ["ErrorResponse", data3, status, statusText];
        }
        if (value && typeof value === "object" && SingleFetchRedirectSymbol in value) {
          return ["SingleFetchRedirect", value[SingleFetchRedirectSymbol]];
        }
      }
    ],
    postPlugins: [
      (value) => {
        if (!value) return;
        if (typeof value !== "object") return;
        return [
          "SingleFetchClassInstance",
          Object.fromEntries(Object.entries(value))
        ];
      },
      () => ["SingleFetchFallback"]
    ]
  });
}

// lib/server-runtime/server.ts
function derive(build, mode) {
  let routes = createRoutes(build.routes);
  let dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future);
  let serverMode = isServerMode(mode) ? mode : "production" /* Production */;
  let staticHandler = createStaticHandler(dataRoutes, {
    basename: build.basename
  });
  let errorHandler = build.entry.module.handleError || ((error, { request }) => {
    if (serverMode !== "test" /* Test */ && !request.signal.aborted) {
      console.error(
        // @ts-expect-error This is "private" from users but intended for internal use
        isRouteErrorResponse(error) && error.error ? error.error : error
      );
    }
  });
  return {
    routes,
    dataRoutes,
    serverMode,
    staticHandler,
    errorHandler
  };
}
var createRequestHandler = (build, mode) => {
  let _build;
  let routes;
  let serverMode;
  let staticHandler;
  let errorHandler;
  return async function requestHandler(request, initialContext) {
    _build = typeof build === "function" ? await build() : build;
    let loadContext = _build.future.unstable_middleware ? new unstable_RouterContextProvider(
      initialContext
    ) : initialContext || {};
    if (typeof build === "function") {
      let derived = derive(_build, mode);
      routes = derived.routes;
      serverMode = derived.serverMode;
      staticHandler = derived.staticHandler;
      errorHandler = derived.errorHandler;
    } else if (!routes || !serverMode || !staticHandler || !errorHandler) {
      let derived = derive(_build, mode);
      routes = derived.routes;
      serverMode = derived.serverMode;
      staticHandler = derived.staticHandler;
      errorHandler = derived.errorHandler;
    }
    let url = new URL(request.url);
    let normalizedBasename = _build.basename || "/";
    let normalizedPath = url.pathname;
    if (stripBasename(normalizedPath, normalizedBasename) === "/_root.data") {
      normalizedPath = normalizedBasename;
    } else if (normalizedPath.endsWith(".data")) {
      normalizedPath = normalizedPath.replace(/\.data$/, "");
    }
    if (stripBasename(normalizedPath, normalizedBasename) !== "/" && normalizedPath.endsWith("/")) {
      normalizedPath = normalizedPath.slice(0, -1);
    }
    let params = {};
    let handleError = (error) => {
      if (mode === "development" /* Development */) {
        getDevServerHooks()?.processRequestError?.(error);
      }
      errorHandler(error, {
        context: loadContext,
        params,
        request
      });
    };
    if (!_build.ssr) {
      if (_build.prerender.length === 0) {
        request.headers.set("X-React-Router-SPA-Mode", "yes");
      } else if (!_build.prerender.includes(normalizedPath) && !_build.prerender.includes(normalizedPath + "/")) {
        if (url.pathname.endsWith(".data")) {
          errorHandler(
            new ErrorResponseImpl(
              404,
              "Not Found",
              `Refusing to SSR the path \`${normalizedPath}\` because \`ssr:false\` is set and the path is not included in the \`prerender\` config, so in production the path will be a 404.`
            ),
            {
              context: loadContext,
              params,
              request
            }
          );
          return new Response("Not Found", {
            status: 404,
            statusText: "Not Found"
          });
        } else {
          request.headers.set("X-React-Router-SPA-Mode", "yes");
        }
      }
    }
    let manifestUrl = `${normalizedBasename}/__manifest`.replace(/\/+/g, "/");
    if (url.pathname === manifestUrl) {
      try {
        let res = await handleManifestRequest(_build, routes, url);
        return res;
      } catch (e) {
        handleError(e);
        return new Response("Unknown Server Error", { status: 500 });
      }
    }
    let matches = matchServerRoutes(routes, url.pathname, _build.basename);
    if (matches && matches.length > 0) {
      Object.assign(params, matches[0].params);
    }
    let response;
    if (url.pathname.endsWith(".data")) {
      let handlerUrl = new URL(request.url);
      handlerUrl.pathname = normalizedPath;
      let singleFetchMatches = matchServerRoutes(
        routes,
        handlerUrl.pathname,
        _build.basename
      );
      response = await handleSingleFetchRequest(
        serverMode,
        _build,
        staticHandler,
        request,
        handlerUrl,
        loadContext,
        handleError
      );
      if (_build.entry.module.handleDataRequest) {
        response = await _build.entry.module.handleDataRequest(response, {
          context: loadContext,
          params: singleFetchMatches ? singleFetchMatches[0].params : {},
          request
        });
        if (isRedirectResponse(response)) {
          let result = getSingleFetchRedirect(
            response.status,
            response.headers,
            _build.basename
          );
          if (request.method === "GET") {
            result = {
              [SingleFetchRedirectSymbol]: result
            };
          }
          let headers = new Headers(response.headers);
          headers.set("Content-Type", "text/x-script");
          return new Response(
            encodeViaTurboStream(
              result,
              request.signal,
              _build.entry.module.streamTimeout,
              serverMode
            ),
            {
              status: SINGLE_FETCH_REDIRECT_STATUS,
              headers
            }
          );
        }
      }
    } else if (!request.headers.has("X-React-Router-SPA-Mode") && matches && matches[matches.length - 1].route.module.default == null && matches[matches.length - 1].route.module.ErrorBoundary == null) {
      response = await handleResourceRequest(
        serverMode,
        _build,
        staticHandler,
        matches.slice(-1)[0].route.id,
        request,
        loadContext,
        handleError
      );
    } else {
      let { pathname } = url;
      let criticalCss = void 0;
      if (_build.unstable_getCriticalCss) {
        criticalCss = await _build.unstable_getCriticalCss({ pathname });
      } else if (mode === "development" /* Development */ && getDevServerHooks()?.getCriticalCss) {
        criticalCss = await getDevServerHooks()?.getCriticalCss?.(pathname);
      }
      response = await handleDocumentRequest(
        serverMode,
        _build,
        staticHandler,
        request,
        loadContext,
        handleError,
        criticalCss
      );
    }
    if (request.method === "HEAD") {
      return new Response(null, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
      });
    }
    return response;
  };
};
async function handleManifestRequest(build, routes, url) {
  if (build.assets.version !== url.searchParams.get("version")) {
    return new Response(null, {
      status: 204,
      headers: {
        "X-Remix-Reload-Document": "true"
      }
    });
  }
  let patches = {};
  if (url.searchParams.has("p")) {
    let paths = /* @__PURE__ */ new Set();
    url.searchParams.getAll("p").forEach((path) => {
      if (!path.startsWith("/")) {
        path = `/${path}`;
      }
      let segments = path.split("/").slice(1);
      segments.forEach((_, i) => {
        let partialPath = segments.slice(0, i + 1).join("/");
        paths.add(`/${partialPath}`);
      });
    });
    for (let path of paths) {
      let matches = matchServerRoutes(routes, path, build.basename);
      if (matches) {
        for (let match of matches) {
          let routeId = match.route.id;
          let route = build.assets.routes[routeId];
          if (route) {
            patches[routeId] = route;
          }
        }
      }
    }
    return Response.json(patches, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  }
  return new Response("Invalid Request", { status: 400 });
}
async function handleSingleFetchRequest(serverMode, build, staticHandler, request, handlerUrl, loadContext, handleError) {
  let response = request.method !== "GET" ? await singleFetchAction(
    build,
    serverMode,
    staticHandler,
    request,
    handlerUrl,
    loadContext,
    handleError
  ) : await singleFetchLoaders(
    build,
    serverMode,
    staticHandler,
    request,
    handlerUrl,
    loadContext,
    handleError
  );
  return response;
}
async function handleDocumentRequest(serverMode, build, staticHandler, request, loadContext, handleError, criticalCss) {
  let isSpaMode = request.headers.has("X-React-Router-SPA-Mode");
  try {
    let response = await staticHandler.query(request, {
      requestContext: loadContext,
      unstable_respond: build.future.unstable_middleware ? (ctx) => renderHtml(ctx, isSpaMode) : void 0
    });
    return isResponse(response) ? response : renderHtml(response, isSpaMode);
  } catch (error) {
    handleError(error);
    return new Response(null, { status: 500 });
  }
  async function renderHtml(context, isSpaMode2) {
    if (isResponse(context)) {
      return context;
    }
    let headers = getDocumentHeaders(build, context);
    if (NO_BODY_STATUS_CODES.has(context.statusCode)) {
      return new Response(null, { status: context.statusCode, headers });
    }
    if (context.errors) {
      Object.values(context.errors).forEach((err) => {
        if (!isRouteErrorResponse(err) || err.error) {
          handleError(err);
        }
      });
      context.errors = sanitizeErrors(context.errors, serverMode);
    }
    let state = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors2(context.errors, serverMode)
    };
    let entryContext = {
      manifest: build.assets,
      routeModules: createEntryRouteModules(build.routes),
      staticHandlerContext: context,
      criticalCss,
      serverHandoffString: createServerHandoffString({
        basename: build.basename,
        criticalCss,
        future: build.future,
        ssr: build.ssr,
        isSpaMode: isSpaMode2
      }),
      serverHandoffStream: encodeViaTurboStream(
        state,
        request.signal,
        build.entry.module.streamTimeout,
        serverMode
      ),
      renderMeta: {},
      future: build.future,
      ssr: build.ssr,
      isSpaMode: isSpaMode2,
      serializeError: (err) => serializeError(err, serverMode)
    };
    let handleDocumentRequestFunction = build.entry.module.default;
    try {
      return await handleDocumentRequestFunction(
        request,
        context.statusCode,
        headers,
        entryContext,
        loadContext
      );
    } catch (error) {
      handleError(error);
      let errorForSecondRender = error;
      if (isResponse(error)) {
        try {
          let data2 = await unwrapResponse(error);
          errorForSecondRender = new ErrorResponseImpl(
            error.status,
            error.statusText,
            data2
          );
        } catch (e) {
        }
      }
      context = getStaticContextFromError(
        staticHandler.dataRoutes,
        context,
        errorForSecondRender
      );
      if (context.errors) {
        context.errors = sanitizeErrors(context.errors, serverMode);
      }
      let state2 = {
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: serializeErrors2(context.errors, serverMode)
      };
      entryContext = {
        ...entryContext,
        staticHandlerContext: context,
        serverHandoffString: createServerHandoffString({
          basename: build.basename,
          future: build.future,
          ssr: build.ssr,
          isSpaMode: isSpaMode2
        }),
        serverHandoffStream: encodeViaTurboStream(
          state2,
          request.signal,
          build.entry.module.streamTimeout,
          serverMode
        ),
        renderMeta: {}
      };
      try {
        return await handleDocumentRequestFunction(
          request,
          context.statusCode,
          headers,
          entryContext,
          loadContext
        );
      } catch (error2) {
        handleError(error2);
        return returnLastResortErrorResponse(error2, serverMode);
      }
    }
  }
}
async function handleResourceRequest(serverMode, build, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext,
      unstable_respond: build.future.unstable_middleware ? (ctx) => ctx : void 0
    });
    if (isResponse(response)) {
      return response;
    }
    if (typeof response === "string") {
      return new Response(response);
    }
    return Response.json(response);
  } catch (error) {
    if (isResponse(error)) {
      error.headers.set("X-Remix-Catch", "yes");
      return error;
    }
    if (isRouteErrorResponse(error)) {
      if (error) {
        handleError(error);
      }
      return errorResponseToJson(error, serverMode);
    }
    if (error instanceof Error && error.message === "Expected a response from queryRoute") {
      let newError = new Error(
        "Expected a Response to be returned from resource route handler"
      );
      handleError(newError);
      return returnLastResortErrorResponse(newError, serverMode);
    }
    handleError(error);
    return returnLastResortErrorResponse(error, serverMode);
  }
}
function errorResponseToJson(errorResponse, serverMode) {
  return Response.json(
    serializeError(
      // @ts-expect-error This is "private" from users but intended for internal use
      errorResponse.error || new Error("Unexpected Server Error"),
      serverMode
    ),
    {
      status: errorResponse.status,
      statusText: errorResponse.statusText,
      headers: {
        "X-Remix-Error": "yes"
      }
    }
  );
}
function returnLastResortErrorResponse(error, serverMode) {
  let message = "Unexpected Server Error";
  if (serverMode !== "production" /* Production */) {
    message += `

${String(error)}`;
  }
  return new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
function unwrapResponse(response) {
  let contentType = response.headers.get("Content-Type");
  return contentType && /\bapplication\/json\b/.test(contentType) ? response.body == null ? null : response.json() : response.text();
}

// lib/server-runtime/sessions.ts
function flash(name) {
  return `__flash_${name}__`;
}
var createSession = (initialData = {}, id = "") => {
  let map = new Map(Object.entries(initialData));
  return {
    get id() {
      return id;
    },
    get data() {
      return Object.fromEntries(map);
    },
    has(name) {
      return map.has(name) || map.has(flash(name));
    },
    get(name) {
      if (map.has(name)) return map.get(name);
      let flashName = flash(name);
      if (map.has(flashName)) {
        let value = map.get(flashName);
        map.delete(flashName);
        return value;
      }
      return void 0;
    },
    set(name, value) {
      map.set(name, value);
    },
    flash(name, value) {
      map.set(flash(name), value);
    },
    unset(name) {
      map.delete(name);
    }
  };
};
var isSession = (object) => {
  return object != null && typeof object.id === "string" && typeof object.data !== "undefined" && typeof object.has === "function" && typeof object.get === "function" && typeof object.set === "function" && typeof object.flash === "function" && typeof object.unset === "function";
};
function createSessionStorage({
  cookie: cookieArg,
  createData,
  readData,
  updateData,
  deleteData
}) {
  let cookie = isCookie(cookieArg) ? cookieArg : createCookie(cookieArg?.name || "__session", cookieArg);
  warnOnceAboutSigningSessionCookie(cookie);
  return {
    async getSession(cookieHeader, options) {
      let id = cookieHeader && await cookie.parse(cookieHeader, options);
      let data2 = id && await readData(id);
      return createSession(data2 || {}, id || "");
    },
    async commitSession(session, options) {
      let { id, data: data2 } = session;
      let expires = options?.maxAge != null ? new Date(Date.now() + options.maxAge * 1e3) : options?.expires != null ? options.expires : cookie.expires;
      if (id) {
        await updateData(id, data2, expires);
      } else {
        id = await createData(data2, expires);
      }
      return cookie.serialize(id, options);
    },
    async destroySession(session, options) {
      await deleteData(session.id);
      return cookie.serialize("", {
        ...options,
        maxAge: void 0,
        expires: /* @__PURE__ */ new Date(0)
      });
    }
  };
}
function warnOnceAboutSigningSessionCookie(cookie) {
  warnOnce(
    cookie.isSigned,
    `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`
  );
}

// lib/server-runtime/sessions/cookieStorage.ts
function createCookieSessionStorage({ cookie: cookieArg } = {}) {
  let cookie = isCookie(cookieArg) ? cookieArg : createCookie(cookieArg?.name || "__session", cookieArg);
  warnOnceAboutSigningSessionCookie(cookie);
  return {
    async getSession(cookieHeader, options) {
      return createSession(
        cookieHeader && await cookie.parse(cookieHeader, options) || {}
      );
    },
    async commitSession(session, options) {
      let serializedCookie = await cookie.serialize(session.data, options);
      if (serializedCookie.length > 4096) {
        throw new Error(
          "Cookie length will exceed browser maximum. Length: " + serializedCookie.length
        );
      }
      return serializedCookie;
    },
    async destroySession(_session, options) {
      return cookie.serialize("", {
        ...options,
        maxAge: void 0,
        expires: /* @__PURE__ */ new Date(0)
      });
    }
  };
}

// lib/server-runtime/sessions/memoryStorage.ts
function createMemorySessionStorage({ cookie } = {}) {
  let map = /* @__PURE__ */ new Map();
  return createSessionStorage({
    cookie,
    async createData(data2, expires) {
      let id = Math.random().toString(36).substring(2, 10);
      map.set(id, { data: data2, expires });
      return id;
    },
    async readData(id) {
      if (map.has(id)) {
        let { data: data2, expires } = map.get(id);
        if (!expires || expires > /* @__PURE__ */ new Date()) {
          return data2;
        }
        if (expires) map.delete(id);
      }
      return null;
    },
    async updateData(id, data2, expires) {
      map.set(id, { data: data2, expires });
    },
    async deleteData(id) {
      map.delete(id);
    }
  });
}

// lib/href.ts
function href(path, ...args) {
  let params = args[0];
  return path.split("/").map((segment) => {
    const match = segment.match(/^:([\w-]+)(\?)?/);
    if (!match) return segment;
    const param = match[1];
    const value = params ? params[param] : void 0;
    const isRequired = match[2] === void 0;
    if (isRequired && value === void 0) {
      throw Error(
        `Path '${path}' requires param '${param}' but it was not provided`
      );
    }
    return value;
  }).filter((segment) => segment !== void 0).join("/");
}

// lib/dom/ssr/errors.ts
function deserializeErrors2(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new ErrorResponseImpl(
        val.status,
        val.statusText,
        val.data,
        val.internal === true
      );
    } else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = val.stack;
            serialized[key] = error;
          } catch (e) {
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = val.stack;
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}




/***/ }),

/***/ "./node_modules/react-router/node_modules/cookie/dist/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/react-router/node_modules/cookie/dist/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parse = parse;
exports.serialize = serialize;
/**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 *
 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
 * Allow same range as cookie value, except `=`, which delimits end of name.
 */
const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 *
 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
 */
const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */
const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */
const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
const __toString = Object.prototype.toString;
const NullObject = /* @__PURE__ */ (() => {
    const C = function () { };
    C.prototype = Object.create(null);
    return C;
})();
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 */
function parse(str, options) {
    const obj = new NullObject();
    const len = str.length;
    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    if (len < 2)
        return obj;
    const dec = options?.decode || decode;
    let index = 0;
    do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
            break; // No more cookie pairs.
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        // only assign once
        if (obj[key] === undefined) {
            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
            let valEndIdx = endIndex(str, endIdx, valStartIdx);
            const value = dec(str.slice(valStartIdx, valEndIdx));
            obj[key] = value;
        }
        index = endIdx + 1;
    } while (index < len);
    return obj;
}
function startIndex(str, index, max) {
    do {
        const code = str.charCodeAt(index);
        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
            return index;
    } while (++index < max);
    return max;
}
function endIndex(str, index, min) {
    while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
            return index + 1;
    }
    return min;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize a name value pair into a cookie string suitable for
 * http headers. An optional options object specifies cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 */
function serialize(name, val, options) {
    const enc = options?.encode || encodeURIComponent;
    if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
    }
    const value = enc(val);
    if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
    }
    let str = name + "=" + value;
    if (!options)
        return str;
    if (options.maxAge !== undefined) {
        if (!Number.isInteger(options.maxAge)) {
            throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
    }
    if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
            throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
    }
    if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
            throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
    }
    if (options.expires) {
        if (!isDate(options.expires) ||
            !Number.isFinite(options.expires.valueOf())) {
            throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
    }
    if (options.httpOnly) {
        str += "; HttpOnly";
    }
    if (options.secure) {
        str += "; Secure";
    }
    if (options.partitioned) {
        str += "; Partitioned";
    }
    if (options.priority) {
        const priority = typeof options.priority === "string"
            ? options.priority.toLowerCase()
            : undefined;
        switch (priority) {
            case "low":
                str += "; Priority=Low";
                break;
            case "medium":
                str += "; Priority=Medium";
                break;
            case "high":
                str += "; Priority=High";
                break;
            default:
                throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
    }
    if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string"
            ? options.sameSite.toLowerCase()
            : options.sameSite;
        switch (sameSite) {
            case true:
            case "strict":
                str += "; SameSite=Strict";
                break;
            case "lax":
                str += "; SameSite=Lax";
                break;
            case "none":
                str += "; SameSite=None";
                break;
            default:
                throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
    }
    return str;
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 */
function decode(str) {
    if (str.indexOf("%") === -1)
        return str;
    try {
        return decodeURIComponent(str);
    }
    catch (e) {
        return str;
    }
}
/**
 * Determine if value is a Date.
 */
function isDate(val) {
    return __toString.call(val) === "[object Date]";
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/set-cookie-parser/lib/set-cookie.js":
/*!**********************************************************!*\
  !*** ./node_modules/set-cookie-parser/lib/set-cookie.js ***!
  \**********************************************************/
/***/ ((module) => {



var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false,
};

function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}

function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);

  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;

  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  try {
    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
  } catch (e) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" +
        value +
        "'. Set options.decodeValues to false to disable this feature.",
      e
    );
  }

  var cookie = {
    name: name,
    value: value,
  };

  parts.forEach(function (part) {
    var sides = part.split("=");
    var key = sides.shift().trimLeft().toLowerCase();
    var value = sides.join("=");
    if (key === "expires") {
      cookie.expires = new Date(value);
    } else if (key === "max-age") {
      cookie.maxAge = parseInt(value, 10);
    } else if (key === "secure") {
      cookie.secure = true;
    } else if (key === "httponly") {
      cookie.httpOnly = true;
    } else if (key === "samesite") {
      cookie.sameSite = value;
    } else if (key === "partitioned") {
      cookie.partitioned = true;
    } else {
      cookie[key] = value;
    }
  });

  return cookie;
}

function parseNameValuePair(nameValuePairStr) {
  // Parses name-value-pair according to rfc6265bis draft

  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
  } else {
    value = nameValuePairStr;
  }

  return { name: name, value: value };
}

function parse(input, options) {
  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }

  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      // for fetch responses - they combine headers of the same type in the headers array,
      // but getSetCookie returns an uncombined array
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      // fast-path for node.js (which automatically normalizes header names to lower-case
      input = input.headers["set-cookie"];
    } else {
      // slow-path for other environments - see #25
      var sch =
        input.headers[
          Object.keys(input.headers).find(function (key) {
            return key.toLowerCase() === "set-cookie";
          })
        ];
      // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
      if (!sch && input.headers.cookie && !options.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  if (!Array.isArray(input)) {
    input = [input];
  }

  if (!options.map) {
    return input.filter(isNonEmptyString).map(function (str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function (cookies, str) {
      var cookie = parseString(str, options);
      cookies[cookie.name] = cookie;
      return cookies;
    }, cookies);
  }
}

/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.

  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.

  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }

  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;

  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }

  function notSpecialChar() {
    ch = cookiesString.charAt(pos);

    return ch !== "=" && ch !== ";" && ch !== ",";
  }

  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;

    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        // ',' is a cookie separator if we have later first '=', not ';' or ','
        lastComma = pos;
        pos += 1;

        skipWhitespace();
        nextStart = pos;

        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }

        // currently special character
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          // we found cookies separator
          cookiesSeparatorFound = true;
          // pos is inside the next cookie, so back up and return it.
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          // in param ',' or param separator ';',
          // we continue from that comma
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }

    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }

  return cookiesStrings;
}

module.exports = parse;
module.exports.parse = parse;
module.exports.parseString = parseString;
module.exports.splitCookiesString = splitCookiesString;


/***/ }),

/***/ "./node_modules/turbo-stream/dist/turbo-stream.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/turbo-stream/dist/turbo-stream.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
// src/utils.ts
var HOLE = -1;
var NAN = -2;
var NEGATIVE_INFINITY = -3;
var NEGATIVE_ZERO = -4;
var NULL = -5;
var POSITIVE_INFINITY = -6;
var UNDEFINED = -7;
var TYPE_BIGINT = "B";
var TYPE_DATE = "D";
var TYPE_ERROR = "E";
var TYPE_MAP = "M";
var TYPE_NULL_OBJECT = "N";
var TYPE_PROMISE = "P";
var TYPE_REGEXP = "R";
var TYPE_SET = "S";
var TYPE_SYMBOL = "Y";
var TYPE_URL = "U";
var TYPE_PREVIOUS_RESOLVED = "Z";
var Deferred = class {
  promise;
  resolve;
  reject;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
};
function createLineSplittingTransform() {
  const decoder = new TextDecoder();
  let leftover = "";
  return new TransformStream({
    transform(chunk, controller) {
      const str = decoder.decode(chunk, { stream: true });
      const parts = (leftover + str).split("\n");
      leftover = parts.pop() || "";
      for (const part of parts) {
        controller.enqueue(part);
      }
    },
    flush(controller) {
      if (leftover) {
        controller.enqueue(leftover);
      }
    }
  });
}

// src/flatten.ts
function flatten(input) {
  const { indices } = this;
  const existing = indices.get(input);
  if (existing)
    return [existing];
  if (input === void 0)
    return UNDEFINED;
  if (input === null)
    return NULL;
  if (Number.isNaN(input))
    return NAN;
  if (input === Number.POSITIVE_INFINITY)
    return POSITIVE_INFINITY;
  if (input === Number.NEGATIVE_INFINITY)
    return NEGATIVE_INFINITY;
  if (input === 0 && 1 / input < 0)
    return NEGATIVE_ZERO;
  const index = this.index++;
  indices.set(input, index);
  stringify.call(this, input, index);
  return index;
}
function stringify(input, index) {
  const { deferred, plugins, postPlugins } = this;
  const str = this.stringified;
  const stack = [[input, index]];
  while (stack.length > 0) {
    const [input2, index2] = stack.pop();
    const partsForObj = (obj) => Object.keys(obj).map((k) => `"_${flatten.call(this, k)}":${flatten.call(this, obj[k])}`).join(",");
    let error = null;
    switch (typeof input2) {
      case "boolean":
      case "number":
      case "string":
        str[index2] = JSON.stringify(input2);
        break;
      case "bigint":
        str[index2] = `["${TYPE_BIGINT}","${input2}"]`;
        break;
      case "symbol": {
        const keyFor = Symbol.keyFor(input2);
        if (!keyFor) {
          error = new Error(
            "Cannot encode symbol unless created with Symbol.for()"
          );
        } else {
          str[index2] = `["${TYPE_SYMBOL}",${JSON.stringify(keyFor)}]`;
        }
        break;
      }
      case "object": {
        if (!input2) {
          str[index2] = `${NULL}`;
          break;
        }
        const isArray = Array.isArray(input2);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input2);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index2] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index2] += `,${rest.map((v) => flatten.call(this, v)).join(",")}`;
              }
              str[index2] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          let result = isArray ? "[" : "{";
          if (isArray) {
            for (let i = 0; i < input2.length; i++)
              result += (i ? "," : "") + (i in input2 ? flatten.call(this, input2[i]) : HOLE);
            str[index2] = `${result}]`;
          } else if (input2 instanceof Date) {
            str[index2] = `["${TYPE_DATE}",${input2.getTime()}]`;
          } else if (input2 instanceof URL) {
            str[index2] = `["${TYPE_URL}",${JSON.stringify(input2.href)}]`;
          } else if (input2 instanceof RegExp) {
            str[index2] = `["${TYPE_REGEXP}",${JSON.stringify(
              input2.source
            )},${JSON.stringify(input2.flags)}]`;
          } else if (input2 instanceof Set) {
            if (input2.size > 0) {
              str[index2] = `["${TYPE_SET}",${[...input2].map((val) => flatten.call(this, val)).join(",")}]`;
            } else {
              str[index2] = `["${TYPE_SET}"]`;
            }
          } else if (input2 instanceof Map) {
            if (input2.size > 0) {
              str[index2] = `["${TYPE_MAP}",${[...input2].flatMap(([k, v]) => [
                flatten.call(this, k),
                flatten.call(this, v)
              ]).join(",")}]`;
            } else {
              str[index2] = `["${TYPE_MAP}"]`;
            }
          } else if (input2 instanceof Promise) {
            str[index2] = `["${TYPE_PROMISE}",${index2}]`;
            deferred[index2] = input2;
          } else if (input2 instanceof Error) {
            str[index2] = `["${TYPE_ERROR}",${JSON.stringify(input2.message)}`;
            if (input2.name !== "Error") {
              str[index2] += `,${JSON.stringify(input2.name)}`;
            }
            str[index2] += "]";
          } else if (Object.getPrototypeOf(input2) === null) {
            str[index2] = `["${TYPE_NULL_OBJECT}",{${partsForObj(input2)}}]`;
          } else if (isPlainObject(input2)) {
            str[index2] = `{${partsForObj(input2)}}`;
          } else {
            error = new Error("Cannot encode object with prototype");
          }
        }
        break;
      }
      default: {
        const isArray = Array.isArray(input2);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input2);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index2] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index2] += `,${rest.map((v) => flatten.call(this, v)).join(",")}`;
              }
              str[index2] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          error = new Error("Cannot encode function or unexpected type");
        }
      }
    }
    if (error) {
      let pluginHandled = false;
      if (postPlugins) {
        for (const plugin of postPlugins) {
          const pluginResult = plugin(input2);
          if (Array.isArray(pluginResult)) {
            pluginHandled = true;
            const [pluginIdentifier, ...rest] = pluginResult;
            str[index2] = `[${JSON.stringify(pluginIdentifier)}`;
            if (rest.length > 0) {
              str[index2] += `,${rest.map((v) => flatten.call(this, v)).join(",")}`;
            }
            str[index2] += "]";
            break;
          }
        }
      }
      if (!pluginHandled) {
        throw error;
      }
    }
  }
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames;
}

// src/unflatten.ts
var globalObj = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : void 0;
function unflatten(parsed) {
  const { hydrated, values } = this;
  if (typeof parsed === "number")
    return hydrate.call(this, parsed);
  if (!Array.isArray(parsed) || !parsed.length)
    throw new SyntaxError();
  const startIndex = values.length;
  for (const value of parsed) {
    values.push(value);
  }
  hydrated.length = values.length;
  return hydrate.call(this, startIndex);
}
function hydrate(index) {
  const { hydrated, values, deferred, plugins } = this;
  let result;
  const stack = [
    [
      index,
      (v) => {
        result = v;
      }
    ]
  ];
  let postRun = [];
  while (stack.length > 0) {
    const [index2, set] = stack.pop();
    switch (index2) {
      case UNDEFINED:
        set(void 0);
        continue;
      case NULL:
        set(null);
        continue;
      case NAN:
        set(NaN);
        continue;
      case POSITIVE_INFINITY:
        set(Infinity);
        continue;
      case NEGATIVE_INFINITY:
        set(-Infinity);
        continue;
      case NEGATIVE_ZERO:
        set(-0);
        continue;
    }
    if (hydrated[index2]) {
      set(hydrated[index2]);
      continue;
    }
    const value = values[index2];
    if (!value || typeof value !== "object") {
      hydrated[index2] = value;
      set(value);
      continue;
    }
    if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const [type, b, c] = value;
        switch (type) {
          case TYPE_DATE:
            set(hydrated[index2] = new Date(b));
            continue;
          case TYPE_URL:
            set(hydrated[index2] = new URL(b));
            continue;
          case TYPE_BIGINT:
            set(hydrated[index2] = BigInt(b));
            continue;
          case TYPE_REGEXP:
            set(hydrated[index2] = new RegExp(b, c));
            continue;
          case TYPE_SYMBOL:
            set(hydrated[index2] = Symbol.for(b));
            continue;
          case TYPE_SET:
            const newSet = /* @__PURE__ */ new Set();
            hydrated[index2] = newSet;
            for (let i = 1; i < value.length; i++)
              stack.push([
                value[i],
                (v) => {
                  newSet.add(v);
                }
              ]);
            set(newSet);
            continue;
          case TYPE_MAP:
            const map = /* @__PURE__ */ new Map();
            hydrated[index2] = map;
            for (let i = 1; i < value.length; i += 2) {
              const r = [];
              stack.push([
                value[i + 1],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                value[i],
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                map.set(r[0], r[1]);
              });
            }
            set(map);
            continue;
          case TYPE_NULL_OBJECT:
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index2] = obj;
            for (const key of Object.keys(b).reverse()) {
              const r = [];
              stack.push([
                b[key],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                Number(key.slice(1)),
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                obj[r[0]] = r[1];
              });
            }
            set(obj);
            continue;
          case TYPE_PROMISE:
            if (hydrated[b]) {
              set(hydrated[index2] = hydrated[b]);
            } else {
              const d = new Deferred();
              deferred[b] = d;
              set(hydrated[index2] = d.promise);
            }
            continue;
          case TYPE_ERROR:
            const [, message, errorType] = value;
            let error = errorType && globalObj && globalObj[errorType] ? new globalObj[errorType](message) : new Error(message);
            hydrated[index2] = error;
            set(error);
            continue;
          case TYPE_PREVIOUS_RESOLVED:
            set(hydrated[index2] = hydrated[b]);
            continue;
          default:
            if (Array.isArray(plugins)) {
              const r = [];
              const vals = value.slice(1);
              for (let i = 0; i < vals.length; i++) {
                const v = vals[i];
                stack.push([
                  v,
                  (v2) => {
                    r[i] = v2;
                  }
                ]);
              }
              postRun.push(() => {
                for (const plugin of plugins) {
                  const result2 = plugin(value[0], ...r);
                  if (result2) {
                    set(hydrated[index2] = result2.value);
                    return;
                  }
                }
                throw new SyntaxError();
              });
              continue;
            }
            throw new SyntaxError();
        }
      } else {
        const array = [];
        hydrated[index2] = array;
        for (let i = 0; i < value.length; i++) {
          const n = value[i];
          if (n !== HOLE) {
            stack.push([
              n,
              (v) => {
                array[i] = v;
              }
            ]);
          }
        }
        set(array);
        continue;
      }
    } else {
      const object = {};
      hydrated[index2] = object;
      for (const key of Object.keys(value).reverse()) {
        const r = [];
        stack.push([
          value[key],
          (v) => {
            r[1] = v;
          }
        ]);
        stack.push([
          Number(key.slice(1)),
          (k) => {
            r[0] = k;
          }
        ]);
        postRun.push(() => {
          object[r[0]] = r[1];
        });
      }
      set(object);
      continue;
    }
  }
  while (postRun.length > 0) {
    postRun.pop()();
  }
  return result;
}

// src/turbo-stream.ts
async function decode(readable, options) {
  const { plugins } = options ?? {};
  const done = new Deferred();
  const reader = readable.pipeThrough(createLineSplittingTransform()).getReader();
  const decoder = {
    values: [],
    hydrated: [],
    deferred: {},
    plugins
  };
  const decoded = await decodeInitial.call(decoder, reader);
  let donePromise = done.promise;
  if (decoded.done) {
    done.resolve();
  } else {
    donePromise = decodeDeferred.call(decoder, reader).then(done.resolve).catch((reason) => {
      for (const deferred of Object.values(decoder.deferred)) {
        deferred.reject(reason);
      }
      done.reject(reason);
    });
  }
  return {
    done: donePromise.then(() => reader.closed),
    value: decoded.value
  };
}
async function decodeInitial(reader) {
  const read = await reader.read();
  if (!read.value) {
    throw new SyntaxError();
  }
  let line;
  try {
    line = JSON.parse(read.value);
  } catch (reason) {
    throw new SyntaxError();
  }
  return {
    done: read.done,
    value: unflatten.call(this, line)
  };
}
async function decodeDeferred(reader) {
  let read = await reader.read();
  while (!read.done) {
    if (!read.value)
      continue;
    const line = read.value;
    switch (line[0]) {
      case TYPE_PROMISE: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.resolve(value);
        break;
      }
      case TYPE_ERROR: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.reject(value);
        break;
      }
      default:
        throw new SyntaxError();
    }
    read = await reader.read();
  }
}
function encode(input, options) {
  const { plugins, postPlugins, signal } = options ?? {};
  const encoder = {
    deferred: {},
    index: 0,
    indices: /* @__PURE__ */ new Map(),
    stringified: [],
    plugins,
    postPlugins,
    signal
  };
  const textEncoder = new TextEncoder();
  let lastSentIndex = 0;
  const readable = new ReadableStream({
    async start(controller) {
      const id = flatten.call(encoder, input);
      if (Array.isArray(id)) {
        throw new Error("This should never happen");
      }
      if (id < 0) {
        controller.enqueue(textEncoder.encode(`${id}
`));
      } else {
        controller.enqueue(
          textEncoder.encode(`[${encoder.stringified.join(",")}]
`)
        );
        lastSentIndex = encoder.stringified.length - 1;
      }
      const seenPromises = /* @__PURE__ */ new WeakSet();
      while (Object.keys(encoder.deferred).length > 0) {
        for (const [deferredId, deferred] of Object.entries(encoder.deferred)) {
          if (seenPromises.has(deferred))
            continue;
          seenPromises.add(
            encoder.deferred[Number(deferredId)] = raceSignal(
              deferred,
              encoder.signal
            ).then(
              (resolved) => {
                const id2 = flatten.call(encoder, resolved);
                if (Array.isArray(id2)) {
                  controller.enqueue(
                    textEncoder.encode(
                      `${TYPE_PROMISE}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                    )
                  );
                  encoder.index++;
                  lastSentIndex++;
                } else if (id2 < 0) {
                  controller.enqueue(
                    textEncoder.encode(`${TYPE_PROMISE}${deferredId}:${id2}
`)
                  );
                } else {
                  const values = encoder.stringified.slice(lastSentIndex + 1).join(",");
                  controller.enqueue(
                    textEncoder.encode(
                      `${TYPE_PROMISE}${deferredId}:[${values}]
`
                    )
                  );
                  lastSentIndex = encoder.stringified.length - 1;
                }
              },
              (reason) => {
                if (!reason || typeof reason !== "object" || !(reason instanceof Error)) {
                  reason = new Error("An unknown error occurred");
                }
                const id2 = flatten.call(encoder, reason);
                if (Array.isArray(id2)) {
                  controller.enqueue(
                    textEncoder.encode(
                      `${TYPE_ERROR}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                    )
                  );
                  encoder.index++;
                  lastSentIndex++;
                } else if (id2 < 0) {
                  controller.enqueue(
                    textEncoder.encode(`${TYPE_ERROR}${deferredId}:${id2}
`)
                  );
                } else {
                  const values = encoder.stringified.slice(lastSentIndex + 1).join(",");
                  controller.enqueue(
                    textEncoder.encode(
                      `${TYPE_ERROR}${deferredId}:[${values}]
`
                    )
                  );
                  lastSentIndex = encoder.stringified.length - 1;
                }
              }
            ).finally(() => {
              delete encoder.deferred[Number(deferredId)];
            })
          );
        }
        await Promise.race(Object.values(encoder.deferred));
      }
      await Promise.all(Object.values(encoder.deferred));
      controller.close();
    }
  });
  return readable;
}
function raceSignal(promise, signal) {
  if (!signal)
    return promise;
  if (signal.aborted)
    return Promise.reject(signal.reason || new Error("Signal was aborted."));
  const abort = new Promise((resolve, reject) => {
    signal.addEventListener("abort", (event) => {
      reject(signal.reason || new Error("Signal was aborted."));
    });
    promise.then(resolve).catch(reject);
  });
  abort.catch(() => {
  });
  return Promise.race([abort, promise]);
}



/***/ }),

/***/ "./src/Components/Common/utils/icons.js":
/*!**********************************************!*\
  !*** ./src/Components/Common/utils/icons.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lightBoxIcon: () => (/* binding */ lightBoxIcon),
/* harmony export */   masonryVideoGridIcon: () => (/* binding */ masonryVideoGridIcon),
/* harmony export */   parallaxRowIcon: () => (/* binding */ parallaxRowIcon),
/* harmony export */   sliderAutoplayIcon: () => (/* binding */ sliderAutoplayIcon),
/* harmony export */   testimonialIcon: () => (/* binding */ testimonialIcon),
/* harmony export */   videoBentoGridIcon: () => (/* binding */ videoBentoGridIcon),
/* harmony export */   videoCarouselIcon: () => (/* binding */ videoCarouselIcon),
/* harmony export */   videoComparisonGalleryIcon: () => (/* binding */ videoComparisonGalleryIcon),
/* harmony export */   videoCurriculumAccordionIcon: () => (/* binding */ videoCurriculumAccordionIcon),
/* harmony export */   videoExpandingPanelsIcon: () => (/* binding */ videoExpandingPanelsIcon),
/* harmony export */   videoFeatureTourIcon: () => (/* binding */ videoFeatureTourIcon),
/* harmony export */   videoFlipCardsGalleryIcon: () => (/* binding */ videoFlipCardsGalleryIcon),
/* harmony export */   videoGalleryIcon: () => (/* binding */ videoGalleryIcon),
/* harmony export */   videoHotspotSceneIcon: () => (/* binding */ videoHotspotSceneIcon),
/* harmony export */   videoJustifiedGalleryIcon: () => (/* binding */ videoJustifiedGalleryIcon),
/* harmony export */   videoMapGalleryIcon: () => (/* binding */ videoMapGalleryIcon),
/* harmony export */   videoMarqueeWallIcon: () => (/* binding */ videoMarqueeWallIcon),
/* harmony export */   videoMenuShowcaseIcon: () => (/* binding */ videoMenuShowcaseIcon),
/* harmony export */   videoPipWallIcon: () => (/* binding */ videoPipWallIcon),
/* harmony export */   videoPlaylistIcon: () => (/* binding */ videoPlaylistIcon),
/* harmony export */   videoPodcastEpisodesIcon: () => (/* binding */ videoPodcastEpisodesIcon),
/* harmony export */   videoPropertyTourGalleryIcon: () => (/* binding */ videoPropertyTourGalleryIcon),
/* harmony export */   videoScrollytellingShowcaseIcon: () => (/* binding */ videoScrollytellingShowcaseIcon),
/* harmony export */   videoShortsReelIcon: () => (/* binding */ videoShortsReelIcon),
/* harmony export */   videoShowcaseWallIcon: () => (/* binding */ videoShowcaseWallIcon),
/* harmony export */   videoSliderIcon: () => (/* binding */ videoSliderIcon),
/* harmony export */   videoStoriesIcon: () => (/* binding */ videoStoriesIcon),
/* harmony export */   videoSwipeDeckIcon: () => (/* binding */ videoSwipeDeckIcon),
/* harmony export */   videoTabsGalleryIcon: () => (/* binding */ videoTabsGalleryIcon),
/* harmony export */   videoTimelineGalleryIcon: () => (/* binding */ videoTimelineGalleryIcon),
/* harmony export */   videoWeddingStoryGalleryIcon: () => (/* binding */ videoWeddingStoryGalleryIcon),
/* harmony export */   videoWorkoutPlannerIcon: () => (/* binding */ videoWorkoutPlannerIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const iconColor = "#136EF5";
const videoGalleryIcon =
// The plugin logo as a one-colour glyph: four video tiles around a larger
// tile with the play triangle cut out. It takes the editor's own icon colour.
(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  className: "bPlBlockIcon",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "currentColor",
  "aria-hidden": "true",
  focusable: "false"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  opacity: "0.5"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "1.5",
  y: "3",
  width: "8",
  height: "5.5",
  rx: "1.4"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14.5",
  y: "3",
  width: "8",
  height: "5.5",
  rx: "1.4"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "1.5",
  y: "15.5",
  width: "8",
  height: "5.5",
  rx: "1.4"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14.5",
  y: "15.5",
  width: "8",
  height: "5.5",
  rx: "1.4"
})), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fillRule: "evenodd",
  d: "M7 7.6h10a2 2 0 0 1 2 2v4.8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9.6a2 2 0 0 1 2-2zm3.2 2.2v4.4l4.2-2.2z"
}));

// Lightbox Icon
const lightBoxIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.0"
  // width="256.000000pt"
  // height="256.000000pt"
  ,
  viewBox: "0 0 256.000000 256.000000",
  preserveAspectRatio: "xMidYMid meet",
  style: {
    fill: iconColor
  },
  width: 24,
  height: 24,
  className: "lbvg-video-gallery"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  transform: "translate(0.000000,256.000000) scale(0.100000,-0.100000)"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2205 2465 c-37 -36 -33 -76 11 -125 l36 -40 -36 -42 c-100 -117 28 -217 133 -104 l25 26 38 -37 c99 -96 207 12 114 115 l-34 37 34 38 c45 48 48 105 8 136 -42 33 -80 26 -136 -27 l-27 -25 -41 36 c-49 45 -89 49 -125 12z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M26 1869 l-26 -20 0 -869 0 -869 26 -20 c27 -21 28 -21 1254 -21 1226 0 1227 0 1254 21 l26 20 0 869 0 869 -26 20 c-27 21 -28 21 -1254 21 -1226 0 -1227 0 -1254 -21z m2374 -791 l0 -653 -383 383 c-374 374 -383 382 -422 382 -38 0 -47 -8 -310 -270 l-270 -269 -122 119 c-173 171 -132 184 -465 -147 l-268 -267 0 687 0 687 1120 0 1120 0 0 -652z m-502 -846 l-463 -2 -152 152 -153 153 232 232 233 233 382 -382 383 -383 -462 -3z m-933 228 l230 -230 -460 0 -460 0 230 230 c126 127 230 230 230 230 0 0 104 -103 230 -230z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M671 1580 c-90 -19 -175 -93 -208 -183 -17 -46 -16 -146 3 -199 20 -61 75 -123 134 -153 141 -71 307 -21 384 115 28 50 31 63 31 140 0 69 -5 93 -23 127 -62 118 -191 179 -321 153z m150 -196 c51 -49 50 -122 -2 -174 -104 -103 -266 31 -188 156 11 19 21 34 22 34 1 0 20 6 41 14 48 17 88 7 127 -30z"
})));

// Masonry Video Grid Icon
const masonryVideoGridIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.0"
  // width="512.000000pt"
  // height="512.000000pt"
  ,
  viewBox: "0 0 512.000000 512.000000",
  preserveAspectRatio: "xMidYMid meet",
  className: "mvg-icon",
  style: {
    fill: iconColor
  },
  width: 24,
  height: 24
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  transform: "translate(0.000000,512.000000) scale(0.100000,-0.100000)"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M615 4591 c-48 -22 -69 -44 -90 -94 -13 -32 -15 -163 -15 -1079 0 -654 4 -1056 10 -1078 11 -41 61 -94 103 -109 18 -7 180 -11 461 -11 433 0 433 0 476 23 30 16 51 37 67 67 l23 44 -2 1071 -3 1072 -29 37 c-57 76 -57 76 -536 76 -391 0 -428 -2 -465 -19z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2095 4591 c-48 -22 -69 -44 -90 -94 -13 -31 -15 -112 -15 -574 0 -501 2 -541 19 -578 22 -49 48 -73 98 -91 55 -19 851 -19 906 0 50 18 76 42 98 91 17 37 19 77 19 578 0 462 -2 543 -15 574 -21 50 -42 72 -90 94 -37 17 -74 19 -465 19 -391 0 -428 -2 -465 -19z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3575 4591 c-46 -21 -79 -54 -94 -94 -8 -19 -11 -361 -11 -1086 l0 -1058 23 -43 c16 -30 37 -51 67 -67 43 -23 43 -23 476 -23 281 0 443 4 461 11 42 15 92 68 103 109 6 22 10 424 10 1078 0 916 -2 1047 -15 1079 -21 50 -42 72 -90 94 -37 17 -74 19 -465 19 -392 0 -428 -2 -465 -19z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2095 2886 c-37 -17 -80 -62 -94 -99 -8 -19 -11 -361 -11 -1080 0 -999 1 -1054 19 -1092 22 -48 44 -69 94 -90 54 -23 860 -23 914 0 50 21 72 42 94 90 18 38 19 93 19 1093 0 872 -2 1058 -14 1085 -16 39 -61 82 -99 96 -45 17 -883 14 -922 -3z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M627 1866 c-50 -18 -76 -42 -98 -91 -17 -37 -19 -77 -19 -580 0 -503 2 -543 19 -580 22 -48 44 -69 94 -90 31 -13 101 -15 459 -15 476 0 477 1 534 76 l29 37 0 572 0 572 -29 37 c-57 75 -58 76 -531 75 -328 0 -428 -3 -458 -13z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3574 1861 c-23 -10 -54 -36 -70 -57 l-29 -37 -3 -546 c-2 -300 0 -560 3 -578 8 -43 50 -92 100 -114 37 -17 74 -19 465 -19 391 0 428 2 465 19 48 22 69 44 90 94 13 31 15 112 15 574 0 501 -2 541 -19 578 -10 22 -28 48 -39 58 -49 44 -76 46 -517 46 -389 1 -423 -1 -461 -18z"
})));

// Parallax Row Icon
const parallaxRowIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  id: "Layer_1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 512 512",
  style: {
    fill: iconColor,
    enableBackground: "new 0 0 512 512"
  },
  width: 24,
  height: 24,
  className: "pr_video-gallery",
  xmlSpace: "preserve"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M0,149.854v212.293h512V149.854H0z M158.179,324.683H37.463V187.317h120.716V324.683z M316.357,324.683H195.643V187.317 h120.715V324.683z M474.537,324.683H353.821V187.317h120.716V324.683z"
}))));

// Slider Autoplay Video Icon
const sliderAutoplayIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg",
  style: {
    fill: iconColor
  },
  width: 24,
  height: 24,
  className: "sav-gallery"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  id: "SVGRepo_bgCarrier",
  strokeWidth: "0"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  id: "SVGRepo_tracerCarrier",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  id: "SVGRepo_iconCarrier"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fillRule: "evenodd",
  d: "M5.23331,0.493645 C6.8801,-0.113331 8.6808,-0.161915 10.3579,0.355379 C11.4019,0.6773972 12.361984,1.20757325 13.1838415,1.90671757 L13.4526,2.14597 L14.2929,1.30564 C14.8955087,0.703065739 15.9071843,1.0850774 15.994017,1.89911843 L16,2.01275 L16,6.00002 L12.0127,6.00002 C11.1605348,6.00002 10.7153321,5.01450817 11.2294893,4.37749065 L11.3056,4.29291 L12.0372,3.56137 C11.389,2.97184 10.6156,2.52782 9.76845,2.26653 C8.5106,1.87856 7.16008,1.915 5.92498,2.37023 C4.68989,2.82547 3.63877,3.67423 2.93361,4.78573 C2.22844,5.89723 1.90836,7.20978 2.02268,8.52112 C2.13701,9.83246 2.6794,11.0698 3.56627,12.0425 C4.45315,13.0152 5.63528,13.6693 6.93052,13.9039 C8.22576,14.1385 9.56221,13.9407 10.7339,13.3409 C11.9057,12.7412 12.8476,11.7727 13.4147,10.5848 C13.6526,10.0864 14.2495,9.8752 14.748,10.1131 C15.2464,10.351 15.4575,10.948 15.2196,11.4464 C14.4635,13.0302 13.2076,14.3215 11.6453,15.1213 C10.0829,15.921 8.30101,16.1847 6.57402,15.8719 C4.84704,15.559 3.27086,14.687 2.08836,13.39 C0.905861,12.0931 0.182675,10.4433 0.0302394,8.69483 C-0.122195,6.94637 0.304581,5.1963 1.2448,3.7143 C2.18503,2.2323 3.58652,1.10062 5.23331,0.493645 Z M6,5.46077 C6,5.09472714 6.37499031,4.86235811 6.69509872,5.0000726 L6.7678,5.03853 L10.7714,7.57776 C11.0528545,7.75626909 11.0784413,8.14585256 10.8481603,8.36273881 L10.7714,8.42224 L6.7678,10.9615 C6.45867857,11.1575214 6.06160816,10.965274 6.00646097,10.6211914 L6,10.5392 L6,5.46077 Z"
})));

// Video Carousel Icon
const videoCarouselIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.0"
  // width="512.000000pt"
  // height="512.000000pt"
  ,
  width: 24,
  height: 24,
  viewBox: "0 0 512.000000 512.000000",
  preserveAspectRatio: "xMidYMid meet"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  transform: "translate(0.000000,512.000000) scale(0.100000,-0.100000)",
  className: "vcg-video-carousel-icon",
  fill: iconColor,
  stroke: "none"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M1422 4944 c-29 -7 -73 -26 -97 -40 -65 -38 -149 -134 -177 -201 l-23 -58 -3 -2055 c-2 -1443 1 -2071 9 -2107 21 -103 101 -213 196 -269 96 -56 64 -55 1259 -52 l1099 3 58 23 c67 27 163 112 201 177 59 100 56 -26 56 2195 0 2216 3 2095 -55 2193 -31 54 -99 122 -150 152 -95 56 -67 55 -1240 54 -904 0 -1089 -3 -1133 -15z m2290 -177 c26 -15 59 -42 72 -60 60 -78 56 65 56 -2146 0 -2276 7 -2085 -75 -2166 -79 -80 -5 -76 -1221 -73 l-1080 3 -49 26 c-57 29 -110 92 -125 148 -7 26 -9 695 -8 2082 l3 2044 28 47 c31 53 79 94 134 114 31 11 235 13 1128 11 l1090 -2 47 -28z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M1945 3285 l-25 -24 0 -701 0 -701 26 -24 c15 -14 38 -25 51 -25 30 0 1321 674 1346 702 9 11 17 33 17 48 0 15 -8 37 -17 48 -26 30 -1316 702 -1348 702 -14 0 -37 -11 -50 -25z m773 -520 c210 -110 382 -202 382 -205 0 -4 -245 -134 -892 -472 l-128 -67 0 539 0 539 128 -67 c70 -37 300 -157 510 -267z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M586 4384 c-34 -11 -64 -31 -102 -68 -91 -92 -84 59 -84 -1756 0 -1815 -7 -1664 84 -1756 71 -71 118 -84 293 -84 129 0 135 1 158 25 33 32 33 78 0 110 -23 24 -29 25 -157 25 -144 0 -176 10 -204 62 -19 34 -19 3202 0 3236 28 52 60 62 204 62 128 0 134 1 157 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -23 24 -28 25 -162 24 -92 0 -154 -5 -187 -15z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M4185 4375 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 23 -24 29 -25 155 -25 98 0 138 -4 160 -15 64 -33 60 83 60 -1665 0 -1748 4 -1632 -60 -1665 -22 -11 -62 -15 -160 -15 -126 0 -132 -1 -155 -25 -33 -32 -33 -78 0 -110 23 -24 29 -25 158 -25 175 0 222 13 293 84 91 92 84 -59 84 1756 0 1815 7 1664 -84 1756 -71 71 -118 84 -293 84 -129 0 -135 -1 -158 -25z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M100 3901 c-19 -10 -48 -35 -65 -55 l-30 -38 -3 -1234 c-2 -1197 -2 -1235 17 -1272 23 -46 46 -67 94 -87 51 -21 81 -19 113 8 37 33 37 81 0 114 -15 12 -36 23 -47 23 -19 0 -19 18 -19 1200 0 1182 0 1200 19 1200 35 0 74 43 74 80 0 69 -80 101 -153 61z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M4894 3897 c-20 -17 -27 -33 -27 -57 0 -37 39 -80 74 -80 19 0 19 -18 19 -1200 0 -1182 0 -1200 -19 -1200 -35 0 -74 -43 -74 -80 0 -40 40 -80 81 -80 34 0 102 31 124 56 50 56 48 6 48 1304 0 1067 -2 1215 -15 1247 -20 48 -41 71 -87 94 -50 26 -91 24 -124 -4z"
})));

// Video Playlist Icon
const videoPlaylistIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  // width="800px"
  // height="800px"
  width: 24,
  height: 24,
  viewBox: "0 0 24 24"
  // fill="none"
  ,
  xmlns: "http://www.w3.org/2000/svg",
  className: "video-playlist-gallery-icon",
  style: {
    fill: iconColor,
    stroke: iconColor
  }
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  clipPath: "url(#clip0_429_11182)"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M6 6L3 7.73205L3 4.26795L6 6Z",
  strokeOpacity: 1,
  strokeWidth: 2.5,
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 12L21 12",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10 6L21 6",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 18L21 18",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
})), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("defs", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("clipPath", {
  id: "clip0_429_11182"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  width: 24,
  height: 24,
  fill: "white"
}))));

// Video Slider Icon
const videoSliderIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  id: "Layer_1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
  // width="800px"
  // height="800px"
  ,
  width: 24,
  height: 24,
  viewBox: "0 0 46 32",
  enableBackground: "new 0 0 46 32",
  xmlSpace: "preserve",
  className: "vs-gallery",
  style: {
    fill: iconColor,
    stroke: iconColor
  }
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "#808184",
  d: "M20.502,19.929c0.26,0,0.519-0.07,0.748-0.203l4.203-2.427c0.47-0.271,0.75-0.756,0.75-1.299 s-0.28-1.028-0.75-1.299l-4.203-2.427c-0.229-0.133-0.488-0.203-0.748-0.203c-0.828,0-1.502,0.674-1.502,1.502v4.854 C19,19.255,19.674,19.929,20.502,19.929z M20,13.573c0-0.31,0.261-0.502,0.502-0.502c0.086,0,0.17,0.023,0.248,0.068l4.203,2.427 c0.226,0.131,0.25,0.347,0.25,0.434s-0.024,0.303-0.25,0.434L20.75,18.86C20.453,19.033,20,18.847,20,18.427V13.573z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "#808184",
  d: "M7,1.5v29C7,31.327,7.673,32,8.5,32h29c0.827,0,1.5-0.673,1.5-1.5v-29C39,0.673,38.327,0,37.5,0h-29 C7.673,0,7,0.673,7,1.5z M38,1.5v29c0,0.275-0.225,0.5-0.5,0.5h-29C8.225,31,8,30.775,8,30.5v-29C8,1.225,8.225,1,8.5,1h29 C37.775,1,38,1.225,38,1.5z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "#808184",
  d: "M5.374,26.168c-0.184-0.208-0.501-0.225-0.706-0.042l-2.836,2.521c-0.225,0.201-0.467,0.114-0.537,0.083 C1.226,28.698,1,28.573,1,28.273V3.727c0-0.3,0.226-0.425,0.295-0.456c0.07-0.031,0.312-0.118,0.537,0.083l2.836,2.521 C4.873,6.056,5.19,6.038,5.374,5.832S5.538,5.31,5.332,5.126L2.496,2.605c-0.447-0.398-1.065-0.49-1.61-0.247 C0.34,2.604,0,3.128,0,3.727v24.547c0,0.599,0.34,1.123,0.886,1.368c0.201,0.09,0.411,0.135,0.62,0.135 c0.357,0,0.708-0.131,0.99-0.382l2.836-2.521C5.538,26.69,5.558,26.374,5.374,26.168z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "#808184",
  d: "M45.114,2.358c-0.546-0.244-1.163-0.151-1.61,0.247l-2.836,2.521c-0.206,0.184-0.226,0.5-0.042,0.706 s0.501,0.224,0.706,0.042l2.836-2.521c0.225-0.201,0.468-0.114,0.537-0.083S45,3.427,45,3.727v24.547 c0,0.3-0.226,0.425-0.295,0.456s-0.312,0.118-0.537-0.083l-2.836-2.521c-0.205-0.183-0.522-0.166-0.706,0.042 c-0.184,0.206-0.164,0.522,0.042,0.706l2.836,2.521c0.282,0.251,0.633,0.382,0.99,0.382c0.209,0,0.419-0.045,0.62-0.135 C45.66,29.396,46,28.872,46,28.273V3.727C46,3.128,45.66,2.604,45.114,2.358z"
})));

// Video Shorts Reel Icon
const videoShortsReelIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vsr-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "7",
  y: "2",
  width: "10",
  height: "20",
  rx: "2.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "11,9 11,15 16,12",
  fill: iconColor,
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "3",
  y1: "6",
  x2: "3",
  y2: "18"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "21",
  y1: "6",
  x2: "21",
  y2: "18"
}));

// Video Showcase Wall Icon
const videoShowcaseWallIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vsw-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "2.5",
  y: "4",
  width: "8",
  height: "6",
  rx: "1.2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "13.5",
  y: "4",
  width: "8",
  height: "6",
  rx: "1.2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "2.5",
  y: "14",
  width: "8",
  height: "6",
  rx: "1.2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "13.5",
  y: "14",
  width: "8",
  height: "6",
  rx: "1.2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "5.6,5.9 5.6,8.1 7.4,7 5.6,5.9",
  fill: iconColor,
  stroke: "none"
}));

// Video Curriculum Accordion Icon
const videoCurriculumAccordionIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vca-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "3.5",
  width: "18",
  height: "5",
  rx: "1.4"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "6.3,5 6.3,7 8,6 6.3,5",
  fill: iconColor,
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "16.5,5 18.2,6.6 16.5,8.2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "11",
  width: "18",
  height: "5",
  rx: "1.4"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "6",
  y1: "13.5",
  x2: "14",
  y2: "13.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "18.5",
  width: "18",
  height: "2.2",
  rx: "1.1"
}));

// Video Testimonial Icon
const testimonialIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.0"
  // width="512.000000pt"
  // height="512.000000pt"
  ,
  width: 24,
  height: 24,
  viewBox: "0 0 512.000000 512.000000",
  preserveAspectRatio: "xMidYMid meet",
  className: "video-testimonial-section",
  style: {
    fill: iconColor,
    stroke: iconColor
  }
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  transform: "translate(0.000000,512.000000) scale(0.100000,-0.100000)"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M1168 4465 c-57 -21 -121 -69 -151 -112 -58 -84 -58 -76 -55 -713 3 -567 4 -586 23 -612 25 -35 91 -68 135 -68 44 0 110 33 135 68 19 26 20 45 23 580 l2 552 1440 0 1440 0 0 -960 0 -960 -266 0 c-174 0 -273 -4 -287 -11 -12 -6 -109 -97 -214 -202 l-193 -192 0 151 c0 140 -2 153 -23 184 -12 19 -38 43 -57 54 -33 20 -51 21 -280 21 -229 0 -247 -1 -280 -21 -55 -32 -80 -77 -80 -144 0 -67 26 -113 80 -141 29 -16 58 -19 177 -19 l143 0 0 -269 c0 -262 1 -269 23 -301 41 -61 130 -87 204 -60 15 6 168 150 338 320 l310 309 250 3 c238 3 252 4 297 26 63 31 126 96 157 162 l26 55 0 1035 0 1035 -33 67 c-33 68 -80 116 -152 154 -34 18 -90 19 -1565 21 -1279 1 -1536 -1 -1567 -12z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2361 3840 c-48 -11 -83 -40 -108 -90 -23 -44 -23 -45 -23 -550 0 -505 0 -506 23 -550 31 -63 76 -90 146 -90 55 0 60 3 486 258 478 287 475 284 475 382 0 97 -3 99 -405 342 -533 321 -519 314 -594 298z m509 -640 c0 -3 -70 -46 -155 -97 l-155 -92 0 189 0 189 155 -92 c85 -51 155 -94 155 -97z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M1345 2702 c-224 -67 -392 -239 -449 -459 -21 -79 -21 -240 -1 -318 21 -78 63 -169 107 -226 l35 -46 -45 -28 c-110 -70 -223 -200 -282 -326 -55 -117 -70 -203 -70 -388 0 -148 2 -170 20 -199 59 -97 220 -98 279 -2 14 24 19 59 24 178 8 214 44 311 155 414 110 103 198 132 402 132 204 0 292 -29 402 -132 111 -103 147 -200 155 -414 7 -164 16 -192 75 -228 45 -27 131 -27 176 0 64 39 72 65 72 251 0 185 -15 271 -70 388 -59 124 -170 254 -282 327 l-44 29 34 45 c81 104 122 235 122 383 0 120 -18 196 -71 298 -74 142 -201 253 -352 307 -96 35 -298 42 -392 14z m313 -341 c54 -28 115 -88 144 -143 19 -36 23 -58 23 -138 0 -109 -17 -152 -85 -220 -68 -68 -111 -85 -220 -85 -80 0 -102 4 -138 23 -55 30 -115 90 -143 144 -27 52 -36 164 -20 225 24 87 119 186 205 213 54 17 186 6 234 -19z"
})));

// Video Hotspot Scene Icon
const videoHotspotSceneIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vhs-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "2.5",
  y: "4",
  width: "19",
  height: "13",
  rx: "2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "9",
  cy: "10.5",
  r: "2.4",
  fill: iconColor,
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "9",
  cy: "10.5",
  r: "4.2",
  opacity: "0.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "6",
  y1: "20.5",
  x2: "18",
  y2: "20.5"
}));
const videoTabsGalleryIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vtg-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 7.5h5l1.5-2H21"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "7.5",
  width: "18",
  height: "12.5",
  rx: "2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "10.5 11.5 15 14.5 10.5 17.5 10.5 11.5",
  fill: iconColor,
  stroke: "none"
}));
const videoScrollytellingShowcaseIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vss-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "3",
  y1: "5",
  x2: "9",
  y2: "5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "3",
  y1: "9",
  x2: "8",
  y2: "9"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "3",
  y1: "13",
  x2: "9",
  y2: "13"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "3",
  y1: "17",
  x2: "8",
  y2: "17"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "12.5",
  y: "4.5",
  width: "9",
  height: "11",
  rx: "1.6"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "15.5 7.5 19 9.75 15.5 12 15.5 7.5",
  fill: iconColor,
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M17 18v2.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M15 20.5h4"
}));
const videoTimelineGalleryIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vtl-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "3",
  x2: "12",
  y2: "21"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "12",
  cy: "6.5",
  r: "2",
  fill: iconColor,
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "12",
  cy: "17.5",
  r: "2",
  fill: iconColor,
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "4.5",
  width: "6",
  height: "4",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "15",
  y: "15.5",
  width: "6",
  height: "4",
  rx: "1"
}));
const videoBentoGridIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vbg-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "3",
  width: "10",
  height: "10",
  rx: "1.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "15",
  y: "3",
  width: "6",
  height: "6",
  rx: "1.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "15",
  y: "11",
  width: "6",
  height: "10",
  rx: "1.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "15",
  width: "10",
  height: "6",
  rx: "1.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "6.5 6 10 8 6.5 10 6.5 6",
  fill: iconColor,
  stroke: "none"
}));
const videoComparisonGalleryIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vcg-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "5",
  width: "18",
  height: "14",
  rx: "2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "3",
  x2: "12",
  y2: "21"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "12",
  cy: "12",
  r: "2.4",
  fill: iconColor,
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "7.5 10 5.5 12 7.5 14"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "16.5 10 18.5 12 16.5 14"
}));
const videoJustifiedGalleryIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vjg-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "4",
  width: "8",
  height: "6",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "13",
  y: "4",
  width: "8",
  height: "6",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "12",
  width: "5",
  height: "8",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "10",
  y: "12",
  width: "11",
  height: "8",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "6 6 8.5 7 6 8 6 6",
  fill: iconColor,
  stroke: "none"
}));
const videoExpandingPanelsIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vep-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "4",
  width: "3.5",
  height: "16",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "7.5",
  y: "4",
  width: "9",
  height: "16",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "17.5",
  y: "4",
  width: "3.5",
  height: "16",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "10.5 9.5 14 12 10.5 14.5 10.5 9.5",
  fill: iconColor,
  stroke: "none"
}));
const videoPipWallIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vpw-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "4",
  width: "8",
  height: "6",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "13",
  y: "4",
  width: "8",
  height: "6",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "12",
  width: "8",
  height: "6",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "12",
  y: "12",
  width: "9",
  height: "7",
  rx: "1.5",
  fill: iconColor,
  fillOpacity: "0.12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "15 14 18.5 15.5 15 17 15 14",
  fill: iconColor,
  stroke: "none"
}));
const videoSwipeDeckIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vsd-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "6",
  y: "5",
  width: "11",
  height: "15",
  rx: "2",
  transform: "rotate(-8 6 5)",
  opacity: "0.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "8",
  y: "4",
  width: "11",
  height: "15",
  rx: "2",
  transform: "rotate(6 8 4)",
  opacity: "0.75"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "7",
  y: "4",
  width: "11",
  height: "15",
  rx: "2",
  fill: iconColor,
  fillOpacity: "0.12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "11 8 15 11 11 14 11 8",
  fill: iconColor,
  stroke: "none"
}));
const videoMarqueeWallIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: iconColor,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vmw-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "1.5",
  y: "4",
  width: "6",
  height: "6",
  rx: "1",
  fill: iconColor,
  fillOpacity: "0.12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "9",
  y: "4",
  width: "6",
  height: "6",
  rx: "1",
  fill: iconColor,
  fillOpacity: "0.25"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "16.5",
  y: "4",
  width: "6",
  height: "6",
  rx: "1",
  fill: iconColor,
  fillOpacity: "0.12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "1.5",
  y: "14",
  width: "6",
  height: "6",
  rx: "1",
  fill: iconColor,
  fillOpacity: "0.25"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "9",
  y: "14",
  width: "6",
  height: "6",
  rx: "1",
  fill: iconColor,
  fillOpacity: "0.12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "16.5",
  y: "14",
  width: "6",
  height: "6",
  rx: "1",
  fill: iconColor,
  fillOpacity: "0.25"
}));
const videoFlipCardsGalleryIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "#136EF5",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vfc-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "5",
  width: "7",
  height: "14",
  rx: "1.5",
  fill: "#136EF5",
  fillOpacity: "0.12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "5",
  width: "7",
  height: "14",
  rx: "1.5",
  fill: "#136EF5",
  fillOpacity: "0.25"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10.5 12h3",
  strokeDasharray: "1.4 1.6"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M12 4.2c1.7 1.3 1.7 14.3 0 15.6",
  opacity: "0.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "16 9.5 19 12 16 14.5",
  fill: "#136EF5",
  stroke: "none"
}));
const videoStoriesIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "#136EF5",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vst-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "7",
  cy: "9",
  r: "5",
  fill: "#136EF5",
  fillOpacity: "0.1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "7",
  cy: "9",
  r: "2.4",
  fill: "#136EF5",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "17",
  cy: "9",
  r: "5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M15.4 9l3.4-2v4l-3.4-2z",
  fill: "#136EF5",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 18h18",
  opacity: "0.6"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M5 21h14",
  opacity: "0.35"
}));
const videoMapGalleryIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "#136EF5",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vmg-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M1 6l7-3 8 3 7-3v15l-7 3-8-3-7 3V6z",
  fill: "#136EF5",
  fillOpacity: "0.1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M8 3v15M16 6v15",
  opacity: "0.6"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M13 9.5a3 3 0 1 0-6 0c0 2.2 3 4.5 3 4.5s3-2.3 3-4.5z",
  fill: "#136EF5",
  fillOpacity: "0.25"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "10",
  cy: "9.4",
  r: "1",
  fill: "#136EF5",
  stroke: "none"
}));
const videoPodcastEpisodesIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "#136EF5",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vpe-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "2",
  y: "4",
  width: "20",
  height: "12",
  rx: "2",
  fill: "#136EF5",
  fillOpacity: "0.1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10.5 8l4 2-4 2V8z",
  fill: "#136EF5",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "9",
  cy: "20",
  r: "1.4",
  fill: "#136EF5",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M11.2 18.6a3 3 0 0 1 4.2 0",
  opacity: "0.7"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M13 16.8a5.4 5.4 0 0 1 6 0",
  opacity: "0.45"
}));
const videoPropertyTourGalleryIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "#136EF5",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vptg-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "1.5",
  y: "6",
  width: "12",
  height: "12",
  rx: "1.5",
  fill: "#136EF5",
  fillOpacity: "0.1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M6 12.5l3 1.7-3 1.7v-3.4z",
  fill: "#136EF5",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M16 8.5l3.2-2.6L22.5 8.5v9.5h-6.5V8.5z",
  fill: "#136EF5",
  fillOpacity: "0.18"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M18 18v-3.5h2.5V18"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M14.5 9.5h7",
  opacity: "0.5"
}));
const videoWorkoutPlannerIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "#136EF5",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vwp-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "2.5",
  y: "4",
  width: "19",
  height: "5",
  rx: "1.4",
  fill: "#136EF5",
  fillOpacity: "0.1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M6 5.6l2.4 1.4L6 8.4V5.6z",
  fill: "#136EF5",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "11",
  y1: "6.5",
  x2: "18.5",
  y2: "6.5",
  opacity: "0.55"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 14.5h2M19 14.5h2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "5",
  y: "13",
  width: "2.2",
  height: "3",
  rx: "0.5",
  fill: "#136EF5",
  fillOpacity: "0.2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "16.8",
  y: "13",
  width: "2.2",
  height: "3",
  rx: "0.5",
  fill: "#136EF5",
  fillOpacity: "0.2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "7.2",
  y1: "14.5",
  x2: "16.8",
  y2: "14.5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "2.5",
  y: "19",
  width: "13",
  height: "2.2",
  rx: "1.1",
  fill: "#136EF5",
  fillOpacity: "0.15"
}));
const videoWeddingStoryGalleryIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "#136EF5",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vwsg-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "2.5",
  y: "3.5",
  width: "19",
  height: "11",
  rx: "1.6",
  fill: "#136EF5",
  fillOpacity: "0.1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10 6.6l4 2.4-4 2.4V6.6z",
  fill: "#136EF5",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "2.5",
  y: "16.8",
  width: "4",
  height: "4",
  rx: "0.8",
  fill: "#136EF5",
  fillOpacity: "0.18"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "7.5",
  y: "16.8",
  width: "4",
  height: "4",
  rx: "0.8",
  fill: "#136EF5",
  fillOpacity: "0.18"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "12.5",
  y: "16.8",
  width: "4",
  height: "4",
  rx: "0.8",
  fill: "#136EF5",
  fillOpacity: "0.18"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "17.5",
  y: "16.8",
  width: "4",
  height: "4",
  rx: "0.8",
  fill: "#136EF5",
  fillOpacity: "0.18"
}));
const videoMenuShowcaseIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "#136EF5",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vms-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "3.5",
  width: "8",
  height: "8",
  rx: "1.4",
  fill: "#136EF5",
  fillOpacity: "0.1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M6 5.8l2.4 1.4L6 8.6V5.8z",
  fill: "#136EF5",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "13",
  y: "3.5",
  width: "8",
  height: "8",
  rx: "1.4",
  fill: "#136EF5",
  fillOpacity: "0.1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M16 5.8l2.4 1.4L16 8.6V5.8z",
  fill: "#136EF5",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "3",
  y1: "15",
  x2: "14",
  y2: "15",
  opacity: "0.6"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "3",
  y1: "18.4",
  x2: "11",
  y2: "18.4",
  opacity: "0.45"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "18.5",
  cy: "17",
  r: "2.4",
  fill: "#136EF5",
  fillOpacity: "0.18"
}));
const videoFeatureTourIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "#136EF5",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "vft-icon"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "4.5",
  cy: "5.5",
  r: "1.4",
  fill: "#136EF5",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "4.5",
  cy: "12",
  r: "1.4",
  fill: "#136EF5",
  fillOpacity: "0.35",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "4.5",
  cy: "18.5",
  r: "1.4",
  fill: "#136EF5",
  fillOpacity: "0.35",
  stroke: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "4.5",
  y1: "6.9",
  x2: "4.5",
  y2: "17.1",
  opacity: "0.4"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "9.5",
  y: "4.5",
  width: "11",
  height: "15",
  rx: "1.6",
  fill: "#136EF5",
  fillOpacity: "0.08"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "13 9 17.5 12 13 15 13 9",
  fill: "#136EF5",
  stroke: "none"
}));

/***/ }),

/***/ "./src/admin/Components/AiSetup.js":
/*!*****************************************!*\
  !*** ./src/admin/Components/AiSetup.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bpl_tools_Admin_utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/utils/icons */ "../bpl-tools/Admin/utils/icons.js");





const NS = "/vidgalblk/v1/ai";
const STATE_TEXT = {
  unsupported: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("AI needs WordPress 7.0 or newer. Update WordPress to use it.", "video-gallery-block"),
  disabled: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("AI is switched off for this site, so Video Gallery Block cannot use it.", "video-gallery-block")
};

// The AI features' tools that other AI apps (through MCP) can use.
const TOOLS = [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("List and read your video galleries", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Check whether a YouTube or Vimeo feed is healthy", "video-gallery-block")];
const copy = (text, done) => {
  try {
    navigator.clipboard.writeText(text).then(done, () => {});
  } catch (e) {
    // Clipboard blocked: the text stays selectable on the page.
  }
};

// One row per AI provider WordPress lists, like Settings → Connectors: its
// logo, what it can do, and where it stands or the next step for it.
// Connected ones first.
const ProviderList = ({
  list,
  adminUrl,
  connectorsUrl,
  current = ""
}) => {
  const items = Array.isArray(list) && list.length ? list : [["Google", "google"], ["OpenAI", "openai"], ["Anthropic", "anthropic"]].map(([name, key]) => ({
    id: key,
    name,
    slug: "ai-provider-for-" + key,
    installed: false,
    active: false,
    connected: false
  }));
  const sorted = [...items.filter(p => p.connected), ...items.filter(p => !p.connected)];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "vgbAiSetup__providerList"
  }, sorted.map(p => {
    let action = null;
    if (p.connected) {
      action = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "vgbAiProvider__pill"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Connected", "video-gallery-block")), current === p.id && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "vgbAiProvider__pill is-use"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("In use", "video-gallery-block")), connectorsUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        className: "vgbAiProvider__edit",
        href: connectorsUrl
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit", "video-gallery-block")));
    } else if (p.active) {
      action = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        className: "button",
        href: connectorsUrl
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add key", "video-gallery-block"));
    } else if (p.installed) {
      action = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        className: "button",
        href: (adminUrl || "") + "plugins.php"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Activate", "video-gallery-block"));
    } else if (p.slug) {
      action = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        className: "button",
        href: (adminUrl || "") + "plugin-install.php?tab=plugin-information&plugin=" + p.slug
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Install", "video-gallery-block"));
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: p.id,
      className: "vgbAiProvider" + (p.connected ? " is-connected" : "")
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "vgbAiProvider__logo",
      "aria-hidden": "true"
    }, p.logo ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: p.logo,
      alt: ""
    }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (p.name || "?").charAt(0))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "vgbAiProvider__text"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, p.name), p.description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, p.description)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "vgbAiProvider__action"
    }, action));
  }));
};

// One capability chip: what the connected provider can (✓) or cannot (✗) do.
const Chip = ({
  on,
  label,
  off
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
  className: "vgbAiSetup__chip " + (on ? "is-on" : "is-off"),
  title: on ? undefined : off
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  "aria-hidden": "true"
}, on ? "✓" : "✗"), " ", label, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "screen-reader-text"
}, on ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("(available)", "video-gallery-block") : off));

// A card in the look of the dashboard's Settings page.
const Card = ({
  badge,
  badgeClass = "",
  title,
  text,
  children,
  foot
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
  className: "settingsCard"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
  className: "settingsCardHead"
}, badge && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "vgbAiSetup__badge " + badgeClass
}, badge), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, title), text && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, text))), children && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "settingsCardBody"
}, children), foot && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
  className: "settingsCardFoot"
}, foot));
const AiSetup = ({
  restUrl,
  adminUrl
}) => {
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [failed, setFailed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [testing, setTesting] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [result, setResult] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [copied, setCopied] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [choosing, setChoosing] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [saved, setSaved] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const load = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setLoading(true);
    setFailed(false);
    try {
      setStatus(await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: NS + "/status?refresh=1"
      }));
    } catch (e) {
      setFailed(true);
    }
    setLoading(false);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    load();
  }, [load]);
  const chooseProvider = async provider => {
    setChoosing(true);
    setSaved(false);
    try {
      const next = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: NS + "/provider",
        method: "POST",
        data: {
          provider
        }
      });
      // The answer leaves out the provider list; keep the one in hand.
      setStatus(prev => {
        var _next$available;
        return {
          ...next,
          available: (_next$available = next?.available) !== null && _next$available !== void 0 ? _next$available : prev?.available
        };
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setResult({
        ok: false,
        text: e?.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Could not change the provider.", "video-gallery-block")
      });
    }
    setChoosing(false);
  };
  const test = async () => {
    setTesting(true);
    setResult(null);
    try {
      const res = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: NS + "/test",
        method: "POST"
      });
      setResult({
        ok: true,
        text: res?.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("The AI answered. Everything works.", "video-gallery-block")
      });
    } catch (e) {
      setResult({
        ok: false,
        text: e?.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("The test failed. Please try again.", "video-gallery-block")
      });
    }
    setTesting(false);
  };
  const state = status?.state;
  const ready = "ready" === state;
  const blocked = state in STATE_TEXT;
  const connected = ["ready", "unreachable", "needs_approval"].includes(state);
  const endpoint = (restUrl || "").replace(/\/?$/, "/") + "mcp/mcp-adapter-default-server";
  const testButton = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "button",
    onClick: test,
    disabled: testing || !connected
  }, testing ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Testing…", "video-gallery-block") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Test connection", "video-gallery-block"));
  const steps = [{
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Connect an AI provider", "video-gallery-block"),
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Install a provider plugin (Google, OpenAI or Anthropic) and paste its API key under Settings, Connectors. Google has a free plan with limits; OpenAI and Anthropic need a paid account.", "video-gallery-block"),
    done: connected,
    button: status?.connectors_url && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: "button button-primary",
      href: status.connectors_url
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Open Connectors", "video-gallery-block")),
    keys: !connected
  }, ...(status?.approval_url ? [{
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Allow Video Gallery Block to use it", "video-gallery-block"),
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Approve this plugin for your provider.", "video-gallery-block"),
    done: "needs_approval" !== state && connected,
    button: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: "button button-primary",
      href: status.approval_url
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Open Connector Approvals", "video-gallery-block"))
  }] : []), {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Test the connection", "video-gallery-block"),
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("One tiny request to your provider, so you know it works before you edit a gallery.", "video-gallery-block"),
    done: ready,
    button: testButton
  }];
  const current = steps.findIndex(s => !s.done);

  // The status strip: one line on where AI stands right now.
  let statusIcon = _bpl_tools_Admin_utils_icons__WEBPACK_IMPORTED_MODULE_3__.keyIcon;
  let statusTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("AI is not set up yet", "video-gallery-block");
  let statusText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Follow the steps below. It takes about two minutes.", "video-gallery-block");
  let statusClass = "is-pending";
  if (loading) {
    statusTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Checking…", "video-gallery-block");
    statusText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Asking WordPress whether an AI provider is connected.", "video-gallery-block");
  } else if (failed) {
    statusIcon = _bpl_tools_Admin_utils_icons__WEBPACK_IMPORTED_MODULE_3__.alertIcon;
    statusTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Could not check the AI status", "video-gallery-block");
    statusText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please try again.", "video-gallery-block");
    statusClass = "is-bad";
  } else if (blocked) {
    statusIcon = _bpl_tools_Admin_utils_icons__WEBPACK_IMPORTED_MODULE_3__.alertIcon;
    statusTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("AI is not available", "video-gallery-block");
    statusText = STATE_TEXT[state];
    statusClass = "is-bad";
  } else if (ready) {
    statusIcon = _bpl_tools_Admin_utils_icons__WEBPACK_IMPORTED_MODULE_3__.checkCircleIcon;
    statusTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("AI is ready", "video-gallery-block");
    statusText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Your AI provider is connected. Open any Video Gallery block and use “Edit with AI” in its sidebar.", "video-gallery-block");
    statusClass = "is-ready";
  }
  const resultLine = result && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "vgbAiSetup__result " + (result.ok ? "is-ok" : "is-bad"),
    role: "status"
  }, result.text);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardSettings vgbAiSetup"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "settingsHero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "settingsEyebrow"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("AI Setup", "video-gallery-block")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Build galleries with AI", "video-gallery-block")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Turn on AI once and Video Gallery Block can set up a gallery from a short description. You will find it in the block's sidebar under “Edit with AI”.", "video-gallery-block"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "settingsStatus vgbAiSetup__status " + statusClass,
    "aria-live": "polite"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsStatusIcon"
  }, statusIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsStatusBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, statusTitle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, statusText)), !loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "vgbAiSetup__recheck",
    onClick: load
  }, _bpl_tools_Admin_utils_icons__WEBPACK_IMPORTED_MODULE_3__.refreshIcon, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Check again", "video-gallery-block"))), !loading && !failed && !blocked && !ready && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Get started", "video-gallery-block"),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %d: number of steps */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Turn on AI in %d steps", "video-gallery-block"), steps.length),
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("You need an AI provider account. Your key stays in WordPress; Video Gallery Block never sees it.", "video-gallery-block")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ol", {
    className: "vgbAiSetup__steps"
  }, steps.map((step, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: step.title,
    className: (step.done ? "is-done " : "") + (i === current ? "is-current" : "")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "vgbAiSetup__num",
    "aria-hidden": "true"
  }, step.done ? "✓" : i + 1), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, step.title), !step.done && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, step.text), !step.done && step.keys && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProviderList, {
    list: status.available,
    adminUrl: adminUrl,
    connectorsUrl: status.connectors_url
  }), !step.done && step.keys && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Get a key:", "video-gallery-block"), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://aistudio.google.com/apikey",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Google"), " · ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://platform.openai.com/api-keys",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "OpenAI"), " · ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://console.anthropic.com/settings/keys",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Anthropic")), i === current && step.button)))), resultLine), !loading && !failed && ready && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Ready", "video-gallery-block"),
    badgeClass: "is-ok",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("What you can do now", "video-gallery-block"),
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add a Video Gallery block to any page, then open “Edit with AI” in the block's sidebar and say what you want.", "video-gallery-block"),
    foot: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "vgbAiSetup__actions"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: "button button-primary",
      href: (adminUrl || "") + "post-new.php?post_type=page"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Try it on a new page", "video-gallery-block")), testButton), resultLine)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "vgbAiSetup__chips"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Chip, {
    on: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Gallery setup & styles", "video-gallery-block")
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Chip, {
    on: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Better video titles", "video-gallery-block")
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Chip, {
    on: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Sort videos into albums", "video-gallery-block")
  }))), !loading && !failed && ready && Array.isArray(status.providers) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Provider", "video-gallery-block"),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("AI providers", "video-gallery-block"),
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("The gallery's AI uses one connected provider. Let WordPress choose, or pick one.", "video-gallery-block")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "vgbAiSetup__useRow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "vgbAiProviderSelect"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Use for galleries", "video-gallery-block")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "vgbAiProviderSelect",
    className: "vgbAiSetup__select",
    value: status.provider || "",
    disabled: choosing,
    onChange: e => chooseProvider(e.target.value)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: ""
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Let WordPress choose", "video-gallery-block")), (Array.isArray(status.available) && status.available.length ? status.available.filter(p => !p.suggested) : status.providers.map(p => ({
    ...p,
    connected: true
  }))).map(p => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: p.id,
    value: p.id,
    disabled: !p.connected
  }, p.connected ? p.name : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s: AI provider name */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("%s (not set up)", "video-gallery-block"), p.name)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "vgbAiSetup__saved",
    role: "status"
  }, choosing ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Saving…", "video-gallery-block") : saved ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("✓ Saved", "video-gallery-block") : "")), Array.isArray(status.available) && status.available.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProviderList, {
    list: status.available,
    adminUrl: adminUrl,
    connectorsUrl: status.connectors_url,
    current: status.provider || ""
  }), status.connectors_url && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "vgbAiSetup__note"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Keys are kept by WordPress, under", "video-gallery-block"), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: status.connectors_url
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Settings → Connectors", "video-gallery-block")), ".")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Optional", "video-gallery-block"),
    badgeClass: "is-muted",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Use it from other AI apps", "video-gallery-block"),
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Apps such as Claude or ChatGPT can look at your galleries through the WordPress MCP Adapter plugin. They act as the user you sign in with, so they can only do what that user may do.", "video-gallery-block")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ol", {
    className: "vgbAiSetup__steps"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "vgbAiSetup__num",
    "aria-hidden": "true"
  }, "1"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Install the MCP Adapter plugin", "video-gallery-block")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: (adminUrl || "") + "plugin-install.php?tab=plugin-information&plugin=mcp-adapter"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Install MCP Adapter", "video-gallery-block"))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "vgbAiSetup__num",
    "aria-hidden": "true"
  }, "2"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Sign your AI app in", "video-gallery-block")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("How an AI app signs in depends on the app. The MCP Adapter guide explains the options.", "video-gallery-block"), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://github.com/WordPress/mcp-adapter",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Open the guide", "video-gallery-block"))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "vgbAiSetup__num",
    "aria-hidden": "true"
  }, "3"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Give the AI app this address", "video-gallery-block")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "vgbAiSetup__codeRow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", {
    className: "vgbAiSetup__code"
  }, endpoint), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "button",
    onClick: () => copy(endpoint, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    })
  }, copied ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Copied", "video-gallery-block") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Copy address", "video-gallery-block")))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "cleanupLabel"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("What the AI app can do", "video-gallery-block")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "cleanupList vgbAiSetup__tools"
  }, TOOLS.map(tool => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: tool
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "vgbAiSetup__dot"
  }, _bpl_tools_Admin_utils_icons__WEBPACK_IMPORTED_MODULE_3__.checkIcon), tool)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AiSetup);

/***/ }),

/***/ "./src/admin/Components/App.js":
/*!*************************************!*\
  !*** ./src/admin/Components/App.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/development/chunk-KNED5TY2.mjs");
/* harmony import */ var _bpl_tools_Admin_Welcome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Welcome */ "../bpl-tools/Admin/Welcome/index.js");
/* harmony import */ var _bpl_tools_Admin_Demos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Demos */ "../bpl-tools/Admin/Demos/index.js");
/* harmony import */ var _bpl_tools_Admin_Pricing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Pricing */ "../bpl-tools/Admin/Pricing/index.js");
/* harmony import */ var _bpl_tools_Admin_FeatureCompare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/FeatureCompare */ "../bpl-tools/Admin/FeatureCompare/index.js");
/* harmony import */ var _bpl_tools_Admin_OurPlugins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/OurPlugins */ "../bpl-tools/Admin/OurPlugins/index.js");
/* harmony import */ var _bpl_tools_Admin_Blocks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Blocks */ "../bpl-tools/Admin/Blocks/index.js");
/* harmony import */ var _AiSetup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AiSetup */ "./src/admin/Components/AiSetup.js");
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Layout */ "./src/admin/Components/Layout.js");
/* harmony import */ var _bpl_tools_Admin_Settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Settings */ "../bpl-tools/Admin/Settings/index.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/data */ "./src/admin/utils/data.js");












const App = props => {
  const {
    adminUrl
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.HashRouter, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Routes, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "/",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Layout__WEBPACK_IMPORTED_MODULE_8__["default"], {
      ...props
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    index: true,
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Welcome__WEBPACK_IMPORTED_MODULE_1__["default"], {
      ...props,
      ...(0,_utils_data__WEBPACK_IMPORTED_MODULE_10__.welcomeInfo)(adminUrl)
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "welcome",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Welcome__WEBPACK_IMPORTED_MODULE_1__["default"], {
      ...props,
      ...(0,_utils_data__WEBPACK_IMPORTED_MODULE_10__.welcomeInfo)(adminUrl)
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "demos",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Demos__WEBPACK_IMPORTED_MODULE_2__["default"], {
      demoInfo: _utils_data__WEBPACK_IMPORTED_MODULE_10__.demoInfo,
      ...props
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "ai",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AiSetup__WEBPACK_IMPORTED_MODULE_7__["default"], {
      restUrl: props.restUrl,
      adminUrl: props.adminUrl
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "pricing",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Pricing__WEBPACK_IMPORTED_MODULE_3__["default"], {
      pricingInfo: _utils_data__WEBPACK_IMPORTED_MODULE_10__.pricingInfo,
      options: {},
      ...props
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "feature-comparison",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_FeatureCompare__WEBPACK_IMPORTED_MODULE_4__["default"], {
      plans: ["free", "pro"],
      ...props
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "blocks",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Blocks__WEBPACK_IMPORTED_MODULE_6__["default"], {
      ...props
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "our-plugins",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_OurPlugins__WEBPACK_IMPORTED_MODULE_5__["default"], {
      ...props
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "settings",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Settings__WEBPACK_IMPORTED_MODULE_9__["default"], {
      ...props,
      ajaxAction: "vidgalblkSaveUninstallOption"
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "*",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Navigate, {
      to: "/welcome",
      replace: true
    })
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/admin/Components/Layout.js":
/*!****************************************!*\
  !*** ./src/admin/Components/Layout.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/development/chunk-KNED5TY2.mjs");
/* harmony import */ var _bpl_tools_Admin_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Header */ "../bpl-tools/Admin/Header/index.js");



const navigation = [{
  name: "Welcome",
  href: "/welcome"
}, {
  name: "Blocks",
  href: "/blocks"
}, {
  name: "Demos",
  href: "/demos"
}, {
  name: "AI Setup",
  href: "/ai"
}, {
  name: "Pricing",
  href: "/pricing"
}, {
  name: "Feature Comparison",
  href: "/feature-comparison"
}, {
  name: "Settings",
  href: "/settings"
}];
const Layout = props => {
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Header__WEBPACK_IMPORTED_MODULE_1__["default"], {
    ...props
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "bPlDashboardNav"
  }, navigation?.map((item, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
    key: index,
    to: item.href,
    className: `navLink ${location.pathname === item.href ? "active" : ""}`
  }, item.name)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    className: "bPlDashboardMain"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Outlet, null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/admin/assets/banner.js":
/*!************************************!*\
  !*** ./src/admin/assets/banner.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   videoGalleryBanner: () => (/* binding */ videoGalleryBanner)
/* harmony export */ });
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" fill="none" role="img" aria-label="Video Gallery Block by bPlugins">
  <defs>
    <linearGradient id="vgbBg" x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0b1b33"/>
      <stop offset="0.52" stop-color="#17408a"/>
      <stop offset="1" stop-color="#146ef5"/>
    </linearGradient>
    <linearGradient id="vgbGlass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.07"/>
    </linearGradient>
    <linearGradient id="vgbCard" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#eaf1ff"/>
    </linearGradient>
    <filter id="vgbShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#04122b" flood-opacity="0.45"/>
    </filter>
    <g id="vgbPlay">
      <circle r="9" fill="#ffffff" fill-opacity="0.9"/>
      <path d="M-3 -5 L-3 5 L5 0 Z" fill="#17408a" stroke="#17408a" stroke-width="1.5" stroke-linejoin="round"/>
    </g>
  </defs>

  <rect width="600" height="400" fill="url(#vgbBg)"/>
  <circle cx="70" cy="52" r="120" fill="#ffffff" opacity="0.06"/>
  <circle cx="548" cy="352" r="150" fill="#0a3f9e" opacity="0.32"/>
  <circle cx="522" cy="58" r="64" fill="#ffffff" opacity="0.05"/>

  <g>
    <rect x="48" y="42" width="44" height="44" rx="12" fill="#ffffff"/>
    <g transform="translate(55 50) scale(0.8)">
      <path d="M37.4506 10.2852C37.4429 13.1251 36.1918 15.7041 34.2269 17.5539C32.3003 19.3883 29.683 20.5166 26.8891 20.5166H25.6687C22.5909 20.5166 20.0963 23.0111 20.0963 26.089V35.2689H12.9735C12.1139 35.2689 11.4231 34.5704 11.4231 33.7184V22.259C11.4231 21.5605 11.0393 20.8774 10.3869 20.6241C9.72678 20.3631 9.04367 20.555 8.61384 20.9695C8.59849 20.9925 8.58314 21.0002 8.56779 21.0155C7.66208 21.9903 6.38028 22.5967 4.95264 22.5967C2.02061 22.5967 -0.305059 20.0561 0.032662 17.0703C0.293628 14.7677 2.20482 12.9256 4.50746 12.7183C6.11931 12.5802 7.593 13.2096 8.59081 14.2918C8.97458 14.6679 9.55025 14.8675 10.1489 14.7293C10.9165 14.5528 11.4307 13.8236 11.4307 13.033V1.55821C11.4307 0.698559 12.1292 0.00776578 12.9812 0.00776578H18.024C18.9066 0.00776578 19.7126 0.652504 19.7816 1.53518C19.82 2.04944 19.6358 2.51764 19.3058 2.84769C18.3233 3.75339 17.7093 5.04287 17.7093 6.47819C17.7093 9.21833 19.9275 11.4289 22.66 11.4289C25.4001 11.4289 27.6106 9.21833 27.6106 6.47819C27.6106 5.04287 27.0043 3.76107 26.0295 2.86304C26.0141 2.84769 26.0065 2.83234 25.9834 2.81699C25.6073 2.42554 25.4231 1.8422 25.5843 1.24352C25.7762 0.483645 26.5284 -0.0075868 27.3113 8.86678e-05C30.0975 0.038466 32.615 1.17444 34.4418 3.0012C36.3069 4.87401 37.4583 7.43762 37.4506 10.2852Z" fill="#146EF5"/>
      <path d="M37.4507 25.0145C37.4507 30.679 32.8607 35.2689 27.1962 35.2689H20.0964V26.0891C20.0964 23.0112 22.591 20.5167 25.6688 20.5167H26.8892C29.6831 20.5167 32.3004 19.3884 34.227 17.554C34.2961 17.623 34.3728 17.6921 34.4419 17.7689C36.2994 19.6187 37.4507 22.1823 37.4507 25.0145Z" fill="#FF7A00"/>
    </g>
    <text x="108" y="73" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#ffffff">Video Gallery</text>
  </g>

  <g filter="url(#vgbShadow)">
    <g transform="translate(52 172) rotate(-7)">
      <rect width="152" height="104" rx="16" fill="url(#vgbGlass)"/>
      <rect x="14" y="14" width="58" height="40" rx="8" fill="#ffffff" opacity="0.2"/>
      <rect x="80" y="14" width="58" height="40" rx="8" fill="#ffffff" opacity="0.2"/>
      <path d="M38 26 L38 42 L51 34 Z" fill="#ffffff" opacity="0.85" stroke="#ffffff" stroke-opacity="0.85" stroke-width="3" stroke-linejoin="round"/>
      <path d="M104 26 L104 42 L117 34 Z" fill="#ffffff" opacity="0.85" stroke="#ffffff" stroke-opacity="0.85" stroke-width="3" stroke-linejoin="round"/>
      <rect x="14" y="68" width="86" height="7" rx="3.5" fill="#ffffff" opacity="0.65"/>
      <rect x="14" y="82" width="56" height="6" rx="3" fill="#ffffff" opacity="0.35"/>
    </g>
    <g transform="translate(396 172) rotate(7)">
      <rect width="152" height="104" rx="16" fill="url(#vgbGlass)"/>
      <rect x="14" y="14" width="58" height="40" rx="8" fill="#ffffff" opacity="0.2"/>
      <rect x="80" y="14" width="58" height="40" rx="8" fill="#ffffff" opacity="0.2"/>
      <path d="M38 26 L38 42 L51 34 Z" fill="#ffffff" opacity="0.85" stroke="#ffffff" stroke-opacity="0.85" stroke-width="3" stroke-linejoin="round"/>
      <path d="M104 26 L104 42 L117 34 Z" fill="#ffffff" opacity="0.85" stroke="#ffffff" stroke-opacity="0.85" stroke-width="3" stroke-linejoin="round"/>
      <rect x="14" y="68" width="72" height="7" rx="3.5" fill="#ffffff" opacity="0.65"/>
      <rect x="14" y="82" width="48" height="6" rx="3" fill="#ffffff" opacity="0.35"/>
    </g>
    <g transform="translate(196 142)">
      <rect width="208" height="158" rx="20" fill="url(#vgbCard)"/>
      <rect x="14" y="14" width="56" height="46" rx="9" fill="#1d4fb0"/>
      <rect x="76" y="14" width="56" height="46" rx="9" fill="#0b1b33"/>
      <rect x="138" y="14" width="56" height="46" rx="9" fill="#2a6bd9"/>
      <rect x="14" y="66" width="56" height="46" rx="9" fill="#0b1b33"/>
      <rect x="76" y="66" width="56" height="46" rx="9" fill="#17408a"/>
      <rect x="138" y="66" width="56" height="46" rx="9" fill="#1d4fb0"/>
      <use href="#vgbPlay" x="42" y="37"/>
      <use href="#vgbPlay" x="104" y="37"/>
      <use href="#vgbPlay" x="166" y="37"/>
      <use href="#vgbPlay" x="42" y="89"/>
      <use href="#vgbPlay" x="104" y="89"/>
      <use href="#vgbPlay" x="166" y="89"/>
      <rect x="13" y="13" width="58" height="48" rx="10" fill="none" stroke="#FF7A00" stroke-width="3">
        <animate attributeName="x" values="13;75;137;13;75;137" calcMode="discrete" dur="6s" repeatCount="indefinite"/>
        <animate attributeName="y" values="13;13;13;65;65;65" calcMode="discrete" dur="6s" repeatCount="indefinite"/>
      </rect>
      <rect x="14" y="126" width="44" height="14" rx="7" fill="#146ef5"/>
      <rect x="64" y="126" width="36" height="14" rx="7" fill="#0b1b33" opacity="0.14"/>
      <rect x="106" y="126" width="36" height="14" rx="7" fill="#0b1b33" opacity="0.14"/>
      <rect x="164" y="126" width="30" height="14" rx="7" fill="#0b1b33" opacity="0.1"/>
    </g>
  </g>

  <g><rect x="210" y="328" width="180" height="48" rx="24" fill="#ffffff"/><g transform="translate(234 340) scale(0.66)"><path d="M37.4506 10.2852C37.4429 13.1251 36.1918 15.7041 34.2269 17.5539C32.3003 19.3883 29.683 20.5166 26.8891 20.5166H25.6687C22.5909 20.5166 20.0963 23.0111 20.0963 26.089V35.2689H12.9735C12.1139 35.2689 11.4231 34.5704 11.4231 33.7184V22.259C11.4231 21.5605 11.0393 20.8774 10.3869 20.6241C9.72678 20.3631 9.04367 20.555 8.61384 20.9695C8.59849 20.9925 8.58314 21.0002 8.56779 21.0155C7.66208 21.9903 6.38028 22.5967 4.95264 22.5967C2.02061 22.5967 -0.305059 20.0561 0.032662 17.0703C0.293628 14.7677 2.20482 12.9256 4.50746 12.7183C6.11931 12.5802 7.593 13.2096 8.59081 14.2918C8.97458 14.6679 9.55025 14.8675 10.1489 14.7293C10.9165 14.5528 11.4307 13.8236 11.4307 13.033V1.55821C11.4307 0.698559 12.1292 0.00776578 12.9812 0.00776578H18.024C18.9066 0.00776578 19.7126 0.652504 19.7816 1.53518C19.82 2.04944 19.6358 2.51764 19.3058 2.84769C18.3233 3.75339 17.7093 5.04287 17.7093 6.47819C17.7093 9.21833 19.9275 11.4289 22.66 11.4289C25.4001 11.4289 27.6106 9.21833 27.6106 6.47819C27.6106 5.04287 27.0043 3.76107 26.0295 2.86304C26.0141 2.84769 26.0065 2.83234 25.9834 2.81699C25.6073 2.42554 25.4231 1.8422 25.5843 1.24352C25.7762 0.483645 26.5284 -0.0075868 27.3113 8.86678e-05C30.0975 0.038466 32.615 1.17444 34.4418 3.0012C36.3069 4.87401 37.4583 7.43762 37.4506 10.2852Z" fill="#146EF5" /><path d="M37.4507 25.0145C37.4507 30.679 32.8607 35.2689 27.1962 35.2689H20.0964V26.0891C20.0964 23.0112 22.591 20.5167 25.6688 20.5167H26.8892C29.6831 20.5167 32.3004 19.3884 34.227 17.554C34.2961 17.623 34.3728 17.6921 34.4419 17.7689C36.2994 19.6187 37.4507 22.1823 37.4507 25.0145Z" fill="#FF7A00" /><path d="M62.3039 10.5922C58.5352 10.5922 57.1997 12.9563 57.1997 12.9563H56.7391V4.07574C56.7391 3.61521 56.4705 3.35425 56.0176 3.35425H52.2874C51.8268 3.35425 51.6042 3.62289 51.6042 4.07574V30.8171C51.6042 31.2776 51.8345 31.5386 52.2874 31.5386H56.0176C56.4782 31.5386 56.7391 31.2699 56.7391 30.8171V29.4816H57.1997C57.1997 29.4816 58.5352 31.8456 62.3039 31.8456C67.5999 31.8456 70.7238 27.2019 70.7238 21.2151C70.7238 15.2282 67.5923 10.5922 62.3039 10.5922ZM60.9299 27.5397C57.9595 27.5397 56.4705 24.9146 56.4705 21.2151C56.4705 17.5232 57.9595 14.8905 60.9299 14.8905C63.9387 14.8905 65.351 17.5155 65.351 21.2151C65.351 24.9146 63.9387 27.5397 60.9299 27.5397Z" fill="#101828" /><path d="M73.7786 4.45953C73.7786 4.0604 74.1009 3.73804 74.5001 3.73804H83.5494C86.3203 3.73804 88.5769 4.60536 90.3039 6.34002C92.0308 8.07468 92.8982 10.3389 92.8982 13.1405C92.8982 15.8883 92.0078 18.1219 90.2271 19.8488C88.4464 21.5682 86.1514 22.4278 83.3422 22.4278H78.7523V30.8171C78.7523 31.2162 78.4299 31.5386 78.0308 31.5386H74.5077C74.1086 31.5386 73.7862 31.2162 73.7862 30.8171V4.45953H73.7786ZM78.7523 7.89814V18.2984H82.2293C84.0176 18.2984 85.3992 17.8456 86.3817 16.9475C87.3641 16.0495 87.8554 14.7754 87.8554 13.1328C87.8554 11.4365 87.3718 10.1394 86.397 9.24135C85.4299 8.34332 84.0407 7.89046 82.2446 7.89046H78.7523V7.89814Z" fill="#101828" /><path d="M104.603 31.5386C105.056 31.5386 105.325 31.2699 105.325 30.8171V27.7699C105.325 27.3094 105.056 27.0868 104.603 27.0868H102.431C101.594 27.0868 101.096 26.5879 101.096 25.7513V4.07574C101.096 3.61521 100.827 3.35425 100.374 3.35425H96.6438C96.1833 3.35425 95.9607 3.62289 95.9607 4.07574V26.1274C95.9607 29.6351 97.8258 31.5386 101.334 31.5386H104.603Z" fill="#101828" /><path d="M120.415 10.9758C119.954 10.9758 119.693 11.2445 119.693 11.6973V24.0011C119.693 26.4803 118.058 27.6163 116.224 27.6163C114.397 27.6163 112.793 26.4726 112.793 24.0011V11.6973C112.793 11.2368 112.524 10.9758 112.071 10.9758H108.341C107.881 10.9758 107.658 11.2445 107.658 11.6973V24.6075C107.658 29.1744 110.283 31.9222 114.213 31.9222C118.097 31.9222 119.24 29.2204 119.24 29.2204H119.701V30.8169C119.701 31.2774 119.969 31.5384 120.422 31.5384H124.153C124.613 31.5384 124.874 31.2698 124.874 30.8169V11.6973C124.874 11.2368 124.605 10.9758 124.153 10.9758H120.415Z" fill="#101828" /><path d="M147.072 27.2868C147.064 26.8032 147.056 26.3197 147.056 25.8515C147.056 21.8679 147.056 17.892 147.056 13.9084C147.056 13.1486 147.056 12.3887 147.056 11.6288C147.056 11.176 146.834 10.8997 146.366 10.8997H142.635C142.183 10.8997 141.906 11.176 141.906 11.6288V12.9567H141.453C141.453 12.9567 140.126 10.585 136.349 10.585C131.053 10.585 127.929 15.2363 127.929 21.2155C127.929 27.1947 131.061 30.925 136.349 30.9096C140.003 30.8943 141.453 28.5379 141.453 28.5379H141.891C141.906 28.5993 141.906 28.653 141.906 28.7298V30.38C141.829 32.3372 141.668 34.5324 139.619 35.4151C139.281 35.5609 138.897 35.6837 138.529 35.7145C135.06 36.1059 133.594 34.1103 133.064 33.0664C132.895 32.7287 132.488 32.5982 132.143 32.744L129.226 34.0028C128.85 34.164 128.681 34.6092 128.858 34.9776C129.487 36.2901 131.276 39.0686 135.413 39.8132C138.306 40.3351 141.653 39.7671 143.833 38.0938C146.32 36.1827 146.934 33.3197 147.049 30.4491C147.103 29.3899 147.087 28.3383 147.072 27.2868ZM137.731 26.596C135.643 26.596 134.077 25.5598 133.555 23.4798C132.765 20.3175 133.54 14.8986 137.731 14.8986C140.701 14.8986 142.19 17.5313 142.19 21.2155C142.19 24.9151 140.694 26.596 137.731 26.596Z" fill="#101828" /><path d="M154.763 2.21094C152.859 2.21094 151.447 3.58484 151.447 5.44998C151.447 7.3535 152.859 8.72741 154.763 8.72741C156.666 8.72741 158.078 7.3535 158.078 5.44998C158.071 3.58484 156.666 2.21094 154.763 2.21094Z" fill="#101828" /><path d="M156.628 10.9766H152.897C152.437 10.9766 152.176 11.2452 152.176 11.6981V30.8177C152.176 31.2782 152.444 31.5392 152.897 31.5392H156.628C157.088 31.5392 157.349 31.2705 157.349 30.8177V11.6981C157.349 11.2375 157.08 10.9766 156.628 10.9766Z" fill="#101828" /><path d="M173.13 10.5928C169.246 10.5928 168.103 13.2945 168.103 13.2945H167.642V11.698C167.642 11.2375 167.373 10.9765 166.921 10.9765H163.19C162.73 10.9765 162.469 11.2452 162.469 11.698V30.8176C162.469 31.2782 162.737 31.5391 163.19 31.5391H166.921C167.381 31.5391 167.642 31.2705 167.642 30.8176V18.5139C167.642 16.0347 169.277 14.8987 171.111 14.8987C172.938 14.8987 174.542 16.0424 174.542 18.5139V30.8176C174.542 31.2782 174.811 31.5391 175.264 31.5391H178.994C179.455 31.5391 179.677 31.2705 179.677 30.8176V17.9075C179.677 13.3329 177.052 10.5928 173.13 10.5928Z" fill="#101828" /><path d="M199.418 24.0474C199.019 21.7141 197.4 20.4476 195.335 19.7799C194.237 19.4268 193.109 19.1812 191.981 18.9509C190.776 18.6976 188.665 18.6976 188.082 17.3621C187.568 16.1877 188.581 15.1132 189.648 14.8138C191.751 14.2305 193.409 14.8906 194.475 16.7941C194.759 17.293 195.089 17.4695 195.611 17.2853C196.571 16.9399 197.369 16.6022 198.329 16.2491C198.92 16.0342 199.096 15.6274 198.789 15.0825C198.421 14.4224 198.098 13.7086 197.599 13.1559C194.775 10.0013 188.466 9.73267 185.111 12.5112C182.563 14.6296 181.857 20.0408 186.27 22.0288C187.115 22.4049 187.936 22.5047 188.842 22.7196C190.208 23.0496 191.597 23.2492 192.963 23.5715C193.739 23.7558 194.591 24.224 194.66 25.2218C194.721 26.1044 194.276 26.8336 193.232 27.202C191.336 27.8852 188.182 27.7317 187.069 25.2064C186.792 24.5924 186.409 24.4619 185.81 24.6922C184.935 25.0222 184.052 25.3523 183.162 25.6209C182.448 25.8358 182.525 26.1966 182.732 26.8413C183.607 29.5124 186.255 31.1319 188.888 31.6692C188.918 31.6768 188.957 31.6845 188.987 31.6922C189.057 31.7075 189.126 31.7152 189.195 31.7306C190.584 31.9685 191.866 32.0146 193.247 31.7306C194.115 31.554 194.959 31.2777 195.75 30.8863C195.949 30.7865 196.133 30.6714 196.325 30.5716C198.712 29.3281 199.887 26.7645 199.418 24.0474Z" fill="#101828" /></g></g>
</svg>`;
const videoGalleryBanner = `data:image/svg+xml,${encodeURIComponent(svg)}`;

/***/ }),

/***/ "./src/admin/dashboard.scss":
/*!**********************************!*\
  !*** ./src/admin/dashboard.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/admin/utils/blocks.js":
/*!***********************************!*\
  !*** ./src/admin/utils/blocks.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Components/Common/utils/icons */ "./src/Components/Common/utils/icons.js");

const siteURL = "https://bblockswp.com";
const demoLink = `${siteURL}/demo`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  name: "vgb/video-gallery",
  title: "Video Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoGalleryIcon,
  demo: `${demoLink}/video-gallery-block-default/`,
  status: "published",
  required: true
}, {
  name: "vgblk/lightbox-video-gallery",
  title: "Lightbox Video Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.lightBoxIcon,
  demo: `${demoLink}/video-gallery-block-lightbox-video-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/masonry-video-grid-one",
  title: "Masonry Video Grid",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.masonryVideoGridIcon,
  demo: `${demoLink}/video-gallery-block-masonry-video-grid/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/parallax-row-video-gallery",
  title: "Parallax Row Video Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.parallaxRowIcon,
  demo: `${demoLink}/video-gallery-block-parallax-row-video-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/slider-autoplay-video",
  title: "Slider Autoplay Video",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.sliderAutoplayIcon,
  demo: `${demoLink}/video-gallery-block-slider-autoplay-video/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-carousel-gallery",
  title: "Video Carousel Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoCarouselIcon,
  demo: `${demoLink}/video-gallery-block-video-carousel-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-playlist-gallery",
  title: "Video Playlist Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoPlaylistIcon,
  demo: `${demoLink}/video-gallery-block-video-playlist-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-shorts-reel",
  title: "Video Shorts Reel",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoShortsReelIcon,
  demo: `${demoLink}/video-gallery-block-video-shorts-reel/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-showcase-wall",
  title: "Video Showcase Wall",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoShowcaseWallIcon,
  demo: `${demoLink}/video-gallery-block-video-showcase-wall/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-slider",
  title: "Video Slider",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoSliderIcon,
  demo: `${demoLink}/video-gallery-block-video-slider/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-testimonial-section",
  title: "Video Testimonial Section",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.testimonialIcon,
  demo: `${demoLink}/video-gallery-block-video-testimonial-section/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-curriculum-accordion",
  title: "Video Curriculum Accordion",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoCurriculumAccordionIcon,
  demo: `${demoLink}/video-gallery-block-video-curriculum-accordion/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-hotspot-scene",
  title: "Video Hotspot Scene",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoHotspotSceneIcon,
  demo: `${demoLink}/video-gallery-block-video-hotspot-scene/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-tabs-gallery",
  title: "Video Tabs Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoTabsGalleryIcon,
  demo: `${demoLink}/video-gallery-block-video-tabs-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-scrollytelling-showcase",
  title: "Video Scrollytelling Showcase",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoScrollytellingShowcaseIcon,
  demo: `${demoLink}/video-gallery-block-video-scrollytelling-showcase/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-timeline-gallery",
  title: "Video Timeline Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoTimelineGalleryIcon,
  demo: `${demoLink}/video-gallery-block-video-timeline-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-bento-grid",
  title: "Video Bento Grid",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoBentoGridIcon,
  demo: `${demoLink}/video-gallery-block-video-bento-grid/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-comparison-gallery",
  title: "Video Comparison Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoComparisonGalleryIcon,
  demo: `${demoLink}/video-gallery-block-video-comparison-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-justified-gallery",
  title: "Video Justified Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoJustifiedGalleryIcon,
  demo: `${demoLink}/video-gallery-block-video-justified-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-expanding-panels",
  title: "Video Expanding Panels",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoExpandingPanelsIcon,
  demo: `${demoLink}/video-gallery-block-video-expanding-panels/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-pip-wall",
  title: "Video Wall with Floating Player",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoPipWallIcon,
  demo: `${demoLink}/video-gallery-block-video-wall-with-floating-player/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-swipe-deck",
  title: "Video Swipe Deck",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoSwipeDeckIcon,
  demo: `${demoLink}/video-gallery-block-video-swipe-deck/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-marquee-wall",
  title: "Video Marquee Wall",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoMarqueeWallIcon,
  demo: `${demoLink}/video-gallery-block-video-marquee-wall/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-flip-cards-gallery",
  title: "Video Flip Cards Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoFlipCardsGalleryIcon,
  demo: `${demoLink}/video-gallery-block-video-flip-cards-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-map-gallery",
  title: "Video Map Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoMapGalleryIcon,
  demo: `${demoLink}/video-gallery-block-video-map-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-stories",
  title: "Video Stories",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoStoriesIcon,
  demo: `${demoLink}/video-gallery-block-video-stories/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-podcast-episodes",
  title: "Video Podcast Episodes",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoPodcastEpisodesIcon,
  demo: `${demoLink}/video-gallery-block-video-podcast-episodes/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-property-tour-gallery",
  title: "Video Property Tour Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoPropertyTourGalleryIcon,
  demo: `${demoLink}/video-gallery-block-video-property-tour-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-workout-planner",
  title: "Video Workout Planner",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoWorkoutPlannerIcon,
  demo: `${demoLink}/video-gallery-block-video-workout-planner/#vwp-d1`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-wedding-story-gallery",
  title: "Video Wedding Story Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoWeddingStoryGalleryIcon,
  demo: `${demoLink}/video-gallery-block-video-wedding-story-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-menu-showcase",
  title: "Video Menu Showcase",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoMenuShowcaseIcon,
  demo: `${demoLink}/video-gallery-block-video-menu-showcase/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-feature-tour",
  title: "Video Feature Tour",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoFeatureTourIcon,
  demo: `${demoLink}/video-gallery-block-video-feature-tour/#step-1`,
  status: "published",
  isPremium: true
}]);

/***/ }),

/***/ "./src/admin/utils/data.js":
/*!*********************************!*\
  !*** ./src/admin/utils/data.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dashboardInfo: () => (/* binding */ dashboardInfo),
/* harmony export */   demoInfo: () => (/* binding */ demoInfo),
/* harmony export */   pricingInfo: () => (/* binding */ pricingInfo),
/* harmony export */   welcomeInfo: () => (/* binding */ welcomeInfo)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks */ "./src/admin/utils/blocks.js");
/* harmony import */ var _assets_banner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/banner */ "./src/admin/assets/banner.js");



const slug = "video-gallery-block";
const dashboardInfo = info => {
  const {
    version,
    licenseActiveNonce,
    adminUrl,
    restUrl,
    uninstallNonce,
    deleteDataOnUninstall
  } = info;
  return {
    name: `Video Gallery Block`,
    displayName: `Video Gallery Block - Display your videos as a gallery in a professional way`,
    description: "Show your YouTube channel, playlist, Vimeo videos or your own videos as a fast, responsive gallery with albums, filters and a lightbox. New uploads appear by themselves. Video SEO markup, GDPR consent and Google Analytics tracking are included free.",
    slug,
    version,
    licenseActiveNonce,
    uninstallNonce,
    deleteDataOnUninstall,
    adminUrl,
    restUrl,
    allBlocks: _blocks__WEBPACK_IMPORTED_MODULE_1__["default"],
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon.svg?rev=3623385`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: _assets_banner__WEBPACK_IMPORTED_MODULE_2__.videoGalleryBanner
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      landing: `https://bplugins.com/products/${slug}/`,
      //   docs: `https://bplugins.com/docs/${slug}/`,
      pricing: `https://bplugins.com/products/${slug}/pricing`
    },
    freemius: {
      product_id: 20637,
      plan_id: 34353,
      public_key: "pk_02d017aab6844d54db3238a59e91c"
    },
    startButton: {
      label: "Start Now",
      url: `wp-admin/post-new.php?post_type=video-gallery-block`
      // url: `wp-admin/post-new.php?post_type=page&title=Video Gallery Block&content=<!-- wp:vgb/video-gallery /-->&nonce=${nonce}`,
    }
  };
};
const welcomeInfo = (adminUrl = "") => ({
  // Hero card keyword chips
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Channel Feed", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Albums", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Filters", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Lightbox", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Video SEO", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("GDPR", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Analytics", "video-gallery-block")],
  keywordsLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Features", "video-gallery-block"),
  // Getting Started tabbed steps
  gettingStarted: {
    tabs: [{
      key: "gutenberg",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Gutenberg", "video-gallery-block"),
      video: "https://www.youtube.com/watch?v=mtPZe8Uxd8s",
      isYoutube: true,
      steps: [{
        num: 1,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add the Block", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Open the block editor. Click <strong>+</strong> or type <strong>/Video Gallery</strong>.", "video-gallery-block"),
        link: {
          url: `${adminUrl}post-new.php`,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Open Editor", "video-gallery-block")
        }
      }, {
        num: 2,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add Your Videos", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Paste <strong>YouTube</strong>, <strong>Vimeo</strong> or <strong>Facebook</strong> links, upload your own videos, or show a whole <strong>channel</strong> that updates itself.", "video-gallery-block")
      }, {
        num: 3,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Organize & Filter", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Group videos into <strong>albums</strong> and enable filters for visitors.", "video-gallery-block")
      }, {
        num: 4,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Style & Publish", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Adjust columns, captions, and lightbox, then publish.", "video-gallery-block")
      }]
    }, {
      key: "shortcode",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Shortcode", "video-gallery-block"),
      video: "https://www.youtube.com/watch?v=mtPZe8Uxd8s",
      isYoutube: true,
      steps: [{
        num: 1,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Create a Gallery", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Go to <strong>Video Gallery</strong> in your admin menu and click <strong>Add New</strong>.", "video-gallery-block"),
        link: {
          url: `${adminUrl}post-new.php?post_type=video-gallery-block`,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add New Gallery", "video-gallery-block")
        }
      }, {
        num: 2,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Customize & Publish", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add your videos and customize gallery settings, then click <strong>Publish</strong>.", "video-gallery-block")
      }, {
        num: 3,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Copy the Shortcode", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Go to <strong>Video Gallery -> All Video Gallery</strong> to find and copy your gallery shortcode (e.g. <code>[video_gallery id=\"123\"]</code>).", "video-gallery-block"),
        link: {
          url: `${adminUrl}edit.php?post_type=video-gallery-block`,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("All Galleries", "video-gallery-block")
        }
      }, {
        num: 4,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Paste & Display", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Paste the shortcode into any post, page, widget, or page builder layout where you want the gallery to render.", "video-gallery-block")
      }]
    }, {
      key: "elementor",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Elementor", "video-gallery-block"),
      video: "https://www.youtube.com/watch?v=mtPZe8Uxd8s",
      isYoutube: true,
      steps: [{
        num: 1,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Create a Gallery", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Go to <strong>Video Gallery -> Add New</strong> to configure and publish a gallery, then copy its shortcode.", "video-gallery-block"),
        link: {
          url: `${adminUrl}post-new.php?post_type=video-gallery-block`,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add New Gallery", "video-gallery-block")
        }
      }, {
        num: 2,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Edit with Elementor", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Open any post or page in the <strong>Elementor</strong> editor.", "video-gallery-block")
      }, {
        num: 3,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add Shortcode Widget", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Search for the <strong>Shortcode</strong> widget in the Elementor elements panel and drag it into your layout.", "video-gallery-block")
      }, {
        num: 4,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Paste Shortcode", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Paste your gallery shortcode (e.g., <code>[video_gallery id=\"123\"]</code>) into the widget input field and save your changes.", "video-gallery-block")
      }]
    }, {
      key: "php",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("PHP", "video-gallery-block"),
      video: "https://www.youtube.com/watch?v=mtPZe8Uxd8s",
      isYoutube: true,
      steps: [{
        num: 1,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Get Gallery ID", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Go to <strong>Video Gallery -> All Video Gallery</strong> and note the <strong>ID</strong> of the gallery you want to embed.", "video-gallery-block"),
        link: {
          url: `${adminUrl}edit.php?post_type=video-gallery-block`,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("All Galleries", "video-gallery-block")
        }
      }, {
        num: 2,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Copy PHP Function", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Copy the WordPress <code>do_shortcode</code> function: <pre><code>&lt;?php echo do_shortcode('[video_gallery id=\"YOUR_ID\"]'); ?&gt;</code></pre>", "video-gallery-block")
      }, {
        num: 3,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Insert in Template", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Open your theme or template files (e.g., <code>single.php</code>, <code>page.php</code>) in an editor.", "video-gallery-block")
      }, {
        num: 4,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Replace ID & Save", "video-gallery-block"),
        body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Paste the code into your PHP file and replace <code>YOUR_ID</code> with the actual ID of your video gallery.", "video-gallery-block")
      }]
    }]
  },
  // Changelogs — each list item starts with <strong>Type:</strong> for badges
  changelogs: [{
    version: "1.8.0 - 17 November 2026",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Edit with AI. Describe the gallery you want and preview the changes before you apply them, write titles for videos that have none, and sort videos into albums. It needs WordPress 7.0 or newer and an AI provider connected under Settings > Connectors; nothing happens until you press a button, and you can undo it.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> A single, polite request to rate the plugin appears on the Dashboard and Plugins screens after a week of use. It can be dismissed or postponed, never returns once dismissed, and is not shown on sites with a Pro license.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Improvement:</strong> Faster galleries. Cached YouTube and Vimeo thumbnails now get a smaller copy and explicit width and height, so phones and standard screens download less and the page no longer shifts while images load. The look of the gallery does not change.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Lightbox video playback fixes — videos start reliably when opened, background audio stops upon switching slides, and returning to a watched YouTube video no longer freezes at 0:00.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Tweak:</strong> Added Help and Demo action links on the Plugins screen row.", "video-gallery-block")]
  }, {
    version: "1.7.0 - 24 October 2026",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Security:</strong> Hardened video links and captions in the Video Gallery block. A video title or caption can no longer run script when the lightbox opens, whether the gallery video is opened from the page or from the editor. Thanks to Patchstack for the report.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Show a YouTube channel or playlist, or a Vimeo profile, channel, group or showcase, as a gallery. New uploads appear by themselves. Vimeo needs no key. YouTube needs a free YouTube Data API key once, with step-by-step setup in the sidebar.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Choose how often the gallery checks for new videos (every hour, 6 hours, 12 hours or once a day), or click \"Check now\". If YouTube or Vimeo can't be reached, the last videos stay on the page.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Paste a single video's link and the gallery offers that creator's whole channel.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> The YouTube Shorts option (all videos, hide Shorts, only Shorts) also works for channel feeds.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Play in place. A video can play inside its own tile instead of the lightbox (YouTube, Vimeo, Facebook and video files), one at a time.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Feed alerts. When a feed stops updating, for example because of a wrong or expired API key, a used-up daily quota or a deleted playlist, administrators see a notice saying what is wrong and where to fix it. It can be hidden for a day, sent by email if you turn that on, and goes away by itself once the feed works again.", "video-gallery-block"), "<strong>New:</strong> Show the channel name under each title for YouTube and Vimeo feeds.", "<strong>New:</strong> \"Add from Media Library\": pick or upload many videos at once.", "<strong>New:</strong> Drag video files from your computer, or YouTube and Vimeo links from another tab, onto the gallery to add them.", "<strong>New:</strong> \"Copy these videos to My videos\" turns a feed's videos into your own list, to reorder and edit.", "<strong>New:</strong> Drag videos on the canvas to reorder them, or use the Move left / Move right buttons.", "<strong>Improvement:</strong> Clearer settings. Panels follow the order you work in (Video source, Videos, Layout, Display, Playback, Privacy & SEO), feed setup is a set of short steps, and short dropdowns are now buttons.", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Improvement:</strong> YouTube thumbnails use the best size that exists for each video, and the live page now shows the same thumbnail as the editor instead of a cropped, blurrier one.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Improvement:</strong> Video SEO markup gives feed videos their real publish date.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Improvement:</strong> When \"delete data on uninstall\" is on, deleting the plugin also removes the YouTube API key and the cached feeds.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Full-width galleries no longer stick out past the edge of the page in classic themes such as Hello Elementor, on computers with a visible scrollbar.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> The upgrade (checkout) window opens again; it could fail with a 520 error.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> The lightbox no longer keeps following the mouse after the button is released outside the window.", "video-gallery-block"), "<strong>Fix:</strong> Google Analytics never received 25/50/75% progress or video_watch_complete for Vimeo videos.", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> The lightbox no longer conflicts with other plugins that also load Fancybox.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Security:</strong> Hardened block CSS output.", "video-gallery-block")]
  }, {
    version: "1.6.0 - 13 October 2026",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Freemius SDK updated to 2.13.5.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> After activating the plugin, the page no longer says you are not allowed to access it. The Freemius opt-in now opens first, then the first page of the plugin.", "video-gallery-block")]
  }, {
    version: "1.5.4 - 6 October 2026",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Video play events for Google Analytics. A video now sends video_play when a visitor presses play, and video_watch_progress at 25, 50 and 75 percent and video_watch_complete when they finish. Works with files, YouTube and Vimeo. Facebook videos only report that they were opened.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Video events are also sent straight to Google Analytics when gtag.js is on the page, for example with Site Kit. Google Tag Manager is no longer needed.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Facebook Reel links now open as Facebook videos.", "video-gallery-block")]
  }, {
    version: "1.5.3 - 15 September 2026",
    type: "fix",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Editor Hover Tooltip Visibility — fixed an issue where the tooltip for the first row of videos in the gallery would be clipped by Gutenberg's block boundaries.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Editor Selection Border — fixed an issue where the blue selection outline would be hidden behind poster images in the editor.", "video-gallery-block")]
  }, {
    version: "1.5.2 - 12 September 2026",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Animated Album Filtering — switching album filters now features smooth FLIP layout transitions (sliding into place, fade-in, and scale effects) with zero external library overhead.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Editor Interaction & Double-Click Preview — single-clicking any video tile in the block editor selects it in the sidebar, while double-clicking opens the lightbox preview.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Editor Hover Tooltip Visibility — fixed an issue where the hover hint tooltip was clipped and hidden by thumbnail overflow boundaries in the editor.", "video-gallery-block")]
  }, {
    version: "1.5.1 - 9 September 2026",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Sort Order — show the gallery in the order you added the videos, or set it to Newest First / Oldest First and let the block keep it sorted automatically.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Row Alignment — when the last row of a gallery doesn't fill every column, align it left, center, or right instead of it always stretching to one side.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Per-Device Column & Row Gap — set the spacing between tiles separately for desktop, tablet, and mobile, the same way column counts already work per device.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Facebook Video Support — add Facebook videos to the gallery alongside YouTube and Vimeo, using Facebook's public embed player. No app or API key required.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> GDPR Consent-Gated Embeds — a Require Consent Before Playing option shows a consent overlay in place of the player until a visitor agrees, so no third-party cookie is set before that.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Google Analytics 4 Video Tracking — a Send Video Play Events to Google Analytics option pushes a video_start event (title, provider, URL) to window.dataLayer whenever a visitor plays a video. Works with GA4 or Google Tag Manager already on the site.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Cached Thumbnails — YouTube and Vimeo thumbnails are downloaded into your Media Library the first time they're needed and served from your own site after that, so a thumbnail can never 404 again just because a provider reshuffled its sizes. Warms up gradually, at most one new thumbnail per page view.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Load More Pagination — a Videos Per Page setting under Layout Settings starts the gallery with that many tiles and reveals the rest behind a Load More button. Off by default (0 = show everything) so no existing gallery's appearance changes on upgrade.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> YouTube Shorts Filter — show every video, hide Shorts, or show only Shorts, detected from the link itself with no API key needed.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Play Icon on Thumbnails — a play icon now sits over every tile by default, so a gallery reads as video content before anyone hovers or clicks. Its color, background, size, and hover zoom are all customizable under Style → Item, or it can be turned off entirely under Options.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Item Border & Shadow — Style → Item now has Border and Shadow controls for each individual thumbnail tile, the same way the overall gallery box already did.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Filter button active/hover colors — the Button Hover/Active Colors control under Style → Filter had no effect on the active (current) filter button, and could leave the hover color stuck on the Load More button permanently instead of only on hover. Both now behave correctly.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Custom player controls in the lightbox — videos now consistently get the plugin's Plyr-based controls instead of occasionally falling back to the browser's default video controls.", "video-gallery-block")]
  }, {
    version: "1.5.0 - 7 September 2026",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Bulk Import — paste a list of video links, one per line, and the whole gallery is built with titles and posters filled in automatically via WordPress oEmbed.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Thumbnail Shape — tiles can be 16∶9, 4∶3, 1∶1 or 9∶16 instead of a fixed pixel height, so vertical Shorts and Reels are no longer cropped.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Video SEO markup (free) — each video gets Schema.org VideoObject JSON-LD so galleries can appear as video results in search.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Five ready-made sections — Video gallery with album filters, Course video library, Product demo showcase, Customer video stories, and Portfolio showreel wall.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Added a Show Filter Bar toggle.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> The gallery is now rendered by the server, so search engines see the content and galleries no longer depend on JavaScript loading first.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Patterns arrive fully configured with headings, columns, gaps, and thumbnail height already set.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Pattern thumbnails are drawn inline for instant rendering with no broken posters.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Vimeo thumbnails — pasting a Vimeo URL now fills in the title and poster.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Removed jQuery and Isotope from the front end (~120 KB less JavaScript).", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Thumbnails are lazy-loaded with alt text; filter buttons and links carry accessible labels.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> The gallery now appears on sites that delay JavaScript (WP Rocket, LiteSpeed, Perfmatters).", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Tablet and mobile column counts — items no longer overflow their columns.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Album filters now work for non-English album names (Bengali, Cyrillic, Arabic, CJK, etc.).", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Broken YouTube thumbnails — the block now steps down through available sizes.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Captions with formatting no longer show literal HTML tags.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> One broken gallery no longer takes down every other gallery on the page.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Galleries no longer appear in the site's own search results.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Closing a lightbox no longer breaks other galleries on the same page.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> The editor's Get Premium link and translations now work correctly.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> The Customer video stories section now uses the full width of its surrounding section.", "video-gallery-block")]
  }, {
    version: "1.4.1 - 24 June 2026",
    type: "update",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Improved block metadata, keywords, and search discoverability in the Gutenberg editor.", "video-gallery-block")]
  }, {
    version: "1.4.0 - 18 June 2026",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Added 23 new premium blocks including Video Shorts Reel, Video Showcase Wall, Video Curriculum Accordion, Video Hotspot Scene, Video Tabs Gallery, Video Scrollytelling Showcase, Video Timeline Gallery, Video Bento Grid, Video Comparison Gallery, Video Justified Gallery, Video Expanding Panels, Video Wall with Floating Player (PiP), Video Swipe Deck, Video Marquee Wall, Video Flip Cards Gallery, Video Map Gallery, Video Stories, Video Podcast Episodes, Video Property Tour Gallery, Video Workout Planner, Video Wedding Story Gallery, Video Menu Showcase, and Video Feature Tour.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Introduced a redesigned admin dashboard with an improved user experience.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Greatly improved page performance when several video blocks are used on the same page.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Videos no longer load data in the background — they now load only when played (on hover or click), reducing bandwidth and CPU usage and keeping scrolling smooth.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Parallax Row Video Gallery: Fixed scroll stuttering by switching the parallax effect to GPU-accelerated, requestAnimationFrame-based updates and rendering posters instead of video elements until played.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Video Carousel Gallery: Cards now show a poster image and load the video only on hover; off-screen videos are fully released.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Video Slider: Now uses click-to-play, so videos no longer stream in the background.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Video Testimonial Section: Idle cards render lightweight poster images instead of video elements, and card heights are now consistent.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Video Playlist Gallery: Up Next durations now load lazily, and fixed an issue where selecting a video from the playlist did not start playing.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Minor fixes and styling updates.", "video-gallery-block")]
  }, {
    version: "1.1.2 - 10 May 2026",
    type: "update",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Compliance updates and security enhancements for directory guidelines.", "video-gallery-block")]
  }, {
    version: "1.1.1 - 12 Aug 2025",
    type: "update",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Fixed minor issues.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Added 8 new block styles.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Added new shortcode styles.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Added new dashboard.", "video-gallery-block")]
  }, {
    version: "1.1.0 - 30 Jan 2025",
    type: "update",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Updated Fancybox library to v5.", "video-gallery-block")]
  }, {
    version: "1.0.8 - 27 Nov 2024",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Added option to hide the \"All\" album filter.", "video-gallery-block")]
  }, {
    version: "1.0.7 - 27 Nov 2024",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Added custom label option for common filter.", "video-gallery-block")]
  }, {
    version: "1.0.6",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Added gallery shadow options.", "video-gallery-block")]
  }, {
    version: "1.0.5",
    type: "update",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Improved vertical video height handling.", "video-gallery-block")]
  }, {
    version: "1.0.4",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Added video captions.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Update:</strong> Prevented loading scripts when block is not used.", "video-gallery-block")]
  }, {
    version: "1.0.3",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Added translation support.", "video-gallery-block")]
  }, {
    version: "1.0.2",
    type: "update",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>Fix:</strong> Fixed add/remove video issues.", "video-gallery-block")]
  }, {
    version: "1.0.1",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Automatic video thumbnail generation.", "video-gallery-block")]
  }, {
    version: "1.0.0",
    type: "new",
    list: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("<strong>New:</strong> Initial release.", "video-gallery-block")]
  }],
  changelogsLimit: 6,
  changelogsReadMoreLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("View More Changelogs", "video-gallery-block"),
  // Pro upsell bullets (free users only)
  proFeatures: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("31 more video blocks: sliders, carousels, masonry, playlists, Shorts reels, course accordions and more.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Live streams with LIVE and Upcoming badges, and a live player above the gallery.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Merge up to 10 channels or playlists, show up to 1,000 videos, filter by title keywords.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Channel feeds in 20 more blocks.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Cards, List and Showcase layouts, with the title on the video, on hover or below it.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Preview on hover, and actions when a video ends: next video, replay or your own button.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("View counts and like counts.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("GDPR consent in every block.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Wistia videos in most Pro blocks.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("WooCommerce product video carousel.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Advanced typography and overlays.", "video-gallery-block"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Priority support.", "video-gallery-block")]
});
const demoInfo = {
  allInOneLabel: "See All Demos",
  allInOneLink: "https://bblockswp.com/demo/video-gallery-block-all-demos/",
  demos: _blocks__WEBPACK_IMPORTED_MODULE_1__["default"].map(block => ({
    icon: block.icon,
    title: block.title,
    type: "iframe",
    url: block.demo
  }))
};
const pricingInfo = {
  // Freemius puts this in the checkout iframe URL, so it has to stay a short
  // https link. A data URI makes the URL about 11 KB and Cloudflare answers 520.
  logo: `https://ps.w.org/${slug}/assets/icon.svg?rev=3623385`,
  pluginId: 20637,
  planId: 34353,
  licenses: [1, 3, null],
  button: {
    label: "Buy Now ➜"
  },
  featured: {
    selected: 3 // choose from licenses item
  }
};

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./src/admin/dashboard.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _dashboard_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard.scss */ "./src/admin/dashboard.scss");
/* harmony import */ var _Components_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/App */ "./src/admin/Components/App.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/data */ "./src/admin/utils/data.js");





document.addEventListener("DOMContentLoaded", () => {
  const dashboardEl = document.getElementById("vidgalblkDashboard");
  const info = JSON.parse(dashboardEl.dataset.info);
  (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(dashboardEl).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ...(0,_utils_data__WEBPACK_IMPORTED_MODULE_4__.dashboardInfo)(info)
  }));
  dashboardEl.removeAttribute("data-info");
});
})();

/******/ })()
;
//# sourceMappingURL=dashboard.js.map