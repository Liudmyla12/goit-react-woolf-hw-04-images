import { useEffect, useState } from 'react';
import getImages from 'api/pixabay';

const useImages = (initialQuery, initialPage, perPage) => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) return;
    async function loadImages() {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await getImages({
          q: query,
          page,
          per_page: perPage,
        });

        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoadMore(page < Math.ceil(totalHits / perPage));
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, [query, page, perPage]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleQueryChange = newQuery => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
    setIsLoadMore(false);
    setError(false);
  };

  return {
    images,
    query,
    isLoading,
    isLoadMore,
    error,
    handleLoadMore,
    handleQueryChange,
  };
};

export default useImages;
