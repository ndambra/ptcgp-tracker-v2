export const expansions = [
  {
    code: 'a1',
    name: 'Genetic Apex',
    packs: ['Pikachu', 'Charizard', 'Mewtwo'],
  },
  { code: 'a1a', name: 'Mythical Island', packs: ['Mythical Island'] },
  { code: 'a2', name: 'Space-Time Smackdown', packs: ['Dialga', 'Palkia'] },
  { code: 'a2a', name: 'Triumphant Light', packs: ['Triumphant Light'] },
  { code: 'a2b', name: 'Shining Revelry', packs: ['Shining Revelry'] },
  { code: 'a3', name: 'Celestial Guardians', packs: ['Solgaleo', 'Lunala'] },
  { code: 'a3a', name: 'Extradimensional Crisis', packs: ['XD Crisis'] },
  { code: 'a3b', name: 'Eevee Grove', packs: ['Eevee Grove'] },
  { code: 'promo', name: 'Promo', packs: ['Promo-A'] },
];

export const energyOpt = [
  'grass',
  'water',
  'fire',
  'psychic',
  'darkness',
  'lightning',
  'dragon',
  'metal',
  'colorless',
];

export function expansionName(expansionCode) {
  const expansion = expansions.find(
    (expInfo) => expInfo.code === expansionCode,
  );
  return expansion ? expansion.name : expansionCode;
}
