import { ArtObject } from "../types";
import ArtCard from "./ArtCard";

interface GalleryProps {
  featuredArt: ArtObject[];
}

export default function Gallery({ featuredArt }: GalleryProps) {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {featuredArt.map((art) => (
          <ArtCard key={art.objectID} art={art} />
        ))}
      </div>
    </section>
  );
}
