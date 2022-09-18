class Book {

    constructor(
        title='Unknown',
        author='Unknown',
        numberOfPages=0,
        isRead=false
    ) {
        this.title=title;
        this.author=author;
        this.numberOfPages=numberOfPages;
        this.isRead=isRead;
    };
    
};

class Library{
    constructor(){
        this.books=[];
    };


    addBook(newBook){
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook)
          }
    };

    removeBook(title){
        this.books=this.books.filter((book)=>book.title !=title);
    };

    getBook(title){
        return this.books.find((book)=>book.title===title);
    };

    isInLibrary(newBook){
        return this.books.some((book)=>book.title===newBook.title);
    };
};


const library=new Library();

const addBookButton=document.getElementById("addBook");
const addBookModal=document.getElementById("addBookModal");
const error=document.getElementById("error");
const addBookForm=document.getElementById("addBookForm");
const bookGrid=document.getElementById("bookGrid");
const overlay=document.getElementById("overlay");



const oppenAddBookModal=()=>{
    //addBookForm.reset();
    addBookModal.classList.add("active");
    overlay.classList.add("active");
};



const closeAddBookModal=()=>{
    addBookModal.classList.remove("active");
    overlay.classList.remove("active");
    error.classList.remove("active");
    error.textContent="";
};



const handleKeyboardInput = (e) => {
    if (e.key === 'Escape') closeAddBookModal();
  }



const updateBooksGrid=()=>{
    resetBooksGrid();
    for(let book of library.books){
        createBookCart(book);
    }
}



const resetBooksGrid = () => {
    bookGrid.innerHTML='';
  }

  const createBookCart=(book)=>{
    const bookCard=document.createElement("div");
    const title=document.createElement("p");
    const author=document.createElement("p");
    const pages=document.createElement("p");
    const buttonGroup=document.createElement("div");
    const readBook=document.createElement("button");
    const removeBook=document.createElement("button");

    bookCard.classList.add("bookCard");
    buttonGroup.classList.add("buttonGroup");
    readBook.classList.add("btn");
    readBook.classList.add("btn");
    readBook.onclick=toggleRead;
   // removeBook.onclick=toggleRemove;

    title.textContent=`${book.title}`;
    author.textContent=`${book.author}`;
    pages.textContent=`${book.pages}`;
    removeBook.textContent="Remove";

    if(book.isRead){
        readBook.textContent="Read";
    }else{
        readBook.textContent="Not read"
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    buttonGroup.appendChild(readBook);
    buttonGroup.appendChild(removeBook);
    bookCard.appendChild(buttonGroup);
    bookGrid.appendChild(bookCard);
  };

  const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
  }


  const addBook=(e)=>{
    e.preventDefault();
    const newBook = getBookFromInput();

    if (library.isInLibrary(newBook)) {
        error.textContent = 'This book already exists in your library';
        error.classList.add('active');
        return
    }else{

    library.addBook(newBook);
    saveLocal();
    updateBooksGrid();
    }
    
    closeAddBookModal();
  };



  const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
      '"',
      ''
    );

    library.removeBook(title);
    saveLocal();
    updateBooksGrid();
  };

  const toggleRead=(e)=>{
    const title=e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"','');
    const book=library.getBook(title);

    book.isRead = !book.isRead;
    saveLocal();
    updateBooksGrid();
  }

  addBookButton.onclick=oppenAddBookModal();
  addBookForm.onsubmit=addBook;
  window.onkeydown=handleKeyboardInput;

  const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(library.books))
  }
  
  const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'))
    if (books) {
      library.books = books.map((book) => JSONToBook(book))
    } else {
      library.books = []
    }
  }