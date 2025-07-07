import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
];

export default function VirtualTryOnHistory() {
  return (
    <div className="mt-8 px-4 sm:px-0">
      <h3 className="text-2xl font-semibold text-gray-900">
        Virtual Try-on History
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-gray-500 mb-6">
        Here are the products you have tried on virtually.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <a key={product.id} href={product.href} className="group block">
            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
              <Image
                alt={product.imageAlt}
                src={product.imageSrc}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-900">
              {product.name}
            </h4>
            <p className="text-sm text-gray-500">{product.price}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
