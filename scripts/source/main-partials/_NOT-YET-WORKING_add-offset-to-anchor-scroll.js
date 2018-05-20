/**
 * =============================================================================
 * Adding offset to anchor scroll
 * Mostly taken from https://jsfiddle.net/ianclark001/aShQL/
 * =============================================================================
 */

// Helper function
function offset(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
}

// Main function
function mvlAddOffsetToAnchorScroll(href) {
  const mvl_additional_scroll_offset =
    document.querySelector(".js-main-navigation").offsetHeight * 1.5;

  if (href) {
    const mvl_scroll_target = document.querySelector(href);
    const mvl_scroll_target_offset = offset(mvl_scroll_target);
    const mvl_scroll_target_top = mvl_scroll_target_offset.top;
    document.documentElement.scrollTop =
      mvl_scroll_target_top - mvl_additional_scroll_offset;

    /* eslint no-restricted-globals: ["warn", "history"] */
    if (history && "pushState" in history) {
      history.pushState({}, document.title, window.location.pathname + href);
      return false;
    }
    return true;
  }
  return false;
}

// When a page loads, check to see if it contains and anchor
if (window.location.hash.length > 0) {
  mvlAddOffsetToAnchorScroll(window.location.hash);
}

// Intercept all clicks on links starting with “#”
const mvl_all_links = document.querySelectorAll("a[href^='#']");
mvl_all_links.forEach(mvl_link => {
  const mvl_href = mvl_link.getAttribute("href");
  mvl_link.addEventListener("click", () => {
    mvlAddOffsetToAnchorScroll(mvl_href);
  });
});
