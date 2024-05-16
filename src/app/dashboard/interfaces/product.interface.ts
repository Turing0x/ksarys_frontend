import { Clasification } from "./clasifications.interface";
import { Concept } from "./concepts.interface";
import { Measure } from "./measure.interface";

export interface Product {
  _id:                string;
  code:               string;
  name:               string;
  measure_unit:       Measure;
  clasification:      Clasification;
  initial_inventary:  number;
  concept:            Concept;
  conversion_fact:    number;
}
