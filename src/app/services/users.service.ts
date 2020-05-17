import { Injectable, EventEmitter, Output } from '@angular/core';
import { Book } from './book';
import { Clipping } from './clipping';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  @Output() booksUpdated = new EventEmitter();
  @Output() clippingsUpdated = new EventEmitter();
  @Output() searchUpdated = new EventEmitter();
  books: Book[];
  clippings: Clipping[];

  bookSubject = new BehaviorSubject<Book[]>([]);
  clippingSubject = new BehaviorSubject<Clipping[]>([]);

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.books = [new Book(1, 'Beneath a scarlet sky', 'Mark Sullivan', 'https://images.penguinrandomhouse.com/cover/9781644730010' ),
    new Book(2, "The Wise man's fear", 'Pattrick Rothfuss', 'https://images-na.ssl-images-amazon.com/images/I/51piy7nh+8L._SX325_BO1,204,203,200_.jpg'),
    new Book(3, 'All the Light We Cannot See', 'Anthony Deer', 'https://images-na.ssl-images-amazon.com/images/I/515qVtYo3yL._SY346_.jpg'),
    new Book(3, 'The Name of the Wind', 'Pattrick Rothfuss', 'https://images-na.ssl-images-amazon.com/images/I/51em3xUxHOL._SX329_BO1,204,203,200_.jpg'),
];

    this.clippings = [
      new Clipping(1, 'Mark Sullivan', "Sometimes I think God is trying to test me, both now and in the future. I’ll have to become a good person on my own, without anyone to serve as a model or advise me, but it'll make me stronger in the end.", 'Beneath a scarlet sky', '23 de abril de 2019 7:09:29', '424-425'),
      new Clipping(2, 'Antoine de Saint-Exupéry', "sólo con el corazón se puede ver bien; lo esencial es invisible para los ojos.", 'El Principito', '28 de abril de 2019 08:56:04', '662-663'),
      new Clipping(3, 'Ray Bradbury', "Yo soy un escritor apasionado, no intelectual, lo que quiere decir que mis personajes tienen que adelantarse a mí para vivir la historia.", 'Fahrenheit 451', '29 de abril de 2019 08:21:18', '112-113'),
      new Clipping(4, 'George Orwell', "libertad es poder decir libremente que dos y dos son cuatro. Si se concede esto, todo lo demás vendrá por sus pasos contados.", '1984', '9 de junio de 2019 23:57:13', '1161-1162'),
      new Clipping(5, 'Mark Sullivan', "Sometimes I think God is trying to test me, both now and in the future. I’ll have to become a good person on my own, without anyone to serve as a model or advise me, but it'll make me stronger in the end.", 'Beneath a scarlet sky', '23 de abril de 2019 7:09:29', '424-425'),
      new Clipping(6, 'Antoine de Saint-Exupéry', "sólo con el corazón se puede ver bien; lo esencial es invisible para los ojos.", 'El Principito', '28 de abril de 2019 08:56:04', '662-663'),
      new Clipping(7, 'Ray Bradbury', "Yo soy un escritor apasionado, no intelectual, lo que quiere decir que mis personajes tienen que adelantarse a mí para vivir la historia.", 'Fahrenheit 451', '29 de abril de 2019 08:21:18', '112-113')
      
    ];

    this.bookSubject.next(this.getBooks());
    this.clippingSubject.next(this.getClippings());
    this.loadBooks();
    this.loadClippings();
   }

   getBooks() {
     return this.books.slice();
   }

   getClippings() {
    return this.clippings.slice();
  }

  loadBooks() {
    const email = this.authService.getTokenData().email;
    this.http.get(environment.url + '/api/userBooks?email=' + email).subscribe(
      (data: Book[]) => {
        console.log(data)
        this.books = data;
        this.bookSubject.next(this.getBooks());
        this.booksUpdated.emit(this.books);
      }, (err) => console.log(err)
    );
  }

  loadClippings() {
    const email = this.authService.getTokenData().email;
    this.http.get(environment.url + '/api/userClippings?email=' + email).subscribe(
      (data: Clipping[]) => {
        console.log(data)
        this.clippings = data;
        this.clippingSubject.next(this.getClippings());
        this.clippingsUpdated.emit(this.clippings);
      }, (err) => console.log(err)
    );
  }

  sendData() {
    this.http.post(environment.url + '/uploadc', {
      token: this.authService.getTokenData(),
      //hola: 'hola'
    })
    .subscribe(data => console.log(data));

    console.log(this.authService.getTokenData())
  }
}
