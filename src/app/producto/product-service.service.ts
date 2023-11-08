import { Injectable } from '@angular/core';
import { ClProducto } from './model/ClProducto';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = "https://sumativa2.onrender.com/api/productos/";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error);
      return of(result as T);
    };
  }

  addProduct(producto: ClProducto): Observable<ClProducto> {
    console.log("Res-api Enviando AddProducto : ", producto);
    return this.http.post<ClProducto>(apiUrl, producto, httpOptions)
      .pipe(
        tap((producto: ClProducto) => console.log('added product with idProducto:', producto.idProducto)),
        catchError(this.handleError<ClProducto>('addProduct'))
      );
  }

  getProducts(): Observable<ClProducto[]> {
    console.log("getProducts ()");
    return this.http.get<ClProducto[]>(apiUrl)
      .pipe(
        tap(products => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(idProducto: number): Observable<ClProducto> {
    const url = `${apiUrl}/${idProducto}`;
    
    return this.http.get<ClProducto>(url).pipe(
      tap(_ => console.log(`fetched product idProducto=${idProducto}`)),
      catchError(this.handleError<ClProducto>(`getProduct idProducto=${idProducto}`))
    );
  }

  deleteProduct(idProducto: number): Observable<ClProducto> {
    const url = `${apiUrl}/${idProducto}`;
    return this.http.delete<ClProducto>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product idProducto=${idProducto}`)),
      catchError(this.handleError<ClProducto>('deleteProduct'))
    );
  }

  updateProduct(idProducto: number, producto: ClProducto): Observable<ClProducto> {
    return this.http.put<ClProducto>(`${apiUrl}/${idProducto}`, producto, httpOptions)
      .pipe(
        tap(_ => console.log(`updated product idProducto=${idProducto}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
  }
}
