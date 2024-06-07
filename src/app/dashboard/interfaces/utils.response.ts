import { Oferta } from "./oferta.interface";

export interface OfertaResponse {
  success:     boolean;
  api_message: string;
  data:        Oferta[];
}
