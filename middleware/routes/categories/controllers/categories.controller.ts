import express from 'express';
import CategoriesService from '../services/categories.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:categories-controller');

class CategoriesController {
  async list(req: express.Request, res: express.Response) {
    const categories = await CategoriesService.list(100, 0);
    res.status(200).json(categories);
  }

  async getCategoryById(req: express.Request, res: express.Response) {
    const category = await CategoriesService.readById(req.params.categoryId);
    res.status(200).json(category);
  }

  async getCategoryByName(req: express.Request, res: express.Response) {
    const category = await CategoriesService.readByName(req.params.name);
    res.status(200).json(category);
  }

  async create(req: express.Request, res: express.Response) {
    const category = await CategoriesService.create(req.body);
    res.status(201).json(category);
  }

  async putById(req: express.Request, res: express.Response) {
    const category = await CategoriesService.putById(req.params.categoryId, req.body);
    res.status(200).json(category);
  }

  async deleteById(req: express.Request, res: express.Response) {
    const category = await CategoriesService.deleteById(req.params.categoryId);
    res.status(200).json(category);
  }
}

export default new CategoriesController();