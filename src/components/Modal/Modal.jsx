import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ largeURL, alt, onModalClose }) => {
  useEffect(() => {
    const handleEscapeClose = ({ key }) => {
      if (key !== 'Escape') return;
      onModalClose();
    };
    document.querySelector('html').classList.add('no-scroll');
    document.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.querySelector('html').classList.remove('no-scroll');
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [onModalClose]);

  const handleOverlayClose = evt => {
    if (evt.target !== evt.currentTarget) return;
    onModalClose();
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClose}>
      <div className={css.modal}>
        <img src={largeURL} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
