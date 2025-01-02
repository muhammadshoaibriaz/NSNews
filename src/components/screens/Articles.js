import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ListBulletIcon, Squares2X2Icon} from 'react-native-heroicons/outline';
import ListView from '../customs/ListView';
import {font} from '../constants/font';
import CardView from '../customs/CardView';
import axios from 'axios';
import {baseUrl} from '../../db/IP';

export default function Articles({navigation, articles, userDetails, token}) {
  const [isGridView, setIsGridView] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onLongPress = async postId => {
    try {
      const response = await axios.delete(`${baseUrl}/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log('Post deleted successfully');
      } else {
        console.log('Failed to delete post');
      }
    } catch (err) {
      console.log('Error deleting post', err.message);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    try {
    } catch (error) {
      console.log('Error while fetching user details');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{articles?.length} Articles</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsGridView(false)}>
            <ListBulletIcon
              size={20}
              color={!isGridView ? '#a1614b' : '#777'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsGridView(true)}>
            <Squares2X2Icon size={20} color={isGridView ? '#a1614b' : '#777'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Articles List */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 14,
          // alignItems: 'center',
          // justifyContent: 'center',
        }}>
        {articles?.length < 1 ? (
          <Text
            style={{
              textAlign: 'center',
              fontFamily: font.medium,
              bottom: 20,
              fontSize: 20,
            }}>
            No articles found!
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['red', 'green', 'blue']}
              />
            }
            data={articles}
            removeClippedSubviews={false}
            contentContainerStyle={{
              flexDirection: isGridView ? 'row' : 'column',
              flexWrap: isGridView ? 'wrap' : 'nowrap',
              justifyContent: isGridView ? 'space-between' : 'flex-start',
              paddingBottom: 10,
            }}
            renderItem={({item, index}) => {
              return (
                <View style={{flex: 1}}>
                  {!isGridView ? (
                    <ListView
                      key={index}
                      item={item}
                      onLongPress={() => onLongPress(item?._id)}
                      userDetails={userDetails}
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 14,
  },
  headerTitle: {
    fontFamily: font.medium,
    fontSize: 16,
  },
  viewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingHorizontal: 14,
    paddingBottom: 60,
  },
  noItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
