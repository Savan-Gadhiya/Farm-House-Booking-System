import { Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageSlider = ({ slides }) => {
  return (
    <Carousel infiniteLoop>
      {slides.map(slide => {
        return (
          <Image
            src={slide.image}
            height="65vh"
            objectFit="cover"
            width="58vw"
          />
        );
      })}
    </Carousel>
  );
};

export default ImageSlider;
