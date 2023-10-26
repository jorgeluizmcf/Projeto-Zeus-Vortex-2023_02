import React, {useState} from 'react';
import {Alert, Modal, Image, StyleSheet, Text, TouchableOpacity, Pressable, View} from 'react-native';

const ListModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={{fontSize: 28, fontWeight: "bold", color: "#504c50"}}>Adicionar Despesa</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
            style={styles.footerButton}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={require("../assets/list-icon.png")}
              style={styles.list}
            />
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 350,
    height: 500,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  list: {
    width: 40, // Largura da imagem
    height: 40, // Altura da imagem
    backgroundColor: "#468c9c",
    borderRadius: 50, // Bordas arredondadas (metade da largura/altura)
  },

  footerButton: {
    // Estilos para os botões no rodapé
    backgroundColor: "#468c9c", // Cor de fundo do botão
    marginLeft: 70,
    marginBottom: 4,
    padding: 10, // Espaçamento interno do botão
    borderRadius: 50, // Bordas arredondadas do botão
  },

});

export default ListModal;