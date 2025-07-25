export function useTypeColor(type) {
  let color;
  switch (type) {
    case 'grass':
      color = 'green';
      break;
    case 'fire':
      color = 'red';
      break;
    case 'water':
      color = 'light-blue-6';
      break;
    case 'lightning':
      color = 'amber-5';
      break;
    case 'psychic':
      color = 'purple-6';
      break;
    case 'fighting':
      color = 'orange-9';
      break;
    case 'darkness':
      color = 'blue-grey-8';
      break;
    case 'metal':
      color = 'grey-8';
      break;
    case 'dragon':
      color = 'lime-10';
      break;
    case 'colorless':
      color = 'grey-5';
      break;
    default:
      color = 'black';
      break;
  }
  return color;
}
