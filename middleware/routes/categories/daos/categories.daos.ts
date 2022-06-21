import mongooseService from '../../../common/services/mongoose.service';
import shortid from 'shortid';
import debug from 'debug';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { PatchCategoryDto } from '../dto/patch.category.dto';
import { PutCategoryDto } from '../dto/put.category.dto';

const log: debug.IDebugger = debug('app:categories-dao');

class CategoriesDao {
  Schema = mongooseService.getMongoose().Schema;

  categorySchema = new this.Schema({
    _id: String,
    name: String,
    description: String,
    deleted: Boolean
  });

  Category = mongooseService.getMongoose().model('Category', this.categorySchema);

  constructor() {
    log('Created instance of CategoriesDao');
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto> {
    const category = new this.Category({
      _id: shortid.generate(),
      name: createCategoryDto.name,
      description: createCategoryDto.description,
      deleted: false
    });
    await category.save();
    return category;
  }

  async getCategoryById(id: string): Promise<any> {
    return await this.Category.findById(id);
  }

  async getCategoryByName(name: string): Promise<any> {
    return await this.Category.findOne({ name });
  }

  async deleteCategory(id: string): Promise<any> {
    return await this.Category.findByIdAndUpdate(id, { deleted: true });
  }

  async getCategories(limit: number = 25, page: number = 0): Promise<any> {
    return await this.Category.find().limit(limit).skip(page * limit);
  }

  async updateCategory(
    categoryId: string,
    patchCategoryDto: PatchCategoryDto | PutCategoryDto
  ) {
    return await this.Category.findByIdAndUpdate(
      { _id: categoryId },
      { $set: patchCategoryDto },
      { new: true }
    );
  }
}

export default new CategoriesDao();