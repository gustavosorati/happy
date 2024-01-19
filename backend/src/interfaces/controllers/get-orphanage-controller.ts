import { GetOrphanageUseCase } from "@/domain/use-cases/get-orphanage-use-case";
import { Request, Response } from "express";
import { orphanageView } from "../views/orphanage_view";


export class GetOrphanageController {
  private getOrphanageUseCase: GetOrphanageUseCase;

  constructor(getOrphanageUseCase: GetOrphanageUseCase) {
    this.getOrphanageUseCase = getOrphanageUseCase;
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const orphanage = await this.getOrphanageUseCase.execute(Number(id));

    if(!orphanage) {
      return response.status(200).json();
    }

    return response.status(200).json(orphanageView.render(orphanage));
  }
}