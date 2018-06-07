/**
 * =============================================================================
 * Print links as footnotes
 *
 * Mostly taken from Aaron Gustafson’s article
 * “Improving Link Display for Print” on A List Apart:
 * https://alistapart.com/article/improvingprint
 * =============================================================================
 */

// Namespace prefix for variables: “plaf”

/**
 * -----------------------------------------------------------------------------
 * Main function
 * -----------------------------------------------------------------------------
 */

function printLinksAsFootnotes(
  linksContainerSelector,
  footnotesContainerClassName = "print-links-footer",
  printOnlyClassName = "print-only",
  footnotesHeadlineElement = "h3",
  footnotesHeadlineText = "Links",
  referenceTextBeforeNumber = "[",
  referenceTextAfterNumber = "]"
) {
  // Only proceed if a container selector was passed to the function and if
  // there is at least one element which matches the container selector.
  if (
    linksContainerSelector !== undefined &&
    document.querySelector(linksContainerSelector) !== null
  ) {
    // Create a container and headline for the footnotes.
    const plafFootnotesContainer = document.createElement("section");
    plafFootnotesContainer.classList.add(
      footnotesContainerClassName,
      printOnlyClassName
    );
    plafFootnotesContainer.innerHTML = `<${footnotesHeadlineElement}>${footnotesHeadlineText}</${footnotesHeadlineElement}>`;

    // Create an empty list to be populated with the footnotes.
    const plafFootnotesList = document.createElement("ol");

    // Create an array to store used URLs, so we can check for duplicates.
    const plafUrls = [];

    // Create a variable to keep track of the number used for each link,
    // so we have it for footnote references.
    let plafLinkNumber = 1;

    // Get all containers and extract all contained links, ignoring links which
    // should not appear as footnotes because they don’t make sense in a printed
    // version of the page.
    const plafLinks = document.querySelectorAll(
      `${linksContainerSelector} a[href]:not([href^='#']):not([href^="mailto"]):not([href^="javascript"])`
    );

    // Process each link found in the containers.
    plafLinks.forEach(plafLink => {
      // Only process the link if it doesn’t contain an image.
      if (plafLink.getElementsByTagName("img").length < 1) {
        // Extract the URL of the link.
        const plafUrl = plafLink.href;

        // Create the superscript reference number and insert it after the link.
        const plafReference = document.createElement("sup");
        plafReference.classList.add(printOnlyClassName);

        // Create variable to store the reference number.
        let plafReferenceNumber;

        // Check if the current link URL was alreday found before.
        const plafLinkDuplicateNumber = plafUrls.indexOf(plafUrl);

        // Use link number of first found occurance of the current URL to prevent
        // duplicates in the footnote list.
        if (plafLinkDuplicateNumber > -1) {
          plafReferenceNumber = plafLinkDuplicateNumber + 1;
        } else {
          plafReferenceNumber = plafLinkNumber;
        }

        // Create the footnote reference reference and append it to the link.
        plafReference.innerHTML =
          referenceTextBeforeNumber +
          plafReferenceNumber +
          referenceTextAfterNumber;
        plafLink.parentNode.insertBefore(plafReference, plafLink.nextSibling);

        // If the current link URL is not a duplicate …
        if (plafLinkDuplicateNumber < 0) {
          // … create the footnote, …
          const plafFootnotesListElement = document.createElement("li");
          plafFootnotesListElement.innerHTML = plafUrl;

          // … add the new footnote to the list of footnotes, …
          plafFootnotesList.appendChild(plafFootnotesListElement);

          // … store the URL of the current link in the array for later
          // reference, …
          plafUrls.push(plafUrl);

          // … increment the link number to prepare it for the next loop.
          plafLinkNumber += 1;
        }
      }
    });

    // Add the footnotes list to the footnotes container.
    plafFootnotesContainer.appendChild(plafFootnotesList);

    // Add the footnores container to the document.
    document.querySelector("body").appendChild(plafFootnotesContainer);
  }
}

/**
 * -----------------------------------------------------------------------------
 * Apply main function
 * -----------------------------------------------------------------------------
 */

printLinksAsFootnotes(".js-page-main-content");
