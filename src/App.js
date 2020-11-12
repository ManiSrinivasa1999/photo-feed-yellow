import React, { useState, useEffect } from 'react';
import { Heading } from './components/Heading';
import { UnsplashImage } from './components/UnsplashImage';
import { Loader } from './components/Loader';
import Modal from './components/Modal';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import CarasouelImage from './components/CarasouelImage';

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function App() {
  const [images, setImage] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = (count = 10) => {
    const apiRoot = 'https://api.unsplash.com';
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        setImage([...images, ...res.data]);
      });
  };

  return (
    <div className='App'>
      <Heading />
      <GlobalStyle />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        <WrapperImages>
          {images.map((image) => (
            <motion.div
              onClick={() => setSelectedImg(image.urls.thumb)}
              whileHover={{opacity: 1}}
              className='img-wrap'
              layout
            >
              <UnsplashImage url={image.urls.thumb} key={image.id} />
            </motion.div>
          ))}
        </WrapperImages>
      </InfiniteScroll>
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
      {selectedImg && <CarasouelImage selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
    </div>
  );
}

export default App;
