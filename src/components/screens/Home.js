import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArticleCard from '../customs/ArticleCard';
import Header from '../customs/Header';
import {font} from '../constants/font';

const ITEM_WIDTH = Dimensions.get('screen').width;
const SPACING = 14;

export default function Home({navigation}) {
  // State to store news articles
  const [trending, setTrending] = useState([
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
    {
      title: 'Samsung Reveals Next-Gen Foldable Phones',
      description:
        'Samsung has previewed its latest line of foldable smartphones, which feature improved durability and innovative hinge designs. The new models boast enhanced multitasking capabilities and vibrant displays, positioning Samsung as a leader in foldable technology. The devices are expected to hit the market by early next year.',
      image_url: require('../../../assets/images/dell.jpg'),
      published_time: '7 hours ago',
      author: 'Sophia Brown',
      channel_name: 'Samsung Newsroom',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      title: 'Amazon Tests Drone Delivery in Urban Areas',
      description:
        'Amazon has conducted successful tests of its drone delivery system in urban environments. The drones are designed to deliver packages in under 30 minutes, addressing logistical challenges in densely populated areas. This development is a significant step toward the widespread adoption of autonomous delivery systems.',
      image_url: require('../../../assets/images/image.jpg'),
      published_time: '30 minutes ago',
      author: 'Daniel Wilson',
      channel_name: 'Amazon Newsroom',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      title: 'NVIDIA AI Models Revolutionize Gaming Graphics',
      description:
        'NVIDIA has introduced new AI models designed to revolutionize graphics rendering in video games. These models enable real-time ray tracing and enhanced visual fidelity, offering gamers an immersive experience like never before. The technology also optimizes performance, making high-end graphics accessible on a range of devices.',
      image_url: require('../../../assets/images/Images.png'),
      published_time: '4 hours ago',
      author: 'Olivia White',
      channel_name: 'NVIDIA Blog',
      author_image: require('../../../assets/images/Images.png'),
    },
    {
      title: 'Spotify Introduces Personalized AI Playlists',
      description:
        "Spotify has launched AI-curated playlists to provide users with a tailored listening experience. The new feature analyzes user preferences and mood to create dynamic playlists that evolve with each session. This marks another milestone in Spotify's use of AI to enhance user engagement.",
      image_url: require('../../../assets/images/image.jpg'),
      published_time: '2 hours ago',
      author: 'Lucas Martin',
      channel_name: 'Spotify Newsroom',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
    {
      title: 'OpenAI Launches GPT-5 with Multimodal Capabilities',
      description:
        'OpenAI has released GPT-5, its most advanced AI model yet. This iteration is capable of processing text, images, and video inputs, pushing the boundaries of multimodal AI applications. GPT-5 is expected to impact a variety of industries, from content creation to education.',
      image_url: require('../../../assets/images/Images.png'),
      published_time: '6 hours ago',
      author: 'Sophia Green',
      channel_name: 'OpenAI Blog',
      author_image: require('../../../assets/images/tolgaa.png'),
    },
  ]);

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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60}}>
          {/* Breaking News Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Breaking News</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={trending}
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
                      source={item?.image_url}
                      style={styles.imageBackground}
                      resizeMode="cover">
                      <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>
                          {item?.channel_name} · {item?.published_time}
                        </Text>
                        <Text style={styles.cardTopic}>{item?.title}</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          {/* Recommendation Article Cards */}
          <ArticleCard
            data={trending}
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
});
