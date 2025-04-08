import { useEffect, useState } from "react";
import {
  fetchDepartments,
  fetchObjectById,
  searchObjects,
} from "../api/metApi";
import { ArtObject, Department } from "../types";
import Gallery from "../components/Gallery";
import DepartmentFilter from "../components/DepartmentFilter";
import SearchBar from "../components/SearchBar";

const RESULTS_PER_PAGE = 6;

function Home() {
  const [objectIds, setObjectIds] = useState<number[]>([]);
  const [artObjects, setArtObjects] = useState<ArtObject[]>([]);
  const [page, setPage] = useState(1);

  const [loadingIds, setLoadingIds] = useState(false);
  const [loadingObjects, setLoadingObjects] = useState(false);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDept, setSelectedDept] = useState<number | null>(null);

  const totalPages = Math.max(
    1,
    Math.ceil(objectIds.length / RESULTS_PER_PAGE)
  );

  useEffect(() => {
    fetchDepartments()
      .then((data) => setDepartments(data.departments))
      .catch((err) => console.error("Failed to fetch departments:", err));
  }, []);

  useEffect(() => {
    handleSearch("painting");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDept]);

  useEffect(() => {
    async function loadPageObjects() {
      if (!objectIds.length) return;
      setLoadingObjects(true);

      const start = (page - 1) * RESULTS_PER_PAGE;
      const end = start + RESULTS_PER_PAGE;
      const currentPageIds = objectIds.slice(start, end);

      const data = await Promise.all(
        currentPageIds.map(async (id) => {
          try {
            return await fetchObjectById(id);
          } catch {
            return null;
          }
        })
      );

      const filtered = data.filter(
        (obj) => obj?.primaryImageSmall
      ) as ArtObject[];

      setArtObjects(filtered);
      setLoadingObjects(false);
    }

    loadPageObjects();
  }, [page, objectIds]);

  const handleSearch = async (query: string = "painting") => {
    setLoadingIds(true);

    try {
      if (/^\d+$/.test(query)) {
        const obj = await fetchObjectById(Number(query));
        setObjectIds(obj?.primaryImageSmall ? [obj.objectID] : []);
      } else {
        const results = await searchObjects(query, selectedDept ?? undefined);
        setObjectIds(results.objectIDs?.slice(0, 100) || []);
      }

      setPage(1);
    } catch (err) {
      console.error("Search failed:", err);
      setObjectIds([]);
    } finally {
      setLoadingIds(false);
    }
  };

  const isLoading = loadingIds || loadingObjects;

  return (
    <>
      <section className="px-6 pt-12 max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          EXPLORE THE MET’S COLLECTION
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Need inspiration? Discover stories and fresh perspectives through
          timeless works of art.
        </p>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <SearchBar onSearch={handleSearch} />
          <DepartmentFilter
            departments={departments}
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
            resetPage={() => setPage(1)}
          />
        </div>

        {!isLoading && artObjects.length > 0 && (
          <Gallery featuredArt={artObjects} />
        )}

        {isLoading && (
          <div className="flex justify-center items-center mt-10">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </section>

      {!isLoading && artObjects.length === 0 && (
        <div className="pt-48 flex flex-col justify-center items-center text-center px-4">
          <p className="text-gray-600 mb-4">
            No artwork with images found on this page.
          </p>
          <button
            onClick={() => handleSearch("painting")}
            className="text-sm text-gray-600 hover:text-black underline cursor-pointer"
          >
            ← Go Back
          </button>
        </div>
      )}

      {!isLoading && artObjects.length > 0 && (
        <section className="px-6 md:px-20 pb-24">
          <div className="flex justify-center mt-10 space-x-4">
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded cursor-pointer disabled:opacity-50 disabled:cursor-default"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded cursor-pointer disabled:opacity-50 disabled:cursor-default"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages || artObjects.length === 0}
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
