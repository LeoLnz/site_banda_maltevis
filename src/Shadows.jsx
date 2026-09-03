import LetraLayout from './components/LetraLayout/LetraLayout';

const YOUTUBE_URL = ''; // cole aqui o link do vídeo no YouTube

const LYRICS =`I feel the creature Inside of me
Scratching my walls, Where I used to be
Trying to keep this, Under my skin
But all the silence, Lets it crawl in

It whispers lies, In my own voice
I tried to scream, But I had no choice!

I feel the creature Breaking me down
Using my shadows Inside my crown
feel the creature And i cant escape
It feeds of my fear, That I cant erase

Mirror is cracked I cant recognize
This face in the reflex
That's not my eyes I cant live with this
You piss me off I'm gonna kill ya 
Even if you kill me (Even if you kill me)
But i'm still here
`;





function Shadows() {  
  return (
    <LetraLayout
      title="Shadows"
      trackNumber="04"
      lyrics={LYRICS}
      youtubeUrl={YOUTUBE_URL || null}
    />
  );
}

export default Shadows;