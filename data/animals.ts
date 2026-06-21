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
    image: require('../assets/images/animals/dog.webp'),
    sound: require('../assets/sounds/animals/dog.mp3'),
    soundMaxMs: 5000,
    fallbackSoundText: 'Dog',
    color: '#FFD54F',
    unlockLevel: 1,
  },
  {
    name: 'Cat',
    image: require('../assets/images/animals/cat.png'),
    sound: require('../assets/sounds/animals/cat.mp3'),
    soundMaxMs: 5000,
    fallbackSoundText: 'Cat',
    color: '#81C784',
    unlockLevel: 1,
  },
  {
    name: 'Cow',
    image: require('../assets/images/animals/cow.png'),
    sound: require('../assets/sounds/animals/cow.mp3'),
    soundMaxMs: 5000,
    fallbackSoundText: 'Cow',
    color: '#64B5F6',
    unlockLevel: 1,
  },
  {
    name: 'Lion',
    image: require('../assets/images/animals/lion.png'),
    sound: require('../assets/sounds/animals/Lion.m4a'),
    soundMaxMs: 5000,
    fallbackSoundText: 'Lion',
    color: '#FF7043',
    unlockLevel: 2,
  },
  {
    name: 'Duck',
    image: require('../assets/images/animals/duck.png'),
    sound: require('../assets/sounds/animals/Duck, Royalty-Free Nature Track.m4a'),
    soundMaxMs: 5000,
    fallbackSoundText: 'Duck',
    color: '#4FC3F7',
    unlockLevel: 3,
  },
  {
    name: 'Monkey',
    image: require('../assets/images/animals/monkey.png'),
    sound: require('../assets/sounds/animals/monkey.m4a'),
    soundMaxMs: 5000,
    fallbackSoundText: 'Monkey',
    color: '#BA68C8',
    unlockLevel: 4,
  },
  {
    name: 'Horse',
    image: require('../assets/images/animals/horse.webp'),
    sound: require('../assets/sounds/animals/horse.m4a'),
    soundMaxMs: 5000,
    fallbackSoundText: 'Horse',
    color: '#A1887F',
    unlockLevel: 5,
  },
  {
    name: 'Goat',
    image: require('../assets/images/animals/goat.png'),
    sound: require('../assets/sounds/animals/goat.m4a'),
    soundMaxMs: 5000,
    fallbackSoundText: 'Goat',
    color: '#AED581',
    unlockLevel: 6,
  },
  {
    name: 'Donkey',
    image: require('../assets/images/animals/donkey.webp'),
    sound: require('../assets/sounds/animals/donkey.m4a'),
    soundMaxMs: 5000,
    fallbackSoundText: 'Donkey',
    color: '#90A4AE',
    unlockLevel: 7,
  },
  {
    name: 'Wolf',
    image: require('../assets/images/animals/wolf.webp'),
    sound: require('../assets/sounds/animals/wolf.m4a'),
    soundMaxMs: 5000,
    fallbackSoundText: 'Wolf',
    color: '#7986CB',
    unlockLevel: 8,
  },
];

export const getAnimalsForLevel = (level: number) =>
  animals.filter((animal) => animal.unlockLevel <= level);

export default animals;
