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

export class ComentariosService {

     private url = 'http://localhost:3000/comentario';

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

     // Servicio CRUD de comentarios

     // Listar comentarios
     getComentarios(): Observable<any> {
          return this.http.get(this.url, httpOptions);
     }

     // leer comentario por id
     getComentario(id: any): Observable<any> {
          return this.http.get(this.url + "/" + id, httpOptions);
     }

     // Crear comentario
     async createComentario(comentario: any): Promise<any> {
          try {
               const response = await lastValueFrom(this.http.post(this.url, comentario, httpOptions));
               console.log(response);
               return response;
          } catch (error) {
               throw error;
          }
     }

     // Actualizar comentario
     async updateComentario(cadena: any): Promise<any> {
          return this.http.put(this.url + "/", cadena, httpOptions).toPromise();
     }
}