const STORAGE_KEY = 'buku';

let databuku = [];

function isStorageExist(){
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function simpanData() {
    const parsed = JSON.stringify(databuku);
    localStorage.setItem(STORAGE_KEY, parsed);
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        databuku = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        simpanData();
}

function composeBookObject(judul, penulis, penerbit, thn_terbit,harga) {
    return {
        id: +new Date(),
        judul,
        penulis, 
        penerbit,
        thn_terbit,
        harga
    };
}