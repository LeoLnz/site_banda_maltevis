import React from 'react';

import { Link } from 'react-router-dom';

function Untilted() {
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ color: '#fef8f8', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
        ← Voltar para o Setlist
      </Link>
      
      <main style={{ maxWidth: '800px', margin: '60px auto', textAlign: 'center' }}>
        <h1 style={{ color: '#cc0000', fontSize: '3rem', textTransform: 'uppercase', marginBottom: '10px' }}>Untilted</h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>Faixa 01 - Letra e Informações</p>
        
        <div style={{ fontSize: '1.4rem', lineHeight: '2', whiteSpace: 'pre-wrap' }}>
         Letra
        </div>
      </main>
    </div>
  );
}

export default Untilted;