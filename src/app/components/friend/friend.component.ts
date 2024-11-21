import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../Service/data.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  @Input() friend: Friend | null = null;
  public message: string = '';
  public friendNickname: string | null = null;
  public friendId: number | null = null;

  constructor(private userService: DataService) { }

  ngOnInit() {
    if (this.friend) {
      if (this.userService.getUser().nickname_perfil === this.friend.nickname_perfil) {
        this.message = 'dejar de seguir';
        this.friendNickname = this.friend.Nick_Amigo ?? null;
        this.friendId = this.friend.id_perfil_amigo ?? null;
      } else {
        this.friendNickname = this.friend.nickname_perfil ?? null;
        this.friendId = this.friend.id_amigo ?? null;
        this.message = 'seguir';
      }
    }
  }

  action() {
    if (this.message === 'dejar de seguir') {
      console.log(this.userService.getUser().id_perfil! + 'hello');
      this.userService.clearPosibleFriends(this.userService.getUser().id_perfil!, this.friendId!);
      this.message = 'seguir';
    } else if (this.message === 'seguir') {
      console.log(this.friendId! + 'hello');
      this.userService.addFriend({
        id_perfil: this.userService.getUser().id_perfil!,
        id_perfil_amigo: this.friendId!,
        estado_solicitud: 'Aceptado'
      });
      this.message = 'dejar de seguir';
    }
  }
}

interface Friend {
  id_amigo: number | null;
  id_perfil_amigo: number | null;
  nickname_perfil: string | null;
  Nick_Amigo: string | null;
}