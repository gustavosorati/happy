import { ListOrphanagesUseCase } from "@/domain/use-cases/list-orphanages-use-case";
import { Request, Response } from "express";
import { orphanageView } from "../views/orphanage_view";


export class ListOrphanagesController {
  private listOrphanagesUseCase: ListOrphanagesUseCase;

  constructor(listOrphanagesUseCase: ListOrphanagesUseCase) {
    this.listOrphanagesUseCase = listOrphanagesUseCase;
  }

  async handle(request: Request, response: Response) {
    const orphanages = await this.listOrphanagesUseCase.execute();

    return response.status(200).json(orphanageView.renderMany(orphanages));
  }
}