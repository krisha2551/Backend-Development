import Joi from "joi";

const CategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Category name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Category name must not exceed 50 characters",
    }),

  description: Joi.string()
    .trim()
    .messages({
      "string.base": "Description must be a string format",
      "string.max": "Description must not exceed 500 characters",
    }),
});


//CREATE
export const createCategorySchema = CategorySchema.fork(
  ["name"],
  (field) =>
    field.required().messages({
      "any.required": "Category name is required",
    })
);


//UPDATE
export const updateCategorySchema = CategorySchema.fork(
  ["name", "description"],
  (field) => field.optional()
)
  .or("name", "description")
  .messages({
    "object.missing":
      "At least one field (name, description) is required",
  });
  

export default CategorySchema;