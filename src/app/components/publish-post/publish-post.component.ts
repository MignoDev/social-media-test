import { Component } from '@angular/core';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrl: './publish-post.component.css'
})
export class PublishPostComponent {

  fileName = '';
  constructor() { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
  }
}
