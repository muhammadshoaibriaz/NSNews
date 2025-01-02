import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArticleCard from '../customs/ArticleCard';
import Header from '../customs/Header';
import {font} from '../constants/font';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {baseUrl} from '../../db/IP';
import {useDispatch} from 'react-redux';
import {getArticlesSuccess} from '../redux/slices/articleSlice';
import {getRecommendedNews} from '../../db/funtionalDatabase';

const ITEM_WIDTH = Dimensions.get('screen').width;
const SPACING = 14;

export default function Home({navigation, route}) {
  // State to store news articles
  const dispatch = useDispatch();
  const [articles, setArticles] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('SBNews!', 'Are you sure you want to exit?', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []),
  );

  useEffect(() => {
    getArticles();
    fetchBreakingNews();
    getRecommended();
  }, []);
  const getArticles = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/posts`);
      setArticles(response.data);
      dispatch(getArticlesSuccess(response.data));
    } catch (error) {
      console.log('Error while getting articles', error);
    }
  };

  const fetchBreakingNews = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/breaking-news`);
      setBreakingNews(response.data);
      // console.log('response.data', response.data);
    } catch (error) {
      console.log('Error while getting articles', error);
    }
  };

  const getRecommended = async () => {
    const response = await getRecommendedNews();
    console.log('response', response);
  };

  // const refreshing = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    try {
      getArticles();
      fetchBreakingNews();
    } catch (er) {
      console.log(er);
    } finally {
      setRefreshing(false);
    }
  };
  if (!articles || !breakingNews) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size={30} color={'chocolate'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Header
        title="Scribblr"
        icon1="notifications-outline"
        icon2="bookmark-outline"
        key={'home-header'}
        navigation={navigation}
        onPress1={() => navigation.navigate('Notify')}
        onPress2={() => navigation.navigate('Bookmarks')}
      />

      {/* ScrollView for News Sections */}
      <View style={styles.scrollViewContent}>
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={['chocolate', 'green', 'red', 'blue']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60}}>
          {/* Breaking News Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle} onPress={getArticles}>
              Breaking News
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={breakingNews}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            scrollEnabled
            scrollEventThrottle={32}
            decelerationRate={'fast'}
            contentContainerStyle={{paddingRight: SPACING}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => navigation.navigate('Details', {item})}>
                  <View style={styles.cardWrapper}>
                    <ImageBackground
                      source={{uri: item?.imageUrl}}
                      style={styles.imageBackground}
                      resizeMode="cover">
                      <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>
                          {item?.category} · {item?.datePosted.slice(0, 10)}
                        </Text>
                        <Text style={styles.cardTopic} numberOfLines={2}>
                          {item?.title}
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          {/* Recommendation Article Cards */}
          <ArticleCard
            data={articles}
            navigation={navigation}
            title="Recommendation"
            subtitle="View all"
          />
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
  scrollViewContent: {
    flex: 1,
  },
  trendingNews: {},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 14,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: font.sm_bold,
    fontSize: 18,
  },
  viewAllText: {
    fontFamily: font.medium,
    fontSize: 12,
    color: '#2196F3',
  },
  imageBackground: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 14,
    width: '100%',
    paddingHorizontal: 12,
  },
  cardTitle: {
    fontFamily: font.medium,
    color: '#eee',
    fontSize: 13,
  },
  cardTopic: {
    fontFamily: font.sm_bold,
    color: '#fff',
    fontSize: 18,
    marginTop: 6,
    flex: 1,
  },
  cardWrapper: {
    marginLeft: SPACING,
    width: ITEM_WIDTH - 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
