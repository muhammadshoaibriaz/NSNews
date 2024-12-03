import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ListView from './ListView';
import {font} from '../constants/font';
export const SPACING = 14;

export default function ArticleCard({
  data,
  title = 'World War 2',
  subtitle = 'View all',
  navigation,
}) {
  const renderItem = ({item, index}) => {
    // console.log(item);
    return (
      <ListView
        key={`list-view${index}`}
        item={item}
        onPress={() => navigation.navigate('Details', {item})}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </TouchableOpacity>
      </View>

      {/* Article List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    marginTop: SPACING,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SPACING,
    marginBottom: SPACING,
  },
  title: {
    fontFamily: font.sm_bold,
    fontSize: 18,
  },
  subtitle: {
    fontFamily: font.medium,
    fontSize: 12,
    color: '#1E90FF',
  },
  listContent: {
    paddingHorizontal: SPACING,
  },
  blogImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    position: 'relative',
    backgroundColor: 'lightblue',
    paddingBottom: 4,
    marginRight: SPACING,
    marginBottom: 10,
  },
  iconBtn: {
    width: 28,
    height: 28,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 6,
    top: 6,
  },
});
