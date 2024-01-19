import { IOrphanageRepository } from "../repositories/IOrphanageRepository";


export class GetOrphanageUseCase {
  private orphanageRepository: IOrphanageRepository;

  constructor(orphanageRepository: IOrphanageRepository) {
    this.orphanageRepository = orphanageRepository;
  }

  async execute(orphanageId: number) {
    const orphanages = await this.orphanageRepository.findById(orphanageId);

    return orphanages;
  }
}