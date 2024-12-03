import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {font} from '../constants/font';

export default function Interest({navigation}) {
  const [data, setData] = useState([
    {name: 'Science & Technology', selected: false},
    {name: 'Design', selected: false},
    {name: 'Politics', selected: false},
    {name: 'Health', selected: false},
    {name: 'Economy', selected: false},
    {name: 'Sports', selected: false},
    {name: 'Music', selected: false},
    {name: 'Life style', selected: false},
    {name: 'Education', selected: false},
    {name: 'Social and cultural', selected: false},
    {name: 'Energy', selected: false},
    {name: 'Business', selected: false},
    {name: 'Environment', selected: false},
    {name: '3D', selected: false},
    {name: 'Crime', selected: false},
    {name: 'Video', selected: false},
    {name: 'Government', selected: false},
    {name: 'Anime', selected: false},
    {name: 'Movies', selected: false},
  ]);

  const toggleSelect = index => {
    const updatedData = [...data];
    updatedData[index].selected = !updatedData[index].selected;
    setData(updatedData);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Select your topic of interest 🏷</Text>

      {/* Description */}
      <Text style={styles.description}>
        Select topic of interest for your better recommendations, or you can
        skip it.
      </Text>

      {/* Topics List */}
      <View style={styles.topicsContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleSelect(index)}
            activeOpacity={1}
            style={[
              styles.topicButton,
              {
                backgroundColor: item.selected ? '#a1614b' : '#fff',
                borderColor: item.selected ? '#ddd' : '#a1614b',
                borderWidth: item.selected ? 2 : 1,
              },
            ]}>
            <Text
              style={[
                styles.topicText,
                {color: item.selected ? '#fff' : '#111'},
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Skip & Continue Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Tab')}
          style={[styles.button, styles.skipButton]}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Discover')}
          style={[styles.button, styles.continueButton]}>
          <Text style={[styles.buttonText, styles.continueText]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'relative',
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: font.sm_bold,
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: font.regular,
    marginBottom: 20,
  },
  topicsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicButton: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  topicText: {
    fontFamily: font.medium,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    alignSelf: 'center',
    marginTop: 30,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  skipButton: {
    backgroundColor: '#eee',
    borderWidth: 0,
  },
  continueButton: {
    backgroundColor: '#a1614b',
  },
  buttonText: {
    fontFamily: font.medium,
  },
  continueText: {
    color: '#fff',
  },
});
