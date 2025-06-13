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
import {fetchUserData} from '../redux/slices/loginSlice';

export default function Details({route, navigation}) {
  const {item} = route.params;
  const postUrl = `http://localhost:3000/api/post/${item?._id}`;
  const dispatch = useDispatch();
  const addToBookmark = items => {
    dispatch(addBookMark(items));
  };
  // console.log('item', item);

  // console.log(item?.postedBy);
  const userInfo = useSelector(state => state.login);
  const {token} = userInfo?.user;

  // console.log('followId', userInfo?.user?.user?._id);
  const [following, setFollowing] = useState(false);
  const onFollow = async () => {
    setFollowing(!following);
    dispatch(fetchUserData());
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
      } catch (error) {
        console.log('Error fetching user details', error.message);
      }
    };
    fetchFollowStatus();
  }, []);

  const [liked, setLiked] = useState(false);
  const likePost = async () => {
    setLiked(!liked);
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
      like();
      // console.log(response.data);
      // dispatch(addLike(response.data));
    } catch (error) {
      console.log('Error liking post', error.message);
    }
  };

  const like = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/notifications/like`, {
        senderId: userInfo?.user?.user?._id,
        receiverId: item?.postedBy,
        postId: item?._id,
      });
      // console.log(response.data);
    } catch (err) {
      console.log('Error liking post', err);
    }
  };

  const scrollY = useRef(new Animated.Value(0)).current;
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
      {/* Header */}
      <Animated.View style={[styles.header]}>
        <TouchableOpacity
          style={[
            styles.iconBtn,
            {alignItems: 'flex-start', backgroundColor: 'transparent'},
          ]}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color={'#fff'} size={20} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => addToBookmark(item)}>
            <BookmarkIcon size={20} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => {
              Share.share({
                title: 'Share Post',
                message: `Check out this post: ${item?.title}\n${postUrl}`,
                url: postUrl,
              });
            }}>
            <PaperAirplaneIcon
              style={styles.airplaneIcon}
              size={20}
              color={'#fff'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Notify')}>
            <EllipsisHorizontalCircleIcon size={20} color={'#fff'} />
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
    marginTop: 30,
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
  imageContainer: {
    position: 'relative',
    height: 300,
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    bottom: 50,
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
