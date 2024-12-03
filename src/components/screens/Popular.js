import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
import ListView from '../customs/ListView';
import CardView from '../customs/CardView';

export default function Popular({navigation}) {
  const [articles, setArticles] = useState([
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
  const [isGridView, setIsGridView] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={20} color="#777" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Most Popular</Text>
        </View>
        <View style={styles.headerRight}>
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
          data={articles}
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
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: font.medium,
    marginLeft: 10,
  },
  headerRight: {
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
  bookmarkList: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    position: 'relative',
    backgroundColor: '#fff',
    paddingBottom: 4,
    marginVertical: 4,
  },
  blogImage: {
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: font.medium,
    marginLeft: 5,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  userContainer: {
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
    fontFamily: font.medium,
    color: '#a1614b',
  },
  timestamp: {
    fontSize: 10,
    fontFamily: font.regular,
  },
});
