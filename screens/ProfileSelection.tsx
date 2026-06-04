import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileSelection({
  setSelectedProfile,
}: any) {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👦');

  const avatars = ['👦', '👧', '🦸', '👸', '🦁', '🚀', '🐶', '🐱'];

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    const savedProfiles = await AsyncStorage.getItem('profiles');

    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    } else {
      const defaultProfiles = [
        { name: 'Ali', avatar: '👦' },
        { name: 'Sara', avatar: '👧' },
      ];

      setProfiles(defaultProfiles);
      await AsyncStorage.setItem('profiles', JSON.stringify(defaultProfiles));
    }
  };

  const addProfile = async () => {
    if (!newName.trim()) return;

    const newProfile = {
      name: newName.trim(),
      avatar: selectedAvatar,
    };

    const updatedProfiles = [...profiles, newProfile];

    setProfiles(updatedProfiles);

    await AsyncStorage.setItem(
      'profiles',
      JSON.stringify(updatedProfiles)
    );

    setNewName('');
    setSelectedAvatar('👦');
  };

  const deleteProfile = async (
      profileName: string
    ) => {

      const updatedProfiles =
        profiles.filter(
          (profile) =>
            profile.name !== profileName
        );

      setProfiles(updatedProfiles);

      await AsyncStorage.setItem(
        'profiles',
        JSON.stringify(updatedProfiles)
      );
    };

    const renameProfile = async (oldName: string) => {
    const newName = prompt('Enter new name');

    if (!newName || !newName.trim()) return;

    const cleanName = newName.trim();

    const updatedProfiles = profiles.map((profile) =>
      profile.name === oldName
        ? { ...profile, name: cleanName }
        : profile
    );

    setProfiles(updatedProfiles);

    await AsyncStorage.setItem(
      'profiles',
      JSON.stringify(updatedProfiles)
    );

      const keys = [
        'score',
        'level',
        'badge',
        'memoryBadge',
        'gamesPlayed',
      ];

    for (const key of keys) {
      const oldValue = await AsyncStorage.getItem(`${key}_${oldName}`);

      if (oldValue !== null) {
        await AsyncStorage.setItem(`${key}_${cleanName}`, oldValue);
        await AsyncStorage.removeItem(`${key}_${oldName}`);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 25,
        }}
      >
        Choose Player
      </Text>

      {profiles.map((profile) => (
        <View
        key={profile.name}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >

    <TouchableOpacity
      onPress={() =>
        setSelectedProfile(profile.name)
      }
      style={{
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 20,
        width: 190,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 24,
        }}
      >
        {profile.avatar} {profile.name}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() =>
        deleteProfile(profile.name)
      }
      style={{
        backgroundColor: '#F44336',
        marginLeft: 10,
        padding: 15,
        borderRadius: 15,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 20,
        }}
      >
        ❌
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => renameProfile(profile.name)}
      style={{
        backgroundColor: '#FFC107',
        marginLeft: 10,
        padding: 15,
        borderRadius: 15,
      }}
    >
      <Text style={{ fontSize: 20 }}>
        ✏️
      </Text>
    </TouchableOpacity>

  </View>
        ))}

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 25,
          marginBottom: 10,
        }}
      >
        ➕ Add New Kid
      </Text>

      <TextInput
        placeholder="Kid name"
        value={newName}
        onChangeText={setNewName}
        style={{
          borderWidth: 1,
          width: 240,
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
          backgroundColor: 'white',
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: 260,
          marginBottom: 15,
        }}
      >
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar}
            onPress={() => setSelectedAvatar(avatar)}
            style={{
              padding: 10,
              margin: 5,
              borderRadius: 10,
              backgroundColor:
                selectedAvatar === avatar ? '#FFC107' : '#E0E0E0',
            }}
          >
            <Text style={{ fontSize: 28 }}>{avatar}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={addProfile}
        style={{
          backgroundColor: '#2196F3',
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>
          Save Kid
        </Text>
      </TouchableOpacity>
    </View>
  );
}