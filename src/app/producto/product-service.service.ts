import { Injectable } from '@angular/core';
import { ClProducto } from './model/ClProducto';

// Importamos  las librerías necesarias
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envío
const apiUrl = "http://localhost:3000/productos";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  // Injectamos HttpClient, para poder consular una página
  constructor(private http: HttpClient) { }

  // Controla y enviará un mensaje a consola para todos los errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }

  // Método Agregar producto, y devuelve un observable del tipo Producto
  // Debe ser un Observable si deseas suscribir este método en otro lado
  addProduct(producto: ClProducto): Observable<ClProducto> {
    console.log("Res-api Enviando AddProducto : ", producto);
    // Ojo No lo ejecuta lo declara
    // El Pipe lo intercepta
    return this.http.post<ClProducto>(apiUrl, producto, httpOptions)
      .pipe(  // Tubería
        // tap intercepta la respuesta si no hay error
        tap((producto: ClProducto) => console.log('added product w/:', producto)),
        // En caso de que ocurra un error
        catchError(this.handleError<ClProducto>('addProduct'))
      );
  }

  // Obtenemos todos los Productos
  getProducts(): Observable<ClProducto[]> {
    console.log("getProducts ()");
    return this.http.get<ClProducto[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  // Obtener un Producto
  getProduct(id: string): Observable<ClProducto> {
    const url = `${apiUrl}/${id}`;
    
    return this.http.get<ClProducto>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<ClProducto>(`getProduct id=${id}`))
    );
  }

  deleteProduct(id: number): Observable<ClProducto> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<ClProducto>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<ClProducto>('deleteProduct'))
    );
  }

  updateProduct(id: number, producto: ClProducto): Observable<ClProducto> {
    return this.http.put<ClProducto>(`${apiUrl}/${id}`, producto, httpOptions)
      .pipe(
        tap(_ => console.log(`updated product id=${id}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
  }
}
