import { Component } from '@angular/core';
import { PublicacionesService } from '../../Service/publicacionesService/publicacionesService.service';
import { DataService } from '../../Service/data.service';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})
export class PublishPostComponent {
  fileName = '';
  selectedFile: File | null = null;
  postDescription: string = '';
  post: Publicacion | null = null;

  constructor(private publicacionesService: PublicacionesService, private dataService: DataService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
      console.log(file);
    }
  }

  async onSubmit() {
    console.log('submit');
    this.post = {
      id_perfil: this.dataService.getUser().id_perfil || 0,
      texto_publicacion: this.postDescription
    }
    await this.publicacionesService.createPublicacion(this.post);
  }
  /*
    onSubmit(event: Event) {
      event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
      if (this.selectedFile || this.postDescription) {
        const formData = new FormData();
        formData.append('id_perfil', this.dataService.getUser().id_perfil?.toString() || '');
        if (this.selectedFile) {
          formData.append('foto_publicacion', this.selectedFile, this.selectedFile.name);
        }
        formData.append('texto_publicacion', this.postDescription);
  
        this.publicacionesService.createPublicacion(formData)
      } else {
        console.error('File or description not provided');
      }
    }
    */
}

interface Publicacion {
  id_perfil: number;
  texto_publicacion: string;
}
