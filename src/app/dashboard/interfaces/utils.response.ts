import { ComandaDetalles } from "./comanda-detalle.interface";
import { Oferta } from "./oferta.interface";

export interface OfertaResponse {
  success:     boolean;
  api_message: string;
  data:        Oferta[];
}

export interface CDetallesResponse {
  success:     boolean;
  api_message: string;
  data:        ComandaDetalles[];
}
