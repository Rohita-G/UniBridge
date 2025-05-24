import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedButton from '../components/AnimatedButton';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  const typingTexts = [
    "Explore exciting internship opportunities 🚀",
    "Join hackathons and showcase your skills 💡",
    "Freelance gigs to help you grow your portfolio 💼",
    "Build your future with UniBridge, designed by students for students!"
  ];

  const [typedText, setTypedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [charIndex, setCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const currentText = typingTexts[typingIndex];
    const timeout = setTimeout(() => {
      if (direction === 1 && charIndex < currentText.length) {
        setTypedText(prev => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      } else if (direction === 1 && charIndex === currentText.length) {
        setTimeout(() => setDirection(-1), 1000);
      } else if (direction === -1 && charIndex > 0) {
        setTypedText(prev => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      } else if (direction === -1 && charIndex === 0) {
        setTypingIndex(prev => (prev + 1) % typingTexts.length);
        setDirection(1);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [charIndex, direction, typingIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>UniBridge</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Unlock Your Future with AI-based Career Opportunities</Text>
        <Text style={styles.infoText}>Real-time AI matching for internships, hackathons, and freelance gigs</Text>
        <Text style={styles.infoText}>Get personalized suggestions that align with your skills and goals</Text>
        <Text style={styles.infoText}>Join a community of passionate students and mentors!</Text>

        <AnimatedButton
          title="Explore Opportunities 🚀"
          onPress={() => navigation.navigate('Explore')}
        />

        

        <View style={styles.typingContainer}>
          <Text style={styles.typingText}>
            {typedText}
            {cursorVisible && <Text style={styles.cursor}>|</Text>}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Designed with care by students, for students.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    color: '#2e3a59',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#3e5c7e',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#3e5c7e',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#3e5c7e',
    fontWeight: '600',
  },
  typingContainer: {
    marginTop: 20,
    backgroundColor: '#0f172a',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  typingText: {
    fontSize: 18,
    color: '#f7f8fc',
    fontFamily: 'monospace',
  },
  cursor: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#f7f8fc',
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 13,
    color: '#777',
  },
});
