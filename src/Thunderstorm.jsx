import LetraLayout from './components/LetraLayout/LetraLayout';

const YOUTUBE_URL = ''; // cole aqui o link do vídeo no YouTube

const LYRICS = `Sometimes a rain
Seems to be a storm

But in the middle of thunders
Peace is a wonder

But i can't even hear myself
Confuse thoughts are predict my future
The world will end
My brain saw

And I falling down
Falling down (Falling down)
Falling down (Falling down)
Falling down.

Sometimes a rain
Seems to be a storm

But in the middle of thunders
Peace is a wonder

But i can't even hear myself
Confuse thoughts are predict my future
The world will end
My brain saw

And I falling down
Falling down (Falling down)
Falling down (Falling down)
Falling down.`;

function Thunderstorm() {
  return (
    <LetraLayout
      title="Thunderstorm"
      trackNumber="02"
      lyrics={LYRICS}
      youtubeUrl={YOUTUBE_URL || null}
    />
  );
}

export default Thunderstorm;