import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Animated,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
  PaperAirplaneIcon,
} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
import {useDispatch, useSelector} from 'react-redux';
import {addBookMark} from '../redux/slices/bookMarkSlice';
import axios from 'axios';
import {baseUrl, onFollowing} from '../../db/IP';
import {FAB} from 'react-native-elements';

export default function Details({route, navigation}) {
  const {item} = route.params;
  const dispatch = useDispatch();
  const addToBookmark = items => {
    dispatch(addBookMark(items));
  };

  // console.log(item?.postedBy);
  const userInfo = useSelector(user => user.login.user);
  const token = userInfo?.token;
  // console.log(token);

  // console.log('followId' + followId + 'userId' + userId);
  const [following, setFollowing] = useState(false);
  // console.log(userInfo);
  const onFollow = async () => {
    await onFollowing(item?.postedBy, token);
  };

  const checkFollowStatus = (targetUserId, followingArray) => {
    return followingArray.includes(targetUserId);
  };

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/register`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const isFollowing = checkFollowStatus(
          item?.postedBy,
          response.data.following,
        );
        setFollowing(isFollowing);
        // console.log(isFollowing);
      } catch (error) {
        console.log('Error fetching user details', error.message);
      }
    };

    fetchFollowStatus();
  }, []);

  const [liked, setLiked] = useState(false);
  const likePost = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/post/${item._id}/like-unlike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      setLiked(!liked);
      // dispatch(addLike(response.data));
    } catch (error) {
      console.log('Error liking post', error.message);
    }
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['transparent', '#fff'],
    extrapolate: 'clamp',
  });
  const elevation = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [0, 20],
    extrapolate: 'clamp',
  });
  const [height, setHeight] = useState(0);
  useEffect(() => {
    let handleScroller = scrollY.addListener(({value}) => {
      setHeight(value);
    });
    () => {
      scrollY.removeListener(handleScroller);
    };
  }, []);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  // if (!following) {
  //   return (
  //     <View style={styles.activityIndicator}>
  //       <ActivityIndicator size={30} color={'chocolate'} />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={'#a1614b90'} />
      {/* Header */}
      <Animated.View
        style={[styles.header, {backgroundColor: backgroundColor, elevation}]}>
        <TouchableOpacity
          style={[
            styles.iconBtn,
            {alignItems: 'flex-start', backgroundColor: 'transparent'},
          ]}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color={height < 40 ? '#fff' : 'chocolate'} size={20} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => addToBookmark(item)}>
            <BookmarkIcon
              size={20}
              color={height < 40 ? '#fff' : 'chocolate'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => {
              Share.share({
                title: item?.title,
                message: item?.description,
                url: item?.authorImage,
              });
            }}>
            <PaperAirplaneIcon
              style={styles.airplaneIcon}
              size={20}
              color={height < 80 ? '#fff' : 'chocolate'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Notify')}>
            <EllipsisHorizontalCircleIcon
              size={20}
              color={height < 80 ? '#fff' : 'chocolate'}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View style={styles.scrollView}>
        <ScrollView
          ref={scrollY}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}>
          {/* Image and Title */}
          <View style={styles.imageContainer}>
            <Image source={{uri: item?.imageUrl}} style={styles.mainImage} />
            <Text style={styles.title}>{item?.title}</Text>
          </View>
          {/* Content */}
          <View style={styles.contentContainer}>
            {/* Author Section */}
            <View style={styles.authorSection}>
              <View style={styles.authorInfo}>
                <Image
                  source={{uri: item?.authorImage}}
                  style={styles.authorImage}
                />
                <View style={styles.authorDetails}>
                  <Text style={styles.authorName} onPress={() => {}}>
                    {item?.authorName?.replace('_', ' ')}
                  </Text>
                  <Text style={styles.authorHandle}>@{item?.authorName}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.followButton,
                  {
                    backgroundColor: following ? 'transparent' : 'chocolate',
                    borderWidth: 1,
                    borderColor: following ? '#eee' : 'white',
                  },
                ]}
                onPress={onFollow}>
                <Text
                  style={[
                    styles.followText,
                    {
                      color: following ? 'chocolate' : '#fff',
                    },
                  ]}>
                  {following ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Source and Content */}
            <Text style={styles.source}>{item?.channel_name}</Text>
            <Text style={styles.content}>{item?.description}</Text>
          </View>
        </ScrollView>
        <Animated.View style={[styles.bottomArea]}>
          <FAB
            icon={{name: 'thumb-up', color: liked ? '#a1614b' : 'black'}}
            color="#fff"
            placement="right"
            size="large"
            onPress={likePost}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    height: 50,
    zIndex: 11,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40%',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeee20',
  },
  airplaneIcon: {
    transform: [{rotate: '-35deg'}],
  },
  imageContainer: {},
  mainImage: {
    width: '100%',
    height: 340,
  },
  title: {
    fontFamily: font.medium,
    fontSize: 22,
    textTransform: 'capitalize',
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 14,
    width: '100%',
    color: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 14,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  authorDetails: {
    marginLeft: 10,
  },
  authorName: {
    fontFamily: font.sm_bold,
    fontSize: 18,
    textTransform: 'capitalize',
  },
  authorHandle: {
    fontFamily: font.regular,
    textTransform: 'lowercase',
    opacity: 0.6,
  },
  followButton: {
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a1614b',
    paddingHorizontal: 18,
  },
  followText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: font.sm_bold,
  },
  source: {
    marginTop: 10,
    fontFamily: font.medium,
    color: '#a1614b',
  },
  content: {
    marginTop: 10,
    fontFamily: font.regular,
    color: '#777',
  },
  scrollView: {
    flex: 1,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 10,
    marginLeft: 4,
    fontFamily: font.medium,
    opacity: 0.7,
  },
  bottomArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
