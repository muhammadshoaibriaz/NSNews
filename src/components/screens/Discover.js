import React, {useState, useEffect, memo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dialog} from 'react-native-elements';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addFollowing} from '../redux/slices/followingSlice';
import axios from 'axios';
import {baseUrl} from '../../db/IP';
import LottieView from 'lottie-react-native';

const Item = memo(({item, index, dispatch}) => {
  const [follow, setFollow] = useState(false);
  const handleFollow = () => setFollow(!follow);
  // console.log(item);
  return (
    <View style={styles.personList}>
      <View style={styles.personDetails}>
        <Image
          source={{uri: item?.picture?.large}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.username} numberOfLines={1}>
            {item?.name?.first + ' ' + item?.name?.last || 'Unknown'}
          </Text>
          <Text style={styles.handle}>
            @{item?.name?.first + item?.name?.last || 'unknown'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.followButton,
          {backgroundColor: follow ? 'white' : '#a1614b'},
        ]}
        onPress={() => {
          handleFollow();
          dispatch(addFollowing(item));
        }}>
        <Text style={[styles.followText, {color: follow ? '#111' : '#fff'}]}>
          {follow ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default function Discover({route, navigation}) {
  // console.log(route?.params);
  const {username, data} = route?.params;
  const [visible, setVisible] = useState(false);
  const [author, setAuthors] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  data
    .filter(val => val.selected === true)
    .map(item => preferences.push(item?.name));
  // console.log(preferences);
  useEffect(() => {
    const getRandomUser = async () => {
      const results = await axios.get('https://randomuser.me/api/?results=100');
      // console.log(results.data);
      setAuthors(results.data.results);
    };
    getRandomUser();
  }, []);
  // console.log(preferences);

  const handleContinue = () => {
    setVisible(false);
    navigation.replace('Login');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const results = await axios.post(`${baseUrl}/api/register`, {
        ...route?.params,
        preferences,
      });
      if (results.status === 200) {
        Alert.alert('User exist!', 'User Already exist.');
      } else {
        setLoaded(true);
        setVisible(true);
        await AsyncStorage.setItem('token', 'token passed');
        setTimeout(() => {
          setLoaded(false);
        }, 5000);
        await AsyncStorage.setItem('user', `${username}`);
      }
    } catch (error) {
      console.error('Error while creating user account ', error);
    } finally {
      setLoading(false);
    }
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
      {/* <View style={{flex: 0.6}}> */}
      <FlatList
        data={author}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <Item item={item} index={index} dispatch={dispatch} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* </View> */}
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
            <LottieView
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

      <TouchableOpacity onPress={handleSubmit} style={styles.finishButton}>
        {loading ? (
          <ActivityIndicator size={20} color={'#fff'} />
        ) : (
          <Text style={styles.finishText}>Finish</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    flex: 1,
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
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    bottom: 10,
  },
  finishText: {
    fontFamily: font.medium,
    color: '#fff',
  },
});
