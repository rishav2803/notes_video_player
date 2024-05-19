import React from 'react';
import { Box, Button, Flex, Heading, Text, Textarea } from '@chakra-ui/react';

//Each individual note is given by this component 
const Note = ({ note, index, editIndex, currentNote, handleTimestampClick, handleEditNote, handleSaveNote, handleDeleteNote, setCurrentNote, formatTimestamp }) => {
  return (
    <Box>
      <Heading size='xs' textTransform='uppercase'>
        {note.date}
      </Heading>
      <Text pt='2' fontSize='sm' onClick={() => handleTimestampClick(note.timestamp)} cursor="pointer">
        <span style={{color:"#344054"}}>Timestamp:</span> <span style={{color:"#6941C6"}}>{formatTimestamp(note.timestamp)}</span>
      </Text>
      <Textarea
        value={editIndex === index ? currentNote : note.content}
        isReadOnly={editIndex !== index}
        onClick={() => editIndex !== index && handleTimestampClick(note.timestamp)}
        onChange={(e) => editIndex === index && setCurrentNote(e.target.value)}
        mt={2}
        size="md"
        cursor={editIndex !== index ? 'pointer' : 'text'}
        mb="1rem"
        fontWeight={note.formatting.isBold ? 'bold' : 'normal'}
        fontStyle={note.formatting.isItalic ? 'italic' : 'normal'}
        textDecoration={note.formatting.isUnderline ? 'underline' : 'none'}
      />
      <Flex justifyContent="flex-end" mt={2}>
        {editIndex === index ? (
          <Button size="xs" onClick={() => handleSaveNote(index)} mr={2}>
            Save Note
          </Button>
        ) : (
          <Button size="xs" onClick={() => handleEditNote(index)} mr={2}>
            Edit Note
          </Button>
        )}
        <Button size="xs" onClick={() => handleDeleteNote(index)}>
          Delete Note
        </Button>
      </Flex>
    </Box>
  );
};

export default Note;
