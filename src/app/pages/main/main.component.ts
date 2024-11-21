import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Service/data.service';
import { PublicacionesService } from '../../Service/publicacionesService/publicacionesService.service';
import { AmigosService } from '../../Service/amigosService/amigosService.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  loggedIn: boolean = false;

  posts: Publicacion[] = [];
  friends: any[] = [];
  constructor(private router: Router, private userService: DataService, private publicacionService: PublicacionesService, private amigosService: AmigosService) { }
  ngOnInit() {
    this.loggedIn = this.userService.isLoggedIn();
    this.loadPublicaciones(this.userService.getUser().id_perfil!);
    this.loadFriends();
    this.friends = this.userService.getFriends();
  }

  loadFriends(): void {
    this.amigosService.getAmigoUsuario(this.userService.getUser().id_perfil!).subscribe(amigos => {
      const friends = JSON.parse(amigos);
      if (Array.isArray(friends)) {
        this.userService.setFriends(friends);
        console.log(this.friends);
      } else {
        console.error('La respuesta no es un array:', typeof amigos);
      }
    }, error => {
      console.error('Error al obtener amigos:', error);
    });
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
  id_publicacion: number;
  nickname_perfil: string;
  texto_publicacion: string;
  foto_publicacion: string | null;
}
