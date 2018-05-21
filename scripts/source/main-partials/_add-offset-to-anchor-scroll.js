/**
 * =============================================================================
 * Add offset to anchor scroll
 *
 * Inspired by https://jsfiddle.net/ianclark001/aShQL/
 * =============================================================================
 */

function mvlAddOffsetToAnchorScroll(anchor) {
  if (anchor.length > 1) {
    // Wait for 50 ms. Required to prevent problems with default scrolling,
    setTimeout(() => {
      // Get original position of target element relative to viewport.
      const mvl_target_element_viewport_offset = document
        .querySelector(anchor)
        .getBoundingClientRect();

      // Get current scroll position of page.
      const mvl_page_scroll_position =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;

      // Get height of additional scroll offset.
      const mvl_additional_scroll_offset =
        document.querySelector(".js-main-navigation").offsetHeight * 1.5;

      // Scroll to new scroll position of target element, including the
      // additional offset.
      document.documentElement.scrollTop =
        mvl_target_element_viewport_offset.top +
        mvl_page_scroll_position -
        mvl_additional_scroll_offset;
    }, 50);
  }
}

// When a page loads, check to see if it contains and anchor.
if (window.location.hash.length > 0) {
  mvlAddOffsetToAnchorScroll(window.location.hash);
}

// Intercept all clicks on links starting with “#”.
const mvl_all_anchor_links = document.querySelectorAll("a[href^='#']");
if (mvl_all_anchor_links.length > 0) {
  mvl_all_anchor_links.forEach(mvl_anchor_link => {
    const mvl_href = mvl_anchor_link.getAttribute("href");
    mvl_anchor_link.addEventListener("click", () => {
      mvlAddOffsetToAnchorScroll(mvl_href);
    });
  });
}
