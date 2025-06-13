import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {font} from '../constants/font';
import {baseUrl} from '../../db/IP';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import User from '../customs/User';
import {useSelector} from 'react-redux';
import Loading from '../customs/Loading';

export default function Follower({route, navigation}) {
  const {profile} = route?.params;
  // console.log('route', user);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log('followers', followers);
  const userId = profile?._id;
  useEffect(() => {
    setLoading(true);
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/register/${userId}/followers-following`,
        );
        setFollowers(response.data.followers);
      } catch (error) {
        console.error('Error fetching followers and following', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  const userInfo = useSelector(user => user.login.user);
  const token = userInfo?.token;
  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 14, marginTop: 30}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}>
          <AntDesign name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Followers! </Text>
      </View>
      {followers?.length < 1 ? (
        <View style={styles.wrapper}>
          <Text style={styles.nofollowerText}>No followers yet!</Text>
        </View>
      ) : (
        <FlatList
          data={followers}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <User
                token={token}
                navigation={navigation}
                item={item}
                index={index}
              />
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: font.sm_bold,
    fontSize: 20,
    marginLeft: 14,
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: font.sm_bold,
    marginLeft: 14,
  },
  flatListContent: {
    paddingBottom: 60,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: font.medium,
    fontSize: 20,
    color: '#fff',
  },
  listItem: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontFamily: font.sm_bold,
    fontSize: 16,
    color: '#333',
  },
  source: {
    fontFamily: font.regular,
    fontSize: 12,
    color: '#777',
    textTransform: 'lowercase',
  },
  writerCount: {
    fontFamily: font.sm_bold,
    fontSize: 16,
    color: '#555',
    marginRight: 10,
  },
  followBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  followText: {
    fontFamily: font.medium,
    fontSize: 12,
    color: 'chocolate',
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
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nofollowerText: {
    fontFamily: font.sm_bold,
    fontSize: 18,
    opacity: 0.5,
  },
});
