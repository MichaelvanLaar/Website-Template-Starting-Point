/**
 * =============================================================================
 * Add “rel='noopener'” to all links with “target='_blank'” for more security
 *
 * See https://mathiasbynens.github.io/rel-noopener/ for details
 * =============================================================================
 */

// Namespace prefix for variables: “ls”

const lsUnsecureLInks = document.querySelectorAll(
  "a[target='_blank']:not([rel='noopener'])"
);
lsUnsecureLInks.forEach(lsUnsecureLInk => {
  lsUnsecureLInk.setAttribute("rel", "noopener");
});
