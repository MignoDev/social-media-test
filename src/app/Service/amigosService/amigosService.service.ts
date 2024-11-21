import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Observer, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
     headers: new HttpHeaders({
          'Content-Type': 'application/json'
     })
};

@Injectable({
     providedIn: 'root'
})

export class AmigosService {

     private url = 'http://localhost:3000/amigo';

     constructor(private http: HttpClient) { }

     private extractData(res: Response) {
          let body = JSON.parse(JSON.stringify(res));
          return body || {};
     }

     private handleError<T>(operation = 'operation', result?: T) {

          return (error: any): Observable<T> => {
               console.log`${operation} failed: ${error.message}`;
               return of(result as T);
          };
     }

     // Servicio CRUD de amigos

     // Listar amigos
     getAmigos(userId: any): Observable<any> {
          return this.http.get(this.url, httpOptions);
     }

     // leer amigo por id
     getAmigo(id: any): Observable<any> {
          return this.http.get(this.url + "/" + id, httpOptions);
     }

     getAmigoUsuario(id: any): Observable<any> {
          return this.http.get(this.url + "/amigos/" + id, httpOptions);
     }


     // Crear amigo
     async createAmigo(amigo: any): Promise<any> {
          try {
               const response = await this.http.post(this.url, amigo, httpOptions).toPromise();
               console.error(response);
               return response;
          } catch (error) {
               console.error('Error creating amigo', error);
               throw error;
          }
     }

     // Actualizar amigo
     async updateAmigo(cadena: any): Promise<any> {
          return this.http.put(this.url + "/", cadena, httpOptions).toPromise();
     }

     deleteAmigo(id_perfil: any, id_perfil_amigo: any): Observable<any> {
          return this.http.delete(this.url + "/" + id_perfil + "/" + id_perfil_amigo, httpOptions);
     }

}