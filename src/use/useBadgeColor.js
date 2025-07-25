export function useBadgeColor(packName) {
  let color;
  switch (packName) {
    case 'Pikachu':
      color = 'yellow-7';
      break;
    case 'Charizard':
      color = 'red';
      break;
    case 'Mewtwo':
      color = 'purple';
      break;
    case 'Mythical Island':
      color = 'teal';
      break;
    case 'Dialga':
      color = 'blue';
      break;
    case 'Palkia':
      color = 'pink-6';
      break;
    case 'Promo-A':
      color = 'cyan';
      break;
    case 'Triumphant Light':
      color = 'orange';
      break;
    case 'Shining Revelry':
      color = 'green';
      break;
    case 'Solgaleo':
      color = 'amber';
      break;
    case 'Lunala':
      color = 'deep-purple';
      break;
    case 'XD Crisis':
      color = 'red-10';
      break;
    case 'Eevee Grove':
      color = 'brown';
      break;
    default:
      color = 'white';
  }
  return color;
}
