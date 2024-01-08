// src/components/SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter keyword"
        value={keyword}
        borderWidth={1}
        onChangeText={(text) => setKeyword(text)}
        onSubmitEditing={handleSearch}
        onKeyPress={handleKeyPress}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={{ color: 'white' }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#8B0086',
    borderColor: 'white',
    color: 'white'
  },
  button: {
    backgroundColor: '#580055',
    padding: 10,
    borderRadius: 4,
  },
});

export default SearchBar;
