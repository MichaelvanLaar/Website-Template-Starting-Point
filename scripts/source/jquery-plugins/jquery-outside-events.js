/**
 * =============================================================================
 * jQuery outside events 1.1
 *
 * https://github.com/cowboy/jquery-outside-events
 * (+ replaced “.bind()” with “.on()”)
 * =============================================================================
 */

/* eslint-disable */

(function($, doc, outside) {
  "$:nomunge";

  // Used by YUI compressor.

  $.map(
    // All these events will get an "outside" event counterpart by default.
    "click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(
      " "
    ),
    event_name => {
      jq_addOutsideEvent(event_name);
    }
  );

  // The focus and blur events are really focusin and focusout when it comes
  // to delegation, so they are a special case.
  jq_addOutsideEvent("focusin", `focus${outside}`);
  jq_addOutsideEvent("focusout", `blur${outside}`);

  // Method: jQuery.addOutsideEvent
  //
  // Register a new "outside" event to be with this method. Adding an outside
  // event that already exists will probably blow things up, so check the
  // <Default "outside" events> list before trying to add a new one.
  //
  // Usage:
  //
  // > jQuery.addOutsideEvent( event_name [, outside_event_name ] );
  //
  // Arguments:
  //
  //  event_name - (String) The name of the originating event that the new
  //  "outside" event will be powered by. This event can be a native or
  //  custom event, as long as it bubbles up the DOM tree.
  //  outside_event_name - (String) An optional name for the new "outside"
  //  event. If omitted, the outside event will be named whatever the
  //  value of `event_name` is plus the "outside" suffix.
  //
  // Returns:
  //
  //  Nothing.

  $.addOutsideEvent = jq_addOutsideEvent;

  function jq_addOutsideEvent(event_name, outside_event_name) {
    // The "outside" event name.
    outside_event_name = outside_event_name || event_name + outside;

    // A jQuery object containing all elements to which the "outside" event is
    // bound.
    let elems = $(),
      // The "originating" event, namespaced for easy unbinding.
      event_namespaced = `${event_name}.${outside_event_name}-special-event`;

    // Event: outside events
    //
    // An "outside" event is triggered on an element when its corresponding
    // "originating" event is triggered on an element outside the element in
    // question. See the <Default "outside" events> list for more information.
    //
    // Usage:
    //
    // > jQuery('selector').on( 'clickoutside', function(event) {
    // >   var clicked_elem = $(event.target);
    // >   ...
    // > });
    //
    // > jQuery('selector').on( 'dblclickoutside', function(event) {
    // >   var double_clicked_elem = $(event.target);
    // >   ...
    // > });
    //
    // > jQuery('selector').on( 'mouseoveroutside', function(event) {
    // >   var moused_over_elem = $(event.target);
    // >   ...
    // > });
    //
    // > jQuery('selector').on( 'focusoutside', function(event) {
    // >   var focused_elem = $(event.target);
    // >   ...
    // > });
    //
    // You get the idea, right?

    $.event.special[outside_event_name] = {
      // Called only when the first "outside" event callback is bound per
      // element.
      setup() {
        // Add this element to the list of elements to which this "outside"
        // event is bound.
        elems = elems.add(this);

        // If this is the first element getting the event bound, bind a handler
        // to document to catch all corresponding "originating" events.
        if (elems.length === 1) {
          $(doc).on(event_namespaced, handle_event);
        }
      },

      // Called only when the last "outside" event callback is unbound per
      // element.
      teardown() {
        // Remove this element from the list of elements to which this
        // "outside" event is bound.
        elems = elems.not(this);

        // If this is the last element removed, remove the "originating" event
        // handler on document that powers this "outside" event.
        if (elems.length === 0) {
          $(doc).off(event_namespaced);
        }
      },

      // Called every time a "outside" event callback is bound to an element.
      add(handleObj) {
        const old_handler = handleObj.handler;

        // This function is executed every time the event is triggered. This is
        // used to override the default event.target reference with one that is
        // more useful.
        handleObj.handler = function(event, elem) {
          // Set the event object's .target property to the element that the
          // user interacted with, not the element that the "outside" event was
          // was triggered on.
          event.target = elem;

          // Execute the actual bound handler.
          old_handler.apply(this, arguments);
        };
      }
    };

    // When the "originating" event is triggered..
    function handle_event(event) {
      // Iterate over all elements to which this "outside" event is bound.
      $(elems).each(function() {
        const elem = $(this);

        // If this element isn't the element on which the event was triggered,
        // and this element doesn't contain said element, then said element is
        // considered to be outside, and the "outside" event will be triggered!
        if (this !== event.target && !elem.has(event.target).length) {
          // Use triggerHandler instead of trigger so that the "outside" event
          // doesn't bubble. Pass in the "originating" event's .target so that
          // the "outside" event.target can be overridden with something more
          // meaningful.
          elem.triggerHandler(outside_event_name, [event.target]);
        }
      });
    }
  }
})(jQuery, document, "outside");

/* eslint-enable */
