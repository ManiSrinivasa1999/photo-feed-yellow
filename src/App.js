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
import { Row, Col, Button } from 'reactstrap';

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
  max-width: 80rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1.5em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function App() {
  const [images, setImage] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  // let newIndex = 0;
  // const setSelectedIndex = (index) => (e) => {
  //   newIndex += index;
  // };

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
          {images.map((image, index) => (
            <motion.div
              onClick={() => {
                setSelectedImg(image.urls.thumb);
                setSelectedIndex(index);
              }}
              whileHover={{ opacity: 1 }}
              className='img-wrap'
              layout
            >
              <Image url={image.urls.thumb} key={index} className='photo' />
            </motion.div>
          ))}
        </WrapImage>
      </InfiniteScroll>
      {selectedImg && (
        <div onClick={handleClick}>
          <Row>
            <Col>
              <Button
                className='button-image-left'
                onClick={() => {
                  setSelectedImg(images[selectedIndex - 1].urls.thumb);
                  setSelectedIndex(selectedIndex - 1);
                }}
              >{`<`}</Button>
            </Col>
            <Col>
              <Modal selectedImg={selectedImg} />
            </Col>
            <Col>
              <Button
                className='button-image-right'
                onClick={() => {
                  setSelectedImg(images[selectedIndex + 1].urls.thumb);
                  setSelectedIndex(selectedIndex + 1);
                }}
              >{`>`}</Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default App;
