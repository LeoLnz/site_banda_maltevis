import React from 'react';

import { Link } from 'react-router-dom';

function Thunderstorm() {
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ color: '#fef8f8', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
        ← Voltar para o Setlist
      </Link>
      
      <main style={{ maxWidth: '800px', margin: '60px auto', textAlign: 'center' }}>
        <h1 style={{ color: '#cc0000', fontSize: '3rem', textTransform: 'uppercase', marginBottom: '10px' }}>Thunderstorm</h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>Faixa 02 - Letra e Informações</p>
        
        <div style={{ fontSize: '2.0rem', lineHeight: '2', whiteSpace: 'pre-wrap' }}>
Letra
</div>
    
<br />
Sometimes a rain
<br />
Seems to be a storm
<br />
<br />
But in the middle of thunders
<br />
Peace is a wonder
<br />
<br />
But i can't even hear myself
<br />
Confuse thoughts are predict my future 
<br />
The world will end 
<br />
My brain saw
<br />
<br />
And I falling down
<br />
Falling down (Falling down)
<br />
Falling down (Falling down)
<br />
Falling down. 
<br />
<br />
Sometimes a rain
<br />
Seems to be a storm
<br />
<br />
But in the middle of thunders
<br />
Peace is a wonder
<br />
<br />
But i can't even hear myself
<br />
Confuse thoughts are predict my future 
<br />
The world will end 
<br />
My brain saw
<br />
<br />
And I falling down
<br />
Falling down (Falling down)
<br />
Falling down (Falling down)
<br />
Falling down. 
<br />
      </main>
    </div>
  );
}

export default Thunderstorm;    