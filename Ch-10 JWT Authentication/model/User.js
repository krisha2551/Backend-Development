import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => {
      if (!value.endsWith("@gmail.com")) {
        throw new Error("Email must be gmail");
      }
    }
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate: (value) => {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can't contain 'password'");
      }
    }
  }

});


// Hash Password
userSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});


// Login Logic
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("unable to login");
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("unable to login");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;