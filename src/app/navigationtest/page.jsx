"use client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function Navigationtest() {
  // CLIENT SIDE NAVIGATION
  const router = useRouter();
  const pathname = usePathname(); // in ra đường dẫn hiện tại không in ra chuỗi truy vấn
  const seachParams = useSearchParams(); // in ra chuỗi truy vấn
  console.log(pathname);
  console.log(seachParams.get("address"));
  const handleClick = () => {
    console.log("clicked");
    // router.push("/");
    // cách trên dể điều hướng không thông qua link
    // push có lưu vào lịch sử
    // router.replace("/");
    // replace không lưu vào lịch sử
    // router.refresh();
    // refesh làm mới lại trang

    // router.back(); // lùi lại 1 trang
  };
  return (
    <div>
      <Link href={"/"} prefetch={false}>
        trở về trang chủ
      </Link>
      <button onClick={handleClick}>Write and redirect</button>
    </div>
  );
}

export default Navigationtest;
