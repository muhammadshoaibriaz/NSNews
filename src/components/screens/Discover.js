import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dialog} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({item, index}) => {
  const [follow, setFollow] = useState(false);

  const handleFollow = () => setFollow(!follow);

  return (
    <View style={styles.personList}>
      <View style={styles.personDetails}>
        <Image
          source={require('../../../assets/images/tolgaa.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.username} numberOfLines={1}>
            {item?.username || 'Unknown'}
          </Text>
          <Text style={styles.handle}>@{item?.username || '@unknown'}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.followButton,
          {backgroundColor: follow ? 'white' : '#a1614b'},
        ]}
        onPress={handleFollow}>
        <Text style={[styles.followText, {color: follow ? '#111' : '#fff'}]}>
          {follow ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Discover() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [author, setAuthors] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleFinish = async () => {
    setVisible(true);
    setLoaded(true);
    await AsyncStorage.setItem('token', 'token passed');
    setTimeout(() => {
      setLoaded(false);
    }, 5000);
  };

  const handleContinue = () => {
    setVisible(false);
    navigation.navigate('Tab');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}>
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>Discover people 🥰</Text>
      <Text style={styles.subtitle}>Pick some people to follow.</Text>
      <FlatList
        data={author}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <Item item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <Dialog
        isVisible={visible}
        transparent={true}
        animationType="fade"
        onDismiss={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        statusBarTranslucent={true}
        overlayStyle={styles.dialogOverlay}
        backdropStyle={styles.dialogBackdrop}>
        <View style={styles.dialogContainer}>
          <Animatable.Image
            animation="zoomIn"
            source={require('../../../assets/images/success.png')}
            style={styles.successImage}
          />
          <Text style={styles.dialogTitle}>Sign Up Successfully</Text>
          <Text style={styles.dialogSubtitle}>
            Your account has been created. Please wait a moment, we are
            preparing for you.
          </Text>
          {loaded ? (
            <Image
              style={styles.loadingImage}
              source={{
                uri: 'https://i.gifer.com/origin/e4/e439272bf16c2df6b43e480de9fb1810_w200.gif',
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={handleContinue}
              style={styles.continueButton}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
      </Dialog>

      <TouchableOpacity onPress={handleFinish} style={styles.finishButton}>
        <Text style={styles.finishText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  goBackButton: {
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
  subtitle: {
    fontSize: 16,
    fontFamily: font.regular,
    marginBottom: 20,
  },
  personList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  personDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
  },
  username: {
    fontFamily: font.medium,
    fontSize: 15,
    width: 160,
    textTransform: 'capitalize',
  },
  handle: {
    fontFamily: font.regular,
    fontSize: 12,
    color: '#999',
    textTransform: 'lowercase',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  followButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
  },
  followText: {
    fontFamily: font.sm_bold,
    fontSize: 12,
  },
  dialogOverlay: {
    borderRadius: 30,
  },
  dialogBackdrop: {
    backgroundColor: '#00000099',
  },
  dialogContainer: {
    width: '100%',
    height: 360,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successImage: {
    width: 140,
    height: 140,
  },
  dialogTitle: {
    fontFamily: font.sm_bold,
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    color: '#a1614b',
  },
  dialogSubtitle: {
    fontFamily: font.medium,
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingImage: {
    width: 140,
    height: 120,
  },
  continueButton: {
    backgroundColor: '#a1614b',
    marginTop: 10,
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  continueText: {
    fontFamily: font.sm_bold,
    color: '#fff',
  },
  finishButton: {
    backgroundColor: '#a1614b',
    marginTop: 10,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  finishText: {
    fontFamily: font.medium,
    color: '#fff',
  },
});
