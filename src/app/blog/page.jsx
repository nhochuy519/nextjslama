import { getPosts } from "@/lib/data";
import styles from "./blog.module.css";

import PostCard from "@/components/postCard/postCard";

// FETCH DATA WITH AN API

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
    // next: { revalidate: 3600 },
  });
  // theo mặc định được lưu trong bộ nhớ đêm  nên khi quay lại trang trông sẽ nhanh hơn, còn không muốn lưu thì thiết lập cache:"no-store"
  //next: { revalidate: 3600 } làm mới dữ liệu khi một giờ trôi qua
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};
export const metadata = {
  title: "Blog Page ",
  description: "Blog  description",
};
async function BlogPage({ params, searchParams }) {
  // console.log(params); // do không có tham số nên in ra obj rỗng
  // console.log(searchParams); // in ra chuỗi truy vấn

  // FETCH DATA WITH AN API
  const posts = await getData();

  // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.data.map((item, index) => (
        <div className={styles.post} key={item.id}>
          <PostCard post={item} />
        </div>
      ))}
    </div>
  );
}

export default BlogPage;
