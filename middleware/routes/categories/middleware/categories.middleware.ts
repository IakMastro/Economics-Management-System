import express from 'express';
import categoriesService from '../services/categories.service';

class CategoriesMiddleware {
  async validateRequiredNameField(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.name) {
      res.status(400).json({
        error: 'Required name field is missing',
      });
    } else {
      next();
    }
  }

  async validateRequiredNameAndDescriptionFieldsExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.name || !req.body.description) {
      res.status(400).json({
        error: 'Name and description are required',
      });
    } else {
      next();
    }
  }

  async validateCategoryNameExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const category = await categoriesService.readByName(req.body.name);
    if (category) {
      res.status(400).json({
        error: 'Category with this name already exists',
      });
    } else {
      next();
    }
  }

  async validateCategoryIdExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const category = await categoriesService.readById(req.params.categoryId);
    if (!category) {
      res.status(400).json({
        error: 'Category with this id does not exist',
      });
    } else {
      next();
    }
  }
}

export default new CategoriesMiddleware();