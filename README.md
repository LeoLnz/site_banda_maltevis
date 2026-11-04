# Site da banda Maltevis

React + Vite. Publicado em https://leolnz.github.io/site_banda_maltevis/

## Rodar e publicar

```bash
npm install
npm run dev       # abre o site local para testar
npm run deploy    # gera o build e publica no GitHub Pages (gh-pages)
```

## Onde editar cada coisa (sem mexer em código de layout)

| O que mudar | Arquivo |
| --- | --- |
| Shows (agenda) | `src/data/shows.js`: adicione uma linha. O site separa "próximos" e "já rolou" sozinho pela data |
| Músicas, letras e links do YouTube | `src/data/tracks.js`: o setlist e a página da letra são criados automaticamente |
| Áudios do player | coloque os `.mp3` em `public/audio/` (nomes: `untilted.mp3`, `thunderstorm.mp3`, `remember.mp3`, `shadows.mp3`, ou mude o campo `audio` em `src/data/tracks.js`). Faixa sem arquivo aparece como "em breve" |
| Letra sincronizada no player | campo `lrc` de cada música em `src/data/tracks.js`, formato `[0:12.50] verso` (veja `public/audio/LEIAME.txt`) |
| Links de Spotify, Deezer, Apple Music (botões do player) | `src/data/site.js`, em `streaming`. Só aparecem os que tiverem link |
| Integrantes, funções e fotos | `src/data/members.js` (fotos em `src/assets/img/`) |
| Fotos do topo do site | `src/data/slides.js` |
| E-mail, YouTube, Instagram, crédito das fotos | `src/data/site.js` |
| Texto "Sobre" | `src/components/BioSection/BioSection.jsx` (constante `TEXT`) |
| Cores e fontes | `src/index.css` (bloco `:root` no topo) |

## Dicas

- Fotos novas: exporte em `.webp` (ou `.jpg`) com no máximo ~1920px de largura. Foto de 2 MB deixa o site lento no celular.
- O site usa `HashRouter`: links internos precisam usar `goTo('id')` (de `src/lib/motion.js`) ou `<Link>`, nunca `href="#secao"`.
- Quem tem "reduzir movimento" ativado no aparelho vê o site sem animações.
