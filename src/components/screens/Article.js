import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../customs/Header';

export default function Article({route, navigation}) {
  const [content, setContent] = useState(''); // Post content
  const [image, setImage] = useState(null); // Image URI
  const [visible, setVisible] = useState(false); // Snackbar visibility

  // Function to pick an image from the gallery
  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      if (result.assets?.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Custom Header */}
      <Header title="Article" navigation={navigation} icon2="search-outline" />

      {/* Main content */}
      <View style={styles.container}>
        {/* Image Picker */}
        <TouchableOpacity style={styles.pickImage} onPress={pickImage}>
          {!image ? (
            <Ionicons name="image-outline" size={90} style={styles.icon} />
          ) : (
            <Image source={{uri: image}} style={styles.image} />
          )}
        </TouchableOpacity>

        {/* Text Input for Post Content */}
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#777"
          multiline
          value={content}
          onChangeText={setContent}
        />

        {/* Post Button */}
        <TouchableOpacity style={styles.postBtn} onPress={() => {}}>
          <Text style={styles.postBtnText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Snackbar for success message */}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        onIconPress={() => setVisible(false)}>
        Post uploaded successfully!
      </Snackbar>
    </View>
  );
}

// Stylesheet for consistent styling
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  pickImage: {
    width: '80%',
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    opacity: 0.1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  input: {
    width: '85%',
    minHeight: 45,
    marginTop: 20,
    maxHeight: 400,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingLeft: 6,
    fontFamily: 'MontserratRegular',
    color: '#333',
  },
  postBtn: {
    width: '85%',
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a1614b',
    marginTop: 20,
  },
  postBtnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'MontserratMedium',
  },
});
