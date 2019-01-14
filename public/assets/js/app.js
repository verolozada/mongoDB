$(document).ready(function () {
    $('.submitNote').on('click', event => {
        event.preventDefault();

        const noteTitle = $('#noteTitle').val().trim();
        const noteBody = $('#noteBody').val().trim();
        const id = $('.submitNote').attr('data-id');

        $.ajax({
            method: "POST",
            url: `articles/${id}`,
            data: {
                noteTitle: noteTitle,
                noteBody: noteBody
            }
        }).then(function (data) {
            console.log(data);
            location.reload();

            //empty the form 
            $('#noteTitle').val("")
            $('#noteBody').val("")
        });
    });
});
