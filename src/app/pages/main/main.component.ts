import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Service/data.service';
import { PublicacionesService } from '../../Service/publicacionesService/publicacionesService.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  loggedIn: boolean = false;

  posts: Publicacion[] = [];
  constructor(private router: Router, private userService: DataService, private publicacionService: PublicacionesService) { }
  ngOnInit() {
    this.loggedIn = this.userService.isLoggedIn();
    this.loadPublicaciones(this.userService.getUser().id_perfil!);
  }

  loadPublicaciones(id_perfil: number): void {
    this.publicacionService.getPostsByUserId(id_perfil).subscribe(publicaciones => {
      const posts = JSON.parse(publicaciones);
      if (Array.isArray(posts)) {
        this.posts = posts.map(publicacion => ({
          ...publicacion,
          foto_publicacion: publicacion.foto_publicacion ? `data:image/jpeg;base64,${publicacion.foto_publicacion}` : null

        }));
        console.log(this.posts);
      } else {
        console.error('La respuesta no es un array:', typeof publicaciones);
      }
    }, error => {
      console.error('Error al obtener publicaciones:', error);
    });
  }
}

interface Publicacion {
  nickname_perfil: string;
  texto_publicacion: string;
  foto_publicacion: string | null;
}
