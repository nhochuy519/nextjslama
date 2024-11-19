import { connecToDb } from "@/lib/utils";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;
  try {
    await connecToDb();

    const post = await Post.findOne({ slug });

    return NextResponse.json({
      status: "success",
      message: "Data retrieved successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch post!",
      },
      { status: 500 } // Đặt mã trạng thái HTTP cho lỗi
    );
  }
};

export const DELETE = async (req, { params }) => {
  const { slug } = params;
  try {
    await connecToDb();

    const post = await Post.deleteOne({ slug });

    return NextResponse.json({
      status: "success",
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to delete post!",
      },
      { status: 500 } // Đặt mã trạng thái HTTP cho lỗi
    );
  }
};
