/**
 * =============================================================================
 * Add “rel='noopener'” to all links with “target='_blank'” for more security
 *
 * See https://mathiasbynens.github.io/rel-noopener/ for details
 * =============================================================================
 */

const mvl_unsecure_links = document.querySelectorAll(
  "a[target='_blank']:not([rel='noopener'])"
);
mvl_unsecure_links.forEach(mvl_unsecure_link => {
  mvl_unsecure_link.setAttribute("rel", "noopener");
});
