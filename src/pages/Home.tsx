import { useEffect, useState } from "react";
import { fetchObjectById, searchObjects } from "../api/metApi";
import { ArtObject } from "../types";
import Gallery from "../components/Gallery";

const RESULTS_PER_PAGE = 6;

function Home() {
  const [objectIds, setObjectIds] = useState<number[]>([]);
  const [artObjects, setArtObjects] = useState<ArtObject[]>([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(objectIds.length / RESULTS_PER_PAGE);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const search = await searchObjects("painting");
        setObjectIds(search.objectIDs.slice(0, 100));
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadPageObjects() {
      if (!objectIds.length) return;
      setLoading(true);

      const start = (page - 1) * RESULTS_PER_PAGE;
      const end = start + RESULTS_PER_PAGE;
      const currentPageIds = objectIds.slice(start, end);

      const data = await Promise.all(
        currentPageIds.map((id) => fetchObjectById(id))
      );

      const filteredData = data.filter((obj) => obj.primaryImageSmall);

      setArtObjects(filteredData);
      setLoading(false);
    }

    loadPageObjects();
  }, [page, objectIds]);

  return (
    <>
      {loading && <p className="text-center mt-10">Loading...</p>}

      {!loading && artObjects.length > 0 && (
        <Gallery featuredArt={artObjects} />
      )}

      {!loading && artObjects.length === 0 && (
        <>
          <div className="text-center h-screen flex-row content-center items-center">
            <p className="text-center text-gray-600 mt-10">
              No artwork with images found on this page.
            </p>
            <button
              onClick={() => setPage(1)}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              ← Go Back
            </button>
          </div>
        </>
      )}

      {!loading && artObjects.length > 0 && (
        <section className="px-6 md:px-20 pb-24">
          <div className="flex justify-center mt-10 space-x-4">
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded cursor-pointer disabled:cursor-default disabled:opacity-50"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-gray-800 text-white cursor-pointer disabled:cursor-default rounded"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
