// Lê letra sincronizada no formato LRC:  [minutos:segundos.centésimos] texto
// Exemplo:  [01:05.30] But in the middle of thunders
// Linha só com o tempo (sem texto) vira um espaço entre estrofes.
const LINE = /^\s*\[(\d+):(\d+(?:\.\d+)?)\]\s?(.*)$/;

export function parseLrc(source) {
  if (!source) return [];
  return source
    .split('\n')
    .map((raw) => {
      const m = raw.match(LINE);
      if (!m) return null;
      return { t: Number(m[1]) * 60 + Number(m[2]), text: m[3].trim() };
    })
    .filter(Boolean)
    .sort((a, b) => a.t - b.t);
}
