import React from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import Header from '../customs/Header';
import {font} from '../constants/font';
import {useSelector} from 'react-redux';
import {
  BackspaceIcon,
  EllipsisVerticalIcon,
} from 'react-native-heroicons/outline';
import {Image} from 'react-native';

export default function Article({route, navigation}) {
  const data = useSelector(state => state.article?.articles);
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <Header
        title="Article"
        navigation={navigation}
        icon1={'add'}
        icon2="search-outline"
        onPress1={() => navigation.navigate('PostArticle')}
        onPress2={() => navigation.navigate('Search')}
      />
      <View style={styles.flatListWrapper}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item, index}) => {
            // console.log(item);
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.card}
                onPress={() => navigation.navigate('Details', {item})}>
                <TouchableOpacity
                  style={[
                    styles.crossIcon,
                    {display: route?.name === 'Bookmarks' ? 'flex' : 'none'},
                  ]}>
                  <BackspaceIcon size={20} color="chocolate" />
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: item?.imageUrl}}
                    style={styles.blogImage}
                    resizeMode="cover"
                  />
                </View>

                {/* Content and Author Information */}
                <View style={styles.contentContainer}>
                  <Text style={styles.sourceText}>{item?.category}</Text>
                  <Text style={styles.contentText}>{item?.title}</Text>

                  {/* Author Info and More Options */}
                  <View style={styles.infoRow}>
                    <TouchableOpacity
                      // onPress={() => navigation.navigate('UserProfile', {item})}
                      style={styles.authorContainer}>
                      <Image
                        source={{uri: item?.authorImage}}
                        style={styles.authorImage}
                      />
                      <Text style={styles.authorText}>
                        {item?.authorName} · {item?.createdAt?.slice(0, 10)}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.moreOptionsBtn}
                      onPress={() => {}}>
                      <EllipsisVerticalIcon size={20} color="#777" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

// Stylesheet for consistent styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListWrapper: {
    flex: 1,
    paddingHorizontal: 12,
  },
  card: {
    marginVertical: 6,
    backgroundColor: '#eee',
    position: 'relative',
    borderRadius: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  contentContainer: {
    marginLeft: 12,
    flex: 1,
  },
  sourceText: {
    fontSize: 11,
    fontFamily: font.medium,
    opacity: 0.6,
    textTransform: 'capitalize',
    marginTop: 4,
  },
  contentText: {
    fontSize: 17,
    fontFamily: font.medium,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 20,
    height: 20,
    borderRadius: 12,
  },
  authorText: {
    fontSize: 10,
    marginLeft: 5,
    fontFamily: font.medium,
    opacity: 0.6,
  },
  moreOptionsBtn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    paddingBottom: 60,
  },
});
