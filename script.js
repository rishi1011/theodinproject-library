const addButton = document.querySelector('.btn.new');
const submitButton = document.querySelector('.btn.submit');
const closeButton = document.querySelector('.cross');
const form = document.querySelector(".form");
const main = document.getElementById("main");
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const genreInput = document.getElementById('genre-input');
const pagesInput = document.getElementById('pages-input');
const readInput = document.getElementById('check-input');
const bookItemContainer = document.querySelector('.book-item-container');
const readBox = document.querySelector('.box.read');
const card = document.querySelector('.card');
const deleteCardBtn = document.querySelector('span.delete');

let myLibrary = [];

function Book(title, author, pages, genre, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
}

function deleteBookFromLibraryFromText(text) {
    let newLib = myLibrary.filter(book => {
        if (book.title === text) return false;
        return true;
    });

    myLibrary = newLib;
}

function addBookToLibrary(title, author, pages, genre, read) {
    let bookObj = new Book(title, author, pages, genre, read);
    myLibrary.push(bookObj);
    displayBook(bookObj);
}

addBookToLibrary('Harry potter and the chamber of secrets', 'JK Rowling', '380', 'Fantasy', false);

//ui

function displayBook(book) {
    let card = document.createElement('div');
    if (book.read)
        card.classList.add('read-gradient');
    card.classList.add('card');
    card.innerHTML = `
        <span class="delete" onclick='deleteCardAndObj(event)'><i class="fas fa-trash"></i></span>
        <div class="content">
                <div class="top-content">
                    <div class="icon">
                        <span class="read">
                            <i class="fas fa-book-reader"></i>
                            </span>
                    </div>
                    <div class="info">
                        <p class="title">${book.title}</p>
                        <p class="author">${book.author}</p>
                    </div>
                </div>
                <div class="bottom-content">
                    <div class="box pages">
                        <p class="pages">${book.pages} pages</p>
                    </div>
                    <div class="box genre">
                        <p class="genre">${book.genre}</p>
                    </div>
                    <div class="box read" onclick="changeCardAppearance(event)">
                        <p class="read">${book.read ? 'Read' : 'Not Read'}</p>
                    </div>
                </div>
            </div>
        `;

    bookItemContainer.appendChild(card);
}

// deleteCardBtn.addEventListener('click', deleteCardAndObj);

function deleteCardAndObj(event) {
    let delCard = event.target.parentElement.parentElement;
    let text = delCard.childNodes[3].children[0].children[1].children[0].textContent;
    delCard.remove();
    console.log(myLibrary);

    deleteBookFromLibraryFromText(text);

    console.log(myLibrary);
}

// readBox.addEventListener('click', changeCardAppearance);

function changeCardAppearance(event) {
    let box = event.target.parentNode;
    let content = box.childNodes[1].textContent;
    let card = box.parentElement.parentElement.parentElement;
    card.classList.toggle('read-gradient');
    if (content === "Read")
        box.childNodes[1].textContent = "Not Read";
    else
        box.childNodes[1].textContent = "Read";
}

addButton.addEventListener('click', openForm);

closeButton.addEventListener('click', closeForm);

submitButton.addEventListener('click', (event) => {
    if (titleInput.value === "" || authorInput.value === "" || pagesInput === "") {
        return;
    }

    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, genreInput.value, readInput.checked);

    titleInput.value = "";
    pagesInput.value = "";
    authorInput.value = "";

    closeForm();
})

function openForm() {
    form.style.display = 'block';
    main.style.opacity = '0.2';

    titleInput.required = true;
    authorInput.required = true;
    pagesInput.required = true;
}

function closeForm() {
    form.style.display = 'none';
    main.style.opacity = '1';

    titleInput.required = false;
    authorInput.required = false;
    pagesInput.required = false;
}