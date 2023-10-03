import Link from "next/link";

export default async function Sidebar() {
  const categories = await getCategories();

  return (
    <>
      <Link href={"/search"}>All</Link>
      {categories.map((category, key) => {
        return (
          <Link key={key} href={`/search/${category.replaceAll(" ", "-")}`}>
            {category}
          </Link>
        );
      })}
      <br></br>
      <div className="flex flex-col">
        <h1>Sort</h1>
        <Link href={"/"}>Price: low to high</Link>
        <Link href={"/"}>Price: high to low</Link>
        <Link href={"/"}>Rating: lowest</Link>
        <Link href={"/"}>Rating: highest</Link>
      </div>
    </>
  );
}

async function getCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json();
  return data;
}
