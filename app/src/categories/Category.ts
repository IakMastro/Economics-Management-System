export class Category {
  id?: string;
  name: string = '';
  description: string = '';
  deleted: boolean = false;

  constructor(initializer?: any) {
    if (initializer) {
      this.id = initializer.id;
      this.name = initializer.name;
      this.description = initializer.description;
      this.deleted = initializer.deleted;
    }
  }
}