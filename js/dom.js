const itemBuku = 'itemID';
const TELAHDIBACA_LIST_ID = 'sudah-baca';
const BELUMDIBACA_LIST_ID = 'belum-baca';
const TELAHBACA_COUNT_ID = 'sudah-baca-count';
const BELUMBACA_COUNT_ID = 'belum-baca-count';

let TELAHBACA_COUNT = 0;
let BELUMBACA_COUNT = 0;

    function tambahBuku(){
        const judul = document.getElementById('input-judul').value;
        const penulis = document.getElementById('input-penulis').value;
        const penerbit = document.getElementById('input-penerbit').value;
        const thn_terbit = document.getElementById('input-thn_terbit').value;
        const harga = document.getElementById('input-harga').value;
        const newStatus = document.getElementById("input-baca").checked;

        if(judul == '' || penulis == '' || penerbit == '' || thn_terbit == '' || harga == ''){
            alert('Wajib Diisi');
            return;
        }

        document.getElementById("input-judul").value = '';
        document.getElementById("input-penulis").value = '';
        document.getElementById("input-penerbit").value = '';
        document.getElementById("input-thn_terbit").value = '';
        document.getElementById("input-harga").value = '';
    
    const buku = membuatBuku(judul,penulis, penerbit, thn_terbit,harga,newStatus);
    const objekBuku = composeBookObject(judul, penulis, penerbit, thn_terbit,harga,newStatus);

    buku[itemBuku] =  objekBuku.id;
    databuku.push(objekBuku);
    let listID;
    if(newStatus){
        listID = TELAHDIBACA_LIST_ID;
        TELAHBACA_COUNT++;
    }
    else{
        listID = BELUMDIBACA_LIST_ID;
        BELUMBACA_COUNT++;
    }
    listBook.append(book);
    updateCount()
    updateDataToStorage();
    showStatusRak();
}
    const listBook = document.getElementById(listID);
    
        function membuatBuku(judul, penulis, penerbit, thn_terbit,harga) {
            const judul = document.createElement('h3');
            judul.innerText = '" '+judul+' "';
            judul.classList.add('judul');
        
            const penulis = document.createElement("p");
            penulis.innerHTML = 'Penulis : <span class=\'penulis\'>'+penulis+'</span>';
            
            const penerbit = document.createElement("p");
            penerbit.innerHTML = 'Penerbit : <span class=\'penerbit\'>'+penerbit+'</span>';

            const thn_terbit = document.createElement("p");
            thn_terbit.innerHTML = 'thn_terbit : <span class=\'thn_terbit\'>'+thn_terbit+'</span>';

            const harga = document.createElement("p");
            harga.innerHTML = 'harga : <span class=\'harga\'>'+harga+'</span>';
        
            const btnContainer = document.createElement('div');
            btnContainer.classList.add('btn-wrapper');
            
            if (!newStatus)
                btnContainer.append(createCheckButton(), createTrashButton());
            else
                btnContainer.append(createUndoButton(), createTrashButton());

            const container = document.createElement('div');
            container.classList.add('item');

            container.append(judul,penulis, penerbit, thn_terbit,harga,btnContainer);
            return container;

        function createButton(iconButton, textButton, eventListener) {
            const button = document.createElement('button');
            button.classList.add('btn-action');
        
            const icon = document.createElement('i');
            icon.classList.add('fas', iconButton);
        
            button.innerHTML = icon.outerHTML+' '+textButton;
        
            button.addEventListener("click", function (event) {
                eventListener(event);
            });
        
            return button;
        }
        
        function createCheckButton() {
            return createButton('fa-check-circle', 'Selesai baca' , function (event) {
                addBookToCompleted(event.target.parentElement.parentElement);
            });
        }
        
        function createTrashButton() {
            return createButton('fa-trash', 'Hapus buku' , function (event) {
                removeBookFromCompleted(event.target.parentElement.parentElement);
            });
        }
        
        function createUndoButton() {
            return createButton('fa-sync-alt', 'Baca ulang' , function (event) {
                undoBookFromCompleted(event.target.parentElement.parentElement);
            });
        }

        function addBookToCompleted(bookItem) {
            const judul1 = bookItem.querySelector(".judul1").innerText;
            const penulis1 = bookItem.querySelector(".penulis1").innerText;
            const penerbit1 = bookItem.querySelector(".penerbit1").innerText;
            const thn_terbit1 = bookItem.querySelector(".thn_terbit1").innerText;
            const harga1 = bookItem.querySelector(".harga1").innerText;
        
            const newBook = membuatBuku(judul1,penulis1, penerbit1, thn_terbit1,harga1);
        
            const buku = findBook(bookItem[itemBuku]);
            buku.isCompleted = true;
            newBook[itemBuku] = buku.id;
        
            const listSudahBaca = document.getElementById(TELAHDIBACA_LIST_ID);
            listSudahBaca.append(newBook);
            bookItem.remove();
        
            TELAHBACA_COUNT++;
            BELUMBACA_COUNT--;
            updateCount();
            updateDataToStorage();
            showStatusRak();
        }
        
        function removeBookFromCompleted(bookItem) {
            let statusHapus = confirm('Apa kamu yakin ingin menghapus buku ini?');
        
            if(!statusHapus) return;
        
            const bookPosition = findBookIndex(bookItem[itemBuku]);
            const bookStatus = databuku[bookPosition].isCompleted;
        
            if(bookStatus){
                TELAHBACA_COUNT--;
            }else{
                BELUMBACA_COUNT--;
            }
        
            databuku.splice(bookPosition, 1);
            bookItem.remove();
        
            updateCount();
            updateDataToStorage();
            showStatusRak();
        }
    }
    function undoBookFromCompleted(bookItem) {
        const judul1 = bookItem.querySelector(".judul1").innerText;
        const penulis1 = bookItem.querySelector(".penulis1").innerText;
        const penerbit1 = bookItem.querySelector(".penerbit1").innerText;
        const thn_terbit1 = bookItem.querySelector(".thn_terbit1").innerText;
        const harga1 = bookItem.querySelector(".harga1").innerText;
    
        const newBook = membuatBuku(judul1,penulis1, penerbit1, thn_terbit1,harga1);
    
        const book = findBook(bookItem[itemBuku]);
        book.isCompleted = false;
        newBook[itemBuku]= book.id;
    
        const listBelumBaca = document.getElementById(BELUMDIBACA_LIST_ID);
        listBelumBaca.append(newBook);
        bookItem.remove();
        TELAHBACA_COUNT--;
        BELUMBACA_COUNT++;
        updateCount();
        updateDataToStorage();
        showStatusRak();
    }
