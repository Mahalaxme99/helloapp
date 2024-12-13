import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserDetails = ({ route }) => {
  const { user } = route.params;
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigation();

  const handleFeedbackSubmit = () => {
    console.log('User Feedback:', feedback);
    Alert.alert("Success", "Feedback Submitted");
    setFeedback('');
    navigation.goBack();
  };

  const navigateToChatbot = () => {
    navigation.navigate('Chatbot', { user });
  };

  const navigateToQA = () => {
    navigation.navigate('QA', { user });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailContainer}>
        <Image source={{ uri: user.picture.large }} style={styles.image} />
        <Text style={styles.name}>{user.name.first} {user.name.last}</Text>
        <Text style={styles.details}>Location: {user.location.city}, {user.location.state}</Text>
        <Text style={styles.details}>Email: {user.email}</Text>
        <Text style={styles.details}>Phone: {user.phone}</Text>

        <TextInput
          style={styles.feedbackInput}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Write your feedback"
          multiline
        />
        <View style={{ top: '20%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
              <Button title="Submit Feedback" onPress={handleFeedbackSubmit} color={'#A6CE39'} />
            </View>
            <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
              <Button title={`Chat with ${user.name.first} ${user.name.last}`} onPress={navigateToChatbot} color={'#A6CE39'} />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Button title="View Questions & Answers" onPress={navigateToQA} />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  detailContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    marginTop: 5,
  },
  feedbackInput: {
    width: '100%',
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
});

export default UserDetails;
