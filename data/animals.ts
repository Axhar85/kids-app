import { ImageSourcePropType } from 'react-native';

export type Animal = {
  name: string;
  image: ImageSourcePropType;
  sound?: number;
  color: string;
  unlockLevel: number;
};

const animals: Animal[] = [
  {
    name: 'Dog',
    image: require('../assets/images/animals/dog.png'),
    sound: require('../assets/sounds/dog.mp3'),
    color: '#FFD54F',
    unlockLevel: 1,
  },
  {
    name: 'Cat',
    image: require('../assets/images/animals/cat.png'),
    sound: require('../assets/sounds/cat.mp3'),
    color: '#81C784',
    unlockLevel: 1,
  },
  {
    name: 'Cow',
    image: require('../assets/images/animals/cow.png'),
    sound: require('../assets/sounds/cow.mp3'),
    color: '#64B5F6',
    unlockLevel: 1,
  },
  {
    name: 'Lion',
    image: require('../assets/images/animals/lion.png'),
    color: '#FF7043',
    unlockLevel: 2,
  },
  {
    name: 'Duck',
    image: require('../assets/images/animals/duck.png'),
    color: '#4FC3F7',
    unlockLevel: 3,
  },
  {
    name: 'Monkey',
    image: require('../assets/images/animals/monkey.png'),
    color: '#BA68C8',
    unlockLevel: 4,
  },
];

export const getAnimalsForLevel = (level: number) =>
  animals.filter((animal) => animal.unlockLevel <= level);

export default animals;
