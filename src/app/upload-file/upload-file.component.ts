import { Component, OnInit, EventEmitter} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.sass']
})
export class UploadFileComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: environment.url + '/uploadClipping2',
    method: 'post'
    //allowedFileType: ['image', 'pdf', 'txt']
    });

    public onFileSelected(event: EventEmitter<File[]>) {
      const file: File = event[0];
      console.log(file);
  
    }

  constructor() { }

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    }
  }


}