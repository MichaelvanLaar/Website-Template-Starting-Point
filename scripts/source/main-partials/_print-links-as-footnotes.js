/**
 * =============================================================================
 * Print links as footnotes
 *
 * Mostly taken from Aaron Gustafson’s article
 * “Improving Link Display for Print” on A List Apart:
 * https://alistapart.com/article/improvingprint
 * =============================================================================
 */

function printLinksAsFootnotes(
  links_container_selector,
  footnotes_container_class_name = "print-links-footer",
  print_only_class_name = "print-only",
  footnotes_headline_element = "h3",
  footnotes_headline_text = "Links",
  reference_text_before_number = "[",
  reference_text_after_number = "]"
) {
  // Only proceed if a container selector was passed to the function and if
  // there is at least one element which matches the container selector.
  if (
    links_container_selector !== undefined &&
    document.querySelector(links_container_selector) !== null
  ) {
    // Create a container and headline for the footnotes.
    const plaf_footnotes_container = document.createElement("section");
    plaf_footnotes_container.classList.add(
      footnotes_container_class_name,
      print_only_class_name
    );
    plaf_footnotes_container.innerHTML = `<${footnotes_headline_element}>${footnotes_headline_text}</${footnotes_headline_element}>`;

    // Create an empty list to be populated with the footnotes.
    const plaf_footnotes_list = document.createElement("ol");

    // Create an array to store used URLs, so we can check for duplicates.
    const plaf_urls = [];

    // Create a variable to keep track of the number used for each link,
    // so we have it for footnote references.
    let plaf_link_number = 1;

    // Get all containers and extract all contained links, ignoring links which
    // should not appear as footnotes because they don’t make sense in a printed
    // version of the page.
    const plaf_links = document.querySelectorAll(
      `${links_container_selector} a[href]:not([href^='#']):not([href^="mailto"]):not([href^="javascript"])`
    );

    // Process each link found in the containers.
    plaf_links.forEach(plaf_link => {
      // Only process the link if it doesn’t contain an image.
      if (plaf_link.getElementsByTagName("img").length < 1) {
        // Extract the URL of the link.
        const plaf_url = plaf_link.href;

        // Create the superscript reference number and insert it after the link.
        const plaf_reference = document.createElement("sup");
        plaf_reference.classList.add(print_only_class_name);

        // Create variable to store the reference number.
        let plaf_reference_number;

        // Check if the current link URL was alreday found before.
        const plaf_link_duplicate_number = plaf_urls.indexOf(plaf_url);

        // Use link number of first found occurance of the current URL to prevent
        // duplicates in the footnote list.
        if (plaf_link_duplicate_number > -1) {
          plaf_reference_number = plaf_link_duplicate_number + 1;
        } else {
          plaf_reference_number = plaf_link_number;
        }

        // Create the footnote reference reference and append it to the link.
        plaf_reference.innerHTML =
          reference_text_before_number +
          plaf_reference_number +
          reference_text_after_number;
        plaf_link.parentNode.insertBefore(
          plaf_reference,
          plaf_link.nextSibling
        );

        // If the current link URL is not a duplicate …
        if (plaf_link_duplicate_number < 0) {
          // … create the footnote, …
          const plaf_footnotes_list_element = document.createElement("li");
          plaf_footnotes_list_element.innerHTML = plaf_url;

          // … add the new footnote to the list of footnotes, …
          plaf_footnotes_list.appendChild(plaf_footnotes_list_element);

          // … store the URL of the current link in the array for later
          // reference, …
          plaf_urls.push(plaf_url);

          // … increment the link number to prepare it for the next loop.
          plaf_link_number += 1;
        }
      }
    });

    // Add the footnotes list to the footnotes container.
    plaf_footnotes_container.appendChild(plaf_footnotes_list);

    // Add the footnores container to the document.
    document.querySelector("body").appendChild(plaf_footnotes_container);
  }
}

printLinksAsFootnotes(".js-page-main-content");
