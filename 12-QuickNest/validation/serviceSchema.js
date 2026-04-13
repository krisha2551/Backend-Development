import Joi from "joi";

const ServiceSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .messages({
      "string.base": "Service name must be a string",
      "string.empty": "Service name is required",
      "string.min": "Service name must be at least 3 characters",
      "string.max": "Service name must not exceed 50 characters",
    }),

  description: Joi.string()
    .trim()
    .messages({
      "string.base": "Description must be a string format",
      "string.max": "Description must not exceed 500 characters",
    }),


  price: Joi.number()
    .min(0)
    .messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),

  duration: Joi.number()
    .min(1)
    .messages({
      "number.base": "Duration must be a number",
      "number.min": "Duration must be at least 1 minute",
      "any.required": "Duration is required",
    }),


  category: Joi.string()
    .trim()
    .messages({
      "string.empty": "Category is required",
      "string.base": "Invalid category ID",
      "any.required": "Category is required",
    }),

  isActive: Joi.boolean().optional(),
});


//CREATE
export const createServiceSchema = ServiceSchema.fork(
  ["name", "price", "duration", "category"],
  (field) =>
    field.required().messages({
      "any.required": "{#label} is required",
    })
);


//UPDATE
export const updateServiceSchema = ServiceSchema.fork(
  ["name", "price", "duration", "description", "category", "isActive"],
  (field) => field.optional()
)
  .or("name", "price", "duration", "description", "category", "isActive")
  .messages({
    "object.missing":
      "At least one field (name, price, duration, description, category, isActive) is required",
  });


export default ServiceSchema;