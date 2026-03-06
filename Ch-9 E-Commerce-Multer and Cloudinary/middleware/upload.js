import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "e-commerce_products",
    format: "webp",
    allowed_formats: ["jpg", "jpeg", "png","webp","jfif"],
    transformation: [
      {
        width: 1000,
        height: 1000,
        crop: "limit",
      },

      {
         quality: "auto",
      },
       
      {
        fetch_format: "auto",
      },
    ],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;