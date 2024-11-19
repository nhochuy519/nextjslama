import { connecToDb } from "@/lib/utils";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Kết nối đến cơ sở dữ liệu
    await connecToDb();

    // Lấy dữ liệu bài viết
    const posts = await Post.find();

    // Trả về phản hồi JSON
    return NextResponse.json({
      status: "success",
      message: "Data retrieved successfully",
      data: posts,
    });
  } catch (error) {
    console.log(error);
    // Trả về lỗi nếu có vấn đề xảy ra
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch posts!",
      },
      { status: 500 } // Đặt mã trạng thái HTTP cho lỗi
    );
  }
};
