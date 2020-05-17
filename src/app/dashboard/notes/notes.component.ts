import { Component, OnInit } from '@angular/core';
import { Clipping } from 'src/app/services/clipping';
import { UsersService } from '../../services/users.service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit {
  clippings: Clipping[];
  searchRes: Clipping[];
  constructor(private usersService: UsersService) {
    this.clippings = this.usersService.getClippings();
    this.searchRes = this.clippings;
   }

  ngOnInit(): void {
    this.usersService.clippingsUpdated.subscribe(
      (data => {
        this.clippings = data;
        this.searchRes = this.clippings
      })
    );

    this.usersService.searchUpdated.subscribe(
      (data => {
        let res = [];
        this.clippings.filter( item => {
          if ( item.book.toLowerCase().includes(data.toLowerCase()) ||
              item.author.toLowerCase().includes(data.toLowerCase())) {
                res.push(item);
          }
        })
        this.searchRes = res;
      })
    );
  }

}
