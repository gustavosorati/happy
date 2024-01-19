import { IOrphanageRepository } from "../repositories/IOrphanageRepository";


export class ListOrphanagesUseCase {
  private orphanageRepository: IOrphanageRepository;

  constructor(orphanageRepository: IOrphanageRepository) {
    this.orphanageRepository = orphanageRepository;
  }

  async execute() {
    const orphanages = await this.orphanageRepository.list();

    return orphanages;
  }
}