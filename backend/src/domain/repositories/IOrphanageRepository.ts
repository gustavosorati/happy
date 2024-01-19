import { ICreateOrphanageDTO } from "@/core/dtos/create-orphanage";
import Orphanage from "@/core/entitys/Orphanage";

export interface IOrphanageRepository {
  create(data: ICreateOrphanageDTO): Promise<Orphanage>;
  findById(orphanageId: number): Promise<Orphanage | undefined>;
  findByName(orphanageName: string): Promise<Orphanage | undefined>;
  list(): Promise<Orphanage[]>;
}