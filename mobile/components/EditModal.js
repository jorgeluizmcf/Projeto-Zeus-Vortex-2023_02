import React, {useState} from 'react';
import {Alert, Modal, Image, StyleSheet, Text, TouchableOpacity, Pressable, View, ActivityIndicator} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import CurrencyInput from 'react-native-currency-input';
import Api from '../Api/Api';

const EditModal = ( {despesa} ) => {
    const [editFormData, setEditFormData] = useState({
        tipoDespesa: despesa.tipoDespesa,
        valorDespesa: despesa.valorDespesa,
        mesDespesa: despesa.mesDespesa,
        anoDespesa: despesa.anoDespesa,
      });
      const [category, setCategory] = useState(0);
    
      const handleEditChange = (e, fieldName) => {
        const { value } = e.target;
        let editedValue = value;
    
        if (fieldName === 'valorDespesa') {
          // Remove todos os caracteres não numéricos
          const numericValue = value.replace(/[^0-9]/g, '');
          // Formatar o valor com uma vírgula
          editedValue = formatValue(numericValue);
        }
    
        setEditFormData({
          ...editFormData,
          [fieldName]: editedValue,
        });
    };
  
  
    const [modalVisible, setModalVisible] = useState(false);
    const categorias = ["Alimentação", "Higiene", "Brinquedos", "Veterinário"]
    const [value, setValue] = React.useState(0);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(0);

  const handleSubmit = () => {

    if (value === 0 || value === null) {
      console.log('O valor da despesa não pode ser zero.');
      return; // Saia da função se o valor for zero
    }
    // Realize a solicitação POST para o seu servidor
      Api.post('/despesas', {
        tipoDespesa: categoriaSelecionada, // Pega o índice da categoria selecionada
        valorDespesa: value.toString(),
      })
      .then((response) => {
        // Lidar com a resposta de sucesso, se necessário
        console.log('Despesa cadastrada com sucesso!', response.data);
        setValue(0);
        setModalVisible(false); // Feche o modal após o sucesso
        setRefresh(true);
      })
      .catch((error) => {
        // Lidar com erros, se necessário
        console.error('Erro ao salvar despesa:', error);
      });
      alert("Despesa adicionada!")
  };


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
            <Text style={{fontSize: 28, fontWeight: "bold", color: "#504c50"}}>Editar Despesa</Text>
            <Text style={styles.modalText}>Inserir categoria:</Text>
            <SelectDropdown
                  data={categorias}
                  onSelect={(selectedItem, index) => {setCategoriaSelecionada(index)}}
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
                            />
            
                <SelectDropdown
                  data={categorias}
                  onSelect={(selectedItem, index) => {setCategoriaSelecionada(index)}}
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

                <SelectDropdown
                  data={categorias}
                  onSelect={(selectedItem, index) => {setCategoriaSelecionada(index)}}
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
            
            <View style={{flexDirection: "row", gap: 24}}>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleSubmit}
                >
                <Text style={styles.textStyleConfirm}>Confirmar</Text>
                </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
            style={[styles.button, styles.buttonEdit]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    width: 350,
    height: 520,
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
  
  buttonEdit: {
    backgroundColor: '#e0d9d2',
    width: 80,
    alignItems: "center"
  },

  textStyle: {
    color: '#504c50',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textStyleConfirm: {
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
    backgroundColor: "#6098a8",
    borderRadius: 50, // Bordas arredondadas (metade da largura/altura)
  },

  footerButton: {
    // Estilos para os botões no rodapé
    backgroundColor: "#6098a8", // Cor de fundo do botão
    marginLeft: 93,
    marginBottom: 10,
    padding: 5, // Espaçamento interno do botão
    borderRadius: 50, // Bordas arredondadas do botão
  },

  ButtonDropDown: {
    backgroundColor: "#e0d9d2",
    borderRadius: 20,
    width: 150
  },

});

export default EditModal;