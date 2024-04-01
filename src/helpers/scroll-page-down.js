const scrollPageDown = () => {
  const windowHeight = window.innerHeight;
  window.scrollBy({
    top: windowHeight - 150,
    behavior: 'smooth',
  });
};

export default scrollPageDown;
