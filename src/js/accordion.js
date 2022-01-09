var accordionSlideTime = 400;

// Toggle clicked accordion element
var toggleAccordion = function (accordionItemClicked) {
  accordionItemClicked
    .toggleClass("active")
    .find(".accordion-content")
    .slideToggle(accordionSlideTime);
    
    // Scroll window to opened accordion
    $("html").animate(
      {
        scrollTop: accordionItemClicked.offset().top,
      },
      400
    );
};

$(document).ready(function () {
  if ($(".accordion-item").length) {
    $(".accordion-header").on("click", function () {
      var accordionItemClicked = $(this).closest(".accordion-item");

      // Delay accordion open till all siblings close
      if (accordionItemClicked.siblings(".accordion-item.active").length) {
        setTimeout(function () {
          toggleAccordion(accordionItemClicked);
        }, accordionSlideTime + 50);
      } else {
        toggleAccordion(accordionItemClicked);
      }

      // Close opened accordion siblings
      accordionItemClicked
        .siblings(".accordion-item.active")
        .removeClass("active")
        .find(".accordion-content")
        .slideUp(accordionSlideTime);
    });
  }
});
