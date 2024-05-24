import { Clasification } from './clasifications.interface';
import { Concept } from './concepts.interface';
import { Measure } from './measure.interface';
import { Store } from './store.interface';
export interface Product {
  Id?: string;
  IdFacturaProveedor?: string;
  Codigo?: string;
  Nombre?: string;
  IdUm?: string;
  IdClasificacion?: string;
  IdConcepto?: string;
  IdEntidad?: string;
  IdAlmacen?: string;
  Activo?: string;
  Validado?: string;
  IdAreaEntidad?: string;
  Cantidad?: string;
  Importe?: string;
  FactorConversion?: string;
  Fecha?: string;
  IdUsuario?: string;

  Clasificacion?: string;
  Almacen?: string;
  Medida?: string;
  Precio?: number;
  Concepto?: string;
}

export interface ProductSelect {
  success:     boolean;
  api_message: string;
  data:        Select[];
}

export interface Select {
  Clasification: Clasification[],
  Concept: Concept[],
  Store: Store[],
  Measure: Measure[]
}
