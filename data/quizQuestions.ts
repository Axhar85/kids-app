export type QuizCategoryId = 'math' | 'spelling' | 'science' | 'capitals';

export type QuizQuestion = {
  id: string;
  category: QuizCategoryId;
  prompt: string;
  helper?: string;
  choices: string[];
  answer: string;
};

export type QuizCategory = {
  id: QuizCategoryId;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
};

type QuestionSeed = Omit<QuizQuestion, 'id' | 'category'>;
type BasicTuple = [string, string, string[]];
type HelperTuple = [string, string, string[]];

export const quizCategories: QuizCategory[] = [
  { id: 'math', title: 'Math', subtitle: 'Quick number challenges', icon: '\u2795', color: '#2196F3' },
  { id: 'spelling', title: 'Spelling', subtitle: 'Colors, fruits, and words', icon: '\uD83D\uDD24', color: '#E91E63' },
  { id: 'science', title: 'Science', subtitle: 'Nature, space, and the body', icon: '\uD83D\uDD2C', color: '#009688' },
  { id: 'capitals', title: 'Capitals', subtitle: 'Match countries to capital cities', icon: '\uD83C\uDF0D', color: '#673AB7' },
];

const withIds = (category: QuizCategoryId, seeds: QuestionSeed[]) =>
  seeds.map((question, index) => ({ ...question, id: `${category}-${index + 1}`, category }));

const mathTuples: BasicTuple[] = [
  ['8 + 7', '15', ['13', '15', '16', '17']], ['6 x 4', '24', ['20', '22', '24', '28']],
  ['36 / 6', '6', ['5', '6', '7', '8']], ['45 - 19', '26', ['24', '25', '26', '28']],
  ['12 + 18', '30', ['28', '29', '30', '32']], ['9 x 5', '45', ['40', '45', '50', '55']],
  ['72 / 8', '9', ['7', '8', '9', '10']], ['100 - 37', '63', ['61', '62', '63', '64']],
  ['14 + 26', '40', ['38', '39', '40', '42']], ['7 x 8', '56', ['48', '54', '56', '64']],
  ['81 / 9', '9', ['8', '9', '10', '11']], ['64 - 28', '36', ['34', '35', '36', '38']],
  ['15 + 17', '32', ['30', '31', '32', '34']], ['11 x 6', '66', ['60', '64', '66', '72']],
  ['48 / 6', '8', ['6', '7', '8', '9']], ['90 - 45', '45', ['35', '40', '45', '50']],
  ['23 + 19', '42', ['40', '41', '42', '43']], ['12 x 7', '84', ['72', '78', '84', '88']],
  ['56 / 7', '8', ['7', '8', '9', '10']], ['75 - 29', '46', ['44', '45', '46', '48']],
  ['34 + 28', '62', ['60', '61', '62', '64']], ['13 x 3', '39', ['36', '39', '42', '43']],
  ['63 / 7', '9', ['7', '8', '9', '10']], ['120 - 55', '65', ['60', '65', '70', '75']],
  ['18 + 24', '42', ['40', '42', '44', '46']], ['9 x 9', '81', ['72', '80', '81', '90']],
  ['96 / 12', '8', ['6', '7', '8', '9']], ['88 - 39', '49', ['47', '48', '49', '50']],
  ['27 + 35', '62', ['60', '62', '64', '66']], ['8 x 12', '96', ['88', '92', '96', '108']],
  ['45 / 5', '9', ['7', '8', '9', '10']], ['70 - 18', '52', ['50', '51', '52', '54']],
  ['44 + 16', '60', ['58', '59', '60', '61']], ['14 x 4', '56', ['48', '52', '56', '60']],
  ['84 / 7', '12', ['10', '11', '12', '13']], ['53 - 17', '36', ['34', '35', '36', '37']],
  ['29 + 31', '60', ['58', '60', '62', '64']], ['15 x 5', '75', ['70', '75', '80', '85']],
  ['108 / 9', '12', ['10', '11', '12', '14']], ['99 - 44', '55', ['45', '50', '55', '60']],
  ['37 + 46', '83', ['80', '82', '83', '84']], ['16 x 3', '48', ['42', '46', '48', '50']],
  ['121 / 11', '11', ['9', '10', '11', '12']], ['65 - 27', '38', ['36', '37', '38', '40']],
  ['58 + 22', '80', ['78', '79', '80', '82']], ['6 x 13', '78', ['72', '76', '78', '84']],
  ['144 / 12', '12', ['10', '11', '12', '13']], ['200 - 125', '75', ['65', '70', '75', '85']],
  ['19 + 48', '67', ['65', '66', '67', '69']], ['17 x 4', '68', ['64', '66', '68', '72']],
];

const spellingTuples: HelperTuple[] = [
  ['The color of grass', 'Green', ['Grenn', 'Green', 'Grean', 'Grien']], ['A yellow fruit', 'Banana', ['Banana', 'Bannana', 'Banena', 'Bananah']],
  ['A red fruit', 'Apple', ['Aple', 'Apple', 'Appel', 'Appl']], ['The color of the sky', 'Blue', ['Blue', 'Bloo', 'Blew', 'Blu']],
  ['A small red fruit', 'Cherry', ['Chery', 'Cherry', 'Cherrey', 'Cherri']], ['A sour yellow fruit', 'Lemon', ['Lemon', 'Lemmon', 'Lemen', 'Limon']],
  ['A long orange vegetable', 'Carrot', ['Carrot', 'Carot', 'Carrat', 'Karrot']], ['The opposite of cold', 'Hot', ['Hott', 'Hot', 'Hote', 'Hut']],
  ['The opposite of day', 'Night', ['Nite', 'Night', 'Nighte', 'Niet']], ['A place with books', 'Library', ['Library', 'Libary', 'Librery', 'Liberry']],
  ['A large gray animal', 'Elephant', ['Elefant', 'Elephant', 'Eliphant', 'Elephent']], ['A flying animal', 'Bird', ['Burd', 'Bird', 'Berd', 'Byrd']],
  ['The color of snow', 'White', ['Wite', 'White', 'Whait', 'Whyte']], ['The color of chocolate', 'Brown', ['Brown', 'Brawn', 'Broun', 'Browne']],
  ['A sweet orange fruit', 'Orange', ['Orang', 'Orange', 'Orenge', 'Oringe']], ['A green fruit', 'Grape', ['Grape', 'Graip', 'Grabe', 'Grap']],
  ['A summer fruit', 'Watermelon', ['Watermelon', 'Watermellon', 'Wattermelon', 'Watermelun']], ['A school subject', 'Science', ['Sciense', 'Science', 'Sience', 'Sciance']],
  ['Numbers practice', 'Math', ['Math', 'Mathe', 'Meth', 'Marth']], ['A very big ocean animal', 'Whale', ['Wale', 'Whale', 'Whail', 'Whael']],
  ['A striped animal', 'Tiger', ['Tiger', 'Tigar', 'Tyger', 'Tigger']], ['A hopping animal', 'Rabbit', ['Rabit', 'Rabbit', 'Rabbitt', 'Rabbet']],
  ['A farm animal', 'Chicken', ['Chiken', 'Chicken', 'Chickin', 'Chickan']], ['A place to sleep', 'Bedroom', ['Bedroom', 'Bedrom', 'Bedrum', 'Beedroom']],
  ['A rainy day tool', 'Umbrella', ['Umbrella', 'Umbrela', 'Umbralla', 'Umbrellah']], ['A round sport ball', 'Football', ['Football', 'Fotball', 'Footbal', 'Futball']],
  ['A warm drink', 'Chocolate', ['Choclate', 'Chocolate', 'Chokolate', 'Chocolaet']], ['A bright star', 'Sun', ['Sun', 'Sunn', 'Son', 'Sune']],
  ['Earth satellite', 'Moon', ['Moon', 'Mone', 'Muun', 'Moom']], ['A water animal', 'Fish', ['Fish', 'Fisch', 'Fesh', 'Phish']],
  ['A noisy animal', 'Monkey', ['Monkey', 'Monky', 'Monkie', 'Munkey']], ['A jungle animal', 'Lion', ['Lion', 'Lyon', 'Loin', 'Lian']],
  ['A milk animal', 'Cow', ['Cow', 'Caw', 'Kow', 'Cou']], ['A pet animal', 'Dog', ['Dog', 'Dogg', 'Doge', 'Dug']],
  ['A pet that says meow', 'Cat', ['Cat', 'Kat', 'Catt', 'Cet']], ['The color of fire trucks', 'Red', ['Red', 'Redd', 'Reed', 'Rad']],
  ['A tiny insect', 'Ant', ['Ant', 'Aunt', 'Ent', 'And']], ['A flying insect', 'Butterfly', ['Butterfly', 'Buterfly', 'Butterflie', 'Butterfli']],
  ['A winter weather word', 'Snow', ['Snow', 'Sno', 'Snou', 'Snoe']], ['A round red vegetable', 'Tomato', ['Tomato', 'Tomatto', 'Tamato', 'Tomateo']],
  ['A green vegetable', 'Broccoli', ['Broccoli', 'Brokoli', 'Brocolli', 'Broccolli']], ['A morning meal', 'Breakfast', ['Breakfast', 'Breackfast', 'Brekfast', 'Breakfest']],
  ['A school tool', 'Pencil', ['Pencil', 'Pensil', 'Pencel', 'Pencill']], ['A thing to write in', 'Notebook', ['Notebook', 'Notbook', 'Noteook', 'Notebok']],
  ['A family member', 'Mother', ['Mother', 'Mothar', 'Muther', 'Mather']], ['Another family member', 'Father', ['Father', 'Fathar', 'Fother', 'Fathur']],
  ['A happy feeling', 'Smile', ['Smile', 'Smyle', 'Smil', 'Smaile']], ['A color between red and yellow', 'Orange', ['Orange', 'Oringe', 'Orenge', 'Orang']],
  ['A shape with three sides', 'Triangle', ['Triangle', 'Triangel', 'Triangul', 'Tryangle']], ['A shape with four equal sides', 'Square', ['Square', 'Sqaure', 'Squar', 'Skware']],
];

const scienceTuples: BasicTuple[] = [
  ['Which planet is closest to the Sun?', 'Mercury', ['Earth', 'Mars', 'Mercury', 'Jupiter']], ['What do plants need to make food?', 'Sunlight', ['Sunlight', 'Plastic', 'Moon rocks', 'Sand only']],
  ['Which part of the body pumps blood?', 'Heart', ['Lungs', 'Heart', 'Stomach', 'Brain']], ['What gas do humans breathe in to live?', 'Oxygen', ['Oxygen', 'Helium', 'Smoke', 'Steam']],
  ['What do bees make?', 'Honey', ['Milk', 'Honey', 'Bread', 'Rice']], ['What is H2O commonly called?', 'Water', ['Salt', 'Water', 'Sugar', 'Air']],
  ['Which animal is a mammal?', 'Dolphin', ['Shark', 'Dolphin', 'Octopus', 'Crab']], ['What force pulls things toward Earth?', 'Gravity', ['Gravity', 'Magnetism', 'Light', 'Sound']],
  ['Which organ helps us breathe?', 'Lungs', ['Heart', 'Lungs', 'Bones', 'Skin']], ['What do we call frozen water?', 'Ice', ['Steam', 'Ice', 'Dust', 'Cloud']],
  ['Which star is closest to Earth?', 'The Sun', ['The Sun', 'Sirius', 'Polaris', 'Vega']], ['What do roots do for plants?', 'Absorb water', ['Absorb water', 'Make seeds', 'Fly', 'Glow']],
  ['Which material is attracted to magnets?', 'Iron', ['Wood', 'Plastic', 'Iron', 'Paper']], ['What do caterpillars become?', 'Butterflies', ['Butterflies', 'Fish', 'Frogs', 'Snakes']],
  ['What is the largest planet?', 'Jupiter', ['Earth', 'Jupiter', 'Mars', 'Venus']], ['What covers most of Earth?', 'Water', ['Water', 'Desert', 'Ice cream', 'Grass']],
  ['Which sense uses the nose?', 'Smell', ['Taste', 'Smell', 'Touch', 'Hearing']], ['Which sense uses the ears?', 'Hearing', ['Sight', 'Hearing', 'Taste', 'Smell']],
  ['What is a baby frog called?', 'Tadpole', ['Cub', 'Tadpole', 'Calf', 'Kitten']], ['Which animals lay eggs?', 'Birds', ['Birds', 'Dogs', 'Cats', 'Cows']],
  ['What do clouds bring when they are full?', 'Rain', ['Rain', 'Sand', 'Fire', 'Leaves']], ['Which planet do we live on?', 'Earth', ['Mars', 'Earth', 'Saturn', 'Neptune']],
  ['What do we call animals that eat plants?', 'Herbivores', ['Herbivores', 'Robots', 'Planets', 'Metals']], ['What do we call animals that eat meat?', 'Carnivores', ['Carnivores', 'Clouds', 'Minerals', 'Comets']],
  ['What is the center of an atom called?', 'Nucleus', ['Nucleus', 'Leaf', 'Root', 'Wing']], ['What helps fish breathe underwater?', 'Gills', ['Gills', 'Ears', 'Feathers', 'Hands']],
  ['What do humans use to see?', 'Eyes', ['Eyes', 'Feet', 'Elbows', 'Hair']], ['Which object orbits Earth?', 'Moon', ['Moon', 'Spoon', 'Car', 'Tree']],
  ['What is hot enough to cook food?', 'Heat', ['Heat', 'Shadow', 'Snow', 'Wind']], ['Which energy comes from the Sun?', 'Solar energy', ['Solar energy', 'Battery only', 'Sound only', 'Stone energy']],
  ['What do trees release that humans breathe?', 'Oxygen', ['Oxygen', 'Smoke', 'Plastic', 'Dust']], ['What is the process of a liquid becoming gas?', 'Evaporation', ['Evaporation', 'Freezing', 'Melting', 'Growing']],
  ['What is the process of ice becoming water?', 'Melting', ['Melting', 'Burning', 'Planting', 'Floating']], ['What tool measures temperature?', 'Thermometer', ['Thermometer', 'Ruler', 'Compass', 'Clock']],
  ['What tool helps us see tiny things?', 'Microscope', ['Microscope', 'Telescope', 'Hammer', 'Mirror']], ['What tool helps us see far planets?', 'Telescope', ['Telescope', 'Microscope', 'Spoon', 'Pencil']],
  ['What do bones do?', 'Support the body', ['Support the body', 'Make rain', 'Digest food', 'Grow leaves']], ['What protects the brain?', 'Skull', ['Skull', 'Ribs', 'Knee', 'Finger']],
  ['Which part of a plant makes seeds?', 'Flower', ['Root', 'Flower', 'Stem', 'Soil']], ['What do leaves help plants make?', 'Food', ['Food', 'Shoes', 'Glass', 'Music']],
  ['What is the young one of a dog called?', 'Puppy', ['Puppy', 'Kitten', 'Calf', 'Foal']], ['What is the young one of a cat called?', 'Kitten', ['Puppy', 'Kitten', 'Chick', 'Cub']],
  ['Which animal has a shell?', 'Turtle', ['Turtle', 'Horse', 'Lion', 'Duck']], ['Which animal changes color to hide?', 'Chameleon', ['Chameleon', 'Cow', 'Penguin', 'Dog']],
  ['What are the three states of water?', 'Solid, liquid, gas', ['Solid, liquid, gas', 'Rock, paper, scissors', 'Red, blue, green', 'Fast, slow, still']], ['What does a battery store?', 'Energy', ['Energy', 'Rain', 'Clouds', 'Leaves']],
  ['Which is a source of light?', 'Lamp', ['Lamp', 'Chair', 'Cup', 'Pillow']], ['Which body part helps us chew?', 'Teeth', ['Teeth', 'Ears', 'Knees', 'Wrists']],
  ['What do we call the path planets take around the Sun?', 'Orbit', ['Orbit', 'Bridge', 'Tunnel', 'River']], ['Which planet is known as the Red Planet?', 'Mars', ['Mars', 'Venus', 'Neptune', 'Saturn']],
];

const capitalTuples: BasicTuple[] = [
  ['Spain', 'Madrid', ['Madrid', 'Barcelona', 'Seville', 'Valencia']], ['France', 'Paris', ['Paris', 'Lyon', 'Nice', 'Marseille']],
  ['Italy', 'Rome', ['Rome', 'Milan', 'Naples', 'Venice']], ['Germany', 'Berlin', ['Berlin', 'Munich', 'Hamburg', 'Frankfurt']],
  ['United Kingdom', 'London', ['London', 'Manchester', 'Liverpool', 'Bristol']], ['Portugal', 'Lisbon', ['Lisbon', 'Porto', 'Coimbra', 'Faro']],
  ['Ireland', 'Dublin', ['Dublin', 'Cork', 'Galway', 'Limerick']], ['Netherlands', 'Amsterdam', ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht']],
  ['Belgium', 'Brussels', ['Brussels', 'Antwerp', 'Bruges', 'Ghent']], ['Switzerland', 'Bern', ['Bern', 'Zurich', 'Geneva', 'Basel']],
  ['Austria', 'Vienna', ['Vienna', 'Salzburg', 'Graz', 'Innsbruck']], ['Greece', 'Athens', ['Athens', 'Thessaloniki', 'Patras', 'Heraklion']],
  ['Norway', 'Oslo', ['Oslo', 'Bergen', 'Trondheim', 'Stavanger']], ['Sweden', 'Stockholm', ['Stockholm', 'Gothenburg', 'Malmo', 'Uppsala']],
  ['Denmark', 'Copenhagen', ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg']], ['Finland', 'Helsinki', ['Helsinki', 'Tampere', 'Turku', 'Espoo']],
  ['Poland', 'Warsaw', ['Warsaw', 'Krakow', 'Gdansk', 'Poznan']], ['Czech Republic', 'Prague', ['Prague', 'Brno', 'Ostrava', 'Plzen']],
  ['Hungary', 'Budapest', ['Budapest', 'Debrecen', 'Szeged', 'Pecs']], ['Romania', 'Bucharest', ['Bucharest', 'Cluj-Napoca', 'Timisoara', 'Iasi']],
  ['United States', 'Washington, D.C.', ['Washington, D.C.', 'New York', 'Los Angeles', 'Chicago']], ['Canada', 'Ottawa', ['Ottawa', 'Toronto', 'Vancouver', 'Montreal']],
  ['Mexico', 'Mexico City', ['Mexico City', 'Guadalajara', 'Cancun', 'Monterrey']], ['Brazil', 'Brasilia', ['Brasilia', 'Rio de Janeiro', 'Sao Paulo', 'Salvador']],
  ['Argentina', 'Buenos Aires', ['Buenos Aires', 'Cordoba', 'Rosario', 'Mendoza']], ['Chile', 'Santiago', ['Santiago', 'Valparaiso', 'Concepcion', 'La Serena']],
  ['Peru', 'Lima', ['Lima', 'Cusco', 'Arequipa', 'Trujillo']], ['Colombia', 'Bogota', ['Bogota', 'Medellin', 'Cali', 'Cartagena']],
  ['Egypt', 'Cairo', ['Cairo', 'Alexandria', 'Giza', 'Luxor']], ['Morocco', 'Rabat', ['Rabat', 'Casablanca', 'Marrakesh', 'Fez']],
  ['South Africa', 'Pretoria', ['Pretoria', 'Cape Town', 'Johannesburg', 'Durban']], ['Kenya', 'Nairobi', ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru']],
  ['Nigeria', 'Abuja', ['Abuja', 'Lagos', 'Kano', 'Ibadan']], ['India', 'New Delhi', ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai']],
  ['Pakistan', 'Islamabad', ['Islamabad', 'Karachi', 'Lahore', 'Peshawar']], ['China', 'Beijing', ['Beijing', 'Shanghai', 'Shenzhen', 'Guangzhou']],
  ['Japan', 'Tokyo', ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya']], ['South Korea', 'Seoul', ['Seoul', 'Busan', 'Incheon', 'Daegu']],
  ['Thailand', 'Bangkok', ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya']], ['Indonesia', 'Jakarta', ['Jakarta', 'Bali', 'Surabaya', 'Bandung']],
  ['Australia', 'Canberra', ['Canberra', 'Sydney', 'Melbourne', 'Perth']], ['New Zealand', 'Wellington', ['Wellington', 'Auckland', 'Christchurch', 'Hamilton']],
  ['Turkey', 'Ankara', ['Ankara', 'Istanbul', 'Izmir', 'Antalya']], ['Saudi Arabia', 'Riyadh', ['Riyadh', 'Jeddah', 'Mecca', 'Medina']],
  ['United Arab Emirates', 'Abu Dhabi', ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman']], ['Qatar', 'Doha', ['Doha', 'Al Wakrah', 'Al Khor', 'Lusail']],
  ['Russia', 'Moscow', ['Moscow', 'Saint Petersburg', 'Kazan', 'Sochi']], ['Ukraine', 'Kyiv', ['Kyiv', 'Lviv', 'Odesa', 'Kharkiv']],
  ['Israel', 'Jerusalem', ['Jerusalem', 'Tel Aviv', 'Haifa', 'Eilat']], ['Malaysia', 'Kuala Lumpur', ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Malacca']],
];

const mathSeeds = mathTuples.map(([expression, answer, choices]) => ({ prompt: `What is ${expression}?`, choices, answer }));
const spellingSeeds = spellingTuples.map(([helper, answer, choices]) => ({ prompt: 'Which spelling is correct?', helper, choices, answer }));
const scienceSeeds = scienceTuples.map(([prompt, answer, choices]) => ({ prompt, choices, answer }));
const capitalSeeds = capitalTuples.map(([country, answer, choices]) => ({ prompt: `What is the capital of ${country}?`, choices, answer }));

export const quizQuestions: QuizQuestion[] = [
  ...withIds('math', mathSeeds),
  ...withIds('spelling', spellingSeeds),
  ...withIds('science', scienceSeeds),
  ...withIds('capitals', capitalSeeds),
];

export const getQuestionsForCategory = (category: QuizCategoryId) =>
  quizQuestions.filter((question) => question.category === category);
