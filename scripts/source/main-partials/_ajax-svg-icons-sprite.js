/**
 * =============================================================================
 * Ajaxing for the SVG icons sprite
 *
 * https://css-tricks.com/ajaxing-svg-sprite/
 * =============================================================================
 */

const mvl_ajax = new XMLHttpRequest();
mvl_ajax.open("GET", "../../../images/icons.svg", true);
mvl_ajax.send();
mvl_ajax.onload = function() {
  const mvl_svg_container = document.createElement("div");
  mvl_svg_container.innerHTML = mvl_ajax.responseText;
  document.body.insertBefore(mvl_svg_container, document.body.childNodes[0]);
};
