// ---------------------------------------------------------------
// SETLIST E LETRAS
// Para adicionar uma música: copie um bloco, mude slug/title/lyrics.
// A página /letras/<slug> e o setlist são criados automaticamente.
// audio:   nome do arquivo em public/audio/ (ex.: 'untilted.mp3'). Se o arquivo
//          não existir ainda, a música aparece como "em breve" no player.
// note:    texto pequeno opcional embaixo do nome no player (ex.: 'Single', 'Ao vivo').
// lrc:     letra sincronizada (opcional). Uma linha por verso, no formato
//          [minutos:segundos.centésimos] texto
//          Exemplo:
//            lrc: `
//            [00:12.40] Sometimes a rain
//            [00:15.10] Seems to be a storm
//            [00:18.00]
//            [00:19.50] But in the middle of thunders
//            `,
//          Linha só com o tempo = espaço entre estrofes. Com lrc preenchido, o
//          verso atual fica em destaque e a caixa de letra rola junto com o áudio.
//          Sem lrc, a letra rola sozinha de forma proporcional ao tempo da música.
// youtube: cole o link do vídeo da música (deixe '' se ainda não tem).
// ---------------------------------------------------------------
export const TRACKS = [
  {
    slug: 'untilted',
    audio: 'untilted.mp3',
    note: '',
    lrc: ``,
    title: 'Untilted',
    youtube: '',
    lyrics: `I showed beyond my body 
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
As a drink the ligths, from your eyes.`,
  },
  {
    slug: 'thunderstorm',
    audio: 'thunderstorm.mp3',
    note: '',
     lrc: `
[00:09.00] Sometimes a rain
[00:15.40] Seems to be a storm
[00:22.00]
[00:25.00] But in the middle of thunders
[00:27.00] Peace is a wonder
[00:29.00]
[00:30.00] But i can't even hear myself
[00:31.00] Confuse thoughts are predict my future
[00:34.00] The world will end
[00:36.00] My brain saw
[00:37.00]
[00:38.00] And I falling down
[00:42.00] Falling down (Falling down)
[00:47.00] Falling down (Falling down)
[00:50.00] Falling down.
[00:55.00]
[01:05.00] Sometimes a rain
[01:13.00] Seems to be a storm
[01:20.00]
[01:22.00] But in the middle of thunders
[01:24.00] Peace is a wonder
[01:26.00]
[01:27.00] But i can't even hear myself
[01:29.00] Confuse thoughts are predict my future
[01:31.00] The world will end
[01:34.00] My brain saw
[01:34.50]
[01:35.00] And I falling down
[01:39.00] Falling down (Falling down)
[01:42.00] Falling down (Falling down)
[01:47.00] Falling down.
`,
    title: 'Thunderstorm',
    youtube: '',
     lyrics: `Sometimes a rain
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
Falling down.`,
  },
  {
    slug: 'remember',
    audio: 'remember.mp3',
    note: '',
    lrc: ``,
    title: 'Remember',
    youtube: '',
    lyrics: `When I can't sleep
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
Yours.`,
  },
  {
    slug: 'shadows',
    audio: 'shadows.mp3',
    note: '',
    lrc: ``,
    title: 'Shadows',
    youtube: '',
    lyrics: `I feel the creature Inside of me
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
But i'm still here`,
  },
  // { slug: 'cerrado', title: 'Cerrado', youtube: '', lyrics: `` },
];
