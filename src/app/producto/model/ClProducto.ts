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
  idProducto: number;
  codigo: string;
  nombreprod: string;
  precio: number;
  cantidad: number;
  fechaNacimiento: Date;
  rut: number;
  dv: string;
  enfermedad: string;
  fonocontacto: number;
  categoria: string;
  editorial: string;
  raza: string;
  edad: number;
  altura: number;
  hrini: string;
  hrfin: string;
  direccion: string;
  fCreacion: Date;

  constructor(obj: any = {}) {
    this.idProducto = obj.idProducto || 1;
    this.codigo = obj.codigo || '';
    this.nombreprod = obj.nombreprod || '';
    this.precio = obj.precio || 0;
    this.cantidad = obj.cantidad || 0;
    this.fechaNacimiento = obj.fechaNacimiento || new Date();
    this.rut = obj.rut || 0;
    this.dv = obj.dv || '';
    this.enfermedad = obj.enfermedad || '';
    this.fonocontacto = obj.fonocontacto || 0;
    this.categoria = obj.categoria || '';
    this.editorial = obj.editorial || '';
    this.raza = obj.raza || '';
    this.edad = obj.edad || 0;
    this.altura = obj.altura || 0;
    this.hrini = obj.hrini || '';
    this.hrfin = obj.hrfin || '';
    this.direccion = obj.direccion || '';
    this.fCreacion = obj.fCreacion || new Date();
  }
}

