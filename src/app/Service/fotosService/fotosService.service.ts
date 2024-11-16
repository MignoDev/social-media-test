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

export class FotosService {

     private url = 'http://localhost:3000/foto';

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

     // Servicio CRUD de fotos

     // Listar fotos
     getFotos(): Observable<any> {
          return this.http.get(this.url, httpOptions);
     }

     // leer foto por id
     getFoto(id: any): Observable<any> {
          return this.http.get(this.url + "/" + id, httpOptions);
     }

     // Crear foto
     async createFoto(foto: any): Promise<any> {
          return new Promise((resolve, reject) => {
               this.http.post(this.url, foto, httpOptions).toPromise()
          });
     }

     // Actualizar foto
     async updateFoto(cadena: any): Promise<any> {
          return this.http.put(this.url + "/", cadena, httpOptions).toPromise();
     }
}
