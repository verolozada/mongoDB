$('.submitNote').on('click', event => {
    event.preventDefault();

    const newNote = {
        noteTitle: $('#note-title').val().trim(),
        noteBody: $('#note-body').val().trim(),
        id: $('.submitNote').attr('id')
    }

    console.log(newNote);
    // $.ajax(`/articles/${newNote.id}`, {
    //     type: 'POST',
    //     data: newNote
    // }).then(response => {
    //     location.load(true);
    // }).catch(err => {console.log(err)});


});