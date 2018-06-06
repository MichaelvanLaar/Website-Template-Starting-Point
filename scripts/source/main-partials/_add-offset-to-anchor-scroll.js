/**
 * =============================================================================
 * Add offset to anchor scroll
 *
 * Inspired by https://jsfiddle.net/ianclark001/aShQL/
 * =============================================================================
 */

// Namespace prefix for variables: “aotas”

/**
 * -----------------------------------------------------------------------------
 * Configuration
 * -----------------------------------------------------------------------------
 */

const aotasPageHeaderClass = "js-page-header";
const aotasOffsetHeightFactor = 1.3333;

/**
 * -----------------------------------------------------------------------------
 * Main function
 * -----------------------------------------------------------------------------
 */

function addOffsetToAnchorScroll(anchor) {
  if (anchor.length > 1) {
    // Wait for 50 ms. Required to prevent problems with default scrolling,
    setTimeout(() => {
      // Get original position of target element relative to viewport.
      const aotasTargetElementViewportOffset = document
        .querySelector(anchor)
        .getBoundingClientRect();

      // Get current scroll position of page.
      const aotasPageScrollPosition =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;

      // Get height of additional scroll offset.
      const aotasAdditionalScrollOffset =
        document.querySelector(aotasPageHeaderClass).offsetHeight *
        aotasOffsetHeightFactor;

      // Scroll to new scroll position of target element, including the
      // additional offset.
      document.documentElement.scrollTop =
        aotasTargetElementViewportOffset.top +
        aotasPageScrollPosition -
        aotasAdditionalScrollOffset;
    }, 50);
  }
}

/**
 * -----------------------------------------------------------------------------
 * Apply main function
 * -----------------------------------------------------------------------------
 */

// When a page loads, check to see if it contains and anchor.
if (window.location.hash.length > 0) {
  addOffsetToAnchorScroll(window.location.hash);
}

// Intercept all clicks on links starting with “#”.
const aotasAllAnchorLinks = document.querySelectorAll("a[href^='#']");
if (aotasAllAnchorLinks.length > 0) {
  aotasAllAnchorLinks.forEach(aotasAnchorLink => {
    const aotasHref = aotasAnchorLink.getAttribute("href");
    aotasAnchorLink.addEventListener("click", () => {
      addOffsetToAnchorScroll(aotasHref);
    });
  });
}
