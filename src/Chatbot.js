import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Chatbot = () => {
  const route = useRoute();
  const { user } = route.params;

  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const predefinedAnswers = [
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

  const handleSend = () => {
    if (question.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', text: question },
        { type: 'bot', text: predefinedAnswers[messages.length] || "I'm sorry, I don't have an answer for that." },
      ]);
      setQuestion('');
    }
  };

  return (
    <View style={styles.container}>
    <View style={{marginVertical: 30,marginHorizontal:20}}>
      <Text style={styles.header}>Chatbot with {user.name.first}</Text>
      
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={msg.type === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {messages.length < 10 && (
        <>
          <TextInput
            value={question}
            onChangeText={setQuestion}
            style={styles.input}
            placeholder="Ask a question..."
          />
          <Button title="Send" onPress={handleSend} />
        </>
      )}
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
    marginBottom: 10,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  messageText: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Chatbot;
