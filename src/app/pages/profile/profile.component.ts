import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { DataService } from '../../Service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

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

  constructor(private data: DataService) { }

  ngOnInit() {
    this.user = this.data.getUser();
    console.log(this.user);
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
  femail = "Femenino",
  other = "Prefiero no decirlo",
}