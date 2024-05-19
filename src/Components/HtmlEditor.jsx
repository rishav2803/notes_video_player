import React, { useState, useEffect } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';

const HtmlEditor = ({ onChange }) => {
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    onChange(content, { isBold, isItalic, isUnderline });
  }, [content, isBold, isItalic, isUnderline]);

  const handleBoldClick = () => {
    setIsBold(!isBold);
  };

  const handleItalicClick = () => {
    setIsItalic(!isItalic);
  };

  const handleUnderlineClick = () => {
    setIsUnderline(!isUnderline);
  };

  // generate style dynamically 
  //as the state changes this funciton will run 
  const generateStyle = () => {
    let style = {};
    if (isBold) style.fontWeight = 'bold';
    if (isItalic) style.fontStyle = 'italic';
    if (isUnderline) style.textDecoration = 'underline';
    return style;
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <Box>
      <Textarea
        value={content}
        onChange={handleContentChange}
        mt={4}
        p={2}
        resize="none"
        border="1px solid #ccc"
        borderRadius="md"
        mb="1rem"
        {...generateStyle()}
      />
      <Box textAlign="right">
        <Button onClick={handleBoldClick} variant={isBold ? 'solid' : 'outline'} mr={2}>
          B
        </Button>
        <Button onClick={handleItalicClick} variant={isItalic ? 'solid' : 'outline'} mr={2}>
          I
        </Button>
        <Button onClick={handleUnderlineClick} variant={isUnderline ? 'solid' : 'outline'}>
          U
        </Button>
      </Box>
    </Box>
  );
};

export default HtmlEditor;
