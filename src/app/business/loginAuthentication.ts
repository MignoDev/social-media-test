import { perfilService } from "../Service/perfilService/perfilService.service";
import { Injectable, Type } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from "../Service/data.service";

@Injectable({
     providedIn: 'root'
})
export class loginAuthentication {

     information: any = [];

     constructor(private perfilService: perfilService, private data: DataService) { }

     public async Authenticationlogin(email: string, password: string): Promise<string> {
          try {
               await firstValueFrom(this.perfilService.getPerfilByEmail(email)).then((data) => { this.information = data });

               const data = JSON.parse(this.information);

               if (data.length > 0) {
                    if (data[0].password_perfil == password) {
                         console.log(data[0]);
                         this.data.setUser(data[0]);
                         return 'Login successful';
                    } else {
                         return 'Login failed: Incorrect password';
                    }
               } else {
                    return 'Login failed: User not found';
               }
          } catch (e) {
               console.log(e);
               return 'Login failed: Error occurred';
          }
     }
}