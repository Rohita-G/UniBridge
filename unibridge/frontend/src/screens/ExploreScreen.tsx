import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer'; // Optional

const ExploreScreen = () => {
  const navigation = useNavigation(); // Use the hook

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Explore Opportunities</Text>
        </View>

        <FeatureCard
          title="Find Internship"
          description="Discover internship opportunities based on your skills."
          navigateTo="InternshipScreen"
          color="#F6A8B4"
          emoji="🚀"
          navigation={navigation}  // Pass navigation prop
        />
        <FeatureCard
          title="Find Project"
          description="Explore freelance projects and collaborate on innovative ideas."
          navigateTo="ProjectScreen"
          color="#B8D8D8"
          emoji="💼"
          navigation={navigation}  // Pass navigation prop
        />
        <FeatureCard
          title="Find Hackathons"
          description="Join exciting hackathons to develop your skills and network."
          navigateTo="HackathonScreen"
          color="#C4D9FE"
          emoji="🏆"
          navigation={navigation} // Pass navigation prop
        />
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: 20,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });


export default ExploreScreen;
