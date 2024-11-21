import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ComentariosService } from '../../Service/comentariosService/comentariosService.service';
import { tap } from 'rxjs/operators';
import { DataService } from '../../Service/data.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post: Publicacion | undefined;
  public comments: Comentario[] = [];
  public comment: string = '';
  public hideComments: boolean = true;

  constructor(private comentariosService: ComentariosService, private dataService: DataService) {
  }

  ngOnInit() {
    this.loadComments(this.post!.id_publicacion);
  }

  goToProfile() {
  }

  openComents() {
    this.hideComments = !this.hideComments;
  }

  async loadComments(id_publicacion: number): Promise<void> {
    try {
      this.comentariosService.getComentario(id_publicacion).pipe(
        tap((data) => {
          this.comments = data;
        })
      ).subscribe();
    } catch (e) {
      console.error('Error loading comments', e);
    }
  }

  postComment() {
    console.log(this.comment);
    this.comentariosService.createComentario({

      id_publicacion: this.post!.id_publicacion,
      id_perfil: this.dataService.getUser().id_perfil,
      texto_comentario: this.comment
    }).then(() => {
      this.loadComments(this.post!.id_publicacion);
      this.comment = '';
    }).catch((e) => {
      console.error('Error posting comment', e);
    });
  }
}


interface Publicacion {
  id_publicacion: number;
  nickname_perfil: string;
  texto_publicacion: string;
  foto_publicacion: string | null;
}

interface Comentario {
  id_comentario: number;
  id_publicacion: number;
  id_perfil: number;
  emoji_comentario: string;
  texto_comentario: string;
  nickname_perfil: string;
}
