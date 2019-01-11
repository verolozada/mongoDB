$(document).ready(function () {
    $('.submitNote').on('click', event => {
        event.preventDefault();

        const newNote = {
            noteTitle: $('#note-title').val().trim(),
            noteBody: $('#note-body').val().trim(),
        }

        const id = $('.submitNote').attr('data-id');

        // console.log(newNote);
        // console.log(id);

        $.ajax({
            method: 'POST',
            url: `/articles/${id}`,
            data: newNote
        }).then(function (data) {
            console.log(data)
            location.reload();

            $('#note-title').val("")
            $('#note-body').val("")
        });
    });
});