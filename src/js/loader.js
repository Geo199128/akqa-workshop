$(document).ready(function () {
  // Simulate loading time and remove loader when document is ready
  setTimeout(function () {
    $("html").removeAttr("style");
    $("#loader").addClass("hide");
  }, 400);
});
