var animationTime = 300;
var isResponsive = false;
var submenuSlideTime = 400;
var openMobileMenuTime = 300;

// Reset header on initialization and responsive shifting
var resetHeaderNav = function () {
  $(
    ".header-mobile-menu-btn,.header-nav-container,.header-nav-container a,.header-nav-container ul"
  )
    .removeClass("active")
    .removeAttr("style");
};

// Close desktop active menu item function
var closeDesktopActiveSubmenu = function (menuItem, directSubmenu) {
  // Remove active class from already opened item and its submenu
  if (menuItem.closest(".header-menu").find(".header-menu.active")) {
    menuItem
      .closest("li")
      .siblings("li")
      .find(" > a.active")
      .removeClass("active")
      .siblings("ul.active")
      .removeClass("active");
  }

  setTimeout(function () {
    directSubmenu.find("a.active,.header-menu.active").removeClass("active");
  }, animationTime);
};

// Close desktop active menu item function
var closeAllDesktopActiveSubmenu = function () {
  // Remove active class from already opened item and its submenu
  if ($(".header-menu a.active")) {
    $(".header-first-level-menu")
      .find(" > li > a.active")
      .removeClass("active")
      .siblings("ul.active")
      .removeClass("active");
  }

  setTimeout(function () {
    $(".header-second-level-menu")
      .find("a.active,.header-menu.active")
      .removeClass("active");
  }, animationTime);
};

// Desktop submenu activation protocol function
var desktopActivationProtocol = function (menuItem) {
  // Add active class to the clicked item and its submenu
  menuItem.toggleClass("active").siblings("ul").toggleClass("active");

  // close all submenus when same active item is clicked
  if (!menuItem.hasClass("active")) {
    setTimeout(function () {
      menuItem.siblings("ul").find("a.active,ul.active").removeClass("active");
    }, animationTime);
  }
};

// activate desktop submenu function
var activateDesktopSubmenu = function (menuItem, directSubmenu) {
  var closeTime = 0;

  if (menuItem.siblings("ul")) {
    // If there is another active submenu, wait until its closed to show the new active one
    if (directSubmenu.length) {
      closeTime = animationTime;
    }

    setTimeout(function () {
      desktopActivationProtocol(menuItem);
    }, closeTime);
  }
};

// Initialize desktop nav function
var initDesktopHeaderNav = function () {
  $(".header-nav-container a").each(function () {
    var menuItem = $(this);
    menuItem.off().on("click", function () {
      var directSubmenu = menuItem
        .closest("li")
        .siblings("li")
        .find(" > a.active")
        .siblings("ul.active");

      closeDesktopActiveSubmenu(menuItem, directSubmenu);
      activateDesktopSubmenu(menuItem, directSubmenu);
    });
  });
};

// Close mobile submenu function
var closeMobileActiveSubmenu = function (menuItem, directSubmenu) {
  // Remove active class from already opened item and its submenu
  if (menuItem.closest(".header-menu").find(".header-menu.active")) {
    menuItem
      .closest("li")
      .siblings("li")
      .find("a.active")
      .removeClass("active")
      .siblings("ul.active")
      .removeClass("active")
      .slideUp(submenuSlideTime);
  }

  // setTimeout(function () {
  //   directSubmenu.find("a.active,.header-menu.active").removeClass("active");
  // }, animationTime);
};

// Close all mobile submenu function
var closeAllMobileActiveSubmenus = function () {
  // Remove active class from all opened submenus
  if ($(".header-menu a.active")) {
    $(".header-menu")
      .find("a.active")
      .removeClass("active")
      .siblings("ul.active")
      .removeClass("active")
      .slideUp(submenuSlideTime);
  }
};

// Mobile submenu activation protocol function
var mobileActivationProtocol = function (menuItem) {
  // Add active class to the clicked item and its submenu
  menuItem
    .toggleClass("active")
    .siblings("ul")
    .toggleClass("active")
    .slideToggle(submenuSlideTime);

  // close all submenus when same active item is clicked
  if (!menuItem.hasClass("active")) {
    menuItem
      .siblings("ul")
      .find("a.active")
      .removeClass("active")
      .siblings("ul.active")
      .removeClass("active")
      .slideUp(submenuSlideTime);
  }
};

// activate mobile submenu function
var activateMobileSubmenu = function (menuItem, directSubmenu) {
  var closeTime = 0;

  if (menuItem.siblings("ul")) {
    // If there is another active submenu, wait until its closed to show the new active one
    if (directSubmenu.length) {
      var closeTime = submenuSlideTime;
    }

    setTimeout(function () {
      mobileActivationProtocol(menuItem);
    }, closeTime);
  }
};

// Open mobile menu function
var openMobileMenu = function () {
  $(".header-mobile-menu-btn,.header-nav-container").addClass("active");
  $("html").addClass("overflow-hidden");
};

// Close mobile menu function
var closeMobileMenu = function () {
  var closeTime = 0;

  // If there is an active menu, modify the closing time to wait for the submenus to close
  if ($(".header-menu.active").length) {
    closeTime = submenuSlideTime + 100;
  }
  closeAllMobileActiveSubmenus();

  setTimeout(function () {
    $(".header-mobile-menu-btn,.header-nav-container").removeClass("active");
    $("html").removeClass("overflow-hidden");
  }, closeTime);
};

// Initialize mobile nav function
var initMobileHeaderNav = function () {
  $(".header-nav-container a").each(function () {
    var menuItem = $(this);
    menuItem.off().on("click", function () {
      var directSubmenu = menuItem
        .closest("li")
        .siblings("li")
        .find(" > a.active")
        .siblings("ul.active");

      closeMobileActiveSubmenu(menuItem, directSubmenu);
      activateMobileSubmenu(menuItem, directSubmenu);
    });
  });
};

$(document).ready(function () {
  if ($(window).width() < 768) {
    isResponsive = true;
  }

  if (isResponsive) {
    initMobileHeaderNav();
  } else {
    initDesktopHeaderNav();
  }

  $(document).on("click", ".header-mobile-menu-btn", function () {
    if ($(this).hasClass("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  $(document).on("click", function (e) {
    var container = $(".header-nav-container,.header-mobile-menu-btn");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if (isResponsive) {
        closeMobileMenu();
      } else {
        closeAllDesktopActiveSubmenu();
      }
    }
  });
});

$(window).resize(function () {
  if ($(window).width() < 768 && isResponsive == false) {
    resetHeaderNav();
    initMobileHeaderNav();
    isResponsive = true;
  } else if ($(window).width() >= 768 && isResponsive == true) {
    resetHeaderNav();
    initDesktopHeaderNav();
    isResponsive = false;
  }
});
