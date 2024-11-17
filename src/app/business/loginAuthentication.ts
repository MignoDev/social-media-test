
import { perfilService } from "../Service/perfilService/perfilService.service";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class loginAuthentication {

     information: any = [];
     constructor(private perfilService: perfilService) {

     }

     public Authenticationlogin(email: string, password: string, callback: (message: string) => void): void {
          this.perfilService.getPerfilByEmail(email).subscribe((data: any) => {
               this.information = JSON.parse(data);
               console.error(this.information);
               console.error(data);
               if (this.information[0].email === email && this.information[0].password === password) {
                    callback(this.information[0].email);
               } else {
                    callback(this.information[0].email);
               }
          }, (error) => {
               callback('Wrong Email');
          });
     }
}
