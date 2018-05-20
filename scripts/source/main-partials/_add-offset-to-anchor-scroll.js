/**
 * =============================================================================
 * Adding offset to anchor scroll
 * Mostly taken from https://jsfiddle.net/ianclark001/aShQL/
 * =============================================================================
 */

/* eslint-disable */

import jquery from "jquery";
window.jQuery = jquery;
window.$ = window.jQuery;

/**
 * Check a href for an anchor. If exists, and in document, scroll to it.
 * If href argument ommited, assumes context (this) is HTML Element,
 * which will be the case when invoked by jQuery after an event
 */
function mvlAddOffsetToAnchorScroll(href) {
  href = typeof href === "string" ? href : $(this).attr("href");

  const mvl_additional_scroll_offset = $(".js-main-navigation").height() * 1.5;

  // If our Href points to a valid, non-empty anchor, and is on the same page
  // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174
  if (href) {
    if (href.indexOf("#") == 0) {
      const mvl_scroll_target = $(href);

      // Older browser without pushState might flicker here, as they
      // momentarily jump to the wrong position (IE < 10)
      if (mvl_scroll_target.length) {
        $("html, body").animate({
          scrollTop:
            mvl_scroll_target.offset().top - mvl_additional_scroll_offset
        });
        if (history && "pushState" in history) {
          history.pushState(
            {},
            document.title,
            window.location.pathname + href
          );
          return false;
        }
      }
    }
  }
}

// When a page loads, check to see if it contains and anchor
mvlAddOffsetToAnchorScroll(window.location.hash);

// Intercept all anchor clicks
$("body").on("click", "a", mvlAddOffsetToAnchorScroll);

/* eslint-enable */
