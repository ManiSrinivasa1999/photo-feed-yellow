import React from 'react';

const Modal = ({ selectedImg }) => {
  return (
    <div className='backdrop'>
      <img src={selectedImg} alt='EnlargedImage' />
    </div>
  );
};

export default Modal;
