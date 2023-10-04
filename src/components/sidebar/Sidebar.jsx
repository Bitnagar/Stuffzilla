import Link from "next/link";
import Sort from "./Sort";

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
        <Sort />
      </div>
    </>
  );
}

async function getCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json();
  return data;
}
