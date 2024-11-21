import { Injectable } from '@angular/core';
import { AmigosService } from './amigosService/amigosService.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private user: User = this.loadUserFromLocalStorage();
  private friends: any[] = this.loadFriendsFromLocalStorage();
  private posibleFriends: any[] = this.loadPosibleFriendsFromLocalStorage();

  constructor(private amigosService: AmigosService) { }

  setUser(user: User): void {
    this.user = user;
    this.saveUserToLocalStorage();
  }

  getUser(): User {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user.id_perfil !== null;
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
    this.saveUserToLocalStorage();
  }

  setFriends(friends: any[]): void {
    this.friends = friends;
    this.saveFriendsToLocalStorage();
  }

  getFriends(): any[] {
    return this.friends;
  }

  clearFriends(): void {
    this.friends = [];
    this.saveFriendsToLocalStorage();
  }

  addFriend(friend: any): void {
    console.error(friend);
    this.amigosService.createAmigo({ id_perfil: friend.id_perfil, id_perfil_amigo: friend.id_perfil_amigo, estado_solicitud: friend.estado_solicitud });
    this.friends.push(friend);
    this.friends.sort((a, b) => a.nombre_perfil.localeCompare(b.nombre_perfil));
    this.saveFriendsToLocalStorage();
  }

  removeFriend(friend: any): void {
    this.friends = this.friends.filter(f => f.id_perfil !== friend.id_perfil);
    this.saveFriendsToLocalStorage();
  }

  private saveUserToLocalStorage(): void {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  private loadUserFromLocalStorage(): User {
    const data = localStorage.getItem('user');
    if (data) {
      return JSON.parse(data);
    }
    return {
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

  private saveFriendsToLocalStorage(): void {
    localStorage.setItem('friends', JSON.stringify(this.friends));
  }

  private loadFriendsFromLocalStorage(): any[] {
    const data = localStorage.getItem('friends');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  private savePosibleFriendsToLocalStorage(): void {
    localStorage.setItem('posibleFriends', JSON.stringify(this.posibleFriends));
  }

  private loadPosibleFriendsFromLocalStorage(): any[] {
    const data = localStorage.getItem('posibleFriends');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  setPosibleFriends(posibleFriends: any[]): void {
    this.posibleFriends = posibleFriends;
    this.savePosibleFriendsToLocalStorage();
  }

  getPosibleFriends(): any[] {
    return this.posibleFriends;
  }

  clearPosibleFriends(id_perfil: number, id_perfil_amigo: number): void {
    this.posibleFriends = [];
    this.savePosibleFriendsToLocalStorage();
    this.amigosService.deleteAmigo(id_perfil, id_perfil_amigo);
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