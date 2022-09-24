import React from 'react';
import { Carousel } from 'react-carousel-minimal';

export default function CardCarousel(props) {
  const { data } = props;

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  };
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  return (
    // <div>
    //   <div style={{ textAlign: 'center' }}>
    //     <div>
    <Carousel
      data={data}
      // time={2000}
      width="600px"
      height="400px"
      // captionStyle={captionStyle}
      radius="10px"
      // slideNumber={true}
      // slideNumberStyle={slideNumberStyle}
      // captionPosition="bottom"
      automatic={true}
      dots={true}
      // pauseIconColor="white"
      // pauseIconSize="40px"
      // slideBackgroundColor="darkgrey"
      // slideImageFit="cover"
      // thumbnails={true}
      // thumbnailWidth="100px"
      // style={{
      //   textAlign: 'center',
      //   maxWidth: '850px',
      //   maxHeight: '500px',
      //   margin: '00px auto',
      // }}
      // showNavBtn={false}

      controls={false}
      indicators={false}
      interval={null}
      // activeIndex={slidersState[x]}
    />
    //     </div>
    //   </div>
    // </div>
  );
}
