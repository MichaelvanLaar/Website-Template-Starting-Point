/**
 * =============================================================================
 * Main navigation
 * =============================================================================
 */

// Namespace prefix for variables: “mn”

/**
 * -----------------------------------------------------------------------------
 * Configuration
 * -----------------------------------------------------------------------------
 */

const mnNavClass = "js-main-navigation";
const mnOffCanvasMenuToggleClass = "js-main-navigation__toggle";
const mnListClass = "js-main-navigation__list";
const mnHasChildrenClass = "has-children";
const mnShowSubmenuClass = "show-submenu";

/**
 * -----------------------------------------------------------------------------
 * Preparation
 * -----------------------------------------------------------------------------
 */

// Get DOM elements
const mnNav = document.querySelector(`.${mnNavClass}`);
const mnOffCanvasMenuToggle = document.querySelector(
  `.${mnOffCanvasMenuToggleClass}`
);
const mnDropdownToggles = document.querySelectorAll(
  `.${mnListClass} > .${mnHasChildrenClass}`
);
const mnDropdownTogglesA = document.querySelectorAll(
  `.${mnListClass} > .${mnHasChildrenClass} > a`
);

/**
 * -----------------------------------------------------------------------------
 * Submenu toggles
 * -----------------------------------------------------------------------------
 */

// Remove href attribute from all menu links which are used as submenu toggle
// links
mnDropdownTogglesA.forEach(mnDropdownToggleA => {
  const mnDropdownToggleHref = mnDropdownToggleA.getAttribute("href");
  mnDropdownToggleA.setAttribute("data-href", mnDropdownToggleHref);
  mnDropdownToggleA.removeAttribute("href");
});

// Add “show/hide submenu” functionality
mnDropdownToggles.forEach(mnDropdownToggle => {
  mnDropdownToggle.addEventListener("click", () => {
    // Hide all sumbenus except the current one
    const mnDropdownToggleSiblings = Array.from(
      mnDropdownToggle.parentElement.children
    ).filter(x => x !== mnDropdownToggle);
    mnDropdownToggleSiblings.forEach(mnDropdownToggleSibling => {
      mnDropdownToggleSibling.classList.remove(mnShowSubmenuClass);
    });

    // Toggle “show submenu” class fot current toggle element
    mnDropdownToggle.classList.toggle(mnShowSubmenuClass);
  });
});

/**
 * -----------------------------------------------------------------------------
 * Off-canvas menu toggle
 * -----------------------------------------------------------------------------
 */

// Make toggle icon (for mobile navigation) reveal off-canvas menu on click
mnOffCanvasMenuToggle.addEventListener("click", () => {
  // If the click closes the off-canvas menu, hide any visible submenu
  if (mnOffCanvasMenuToggle.classList.contains(mnShowSubmenuClass)) {
    mnDropdownToggles.forEach(mnDropdownToggle => {
      mnDropdownToggle.classList.remove(mnShowSubmenuClass);
    });
  }
  mnOffCanvasMenuToggle.classList.toggle(mnShowSubmenuClass);
});

/**
 * -----------------------------------------------------------------------------
 * Close all menus when a visitor clicks anywhere outside the main navigation
 * -----------------------------------------------------------------------------
 */

document.documentElement.addEventListener("click", () => {
  // Hide any visible submenu
  mnDropdownToggles.forEach(mnDropdownToggle => {
    mnDropdownToggle.classList.remove(mnShowSubmenuClass);
  });

  // Close off-canvas menu
  mnOffCanvasMenuToggle.classList.remove(mnShowSubmenuClass);
});

// Exclude all main navigation elements from the above behavior
mnNav.addEventListener("click", event => {
  event.stopPropagation();
});
