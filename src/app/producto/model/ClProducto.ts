// export class ClProducto {
//   id: number = 999;
//   nombre: string = '';
//   descripcion: string = '';
//   precio: number = 0;
//   cantidad: number = 0;
//   fecha: Date = new Date();

//   constructor(values: Partial<ClProducto> = {}) {
//     Object.assign(this, values);
//   }
// }

export class ClProducto {
  // si no Inicializo los valores, da Error
  // Por eso es el constructor por obligación
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  fecha: Date;

  // si no Inicializo los valores, da Error
    constructor(obj: any){
        this.id = obj && obj.id || null
        this.nombre = obj && obj.nombre || null
        this.descripcion = obj && obj.descripcion || null
        this.precio = obj && obj.precio || null
        this.cantidad = obj && obj.cantidad || null
        this.fecha = obj && obj.fecha || null
    }
}
