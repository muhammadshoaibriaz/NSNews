import React, {useState, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import {
  ListBulletIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
import ListView from '../customs/ListView';
import CardView from '../customs/CardView';
import {useSelector} from 'react-redux';

export default function Search({navigation}) {
  const data = useSelector(state => state.article?.articles);
  const [isGridView, setIsGridView] = useState(false);
  const [fileteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  const handleSearch = useCallback(
    val => {
      setQuery(val);
      const filteredData = data.filter(newItem =>
        newItem.title.toLowerCase().includes(val.toLowerCase()),
      );
      setFilteredData(filteredData);
    },
    [data],
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <ArrowLeftIcon size={20} color="#888" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <MagnifyingGlassIcon size={20} color="#888" />
          <TextInput
            style={styles.input}
            onChangeText={handleSearch}
            placeholder="Search for news or article writer"
          />
        </View>
      </View>

      <View style={styles.articleHeader}>
        <Text style={styles.articleCount}>{data.length} Articles</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setIsGridView(false)}>
            <ListBulletIcon size={20} color={isGridView ? '#777' : '#a1614b'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setIsGridView(true)}>
            <Squares2X2Icon size={20} color={isGridView ? '#a1614b' : '#777'} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={query?.length < 1 ? data : fileteredData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            isGridView && {
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }
          }
          renderItem={({item, index}) => {
            return (
              <View>
                {!isGridView ? (
                  <ListView
                    key={index}
                    item={item}
                    onPress={() => navigation.navigate('Details', {item})}
                  />
                ) : (
                  <CardView
                    key={'CardView'}
                    item={item}
                    onPress={() => navigation.navigate('Details', {item})}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  backBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: 45,
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
    fontFamily: font.regular,
  },
  articleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  articleCount: {
    fontFamily: font.medium,
    fontSize: 16,
  },
  viewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  flatlistContainer: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 8,
    position: 'relative',
    paddingBottom: 4,
  },
  blogImage: {
    borderRadius: 20,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#a1614b',
    borderRadius: 20,
    padding: 6,
  },
  cardContent: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat3',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 40,
  },
  username: {
    fontSize: 12,
    marginLeft: 5,
    fontFamily: 'Montserrat3',
    color: '#a1614b',
  },
});
