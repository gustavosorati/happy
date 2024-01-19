import Orphanage from "@/core/entitys/Orphanage";
import { IOrphanageRepository } from "./IOrphanageRepository";
import { ICreateOrphanageDTO } from "@/core/dtos/create-orphanage";
import { Repository } from "typeorm";
import AppDataSource from "@/database/connection";

export class OrphanageRepository implements IOrphanageRepository {
  private repository: Repository<Orphanage>;

  constructor() {
    this.repository = AppDataSource.getRepository(Orphanage);
  }

  async create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images
  }: ICreateOrphanageDTO): Promise<Orphanage> {
    const orphanage = this.repository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });

    const orphanageRecord = await this.repository.save(orphanage);

    return orphanageRecord;
  }

  async findByName(orphanageName: string): Promise<Orphanage | undefined> {
    const orphanage = await this.repository.findOneBy({
      name: orphanageName,
    });

    if(!orphanage) {
      return;
    }

    return orphanage;
  }

  async findById(orphanageId: number): Promise<Orphanage | undefined> {
    const orphanage = await this.repository.find({
      where: {
        id: orphanageId
      },
      relations: ['images'],
    });

    if(!orphanage) {
      return;
    }

    return orphanage[0];
  }

  async list(): Promise<Orphanage[]> {
    return this.repository.find({
      relations: ['images'],
    });
  }
}