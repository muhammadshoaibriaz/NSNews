import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
import {TouchableHighlight} from 'react-native';

const renderItem = ({item, index}) => {
  return (
    <TouchableHighlight
      key={index.toString()}
      onPress={() => {}}
      underlayColor={'#eee'}>
      <View style={styles.listView}>
        <Text style={styles.writerCount}>{index + 1}</Text>
        <Image source={item?.author_image} style={styles.avatar} />
        <View style={styles.listItem}>
          <Text style={styles.name}>{item?.author}</Text>
          <Text style={styles.source}>@{item?.channel_name.split(' ')}</Text>
        </View>
        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.follow}>Follow</Text>
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );
};

export default function TopWriter({navigation}) {
  const [data, setData] = useState([
    {
      author: 'John Doe',
      channel_name: 'Apple Newsroom',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      author: 'Jane Smith',
      channel_name: 'Google Blog',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      author: 'Alex Johnson',
      channel_name: 'Tesla Blog',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      author: 'Emily Davis',
      channel_name: 'Meta Newsroom',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      author: 'Michael Lee',
      channel_name: 'Microsoft Blog',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      author: 'Sophia Brown',
      channel_name: 'Samsung Newsroom',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      author: 'Daniel Wilson',
      channel_name: 'Amazon Newsroom',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      author: 'Olivia White',
      channel_name: 'NVIDIA Blog',
      author_image: require('../../../assets/images/Images.png'),
    },
    {
      author: 'Lucas Martin',
      channel_name: 'Microsoft Blog',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      author: 'Sophia Green',
      channel_name: 'Tesla Blog',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowLeftIcon size={20} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Top writer</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 60}}
          showsVerticalScrollIndicator={false}
        />
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
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: font.sm_bold,
    marginLeft: 14,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  listItem: {
    flex: 1,
    marginLeft: 8,
  },
  name: {
    fontFamily: font.sm_bold,
    fontSize: 16,
  },
  source: {
    fontFamily: font.regular,
    fontSize: 12,
    textTransform: 'lowercase',
  },
  writerCount: {
    fontFamily: font.sm_bold,
    fontSize: 16,
    marginRight: 14,
  },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#a1614b',
    borderRadius: 50,
  },
  follow: {
    fontFamily: font.medium,
    color: '#fff',
    fontSize: 12,
  },
});
