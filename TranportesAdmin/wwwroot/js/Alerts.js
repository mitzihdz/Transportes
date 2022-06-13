function AlertSuccessOk(Message, Location) {
    Swal.fire({
        //position: 'top-end',
        icon: 'success',
        title: Message,
        showConfirmButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            $(location).attr('href', Location);
        } 
    })
}

function AlertSuccess(Message) {
    Swal.fire({
        //position: 'top-end',
        icon: 'success',
        title: Message,
        showConfirmButton: false,
        timer: 3000
    })
}

function AlertError(Message) {
    Swal.fire({
        //position: 'top-end',
        icon: 'error',
        title: Message,
        showConfirmButton: true
    })
}