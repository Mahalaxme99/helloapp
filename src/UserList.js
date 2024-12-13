import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const UserList = () => {
const navigation = useNavigation();
  const [text, setText] = useState('');
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [duringMomentum, setDuringMomentum] = useState(false);

  const inputRef = useRef(null);

  const getContacts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const { data: { results: fetchedContacts } } = await axios.get(
        `https://randomuser.me/api?results=10&page=${page}`,
      );

      const updatedContacts = [...contacts, ...fetchedContacts];

      if (refreshing) {
        updatedContacts.reverse();
      }

      setContacts(updatedContacts);
      setAllContacts(updatedContacts);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  }, [contacts, page, refreshing, loading]);

  
  useEffect(() => {
    getContacts();
  }, [page, refreshing, getContacts]);

  const onRefresh = () => {
    setPage(1);
    setRefreshing(true);
  };

  const loadMore = () => {
    if (!duringMomentum) {
      setPage(prevPage => prevPage + 1);
      setDuringMomentum(true);
    }
  };

  const renderContactsItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          { backgroundColor: index % 2 === 0 ? 'white' : '#efefef' },
        ]}
        onPress={() => navigation.navigate('UserDetails', { user: item })}>
        <Image source={{ uri: item.picture.medium }} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name.first}</Text>
          <Text style={styles.company}>{item.location.state}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={{ paddingVertical: 30 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <TextInput
        ref={inputRef}
        onFocus={() => setDuringMomentum(true)}
        onBlur={() => setDuringMomentum(false)}
        onChangeText={text => {
          setText(text);
          searchFilter(text);
        }}
        value={text}
        style={styles.myInput}
        secureTextEntry={false}
        autoCapitalize="words"
        placeholder="Enter search input"
      />
    );
  };

  const searchFilter = useCallback((text) => {
    const filteredContacts = allContacts.filter(item => {
      const listItem = `${item.name.first.toLowerCase()}${item.location.state.toLowerCase()}`;
      return listItem.indexOf(text.toLowerCase()) > -1;
    });
    setContacts(filteredContacts);
  }, [allContacts]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.innercontainer} behavior={isIOS ? 'padding' : undefined}>
        <View>
            <Text style={styles.header}>UserList</Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            ListFooterComponent={renderFooter}
            ListHeaderComponent={renderHeader}
            renderItem={renderContactsItem}
            data={contacts}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={isIOS ? 0.5 : 20}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onMomentumScrollBegin={() => setDuringMomentum(true)}
            onMomentumScrollEnd={() => setDuringMomentum(false)}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innercontainer: {
   paddingVertical: 40,
   paddingHorizontal: 10
  },
  itemContainer: {
    flexDirection: 'row',
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#eeee',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  nameContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',
    marginVertical: 30
  },
  company: {
    marginTop: 5,
  },
  myInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#dddd',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 12,
  },
});

export default UserList;
