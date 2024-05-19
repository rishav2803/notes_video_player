import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, FormLabel, useDisclosure } from '@chakra-ui/react';
import YouTubePlayer from './Components/YoutubePlayer';
import NoteList from './Components/NoteList';
import AddNotesModal from './Modals/AddNotesModal';

const App = () => {
  const [videoId, setVideoId] = useState('dQw4w9WgXcQ'); 
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const playerRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(videoId)) || [];
    setNotes(storedNotes);
  }, [videoId]);


  //function responsible for adding new note to the local storage
  const handleAddNote = (note, formatting) => {
    //from the youtube player get the currentTimestamp
    const currentTime = playerRef.current.getCurrentTime();

    //Create new note
    
    const newNote = {
      timestamp: currentTime,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      content: note,
      formatting: formatting,
    };

    //update the notes state
    const updatedNotes = editIndex !== null ? notes.map((note, index) => index === editIndex ? newNote : note) : [...notes, newNote];
    setNotes(updatedNotes);
    //set the item in the local storage with key as the utube id
    //This makes sure that each video has its own notes
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
    setCurrentNote('');
    setEditIndex(null);
    onClose(); 
  };

  const handleDeleteNote = (index) => {
    //update the react state
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    //update the local storage
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
  };

  //this is for when we edit a particular note
  const handleEditNote = (index) => {
    setCurrentNote(notes[index].content);
    setEditIndex(index);
  };

  //this is for when we edit and save new note
  const handleSaveNote = (index) => {
    const updatedNotes = notes.map((note, i) => i === index ? { ...note, content: currentNote } : note);
    setNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
    setEditIndex(null);
    setCurrentNote('');
  };

  //change depending on id
  const handleVideoChange = (e) => {
    setVideoId(e.target.value);
  };

  const handleTimestampClick = (timestamp) => {
    playerRef.current.seekTo(timestamp);
  };

  const formatTimestamp = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')} min ${String(secs).padStart(2, '0')} sec`;
  };

  return (
    <Box>
      <FormLabel p={5}>
        Enter Youtube Id here:
        <Input
          placeholder="Enter YouTube video ID"
          value={videoId}
          onChange={handleVideoChange}
          mb={4}
        />
      </FormLabel>
      {/* youtube player component */}
      <YouTubePlayer videoId={videoId} playerRef={playerRef} />

      {/* notelist componenet */}
      <NoteList
        notes={notes}
        editIndex={editIndex}
        currentNote={currentNote}
        handleTimestampClick={handleTimestampClick}
        handleEditNote={handleEditNote}
        handleSaveNote={handleSaveNote}
        handleDeleteNote={handleDeleteNote}
        setCurrentNote={setCurrentNote}
        formatTimestamp={formatTimestamp}
        onOpen={onOpen}
      />

      {/* Add notes modal */}
      <AddNotesModal
        isOpen={isOpen}
        onClose={onClose}
        onNoteChange={setCurrentNote}
        handleAddNote={handleAddNote}
      />
    </Box>
  );
};

export default App;
