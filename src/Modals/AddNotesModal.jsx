import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box } from '@chakra-ui/react';
import HtmlEditor from '../Components/HtmlEditor'; 

const AddNotesModal = ({ isOpen, onClose, handleAddNote }) => {
  const [noteContent, setNoteContent] = useState('');
  const [formatting, setFormatting] = useState({ isBold: false, isItalic: false, isUnderline: false });

  const handleNoteContentChange = (content, format) => {
    setNoteContent(content);
    setFormatting(format);
  };

  const handleSaveNote = () => {
    handleAddNote(noteContent, formatting);
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HtmlEditor onChange={handleNoteContentChange} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSaveNote}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNotesModal;
