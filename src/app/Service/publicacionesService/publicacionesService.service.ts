import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Observer, of, lastValueFrom } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
     headers: new HttpHeaders({
          'Content-Type': 'application/json'
     })
};

@Injectable({
     providedIn: 'root'
})

export class PublicacionesService {

     private url = 'http://localhost:3000/publicacion';

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

     // Servicio CRUD de publicaciones

     // Listar publicaciones

     // leer publicacion por id
     getPublicacion(id: any): Observable<any> {
          return this.http.get(this.url + "/" + id, httpOptions);
     }

     // Crear publicacion
     async createPublicacion(publicacion: any): Promise<any> {
          try {
               console.log(publicacion);
               const response = await lastValueFrom(this.http.post(this.url, publicacion, httpOptions));
               console.log(response);
               return response;
          } catch (error) {
               throw error;
          }
     }

     // Actualizar publicacion
     async updatePublicacion(cadena: any): Promise<any> {
          return this.http.put(this.url + "/", cadena, httpOptions)
     }

     getPostsByUserId(userId: number): Observable<any> {
          return this.http.get(this.url + "/amigos/" + userId, httpOptions);
     }

     getPublicaciones(id_perfil: number): Observable<any> {
          return this.http.get(`${this.url}/perfil/${id_perfil}`);
     }

}

interface Publicacion {
     nickname_perfil: string;
     texto_publicacion: string;
     foto_publicacion: string | null;
}