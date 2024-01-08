// App.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator , Linking, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import SearchBar from './src/components/SearchBar';
import ArticleList from './src/components/ArticleList';
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = 'DkZHtwsIBRePz4QCbORXQfNLbCkQGz46'; // New York Times API key

const HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchArticles = async (keyword) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${API_KEY}`
      );
      const extractedArticles = response.data.response.docs.map((doc) => ({
        id: doc._id,
        title: doc.headline.main,
        byline: doc.byline.original,
        published_date: doc.pub_date,
        url: doc.web_url,
      }));
      setArticles(extractedArticles);
      setError(null);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  

  const handlePressArticle = (url) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    searchArticles('');
  }, [])

  console.log('created by Husein Nabil')

  return (
    <LinearGradient
      colors={['#FFB5FC', '#FFF4FF']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <LinearGradient
        colors={['#580055', '#D100C9']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.header}
      >
        <Text style={styles.title}>New York Times</Text>
        <SearchBar onSearch={searchArticles} />
      </LinearGradient>
      {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#580055" />
      </View>
      ) : articles.length > 0 ? (
        <ArticleList articles={articles} onPressArticle={handlePressArticle} />
      ) : (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 16, textAlign: 'center', color: '#580055' }}>
          {error ? 'Error fetching articles. Please try again.' : 'Not found any articles. Try searching with another keyword.'}
        </Text>
      </View>
    )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#580055'
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
