import { useState } from 'react';
import YouTube from 'react-youtube';
import { Box, Heading } from '@chakra-ui/react';

const YouTubePlayer = ({ videoId, playerRef }) => {
  const [videoTitle, setVideoTitle] = useState('');

  //when the player ready we will set the video title else it will give null error
  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setVideoTitle(playerRef.current?.getVideoData()?.title || '');
  };

  // Function to calculate responsive width and height
  const calculateDimensions = () => {
    const viewportWidth = window.innerWidth;
    const aspectRatio = 16 / 9;
    const height = Math.floor(viewportWidth / aspectRatio);
    return { width: viewportWidth, height };
  };

  // Initial dimensions
const initialDimensions = calculateDimensions();

  // Options for the YouTube player
  // Provided in youtube/developer api documentation
  const opts = {
    height: initialDimensions.height.toString(),
    width: initialDimensions.width.toString(),
    playerVars: {
      autoplay: 1,
      //to remove annotations
      iv_load_policy: 3,
      //to remove the recommneded videos
      rel: 0,
    },
  };

  //when the window resizes update the dimenstions to take care of the responsiveness
  window.addEventListener('resize', () => {
    //re calculate the dimensions again 
    const { width, height } = calculateDimensions();
    //use the setSize property provided to set the new size
    playerRef.current.setSize(width.toString(), height.toString());
  });

  return (
    <Box mb={8} overflow="hidden" mx={5}>
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      {videoTitle && <Heading mt="2rem"  fontSize={{ base: '20px', md: '24px', lg: '24px' }}>{videoTitle}</Heading>}
    </Box>
  );
};

export default YouTubePlayer;
