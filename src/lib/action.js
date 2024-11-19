"use server";
import { signIn, auth, signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";

import { connecToDb } from "./utils";

import bcrypt from "bcryptjs";

export const addPost = async (formData) => {
  // "use server";
  // sử dụng use server để đảm bảo hàm chỉ chạy trên server

  const { title, desc, slug, userId } = Object.fromEntries(formData);
  console.log(title, desc, slug, userId);

  try {
    connecToDb();

    const newPost = await Post.create({
      title,
      desc,
      slug,
      userId,
    });

    console.log("create succesfully");
    revalidatePath("/blog");
    // revalidatePath làm mới bộ nhớ đệm sau khi thêm post
    // xoá bộ nhớ đêm cache của trang /blog sau đó tạo lại dữ liệu của trang
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const deletePost = async (formData) => {
  // "use server";
  // sử dụng use server để đảm bảo hàm chỉ chạy trên server

  const { idPost } = Object.fromEntries(formData);

  try {
    connecToDb();

    await Post.findByIdAndDelete(idPost);
    console.log("delete succesfully");
    revalidatePath("/blog");
    // revalidatePath làm mới bộ nhớ đệm sau khi thêm post
    // xoá bộ nhớ đêm cache của trang /blog sau đó tạo lại dữ liệu của trang
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleGithubLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (formData) => {
  const { username, email, password, passwordRepeat, img } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return "Password do not match";
  }
  try {
    connecToDb();

    const user = await User.findOne({ username });
    if (user) {
      return "Username already exists";
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      img,
    });
    await newUser.save();
    console.log("save to db");
  } catch (error) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};

export const login = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
