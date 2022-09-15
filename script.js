class Book {

    constructor(
        title='Unknown',
        autor='Unknown',
        numberOfPages=0,
        isRead=false
    ) {
        this.title=title;
        this.autor=autor;
        this.numberOfPages=numberOfPages;
        this.isRead=isRead;
    };
    
};

class Library{
    constructor(){
        this.books=[];
    };


    addBook(book){
        this.books.push(book);
    };
};

