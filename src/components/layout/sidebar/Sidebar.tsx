import Link from "next/link";
import Sort from "./Sort";

type Categories = string[];

export default async function Sidebar() {
  const categories = await getCategories();

  return (
    <>
      <Link href={"/search"}>All</Link>
      {categories.map((category: string, index: number) => {
        return (
          <Link key={index} href={`/search/${category.replaceAll(" ", "-")}`}>
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

async function getCategories(): Promise<Categories> {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json();
  return data;
}
