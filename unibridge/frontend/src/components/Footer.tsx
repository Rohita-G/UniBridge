import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Designed with care by students, for students.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f7f8fc',
  },
  footerText: {
    fontSize: 13,
    color: '#777',
  },
});

export default Footer;
