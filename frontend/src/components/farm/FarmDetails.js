import React, { useState, useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const FarmDetails = props => {
  const [farmData, setFarmData] = useState({});

  useEffect(() => {
    setFarmData(props.farm);
  }, []);

  return (
    <Box {...props?.style}>
      {console.log('farm detail ', farmData)}
      <Heading as="h2" size="xl" noOfLines={1} mt={'2px'}>
        {farmData.farmName}
      </Heading>
      <Text size="lg" mt={'2px'}>
        {farmData.description}
      </Text>
      <Box mt={'10px'}></Box>
      <Box>
        FarmDetails : Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Fugiat, ullam at dolor nulla numquam perspiciatis, repellendus
        repudiandae, obcaecati quibusdam officiis delectus esse distinctio
        provident accusamus suscipit? Perspiciatis facere possimus quas,
        suscipit nesciunt porro, dignissimos et officiis dicta delectus
        reiciendis nisi commodi totam natus amet eius! Mollitia beatae excepturi
        quisquam culpa quam amet iure nobis temporibus iste natus tenetur alias,
        tempore molestias officia recusandae. Nobis, iste incidunt similique
        quia nesciunt aperiam nihil id dolore recusandae eveniet, placeat sed
        accusantium fuga saepe excepturi deserunt? Itaque quo alias dolor
        similique sint, blanditiis nulla, harum accusantium earum tempore,
        eveniet tenetur dicta? Culpa ipsum placeat fuga quis quidem architecto,
        aperiam suscipit molestias expedita est, quibusdam cupiditate ratione
        deleniti veniam enim numquam odio, excepturi iusto sed vitae unde autem
        laborum earum. Repellat eaque suscipit accusamus corporis veritatis
        velit, libero provident culpa molestiae sint dolores quasi optio veniam
        ipsum harum tempora ducimus aspernatur iure enim asperiores nemo
        repellendus laboriosam. Incidunt pariatur earum itaque molestias ducimus
        suscipit iure facere, sunt labore, ipsum dicta inventore minima
        blanditiis, architecto minus dolorum debitis quas officiis vel.
        Dignissimos, recusandae dolore eos ex non aliquam nesciunt praesentium!
        Aut ut aliquid, ab temporibus eos sunt in fugiat ipsa accusantium
        molestias dolor quis rem maiores?
      </Box>
    </Box>
  );
};

export default FarmDetails;
