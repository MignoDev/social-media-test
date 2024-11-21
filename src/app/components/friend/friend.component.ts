import { Component, Input } from '@angular/core';
import { DataService } from '../../Service/data.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent {
  @Input() friend: Friend | null = null;
  public friendNickname: string | null = this.friend?.nickname_perfil ?? null;
  public friendId: number | null = this.friend?.id_amigo ?? null;

  constructor(private userService: DataService) {
  }

  ngOnInit() {
    if (this.userService.getUser().nickname_perfil == this.friend?.nickname_perfil) {
      this.friendNickname = this.friend?.Nick_Amigo ?? null;
      this.friendId = this.friend?.id_perfil_amigo ?? null;
    } else {
      this.friendNickname = this.friend?.nickname_perfil ?? null;
      this.friendId = this.friend?.id_amigo ?? null;
    }
  }
}
interface Friend {
  id_amigo: number | null;
  id_perfil_amigo: number | null;
  nickname_perfil: string | null;
  Nick_Amigo: string | null;
}