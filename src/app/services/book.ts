export class Book {
    _id: string;
    title: string;
    author: string;
    imageUrl: string;

    constructor(id, title, author, imageUrl) {
        this._id = id;
        this.title = title;
        this.author = author;
        this.imageUrl = imageUrl;
    }
}