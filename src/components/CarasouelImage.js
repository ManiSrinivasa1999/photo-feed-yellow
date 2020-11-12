import React from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const CarasouelImage = ( { selectedImg, setSelectedImg } ) => {
  return (
    <Carousel>
      {/* <img src={selectedImg} alt='EnlargedImage' /> */}
    </Carousel>
  );
};

export default CarasouelImage;