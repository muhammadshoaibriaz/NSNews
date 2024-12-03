import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {
  ArrowLeftIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
import ListView from './ListView';
import CardView from './CardView';
import {useSelector} from 'react-redux';

export default function BookMark({navigation}) {
  const [row, setRow] = useState(false);
  const data = useSelector(state => state.bookmark);
  // console.log(data);

  const renderItem = ({item, index}) => {
    return (
      <View>
        {!row ? (
          <ListView
            item={item}
            key={index}
            onPress={() => navigation.navigate('Details', {item})}
          />
        ) : (
          <CardView
            item={item}
            key={'CardView'}
            onPress={() => navigation.navigate('Details', {item})}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn} onPress={navigation.goBack}>
            <ArrowLeftIcon size={20} color="#777" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Bookmark</Text>
        </View>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate('Search')}>
          <MagnifyingGlassIcon size={20} color="#777" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <Text style={styles.itemCount}>{data.length} items</Text>
        <View style={styles.filterIcons}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setRow(false)}>
            <ListBulletIcon size={20} color={row ? '#777' : '#a1614b'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setRow(true)}>
            <Squares2X2Icon size={20} color={row ? '#a1614b' : '#777'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bookmark List */}
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={
            row && {
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }
          }
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: font.medium,
    marginLeft: 10,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemCount: {
    fontFamily: font.medium,
    fontSize: 16,
  },
  filterIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    paddingBottom: 4,
  },
  blogImage: {
    borderRadius: 20,
  },
  bookmarkBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#a1614b',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 6,
    top: 6,
  },
  cardContent: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: font.medium,
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  username: {
    fontSize: 12,
    marginLeft: 5,
    fontFamily: font.medium,
    color: '#a1614b',
  },
  moreBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
