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
  BookmarkIcon,
  ListBulletIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
import ListView from '../customs/ListView';
import CardView from '../customs/CardView';

export default function Search({navigation}) {
  const [data, setData] = useState([
    {
      title: 'Apple Unveils New MacBook Pro with M3 Chip',
      description:
        'Apple has announced the launch of its newest MacBook Pro models powered by the M3 chip, promising groundbreaking performance and efficiency. The new lineup includes updated display technologies, improved battery life, and a sleek design, aiming to set a new standard in computing technology. The M3 chip leverages advanced silicon architecture, offering up to 30% faster speeds than its predecessor. Apple continues to lead the market with innovation, appealing to professionals and creatives globally.',
      image_url: require('../../../assets/images/dell.jpg'),
      published_time: '2 hours ago',
      author: 'John Doe',
      channel_name: 'Apple Newsroom',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      title: 'Google Launches AI-Powered Search Features',
      description:
        "Google has rolled out its latest AI-enhanced search capabilities designed to offer users more intuitive and personalized results. The new features utilize machine learning algorithms to better understand complex queries and deliver contextually relevant answers. This marks another step in Google's journey to revolutionize the search experience through cutting-edge artificial intelligence technologies.",
      image_url: require('../../../assets/images/Images.png'),
      published_time: '5 hours ago',
      author: 'Jane Smith',
      channel_name: 'Google Blog',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      title: "Tesla's Cybertruck Hits the Market",
      description:
        "After years of anticipation, Tesla's revolutionary Cybertruck is finally available for purchase. Featuring an unconventional design and advanced autonomous driving capabilities, the Cybertruck has already generated significant buzz in the automotive industry. Tesla promises unmatched durability and efficiency, making this electric truck a game-changer in sustainable transportation.",
      image_url: require('../../../assets/images/image.jpg'),
      published_time: '10 minutes ago',
      author: 'Alex Johnson',
      channel_name: 'Tesla Blog',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      title: 'Meta Develops AI to Combat Fake News',
      description:
        "Meta has unveiled an AI system aimed at combating misinformation across its platforms, including Facebook and Instagram. The tool uses advanced neural networks to identify and flag false content in real-time, ensuring users are exposed to accurate information. This initiative is part of Meta's ongoing effort to enhance the credibility of online media.",
      image_url: require('../../../assets/images/dell.jpg'),
      published_time: '1 hour ago',
      author: 'Emily Davis',
      channel_name: 'Meta Newsroom',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      title: 'Microsoft Azure Expands Quantum Computing Services',
      description:
        'Microsoft has announced the expansion of its quantum computing services within Azure. The update includes new tools for developers to simulate and test quantum algorithms. These advancements aim to make quantum computing accessible to a broader audience, driving innovation across industries such as healthcare, finance, and logistics.',
      image_url: require('../../../assets/images/Images.png'),
      published_time: '3 hours ago',
      author: 'Michael Lee',
      channel_name: 'Microsoft Blog',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
  ]);
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
