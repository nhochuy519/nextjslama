import Image from "next/image";
import styles from "./singlePost.module.css";

import PostUser from "@/components/postUser/postuser";

import { Suspense } from "react";
import { getPost } from "@/lib/data";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
    cache: "no-store",
  });
  // theo mặc định được lưu trong bộ nhớ đêm  nên khi quay lại trang trông sẽ nhanh hơn, còn không muốn lưu thì thiết lập cache:"no-store"
  //next: { revalidate: 3600 } làm mới dữ liệu khi một giờ trôi qua
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const deleteData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
    method: "DELETE",
  });
  // theo mặc định được lưu trong bộ nhớ đêm  nên khi quay lại trang trông sẽ nhanh hơn, còn không muốn lưu thì thiết lập cache:"no-store"
  //next: { revalidate: 3600 } làm mới dữ liệu khi một giờ trôi qua
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};

async function SinglePostPage({ params }) {
  // in ra truy vấn ở phía server
  // console.log(params);
  const { slug } = params;
  console.log("slug la", slug);
  // FETCH DATA WITH AN API
  const data = await getData(slug);
  const post = data.data;
  //// FETCH DATA WITHOUT AN API
  console.log(post.userId);

  // const post = await getPost(slug);

  console.log("single post", post);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {post.img && (
          <Image src={post.img} alt="" fill className={styles.img} />
        )}
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<div>Loadding...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>

          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
}

export default SinglePostPage;
