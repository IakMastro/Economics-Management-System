import { Category } from "./Category";

export const MOCK_CATEGORIES = [
  new Category({
    id: "5e8f8f8f8f8f8f8f8f8f8f8f",
    name: "Category 1",
    description: "This is the first category",
    deleted: false
  }),
  new Category({
    id: "5e8f8f8f8f8f8f8f8f8f8f8g",
    name: "Category 2",
    description: "This is the second category",
    deleted: false
  }),
  new Category({
    id: "5e8f8f8f8f8f8f8f8f8f8f8h",
    name: "Category 3",
    description: "This is the third category",
    deleted: true
  }),
  new Category({
    id: "5e8f8f8f8f8f8f8f8f8f8f8i",
    name: "Category 4",
    description: "This is the fourth category",
    deleted: false
  })
]