// Show video player
var showVideoPlayer = function (videoId) {
  $("html").addClass("overflow-hidden");
  $(".video-player");
  $(".video-player")
    .addClass("active")
    .find("iframe")
    .attr("src", "https://www.youtube.com/embed/" + videoId);
};

// Hide video player
var hideVideoPlayer = function () {
  $(".video-player").removeClass("active").find("iframe").removeAttr("src");
  $("html").removeClass("overflow-hidden");
};

$(document).ready(function () {
  if ($("[data-video-player]").length) {
    $("[data-video-player]").on("click", function () {
      var videoUrl = new URL($(this).attr("data-video-player"));
      var urlParams = new URLSearchParams(videoUrl.search.slice(1));
      var videoId = urlParams.get("v");

      if ($(".video-player").length) {
        // If video player exists, show it
        showVideoPlayer(videoId);
      } else {
        // If video player DOESN'T exist, create it and then show it
        $("body").append(
          '<div class="video-player"><div class="video-player-container"><div class="video-player-close"><a href="javascript:void(0);" class="video-player-close-btn" title="close video"><i class="icon-close"></i></a></div><div class="video-player-iframe"><iframe width="560" height="315" frameborder="0" title="Video player" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div></div>'
        );
        showVideoPlayer(videoId);
      }
    });

    // Assign hide video player function to video player close button
    $(document).on("click", ".video-player-close-btn", function () {
      hideVideoPlayer();
    });
  }
});
