import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import Header from '../customs/Header';
import ArticleCard from '../customs/ArticleCard';
import Writers from './Writers';
import {font} from '../constants/font';
import axios from 'axios';
import {baseUrl} from '../../db/IP';

export default function Explore({navigation}) {
  const [allNews, setAllNews] = useState([]);
  const [byCategory, setByCategory] = useState([]);

  const [active, setActive] = useState(0);
  const [writers, setWriters] = useState([]);
  const [query, setQuery] = useState('');
  const categories = [
    'entertainment',
    'sports',
    'games',
    'politics',
    'education',
    'technology',
    'travel',
  ];

  useEffect(() => {
    getWriters();
    getArticles();
  }, [active]);

  const getArticles = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/posts`);
      console.log(response.data);
      setAllNews(response.data);
    } catch (err) {
      console.log('Error while getting articles', err);
    }
  };
  const getArticlesByCategory = async category => {
    try {
      const response = await axios.get(`${baseUrl}/api/posts`, {
        params: {category},
      });
      console.log(response.data);
      setByCategory(response.data);
    } catch (err) {
      console.log('Error while getting articles', err);
    }
  };

  const getWriters = async () => {
    try {
      const results = await axios.get(`${baseUrl}/api/get_users`);
      const writer = results.data;
      setWriters(writer);
    } catch (err) {
      console.log('Error while getting users', err.message);
    }
  };

  const handleActive = async val => {
    setActive(val);
    if (val === 0) {
      await getArticles(); // Fetch all articles for "All"
    } else {
      if (categories[val - 1]) {
        await getArticlesByCategory(categories[val - 1]);
      }
    }
  };
  const data = () => {
    return active === 0 ? allNews : byCategory;
  };

  const [filteredData, setFilteredData] = useState([]);
  const handleSearch = text => {
    setQuery(text);
    const filtered = allNews.filter(item =>
      item?.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title="Discover"
        icon2={'ellipsis-horizontal-circle-outline'}
        navigation={navigation}
        key={'explore-header'}
      />
      <View style={styles.wrapperContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 70}}>
          <View style={styles.searchBar}>
            <MagnifyingGlassIcon size={20} color="#888" />
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={handleSearch}
              placeholder="Search for news or article writer"
            />
          </View>
          <ScrollView
            horizontal
            style={{marginTop: 8}}
            contentContainerStyle={{paddingHorizontal: 14}}
            showsHorizontalScrollIndicator={false}>
            {[
              'All',
              'Entertainment',
              'Sports',
              'Games',
              'Politic',
              'Education',
              'Technology',
              'Travel',
            ].map((item, index) => (
              <TouchableOpacity
                onPress={() => handleActive(index)}
                activeOpacity={0.8}
                style={[
                  styles.categoryBtn,
                  {backgroundColor: active === index ? '#2196F3' : '#f6f6f6'},
                ]}>
                <Text
                  style={[
                    styles.category,
                    {color: active === index ? '#fff' : '#444'},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ArticleCard
            navigation={navigation}
            data={query.length < 1 ? data() : filteredData}
            title={categories[active - 1]}
          />
          <Writers navigation={navigation} data={writers} title="Top Writers" />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableBtn: {
    borderRadius: 40,
    backgroundColor: '#a1614b',
    width: 110,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#f6f6f6',
    height: 45,
    paddingLeft: 12,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 4,
    fontFamily: font.medium,
  },
  category: {
    fontFamily: font.medium,
    fontSize: 13,
  },
  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#f6f6f6',
    borderRadius: 60,
    marginRight: 8,
    marginTop: 6,
  },
  wrapperContainer: {
    flex: 1,
  },
});
