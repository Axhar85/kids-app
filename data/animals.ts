import { ImageSourcePropType } from 'react-native';

export type Animal = {
  name: string;
  image: ImageSourcePropType;
  sound?: number;
  soundMaxMs?: number;
  fallbackSoundText?: string;
  color: string;
  unlockLevel: number;
};

const animals: Animal[] = [
  {
    name: 'Dog',
    image: require('../assets/images/animals/dog.png'),
    sound: require('../assets/sounds/animals/dog.wav'),
    soundMaxMs: 1200,
    fallbackSoundText: 'Dog',
    color: '#FFD54F',
    unlockLevel: 1,
  },
  {
    name: 'Cat',
    image: require('../assets/images/animals/cat.png'),
    sound: require('../assets/sounds/animals/cat.wav'),
    soundMaxMs: 1200,
    fallbackSoundText: 'Cat',
    color: '#81C784',
    unlockLevel: 1,
  },
  {
    name: 'Cow',
    image: require('../assets/images/animals/cow.png'),
    sound: require('../assets/sounds/animals/cow.wav'),
    soundMaxMs: 1400,
    fallbackSoundText: 'Cow',
    color: '#64B5F6',
    unlockLevel: 1,
  },
  {
    name: 'Lion',
    image: require('../assets/images/animals/lion.png'),
    sound: require('../assets/sounds/animals/lion.wav'),
    soundMaxMs: 1400,
    fallbackSoundText: 'Lion',
    color: '#FF7043',
    unlockLevel: 2,
  },
  {
    name: 'Duck',
    image: require('../assets/images/animals/duck.png'),
    sound: require('../assets/sounds/animals/duck.wav'),
    soundMaxMs: 1200,
    fallbackSoundText: 'Duck',
    color: '#4FC3F7',
    unlockLevel: 3,
  },
  {
    name: 'Monkey',
    image: require('../assets/images/animals/monkey.png'),
    sound: require('../assets/sounds/animals/monkey.wav'),
    soundMaxMs: 1200,
    fallbackSoundText: 'Monkey',
    color: '#BA68C8',
    unlockLevel: 4,
  },
];

export const getAnimalsForLevel = (level: number) =>
  animals.filter((animal) => animal.unlockLevel <= level);

export default animals;
