import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchObjectById } from "../api/metApi";
import { ArtObject } from "../types";
import { useNavigate } from "react-router";

export default function ObjectPage() {
  const { id } = useParams();
  const [art, setArt] = useState<ArtObject | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadArt() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await fetchObjectById(Number(id));
        setArt(data);
      } catch (err) {
        console.error("Failed to fetch art object:", err);
      } finally {
        setLoading(false);
      }
    }

    loadArt();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!art) return <p className="text-center mt-10">Artwork not found.</p>;

  return (
    <div className="px-6 md:px-20 py-12 max-w-screen-xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-600 hover:text-black underline cursor-pointer"
      >
        ← Back to Gallery
      </button>
      {/* Top Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 mb-12">
        {/* Featured Image */}
        <div className="w-full">
          <img
            src={art.primaryImage || art.primaryImageSmall}
            alt={art.title}
            className="w-full h-auto object-contain rounded shadow"
          />
        </div>

        {/* Info Sidebar */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight">{art.title}</h1>
          {art.artistDisplayName && (
            <p className="text-lg text-gray-700 font-medium">
              {art.artistDisplayName}
            </p>
          )}
          {art.artistDisplayBio && (
            <p className="text-sm text-gray-500">{art.artistDisplayBio}</p>
          )}
          <p className="text-sm text-gray-700">{art.objectDate}</p>
          <p className="text-sm text-gray-700 italic">{art.medium}</p>
          <p className="text-sm text-gray-700">{art.department}</p>
          {art.culture && (
            <p className="text-sm text-gray-700">Culture: {art.culture}</p>
          )}
          {art.period && (
            <p className="text-sm text-gray-700">Period: {art.period}</p>
          )}
        </div>
      </div>

      {/* Bottom Section - More Info */}
      <div className="bg-neutral-100 rounded-lg p-6 shadow">
        {art.dimensions && (
          <p className="mb-2">
            <strong>Dimensions:</strong> {art.dimensions}
          </p>
        )}
        {art.creditLine && (
          <p className="mb-2">
            <strong>Credit Line:</strong> {art.creditLine}
          </p>
        )}
        {art.accessionNumber && (
          <p className="mb-2">
            <strong>Accession Number:</strong> {art.accessionNumber}
          </p>
        )}

        {art.objectURL && (
          <a
            href={art.objectURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            View on The Met Website
          </a>
        )}
      </div>
    </div>
  );
}
