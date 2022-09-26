import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import Map from '../../components/Map';
const MapModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Trigger modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eaque aliquam, doloribus voluptatem autem praesentium quidem earum incidunt repellat laudantium, illo labore rem itaque minima quo nostrum. Recusandae, reiciendis tempore!
            {/* <Lorem count={2} /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};

export default MapModal;
