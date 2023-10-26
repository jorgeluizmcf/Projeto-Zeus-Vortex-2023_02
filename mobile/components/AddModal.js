import React, {useState} from 'react';
import {Alert, Modal, Image, StyleSheet, Text, TouchableOpacity, Pressable, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import CurrencyInput from 'react-native-currency-input';

const AddModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const categorias = ["Alimentação", "Higiene", "Brinquedos", "Veterinário"]
  const [value, setValue] = React.useState(0);
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
            <Text style={styles.modalText}>Inserir categoria:</Text>
            <SelectDropdown
                  data={categorias}
                  onSelect={(selectedItem, index) => {

                  }}
                  buttonStyle={styles.ButtonDropDown}
                  buttonTextStyle={styles.ButtonTextDropDown}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                  defaultValue={"Alimentação"}
                />
            <CurrencyInput
                            style={{marginVertical: 24, backgroundColor: "#e0d9d2", height: 40, width: 140, borderRadius: 20, paddingLeft: 16}}
                            value={value}
                            onChangeValue={setValue}
                            prefix="R$ "
                            delimiter="."
                            separator=","
                            precision={2}
                            minValue={0}
                            maxValue={11111}
                            onChangeText={(formattedValue) => {
                                console.log(formattedValue); // R$ 2.310,46
                            }}
                            />
            
            <View style={{flexDirection: "row", gap: 24}}>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                >
                <Text style={styles.textStyle}>Confirmar</Text>
                </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
            style={styles.footerButton}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={require("../assets/add_circle.png")}
              style={styles.add}
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
    height: 350,
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

  add: {
    width: 55, // Largura da imagem
    height: 55, // Altura da imagem
    backgroundColor: "#468c9c",
    borderRadius: 50, // Bordas arredondadas (metade da largura/altura)
  },

  footerButton: {
    // Estilos para os botões no rodapé
    backgroundColor: "#468c9c", // Cor de fundo do botão
    marginLeft: 93,
    marginBottom: 5,
    padding: 10, // Espaçamento interno do botão
    borderRadius: 50, // Bordas arredondadas do botão
  },

  ButtonDropDown: {
    backgroundColor: "#e0d9d2",
    borderRadius: 20,
    width: 150
  },

});

export default AddModal;