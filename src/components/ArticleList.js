// src/components/ArticleList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ArticleList = ({ articles, onPressArticle }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressArticle(item.url)}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.byline}</Text>
              <Text style={styles.date}>{formatDate(item.published_date)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    marginTop: 4,
    color: '#555',
  },
  date: {
    marginTop: 4,
    color: '#888',
  },
});

export default ArticleList;
