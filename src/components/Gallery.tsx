import { ArtObject } from "../types";
import ArtCard from "./ArtCard";

interface GalleryProps {
  featuredArt: ArtObject[];
}

export default function Gallery({ featuredArt }: GalleryProps) {
  return (
    <section
      id="section-1"
      className="bg-neutral-100 text-neutral-900 py-24 px-6 md:px-20"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header Row */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-center mb-10">
          <h2 className="text-5xl leading-tight font-bold">
            EXPLORE THE MET’S
            <br />
            COLLECTION
          </h2>
          <p className="text-sm leading-5 text-justify">
            Need inspiration? Discover stories and fresh perspectives through
            timeless works of art.
          </p>
        </div>

        {/* ArtCard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
          {featuredArt.map((art) => (
            <ArtCard key={art.objectID} art={art} />
          ))}
        </div>
      </div>
    </section>
  );
}
