import { CommonRoutesConfig } from "../../common/common.routes.config";
import CategoriesController from "./controllers/categories.controller";
import CategoriesMiddleware from "./middleware/categories.middleware";

import express from 'express';

export class CategoriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "CategoriesRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route('/categories')
      .get(CategoriesController.list)
      .post(
        CategoriesMiddleware.validateRequiredNameField,
        CategoriesMiddleware.validateCategoryNameExists,
        CategoriesController.create
      );

    this.app.param('categoryId', CategoriesMiddleware.validateCategoryIdExists);
    this.app
      .route('/categories/:categoryId')
      .get(CategoriesController.getCategoryById)
      .put(
        CategoriesMiddleware.validateRequiredNameAndDescriptionFieldsExists,
        CategoriesController.putById
      )
      .patch(
        CategoriesMiddleware.validateRequiredNameAndDescriptionFieldsExists,
        CategoriesController.putById
      )
      .delete(CategoriesController.deleteById);

    return this.app;
  }
}