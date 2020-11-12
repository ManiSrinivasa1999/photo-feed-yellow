import React from 'react';

const Modal = ({ selectedImg, setSelectedImg }) => {
  const handleClick = (e) => {
    setSelectedImg(null);
  }
  return (
    <div className='backdrop'>
      <img src={selectedImg} alt='EnlargedImage' />
    </div>
  );
};

export default Modal;
