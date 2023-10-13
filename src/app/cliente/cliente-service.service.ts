import { Injectable } from '@angular/core';
import { ClCliente } from './model/ClCliente';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/usuarios";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // Injectamos HttpClient, para poder consular una página
  constructor(private http: HttpClient) { }

  // Controla y enviará un mensaje a consola para todos los errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }




  // Método Agregar cliente, y devuelve un observable del tipo Clinte
  // Debe ser un Observable si deses suscribir este método en otro lado
  addCliente(cliente: ClCliente): Observable<ClCliente> {
    console.log("Res-api Enviando AddCliente : ", cliente);
    // Ojo No lo ejecuta lo declara
    // El Pipe lo intercepta
    return this.http.post<ClCliente>(apiUrl, cliente, httpOptions)
      .pipe(  // Tubería
        // tap intersecta la respuesta si no hay error
        tap((cliente: ClCliente) => console.log('added cliente w/:', cliente)),
        // En caso de que ocurra Error
        catchError(this.handleError<ClCliente>('addCliente'))
      );
  }



  // Obtenemos todos los Clientes
  getClientes(): Observable<ClCliente[]> {
    console.log("getClientes ()");
    return this.http.get<ClCliente[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched clientes')),
        catchError(this.handleError('getClientes', []))
      );
  }




  //  Obtener un Cliente
  getCliente(id: String): Observable<ClCliente> {
    //const url = '${apiUrl}/${id}';
    //return this.http.get<Cliente>(url).pipe(
    console.log("getCliente ID:" + id);
    return this.http.get<ClCliente>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched cliente id=${id}')),
        catchError(this.handleError<ClCliente>('getCliente id=${id}'))
      );
  }



  //Borrar un Cliente
  deleteCliente(id: number): Observable<ClCliente> {
    //const url = '${apiUrl}/${id}';
    //return this.http.delete<Cliente>(url, httpOptions).pipe(
    console.log("Borrando cliente con ID: " + id);
    return this.http.delete<ClCliente>(apiUrl + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log('deleted cliente id=${id}')),
        catchError(this.handleError<ClCliente>('deleteCliente'))
      );
  }




  //Actualizar Cliente
  updateCliente(id: number, cliente: ClCliente): Observable<ClCliente> {
    return this.http.put<ClCliente>(apiUrl + "/" + id, cliente, httpOptions)
      .pipe(
        tap(_ => console.log('updated cliente id=${id}')),
        catchError(this.handleError<any>('updateCliente'))
      );
  }


}
