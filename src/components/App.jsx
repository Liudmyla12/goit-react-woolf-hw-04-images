import { useEffect, useState } from 'react';
import useImages from 'hooks/useImages';
import scrollPageDown from 'helpers/scroll-page-down';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Message from './Message/Message';
import css from './App.module.css';

const App = () => {
  const PER_PAGE = 12;

  const {
    images,
    query,
    isLoading,
    isLoadMore,
    error,
    handleLoadMore,
    handleQueryChange,
  } = useImages('', 1, PER_PAGE);

  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (images.length > PER_PAGE) {
      scrollPageDown();
    }
  }, [images]);

  const handleModalOpen = modalData => {
    setModalData(modalData);
  };

  const handleModalClose = () => {
    setModalData(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onFormSubmit={handleQueryChange} />

      {images.length !== 0 ? (
        <ImageGallery onModalOpen={handleModalOpen} images={images} />
      ) : isLoading ? (
        <Loader />
      ) : query ? (
        <Message>Nothing found...</Message>
      ) : (
        <Message>Enter search query to find pictures</Message>
      )}

      {isLoadMore && (
        <Button onLoadMore={handleLoadMore} isLoading={isLoading} />
      )}

      {modalData && <Modal onModalClose={handleModalClose} {...modalData} />}

      {error && <Message warning>Something went wrong...</Message>}
    </div>
  );
};

export default App;
