import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-clipping',
  templateUrl: './upload-clipping.component.html',
  styleUrls: ['./upload-clipping.component.sass']
})
export class UploadClippingComponent implements OnInit {
  formulario: FormGroup;

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      file: new FormControl('', [
        Validators.required]),
      fileSource: new FormControl('', [Validators.required])
      })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formulario.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    console.log(this.formulario.value );
    const formData = new FormData();
    formData.append('file', this.formulario.get('fileSource').value);
    formData.append('tokenData', this.authService.getTokenData());
    console.log(formData);
    console.log(this.authService.getTokenData());
    let email = this.authService.getTokenData().email;
    this.http.post(environment.url + '/uploadClipping' + '?email=' + email, formData)
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/dashboard');
      });

  }

}
