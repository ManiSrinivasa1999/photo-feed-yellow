import React, { useState, useEffect } from 'react';
import { Image } from './components/Image';
import { Loading } from './components/Loading';
import Modal from './components/Modal';
import axios from 'axios';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

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

const WrapImage = styled.section`
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
      .get(
        `${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`
      )
      .then((res) => {
        setImage([...images, ...res.data]);
      });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Photo Feed</h1>
      </header>
      <GlobalStyle />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loading />}
      >
        <WrapImage>
          {images.map((image) => (
            <motion.div
              onClick={() => setSelectedImg(image.urls.thumb)}
              whileHover={{ opacity: 1 }}
              className='img-wrap'
              layout
            >
              <Image url={image.urls.thumb} key={image.id} />
            </motion.div>
          ))}
        </WrapImage>
      </InfiniteScroll>
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
