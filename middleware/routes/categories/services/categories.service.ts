import CategoriesDaos from "../daos/categories.daos";
import { CRUD } from "../../../common/crud.interface";
import { CreateCategoryDto } from "../dto/create.category.dto";
import { PutCategoryDto } from "../dto/put.category.dto";
import { PatchCategoryDto } from "../dto/patch.category.dto";

class CategoriesService implements CRUD {
  async list(limit: number, page: number) {
    return CategoriesDaos.getCategories(limit, page);
  }

  async create(resource: CreateCategoryDto) {
    return CategoriesDaos.createCategory(resource);
  }

  async putById(id: string, resource: PutCategoryDto) {
    return CategoriesDaos.updateCategory(id, resource);
  }

  async readById(id: string) {
    return CategoriesDaos.getCategoryById(id);
  }

  async deleteById(id: string) {
    return CategoriesDaos.deleteCategory(id);
  }

  async patchById(id: string, resource: PatchCategoryDto) {
    return CategoriesDaos.updateCategory(id, resource);
  }

  async readByName(name: string) {
    return CategoriesDaos.getCategoryByName(name);
  }
}

export default new CategoriesService();