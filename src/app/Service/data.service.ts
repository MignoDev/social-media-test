import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private user: User = {
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

  private friends: any[] = [];

  constructor() { }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  clearUser(): void {
    this.user = {
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
  }

  setFriends(friends: any[]): void {
    this.friends = friends;
  }

  getFriends(): any[] {
    return this.friends;
  }

  clearFriends(): void {
    this.friends = [];
  }

  addFriend(friend: any): void {
    this.friends.push(friend);
    this.friends.sort((a, b) => a.nombre_perfil.localeCompare(b.nombre_perfil));
  }

  removeFriend(friend: any): void {
    this.friends = this.friends.filter(f => f.id_perfil !== friend.id_perfil);
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