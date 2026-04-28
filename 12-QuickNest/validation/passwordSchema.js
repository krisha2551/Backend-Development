import Joi from "joi";

export const forgetPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Valid email required",
      "any.required": "Email is required"
    }),
});


export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min":"Password must be at least 6 characters",
      "any.required":"New password is required"
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only":"Passwords do not match",
      "any.required":"Confirm password is required"
    })

});