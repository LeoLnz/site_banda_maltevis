import LetraLayout from './components/LetraLayout/LetraLayout';

const YOUTUBE_URL = ''; // cole aqui o link do vídeo no YouTube

const LYRICS =`When I can't sleep
When I can't breath 
When my hands shake, 
and get in my way

Im still remember 
Again, again, again...
I remember my stumbles 
I forced myself not to remember yours 

I remember, when your hands werent cold
When they held my heart )

I gave u everything I am 
I let you go and I feel apart 

The lies, fooled me weel 
But I came to reality 
It hurt a lot 
But I wasn't important to you 

The lies, full me weel
You pretended to be someone 
Or maybe, I imagined who you are!

Im still remember 
Again, again, again
I remember my stumbles 
I forced myself not to remember
Yours. 
`;





function Remember() {  
  return (
    <LetraLayout
      title="Remember"
      trackNumber="04"
      lyrics={LYRICS}
      youtubeUrl={YOUTUBE_URL || null}
    />
  );
}

export default Remember;