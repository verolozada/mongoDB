M.AutoInit();

$(document).ready(function() {
  // listener for save article btn
  $(".save-btn").on("click", function() {
    // save the article id
    const articleId = $(this).attr("data-id");
    console.log(`article id: ${articleId}`);

    // PUT ajax call to update saved status
    $.ajax({
      url: `/saved/${articleId}`,
      type: "PUT",
      success: function(result) {
        location.reload();
      }
    });
  });

  // listener for delete article btn
  $(".delete-btn").on("click", function() {
    // save article id
    const articleId = $(this).attr("data-id");

    // PUT ajax call to update saved status
    $.ajax({
      url: `/saved/${articleId}`,
      type: "DELETE",
      success: function(result) {
        location.reload();
      }
    });
  });

  // listener for submitting a comment
  $(".submit-btn").on("click", function() {
    // grab the comment input and id
    const articleId = $(this).attr("data-id");
    const comment = $("#comment-input")
      .val()
      .trim();
    const name = $(".username")
      .val()
      .trim();
    console.log(comment);
    console.log(articleId);
    console.log(name);

    // POST the comment
    $.ajax({
      method: "POST",
      url: `/comment/${articleId}`,
      data: {
        name: name,
        comment: comment
      }
    }).then(function(data) {
      console.log(data);
      location.reload();

      // empty comment area
      $(".username").val("");
      $("#comment-input").val("");
    });
  });
});