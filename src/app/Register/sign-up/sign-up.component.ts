import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  email: string;
  password: string;
  loggedIn: boolean;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {

               }

  ngOnInit(): void {
    console.log('entrando a ngOnInit');
    this.route.queryParams.subscribe((params) => {
      if (params.code) {
        this.authService.googleLogin(params).subscribe((data) =>{
          if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/uploadClippings');
          }
        })
      }
    });
  }


  submitForm(formulario: NgForm) {
    console.log(formulario);
  }
}
