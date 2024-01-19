import { Request, Response } from "express";
import { CreateOrphanageUseCase } from "@/domain/use-cases/create-orphanage-use-case";

export class CreateOrphanageController {
  private createOrphanageUseCase: CreateOrphanageUseCase;

  constructor(createOrphanageUseCase: CreateOrphanageUseCase) {
    this.createOrphanageUseCase = createOrphanageUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename}
    })

    const orphanage = await this.createOrphanageUseCase.execute({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });

    return response.status(201).json(orphanage);
  }
}