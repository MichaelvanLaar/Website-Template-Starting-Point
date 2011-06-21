$(document).ready(function() {

  // Add some new class-names because IE6 and in some cases IE7
  // can't handle the pseudo class :hover for any element in CSS

  $("#main-navigation ul li").hover(
    function () {
      $(this).addClass("sfhover");
    },
    function () {
      $(this).removeClass("sfhover");
    }
  );

  $("#main-navigation ul li.active").hover(
    function () {
      $(this).addClass("sfhover_active");
    },
    function () {
      $(this).removeClass("sfhover_active");
    }
  );

  $("#main-navigation ul li.last").hover(
    function () {
      $(this).addClass("sfhover_last");
    },
    function () {
      $(this).removeClass("sfhover_last");
    }
  );

  $("#main-navigation ul li.parent").hover(
    function () {
      $(this).addClass("sfhover_parent");
    },
    function () {
      $(this).removeClass("sfhover_parent");
    }
  );

  $("#main-navigation ul li.active.last").hover(
    function () {
      $(this).addClass("sfhover_active_last");
    },
    function () {
      $(this).removeClass("sfhover_active_last");
    }
  );

  $("#main-navigation ul li.last.parent").hover(
    function () {
      $(this).addClass("sfhover_last_parent");
    },
    function () {
      $(this).removeClass("sfhover_last_parent");
    }
  );

  $("#main-navigation ul li.active.parent").hover(
    function () {
      $(this).addClass("sfhover_active_parent");
    },
    function () {
      $(this).removeClass("sfhover_active_parent");
    }
  );

  $("#main-navigation ul li.active.last.parent").hover(
    function () {
      $(this).addClass("sfhover_active_last_parent");
    },
    function () {
      $(this).removeClass("sfhover_active_last_parent");
    }
  );


  // Add some new class-names because IE6 and 7
  // can't handle .class1.class2 in CSS

  $("#main-navigation ul li.active.last").addClass("active_last");
  $("#main-navigation ul li.last.parent").addClass("last_parent");
  $("#main-navigation ul li.active.parent").addClass("active_parent");
  $("#main-navigation ul li.active.last.parent").addClass("active_last_parent");
  
});