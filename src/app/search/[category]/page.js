import Image from "next/image";
import AddToCartButton from "@/components/Cart/AddToCartButton";

export default async function Page({ params, searchParams }) {
  const category = params.category.replaceAll("-", " ");

  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );

  const products = await response.json();

  return (
    <div className="grid grid-cols-3">
      {products.map((product, k) => {
        return (
          <div
            key={k}
            className="flex flex-col gap-10 m-5 border border-solid rounded p-5 items-center justify-center"
          >
            <Image
              src={product.image}
              width={200}
              height={200}
              alt={product.title}
            />
            <h1>{product.description}</h1>
            <h1>${product.price}</h1>
            <AddToCartButton product={product}>Add to cart</AddToCartButton>
          </div>
        );
      })}
    </div>
  );
}
