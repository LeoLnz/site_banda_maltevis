import LetraLayout from './components/LetraLayout/LetraLayout';

const YOUTUBE_URL = ''; // cole aqui o link do vídeo no YouTube


const LYRICS =`I showed beyond my body 
And you touched my soul
Drunk all my blood 
And bite into mi skull

My room is at the flare
And I just say your name
If you kill me (Oh no)
Tomorow no one remember

Take my heart, and wath me dying for you

Blood is falling down your neck
In all your body, bites and scratches
So creeps to rumble meet your end 
As a drink the ligths, from your eyes.
`;






function Untilted() {
  return (
    <LetraLayout
      title="Untilted"
      trackNumber="01"
      lyrics={LYRICS}
      youtubeUrl={YOUTUBE_URL || null}
    />
  );
}

export default Untilted;