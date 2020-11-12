import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const UnsplashImage = ({ url, key }) => {
  return (
    <>
      <motion.img
        className='image-fit'
        key={key}
        src={url}
        alt=''
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </>
  );
};
