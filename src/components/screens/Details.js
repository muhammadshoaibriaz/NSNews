import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  StatusBar,
} from 'react-native';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
  PaperAirplaneIcon,
} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
import {useDispatch} from 'react-redux';
import {addBookMark} from '../redux/slices/bookMarkSlice';

export default function Details({route, navigation}) {
  const {item} = route.params;
  const dispatch = useDispatch();
  const addToBookmark = items => {
    dispatch(addBookMark(items));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color="#fff" size={20} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => addToBookmark(item)}>
            <BookmarkIcon size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => {
              Share.share({
                title: item?.title,
                message: item?.description,
                url: item?.author_image,
              });
            }}>
            <PaperAirplaneIcon
              style={styles.airplaneIcon}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Notify')}>
            <EllipsisHorizontalCircleIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.scrollView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image and Title */}
          <View style={styles.imageContainer}>
            <Image source={item?.image_url} style={styles.mainImage} />
            <Text style={styles.title}>{item?.title}</Text>
          </View>
          {/* Content */}
          <View style={styles.contentContainer}>
            {/* Author Section */}
            <View style={styles.authorSection}>
              <View style={styles.authorInfo}>
                <Image source={item?.author_image} style={styles.authorImage} />
                <View style={styles.authorDetails}>
                  <Text style={styles.authorName}>{item?.author}</Text>
                  <Text style={styles.authorHandle}>@{item?.author}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followText}>Follow</Text>
              </TouchableOpacity>
            </View>

            {/* Source and Content */}
            <Text style={styles.source}>{item?.channel_name}</Text>
            <Text style={styles.content}>{item?.description}</Text>
          </View>
        </ScrollView>
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
    backgroundColor: 'transparent',
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
  },
  authorHandle: {
    fontFamily: font.regular,
    textTransform: 'lowercase',
    opacity: 0.6,
  },
  followButton: {
    width: 90,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a1614b',
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
});
