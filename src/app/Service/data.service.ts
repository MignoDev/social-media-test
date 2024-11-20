import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private user: User = this.loadUserFromLocalStorage();
  private friends: any[] = this.loadFriendsFromLocalStorage();

  constructor() { }

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