import { Clasification } from "../../app/dashboard/interfaces/clasifications.interface";
import { Concept } from "../../app/dashboard/interfaces/concepts.interface";
import { Dependent } from "../../app/dashboard/interfaces/dependents";
import { DPA } from "../../app/dashboard/interfaces/dpa";
import { Entity } from "../../app/dashboard/interfaces/entity.interface";
import { Product } from "../../app/dashboard/interfaces/product.interface";
import { Sale } from "../../app/dashboard/interfaces/sales.interface";
import { User } from "../../app/dashboard/interfaces/system-user.interface";
import { SysWorker } from "../../app/dashboard/interfaces/worker";

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

export interface ServerRespSale {
  success:     boolean;
  api_message: string;
  data:        Sale[];
}