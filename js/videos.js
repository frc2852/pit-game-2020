$(document).ready(function() {
  const videoList = {
    introVideo: "videos/im-at-soup.mp4",
    questions: [
      {
        video: "videos/why-are-you-running.mp4",
        answer: true,
        waitingVideo: "videos/test-video-1.mp4"
      },
      {
        video: "videos/youre-going-to-be-a-father.mp4",
        answer: false,
        waitingVideo: "videos/test-video-1.mp4"
      }
    ],
    congratulationsVideo: "videos/congratulations.mp4",
    gameoverVideo: "videos/leamons.mp4"
  };

  function findQuestionVideo(videoSrc) {
    for (const question of videoList.questions) {
      if (videoSrc === question.video) {
        return question;
      }
    }
    return undefined;
  }

  $("#video-player")[0].addEventListener(
    "ended",
    function() {
      const $videoSource = $("#video-player").find("source");
      const videoSrc = $videoSource.attr("src");
      const autoplayVideo = $("#video-player").get(0);

      if (videoSrc !== videoList.introVideo) {
        if (!findQuestionVideo(videoSrc)) {
          $videoSource.attr("src", videoList.gameoverVideo);
        } else {
          const question = findQuestionVideo(videoSrc);
          $videoSource.attr("src", question.waitingVideo);
        }
      }

      if (videoSrc === videoList.gameoverVideo) {
        $videoSource.attr("src", videoList.introVideo);
      }

      if (videoSrc === videoList.congratulationsVideo) {
        $videoSource.attr("src", videoList.introVideo);
      }

      autoplayVideo.load();
      autoplayVideo.play();
    },
    false
  );

  let currentQuestion = undefined;
  let currentVideo = 0;

  function nextQuestion(answer) {
    if (!currentQuestion) {
      currentQuestion = videoList.questions[0];
      return currentQuestion.video;
    }

    if (currentQuestion.answer === answer) {
      currentVideo++;

      if (currentVideo >= videoList.questions.length) {
        currentVideo = 0;
        currentQuestion = undefined;
        return videoList.congratulationsVideo;
      }

      currentQuestion = videoList.questions[currentVideo];
      return videoList.questions[currentVideo].video;
    }

    currentVideo = 0;
    currentQuestion = undefined;
    return videoList.gameoverVideo;
  }

  $("#click1").click(function() {
    const videoQuestion = nextQuestion(true);

    const $videoSource = $("#video-player").find("source");
    $videoSource.attr("src", videoQuestion);
    const autoplayVideo = $("#video-player").get(0);
    autoplayVideo.load();
    autoplayVideo.play();
  });

  $("#click2").click(function() {
    const videoQuestion = nextQuestion(false);

    const $videoSource = $("#video-player").find("source");
    $videoSource.attr("src", videoQuestion);
    const autoplayVideo = $("#video-player").get(0);
    autoplayVideo.load();
    autoplayVideo.play();
  });
});
