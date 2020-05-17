import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/services/book';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  books: Book[];
  searchRes: Book[];
  searchInput = '';

  constructor(private usersService: UsersService,
              private route: ActivatedRoute) {

    this.books = this.usersService.getBooks();
    this.searchRes = this.books;
   }

  ngOnInit(): void {
    this.usersService.booksUpdated.subscribe(
      (data) => {
        this.books = data;
        this.searchRes = this.books;
      }
    );
  }

  search(): void {
    this.searchRes = this.books.filter( b => 
      b.title.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      b.author.toLowerCase().includes(this.searchInput.toLowerCase())
      );

    this.usersService.searchUpdated.emit(this.searchInput);
  }

}
