import Link from "next/link";
export default function Sort() {
  return (
    <>
      <Link href={"?price=low"}>Price: low to high</Link>
      <Link href={"?price=high"}>Price: high to low</Link>
      <Link href={"?rating=low"}>Rating: lowest</Link>
      <Link href={"?rating=high"}>Rating: highest</Link>
    </>
  );
}
