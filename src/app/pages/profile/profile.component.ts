import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { DataService } from '../../Service/data.service';
import { PublicacionesService } from '../../Service/publicacionesService/publicacionesService.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {
    id_perfil: null,
    nickname_perfil: null,
    nombre_perfil: null,
    apellido_perfil: null,
    descripcion_perfil: null,
    correo_perfil: null,
    password_perfil: null,
    fecha_nacimiento_perfil: null,
    genero_perfil: null
  };

  posts: Publicacion[] = [];

  constructor(private dataService: DataService, private publicacionService: PublicacionesService) { }

  ngOnInit() {
    this.user = this.dataService.getUser();
    console.log(this.user);
    this.loadPublicaciones(this.user.id_perfil!);
  }

  loadPublicaciones(id_perfil: number): void {
    this.publicacionService.getPublicaciones(id_perfil).subscribe(publicaciones => {
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

  saveProfile(): void {
    this.dataService.setUser(this.user);
  }
}

interface User {
  id_perfil: number | null;
  nickname_perfil: string | null;
  nombre_perfil: string | null;
  apellido_perfil: string | null;
  descripcion_perfil: string | null;
  correo_perfil: string | null;
  password_perfil: string | null;
  fecha_nacimiento_perfil: Date | null;
  genero_perfil: Gender | null;
}

export enum Gender {
  male = "Masculino",
  female = "Femenino",
  other = "Prefiero no decirlo",
}

interface Publicacion {
  id_publicacion: number;
  nickname_perfil: string;
  texto_publicacion: string;
  foto_publicacion: string | null;
}