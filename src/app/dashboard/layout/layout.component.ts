import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/services/book';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

  constructor() {

   }

  ngOnInit(): void {
  }

}
