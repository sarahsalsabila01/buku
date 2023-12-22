document.addEventListener('DOMContentLoaded', function () {

    const inputBukuForm = document.getElementById('form-input-buku');


    inputBukuForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

});



document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});
