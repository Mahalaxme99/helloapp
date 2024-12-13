import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const QA = () => {
  const questions = [
    'How are you?',
    'What are you?',
    'What is your favorite color?',
    'Do you need sleep?',
    'Can you help me?',
    'Do you like helping people?',
    'Do you have pets?',
    'Can you travel?',
    'What are your hobbies?',
    'Can you answer questions?'
  ];

  const answers = [
    "I'm good, thank you!",
    "I am a chatbot created to help you.",
    "I like learning new things!",
    "My favorite color is blue.",
    "I don't need sleep, I am a bot.",
    "Yes, I can help you with many tasks!",
    "I love answering your questions.",
    "I don't have any pets, but I think dogs are cute.",
    "I can't travel, but I can read about different places!",
    "My favorite hobby is helping people like you."
  ];

  return (
    <View style={styles.container}>
      <View style={{marginVertical: 30,}}>
      <Text style={styles.header}>Questions & Answers</Text>
      <ScrollView>
        {questions.map((question, index) => (
          <View key={index} style={styles.qaContainer}>
            <Text style={styles.question}>Q: {question}</Text>
            <Text style={styles.answer}>A: {answers[index]}</Text>
          </View>
        ))}
      </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qaContainer: {
    marginBottom: 15,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    color: '#555',
  },
});

export default QA;
