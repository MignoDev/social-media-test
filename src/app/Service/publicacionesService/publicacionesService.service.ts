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
     getPublicaciones(): Observable<any> {
          return this.http.get(this.url, httpOptions);
     }

     // leer publicacion por id
     getPublicacion(id: any): Observable<any> {
          return this.http.get(this.url + "/" + id, httpOptions);
     }

     // Crear publicacion
     async createPublicacion(publicacion: any): Promise<any> {
          return new Promise((resolve, reject) => {
               this.http.post(this.url, publicacion, httpOptions).toPromise()
          });
     }

     // Actualizar publicacion
     async updatePublicacion(cadena: any): Promise<any> {
          return this.http.put(this.url + "/", cadena, httpOptions).toPromise();
     }

}