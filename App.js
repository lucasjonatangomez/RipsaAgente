import {
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import React, { useState } from 'react';

import Modal from './components/Modal';
import ModalItem from './components/Modal';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');
  const [itemList, setItemList] = useState([
    {"id":"1","date":"20/08/2021 13:05","bank":"BANCO NACION","amount":"$ 1.303.409,00"},
    {"id":"2","date":"18/08/2021 12:52","bank":"BANCO NACION","amount":"$ 2.248.030,00"},
    {"id":"2","date":"13/08/2021 14:41","bank":"BANCO NACION","amount":"$ 1.916.500,00"}
  ]);

  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleChangeText = (text) => {
    setInputText(text)
    setInputError('');
  };

  const handleAddItem = () => {
    if (inputText) {
      setItemList([
        ...itemList,
        {
          id: Math.random().toString(),
          date: new Date().toDateString(),
          bank: "BANCO NACION",
          amount: inputText,
        },
      ]);
      setInputText('');
      setInputError('');
    } else {
      setInputError('Required');
    }
  }

  const handleConfirmDelete = () => {
    const id = itemSelected.id;
    setItemList(itemList.filter(item => item.id !== id));
    setModalVisible(false);
    setItemSelected({});
  }

  const handleModal = id => {
    setItemSelected(itemList.find(item => item.id === id));
    setModalVisible(true);
  }

  return (
    <View style={styles.screen}>
      <ModalItem 
        modalVisible={modalVisible}
        handleConfirmDelete={handleConfirmDelete.bind(this,itemSelected.id)}
        itemSelected={itemSelected}
      />

      <Image
          style={styles.logo}
          source={require("./assets/logo_2.png")}
      />

      <FlatList
        data={itemList}
        renderItem={data => {
          return (
            <View style={[styles.item, styles.shadow]}>
              <View>
                <Image
                    style={styles.comprobante}
                    source={require("./assets/comprobante.png")}
                />              
              </View>
              <View style={{ flexDirection:'column' }}>
                <Text style={styles.itemDate}>{data.item.date}</Text>
                <Text style={styles.itemBank}>{data.item.bank}</Text>
                <Text style={styles.itemAmount}>{data.item.amount}</Text>
              </View>
              <View style={{ flexDirection:'column' }}>
                <Button
                  title="Eliminar"
                  color="#AAAAAA"
                  onPress={() => handleModal(data.item.id)}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Agregar importe"
          style={styles.input}
          onChangeText={handleChangeText}
          amount={inputText}
        />

        <Pressable style={styles.buttonAdd} onPress={handleAddItem}>
          <Text style={styles.buttonAddText}>NUEVO COMPROBANTE</Text>
        </Pressable>
        
      </View>
      <Text style={styles.inputError}>{inputError}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    backgroundColor: '#FFF',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 200,
    marginBottom: 15
  },
  inputError: {
    color: 'red',
  },
  items: {
    marginTop: 20,
  },
  item: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  itemDate:{
    fontSize: 11
  },
  itemBank:{
    fontWeight: 'bold',
    color: '#5c5a5b',
    fontSize: 15,
  },
  itemAmount:{
    fontWeight: 'bold',
  },
  buttonAdd:{
    backgroundColor: '#d7d7d7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3
  },
  buttonAddText:{
    color: '#4c4780',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25
  },
  logo:{
    width: 500, 
    height: 80, 
    marginBottom: 15, 
    marginTop:10
  },
  comprobante:{
    width: 80, 
    height: 80
  }

});