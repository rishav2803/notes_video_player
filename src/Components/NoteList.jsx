import React from 'react';
import { Box, Card, CardBody, CardHeader, Divider, Flex, Heading, Stack, StackDivider, Text, Button, useBreakpointValue, Icon } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import Note from './Note';

const NoteList = ({ notes, editIndex, currentNote, handleTimestampClick, handleEditNote, handleSaveNote, handleDeleteNote, setCurrentNote, formatTimestamp, onOpen }) => {

  // Determine if its a small screen or not
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Card p={5} mt="1rem">
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Heading size='sm'>My Notes</Heading>
            <Text color="#475467" pt='2' fontSize='sm' >
              All your notes in a single place. Click on any note to go to a specific timestamp in the video.
            </Text>
          </Box>
          {isSmallScreen ? (
            <PlusSquareIcon ml="1rem" fontSize="1.3rem" onClick={onOpen}/>
          ) : (
            <Button size="sm" leftIcon={<PlusSquareIcon />} variant="outline" onClick={onOpen}>
              Add new note
            </Button>
          )}
        </Flex>
        <Divider mt={4} />
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          {notes.length > 0 ? notes.map((note, index) => (
            <Note
              key={index}
              note={note}
              index={index}
              editIndex={editIndex}
              currentNote={currentNote}
              handleTimestampClick={handleTimestampClick}
              handleEditNote={handleEditNote}
              handleSaveNote={handleSaveNote}
              handleDeleteNote={handleDeleteNote}
              setCurrentNote={setCurrentNote}
              formatTimestamp={formatTimestamp}
            />
          )) : (
            <Text>No notes available. Add some notes to get started!</Text>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NoteList;
