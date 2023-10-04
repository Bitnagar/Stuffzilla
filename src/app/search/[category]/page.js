import Tile from "@/components/Products/Tile";

export default async function Page({ params, searchParams }) {
  const category = params.category.replaceAll("-", " ");
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const products = await response.json();

  return (
    <div className="grid grid-cols-3">
      <Tile products={products} filter={searchParams} />
    </div>
  );
}
