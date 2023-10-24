import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="w-full h-fit">
      <section className="min-h-screen w-full grid grid-cols-2 grid-rows-1">
        <Image
          src="https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"
          alt={"fake"}
          width={100}
          height={200}
          object-fit="cover"
          className=" self-center"
        />
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-6xl font-bold">Stuff that you want.</h1>
          <h1 className="text-xl mb-5">on your fingertips.</h1>
          <Button>
            <Link href={"/search"}>SHOP NOW</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
