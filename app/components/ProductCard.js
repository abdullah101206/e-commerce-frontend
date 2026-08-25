import Link from "next/link";

export default function ProductCard({ id, title, price, category, image }) {
  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-none mb-4">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            href={`/shop/${id}`}
            className="w-full block text-center bg-white text-neutral-900 text-xs uppercase font-semibold tracking-wider py-3 shadow-md hover:bg-neutral-900 hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">{category}</p>
          <h3 className="text-sm font-medium text-neutral-900 group-hover:text-amber-800 transition-colors">
            <Link href={`/shop/${id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-semibold text-neutral-900">${price}</p>
      </div>
    </div>
  );
}