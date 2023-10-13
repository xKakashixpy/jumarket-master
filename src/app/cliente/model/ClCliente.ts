
export class ClCliente {
  // si no Inicializo los valores, da Error
  // Por eso es el constructor por obligación
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  clave: string;

  // si no Inicializo los valores, da Error
    constructor(obj: any){
        this.id = obj && obj.id || null
        this.first_name = obj && obj.first_name || null
        this.last_name = obj && obj.last_name || null
        this.email = obj && obj.email || null
        this.clave = obj && obj.clave || null
    }
}
