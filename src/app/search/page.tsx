import Tile from "@/components/Products/Tile";

export default async function Page({ searchParams }: { searchParams: { price?: string, rating?: string } }) {
  const products = await getAllProducts();
  return (
    <div className="grid grid-cols-3">
      <Tile products={products} filter={searchParams} />
    </div>
  );
}

async function getAllProducts() {
  const resp = await fetch(`https://fakestoreapi.com/products`);
  const data = await resp.json();
  return data;
}
