/**
 * =============================================================================
 * Individual JavaScript
 * =============================================================================
 *
 * CONTENTS
 * -----------------------------------------------------------------------------
 * Cache some repeatedly used elements
 * Ajax for the SVG icons sprite
 * Menu (accordion menu or dropdown menu, according to screen size)
 * ScrollToFixed application
 * Cookie information banner
 * Add “rel='noopener'” to all links with “target='_blank'” for more security
 */





/**
 * -----------------------------------------------------------------------------
 * Cache some repeatedly used elements
 * -----------------------------------------------------------------------------
 */


var mvl_main_navigation = $('.js-main-navigation');
var mvl_main_navigation__box = $('.js-main-navigation__box');
var mvl_main_navigation__helpers = $('.js-main-navigation__helpers');
var mvl_main_navigation__toggle = $('.js-main-navigation__toggle');
var mvl_main_navigation__list = $('.js-main-navigation__list');
var mvl_dropdown_toggles = mvl_main_navigation__list.find('.has-children');
var mvl_dropdown_toggles__a = mvl_dropdown_toggles.children('a');
var mvl_page_footer = $('.js-page-footer');





/**
 * -----------------------------------------------------------------------------
 * Ajax for the SVG icons sprite
 * https://css-tricks.com/ajaxing-svg-sprite/
 * -----------------------------------------------------------------------------
 */


var ajax = new XMLHttpRequest();
ajax.open("GET", "images/icons.svg", true);
ajax.send();
ajax.onload = function (e) {
    var div = document.createElement("div");
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
}





/**
 * -----------------------------------------------------------------------------
 * Menu (accordion menu or dropdown menu, according to screen size)
 * -----------------------------------------------------------------------------
 */


$(document).ready(function () {

    // remove href attribute from all menu links that are used as submenu toggle links
    mvl_dropdown_toggles__a.each(function () {
        var mvl_dropdown_toggle__href = $(this).attr('href');
        $(this).attr('data-target', mvl_dropdown_toggle__href).removeAttr('href');
    });

    // add functionality to toggle icon which reveals the accordion menu
    mvl_main_navigation__toggle.click(function () {
        mvl_main_navigation__helpers.toggleClass('show-submenu');
        mvl_dropdown_toggles.removeClass('show-submenu'); // hide all "inner" accordion submenus
    });

    // accordion resp. dropdown functionality
    mvl_dropdown_toggles__a.click(function () {
        var mvl_dropdown_toggle = $(this).parent('li'); // the <li class="has-children"> which is a direct parent of the clicked <a href="…">
        mvl_dropdown_toggle.toggleClass('show-submenu'); // show resp. hide clicked dropdown menu
        mvl_dropdown_toggle
            .siblings('.show-submenu')
            .removeClass('show-submenu'); // hide all dropdown menus below all siblings of the <li class="has-children"> which is a direct parent of the clicked <a href="…">
        mvl_dropdown_toggle
            .find('.show-submenu')
            .removeClass('show-submenu'); // hide all dropdown menus below clicked <a href="…">
    });

});

// accordion menu for smaller screen sizes
enquire.register('screen and (max-width: 1019px)', {
    match: function () {
        mvl_main_navigation__list.css('max-height', $(window).height() - $(mvl_main_navigation__helpers).outerHeight()); // max height for dropped down menu
        mvl_main_navigation.bind('clickoutside', function () {
            mvl_main_navigation__helpers.removeClass('show-submenu'); // hide accordion menus when the user clicks anywhere outside the menu area
            mvl_dropdown_toggles.removeClass('show-submenu'); // hide all dropdown menus when the user clicks anywhere outside the menu area
        });
    },
    unmatch: function () {
        mvl_main_navigation.unbind('clickoutside');
        mvl_main_navigation__toggle.removeClass('show-submenu');
        mvl_main_navigation__list
            .css('max-height', '')
            .find('.show-submenu')
            .removeClass('show-submenu');
        mvl_main_navigation__toggle.removeClass('show-submenu');
    }
});

// dropdown menu for bigger screen sizes
enquire.register('screen and (min-width: 1020px)', {
    match: function () {
        mvl_main_navigation__list.on('clickoutside', function () {
            mvl_dropdown_toggles.removeClass('show-submenu'); // hide all dropdown menus when the user clicks anywhere outside the menu area
        });
    },
    unmatch: function () {
        mvl_main_navigation__list
            .off('clickoutside')
            .find('.show-submenu')
            .removeClass('show-submenu');
    }
});





/**
 * -----------------------------------------------------------------------------
 * ScrollToFixed application
 * -----------------------------------------------------------------------------
 */


$(document).ready(function () {
    mvl_main_navigation.scrollToFixed({
        dontSetWidth: true
    });
});





/**
 * -----------------------------------------------------------------------------
 * Cookie info banner
 * -----------------------------------------------------------------------------
 */


/**
 * Configuration:
 * Enter the info text, including a link to your privacy policy.
 * You should move this variable declaration to your HTML document if you want
 * to fill it with information generated by a CMS, e.g. different messages for
 * a multi-language website.
 */
var mvl_cookie_info_banner__text = 'Cookies help deliver this website. By using this website, you agree to its use of cookies, as detailed in the <a href="/privacy/">privacy policy</a>.';


$(document).ready(function () {

    var mvl_page_footer__margin_bottom = '0px';

    if (Cookies.get('mvl_cookiePermission') != 'ok') {
        mvl_page_footer.after('<div class="cookie-info-banner  clearfix"><div class="wrapper"><div class="cookie-info-banner__box"><p class="cookie-info-banner__message">' + mvl_cookie_info_banner__text + ' <button type="button" class="cookie-info-banner__close-button">OK</button></p></div></div></div>');
        mvl_page_footer__margin_bottom = $('.cookie-info-banner').outerHeight() + 'px';
        mvl_page_footer.css('margin-bottom', mvl_page_footer__margin_bottom);
    }
    $('.cookie-info-banner__close-button').click(function (event) {
        event.preventDefault();
        mvl_page_footer.css('margin-bottom', '0');
        $('.cookie-info-banner').hide();
        Cookies.set('mvl_cookiePermission', 'ok', {
            expires: 3650,
            path: '/'
        });
    });

});

$(window).resize(function () {
    if (Cookies.get('mvl_cookiePermission') != 'ok') {
        mvl_page_footer__margin_bottom = $('.cookie-info-banner').outerHeight() + 'px';
        mvl_page_footer.css('margin-bottom', mvl_page_footer__margin_bottom);
    }
});





/**
 * -----------------------------------------------------------------------------
 * Add “rel='noopener'” to all links with “target='_blank'” for more security
 * https://mathiasbynens.github.io/rel-noopener/ for details
 * -----------------------------------------------------------------------------
 */


$(document).ready(function () {
    $('a[target="_blank"]:not([rel="noopener"])').attr('rel', 'noopener');
});
