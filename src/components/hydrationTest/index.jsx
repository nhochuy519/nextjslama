"use client";

function HydrationTest() {
  const a = Math.random();
  console.log(a);
  return <div>{a}</div>;
}

export default HydrationTest;
