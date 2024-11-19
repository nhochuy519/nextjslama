// TEAMPORARY DATA
// const users = [
//   { id: 1, name: "john" },
//   { id: 2, name: "jane" },
// ];

import { Post, User } from "./models";
import { connecToDb } from "./utils";

import { unstable_noStore as noStore } from "next/cache";

// const posts = [
//   { id: 1, title: "Post 1", body: ".....", userId: 1 },
//   { id: 2, title: "Post 2", body: ".....", userId: 1 },
//   { id: 3, title: "Post 3", body: ".....", userId: 2 },
//   { id: 4, title: "Post 4", body: ".....", userId: 2 },
//   { id: 5, title: "Post 5", body: ".....", userId: 1 },
// ];

export const getPosts = async () => {
  try {
    connecToDb();
    const posts = await Post.find();

    return posts;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug) => {
  try {
    connecToDb();
    console.log("slug ben get post", slug);
    const post = await Post.findOne({ slug });

    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

// get one user
export const getUser = async (id) => {
  noStore();
  try {
    connecToDb();
    console.log("id la", id);
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

// get all users

export const getUsers = async (id) => {
  try {
    connecToDb();
    const users = await User.find(id);
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
