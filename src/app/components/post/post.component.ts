import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post: Publicacion | undefined;

  goToProfile() {
  }
}

interface Publicacion {
  nickname_perfil: string;
  texto_publicacion: string;
  foto_publicacion: string | null;
}
