import { ArtObject } from "../types";
import { Link } from "react-router";

interface ArtCardProps {
  art: ArtObject;
}

export default function ArtCard({ art }: ArtCardProps) {
  return (
    <Link to={`/object/${art.objectID}`} className="h-full">
      <div className="flex flex-col h-full bg-white shadow rounded p-4 hover:shadow-lg transition">
        {art.primaryImageSmall ? (
          <img
            src={art.primaryImageSmall}
            alt={art.title}
            className="w-full aspect-[4/5] object-cover mb-2 rounded"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}

        <div className="mt-auto">
          <h2 className="font-semibold">{art.title}</h2>
          <p className="text-sm text-gray-600">{art.artistDisplayName}</p>
          <p className="text-sm">{art.objectDate}</p>
        </div>
      </div>
    </Link>
  );
}
