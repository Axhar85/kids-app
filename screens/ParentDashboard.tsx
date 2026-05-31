import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ParentDashboard({
  setShowDashboard,
}: any) {

  const [aliScore, setAliScore] = useState(0);
  const [aliLevel, setAliLevel] = useState(1);

  const [saraScore, setSaraScore] = useState(0);
  const [saraLevel, setSaraLevel] = useState(1);

  const [aliBadge, setAliBadge] = useState('');
  const [saraBadge, setSaraBadge] = useState('');
  

  const loadStats = async () => {

    const aliScoreSaved =
      await AsyncStorage.getItem('score_Ali');

    const aliLevelSaved =
      await AsyncStorage.getItem('level_Ali');

    const saraScoreSaved =
      await AsyncStorage.getItem('score_Sara');

    const saraLevelSaved =
      await AsyncStorage.getItem('level_Sara');

    const aliBadgeSaved =
      await AsyncStorage.getItem('badge_Ali');

    const saraBadgeSaved = 
        await AsyncStorage.getItem('badge_Sara');

    if (aliScoreSaved) {
      setAliScore(JSON.parse(aliScoreSaved));
    }

    if (aliLevelSaved) {
      setAliLevel(JSON.parse(aliLevelSaved));
    }

    if (saraScoreSaved) {
      setSaraScore(JSON.parse(saraScoreSaved));
    }

    if (saraLevelSaved) {
      setSaraLevel(JSON.parse(saraLevelSaved));
    }

    if (aliBadgeSaved) {
        setAliBadge( JSON.parse(aliBadgeSaved) );
        }

        if (saraBadgeSaved) {
        setSaraBadge(JSON.parse(saraBadgeSaved) );
        }
  };

        useEffect(() => {
            loadStats();
        }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        👨 Parent Dashboard
      </Text>

      <Text
        style={{
          fontSize: 22,
          marginBottom: 10,
        }}
      >
        👦 Ali
      </Text>

      <Text>
        Animal Score: {aliScore}
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Animal Level: {aliLevel}


      </Text>
         <Text style={{
            marginBottom: 20,
        }}
        >
        Achievement: {aliBadge || 'None'}
        </Text>
      <Text
        style={{
          fontSize: 22,
          marginBottom: 10,
        }}
      >
        👧 Sara
      </Text>

      <Text>
        Animal Score: {saraScore}
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Animal Level: {saraLevel}

      </Text>
                <Text
            style={{
                marginBottom: 20,
            }}
            >
            Achievement: {saraBadge || 'None'}
            </Text>
      <TouchableOpacity
        onPress={() =>
          setShowDashboard(false)
        }
      >
        <Text
          style={{
            color: 'blue',
            fontSize: 20,
          }}
        >
          ⬅ Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}