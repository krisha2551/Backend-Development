import Joi from "joi";

const UserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .messages({
      "string.base": "Name must be in string format",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
    }),

  email: Joi.string()
    .trim()
    .email()
    .messages({
      "string.email": "Enter a valid email",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/)
    .messages({
      "string.pattern.base":"Password must be at least 6 characters and include letters and numbers",
      "string.empty": "Password is required",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone must be exactly 10 digits",
      "string.empty": "Phone is required",
    }),

  profilePic: Joi.string().label("profilePic").messages({
    "string.base": "url must be in string format",
  }),

  role: Joi.string()
    .valid("customer", "provider", "admin", "super_admin")
    .optional()
    .label("Role")
    .messages({
      "string.empty": "role is required from any of these customer. provider,admin,super_admin",
    }),
});


export const createUserSchema = UserSchema.fork(
  ["name", "email", "password", "phone"],
    (field) => field.required()
        .messages({ "any.required": "{#label} is required" }) 
);

export const updateUserSchema = UserSchema.fork(
  ["name", "password", "phone", "profilePic"],
  (fields) => fields.optional(),
)
  .fork(["role", "email"], (fields) => fields.forbidden())
  .or("name", "password", "phone", "profilePic")
  .messages({
    "object.missing":
      "name, password or phone or profilePic any of these field required when updating",
  });



export default UserSchema;