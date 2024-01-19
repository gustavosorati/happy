import { Router } from "express";
import multer from "multer";
import uploadConfig from "@/core/middlewares/upload";

import { OrphanageRepository } from "@/domain/repositories/OrphanageRepository";
import { CreateOrphanageUseCase } from "@/domain/use-cases/create-orphanage-use-case";
import { CreateOrphanageController } from "../controllers/create-orphanage-controller";
import { ListOrphanagesController } from "../controllers/list-orphanages-controller";
import { ListOrphanagesUseCase } from "@/domain/use-cases/list-orphanages-use-case";
import { GetOrphanageUseCase } from "@/domain/use-cases/get-orphanage-use-case";
import { GetOrphanageController } from "../controllers/get-orphanage-controller";

const orphanageRepository = new OrphanageRepository();

const createOrphanageUseCase = new CreateOrphanageUseCase(orphanageRepository);
const createOrphanageController = new CreateOrphanageController(createOrphanageUseCase);

const listOrphanagesUseCase = new ListOrphanagesUseCase(orphanageRepository);
const listOrphanagesController = new ListOrphanagesController(listOrphanagesUseCase);

const getOrphanageUseCase = new GetOrphanageUseCase(orphanageRepository);
const getOrphanageController = new GetOrphanageController(getOrphanageUseCase);

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", (request, response) => {
  return listOrphanagesController.handle(request, response);
});

routes.get("/orphanages/:id", (request, response) => {
  return getOrphanageController.handle(request, response);
});

routes.post("/orphanages", upload.array("images"), (request, response) => {
  return createOrphanageController.handle(request, response);
});


export default routes;
