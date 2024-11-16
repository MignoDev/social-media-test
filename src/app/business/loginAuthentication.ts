import { perfilService } from "../Service/perfilService/perfilService.service";

export class loginAuthentication {
     constructor(private perfilService: perfilService) { }

     public Authenticationlogin(email: string, password: string, callback: (isAuthenticated: boolean) => void): void {
          this.perfilService.getPerfilByEmail(email).subscribe((data: any) => {
               if (data[0].email === email && data[0].password === password) {
                    callback(true);
               } else {
                    callback(false);
               }
          });
     }
}
