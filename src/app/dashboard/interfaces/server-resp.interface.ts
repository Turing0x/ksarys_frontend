import { Clasification } from "./clasifications.interface";
import { Concept } from "./concepts.interface";
import { Dependent } from "./dependents";
import { DPA } from "./dpa";
import { Entity } from "./entity.interface";
import { Product } from "./product.interface";
import { User } from "./system-user.interface";
import { SysWorker } from "./worker";

export interface ServerRespUser {
  success:     boolean;
  api_message: string;
  data:        User[];
}

export interface ServerRespClasification {
  success:     boolean;
  api_message: string;
  data:        Clasification[];
}

export interface ServerRespConcept {
  success:     boolean;
  api_message: string;
  data:        Concept[];
}

export interface ServerRespProducts {
  success:     boolean;
  api_message: string;
  data:        Product[];
}

export interface ServerRespEntity {
  success:     boolean;
  api_message: string;
  data:        Entity[];
}

export interface ServerRespDPA {
  success:     boolean;
  api_message: string;
  data:        DPA[];
}

export interface ServerRespDepen {
  success:     boolean;
  api_message: string;
  data:        Dependent[];
}

export interface ServerRespWorker {
  success:     boolean;
  api_message: string;
  data:        SysWorker[];
}