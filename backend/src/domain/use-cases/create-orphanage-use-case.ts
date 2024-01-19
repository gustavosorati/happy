import Orphanage from "@/core/entitys/Orphanage";
import { IOrphanageRepository } from "../repositories/IOrphanageRepository";

interface CreateOrphanageUseCaseRequest {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    path: string
  }[];
}

interface CreateOrphanageUseCaseResponse {
  orphanage: Orphanage
}

export class CreateOrphanageUseCase {
  private orphanageRepository: IOrphanageRepository;

  constructor(orphanageRepository: IOrphanageRepository) {
    this.orphanageRepository = orphanageRepository;
  }

  async execute({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images
  }: CreateOrphanageUseCaseRequest): Promise<CreateOrphanageUseCaseResponse> {
    const orphanageAlreadyExists = await this.orphanageRepository.findByName(name);

    if(orphanageAlreadyExists) {
      throw new Error('Orphanage already exists');
    }

    const orphanageRecord = await this.orphanageRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });

    return { orphanage: orphanageRecord };
  }
}