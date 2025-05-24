// src/screens/InternshipScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InternshipScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Internship Opportunities</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default InternshipScreen;
