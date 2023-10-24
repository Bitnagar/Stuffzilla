import Tile from "@/components/Products/Tile";

interface FakeStoreProducts {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string
  image: string,
  rating: { rate: number, count: number }
}

export default async function Page({ searchParams }: { searchParams: { price?: string, rating?: string } }) {
  const products = await getAllProducts();
  return (
    <div className="grid grid-cols-3">
      <Tile products={products} filter={searchParams} />
    </div>
  );
}

async function getAllProducts(): Promise<FakeStoreProducts> {
  const resp = await fetch(`https://fakestoreapi.com/products`);
  const data = await resp.json();
  return data;
}
