export class Clipping {
    id: string;
    author: string;
    quote: string;
    book: string;
    date: string;
    position: string;

    constructor(id, author, quote, book, date, position) {
        this.id = id;
        this.author = author;
        this.quote = quote;
        this.book = book;
        this.date = date;
        this.position = position;
    }
}
