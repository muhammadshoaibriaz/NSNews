import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  SectionList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {font} from '../constants/font';
import {useDispatch, useSelector} from 'react-redux';
import {addFollowing, removeFollowing} from '../redux/slices/followingSlice';
import axios from 'axios';
import {baseUrl} from '../../db/IP';
import User from '../customs/User';

export default function Following({navigation, route}) {
  const dispatch = useDispatch();
  // const following = useSelector(state => state.following.following);
  const [author, setAuthors] = useState([]);
  const {user} = route?.params;

  // For Fetching authors
  useEffect(() => {
    const getRandomUser = async () => {
      const results = await axios.get('https://randomuser.me/api/?results=2');
      setAuthors(results.data.results);
    };
    getRandomUser();
  }, []);

  const [following, setFollowing] = useState([]);
  // console.log('followers', following);
  const userId = user?._id;
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/register/${userId}/followers-following`,
        );
        setFollowing(response.data.following);
      } catch (error) {
        console.error('Error fetching following and following', error);
      }
    };

    fetchFollowers();
  }, []);

  // toggle Follow / unFollow
  const toggleFollow = item => {
    if (following.some(f => f.login.uuid === item.login.uuid)) {
      dispatch(removeFollowing(item));
    } else {
      dispatch(addFollowing(item));
    }
  };

  const userInfo = useSelector(user => user.login.user);
  const token = userInfo?.token;

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 14}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}>
          <AntDesign name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>People you followed! </Text>
      </View>
      <View style={{flex: 1}}>
        <SectionList
          sections={[
            {title: 'Following', data: following},
            {title: 'Suggested for you', data: author},
          ]}
          keyExtractor={(item, index) => item?.login?.uuid || index.toString()}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
          )}
          renderItem={({item, index, section}) => (
            <User
              item={item}
              token={token}
              navigation={navigation}
              isFollowed={
                section.title === 'Following' ||
                following.some(f => f?.login?.uuid === item?.login?.uuid)
              }
              toggleFollow={() => toggleFollow(item)}
              index={index}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    borderColor: '#eee',
  },
  followText: {
    fontFamily: font.sm_bold,
    fontSize: 12,
  },
  suggested: {
    paddingVertical: 10,
  },
  suggestedText: {
    fontFamily: font.sm_bold,
    fontSize: 16,
    color: '#666',
  },
  sectionHeader: {
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  sectionHeaderText: {
    fontFamily: font.sm_bold,
    fontSize: 18,
  },
});
