import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from "react-native";
import DespesasSwiper from "./Swipper";
import { PieChart } from "react-native-gifted-charts";
import SelectDropdown from 'react-native-select-dropdown'
import Api from '../Api/Api';
import AddModal from "./AddModal";
import ListModal from "./ListModal";

export default function Home() {
    const [refresh, setRefresh] = useState(false);
  
    const monthTest = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const yearTest = ["2023", "2022"];
  
    const monthNumberToMonthName = (monthNumber) =>{
      switch (monthNumber){
        case 1:
          return 'janeiro';
          break;
        case 2:
          return 'fevereiro';
          break;
        case 3:
          return 'março';
          break;
        case 4:
          return 'abril';
          break;
        case 5:
          return 'maio';
          break;
        case 6:
          return 'junho';
          break;
        case 7:
          return 'julho';
          break;
        case 8:
          return 'agosto';
          break;
        case 9:
          return 'setembro';
          break;
        case 10:
          return 'outubro';
          break;
        case 11:
          return 'novembro';
          break;
        case 12:
          return 'dezembro';
          break;
        default:
          //apenas para tirar warning
          ;   
      }
    }
  
    const [selectedMonth, setSelectedMonth] = useState(
      ()=>{
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() +1;
        console.log(currentMonth);
        return monthNumberToMonthName(currentMonth)
      }
    );
  
    const [selectedYear, setSelectedYear] = useState(()=>{
      const currentDate = new Date();
      return currentDate.getFullYear();
    });

    useEffect(() => {
      fetchCategoriaValues(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear, refresh]);
  
    const [cardsData, setCardsData] = useState([
      { id: 0, title: 'Alimentação', image: require('../assets/icone-ração-mobile.png'), value: '0' },
      { id: 1, title: 'Higiene', image: require('../assets/icone-higiene.png'), value: '0' },
      { id: 2, title: 'Brinquedos', image: require('../assets/icone-brinquedos.png'), value: '0' },
      { id: 3, title: 'Veterinário', image: require('../assets/icone-veterinario.png'), value: '0' }
    ]);
  
    const [data, setData] = useState([ // Inicialize data como um estado
        { value: 0, color: '#B86D37' },
        { value: 0, color: '#46719C' },
        { value: 0, color: '#469C72' },
        { value: 0, color: '#446957' },
    ]);
  
    const fetchCategoriaValues =  (mes, ano) => {
      const categorias = [0, 1, 2, 3]; // Um array de IDs de categoria
      // Atualize o estado de refresh para mostrar o indicador de carregamento
      setRefresh(true);

      const formatValue = (value) => {
        // Use o método toLocaleString() para formatar como moeda brasileira
        const tempValue = `${value.toFixed(2)}`;
        return tempValue.replace('.', ',');
      }

        let dataToChange = data
       categorias.forEach((categoriaId) => {
        Api.get(`/calcular-total-mes/${mes}/${ano}/${categoriaId}`).then((response) => {
            dataToChange[categoriaId].value = response.data.total            
            // Atualize o estado das despesas com os valores da resposta da API
            setCardsData((prevData) =>
                prevData.map((item) =>
                item.id === categoriaId
                    ? { ...item, value: formatValue(response.data.total) }
                    : item
                ),
            );
        })
        .catch((error) => {
          console.error('Erro na solicitação:', error);
        });
      });
      setData(dataToChange)
      
      // Após a conclusão da busca, pare de exibir o indicador de carregamento
      setRefresh(false);
    };
    const totalValue = data.reduce((total, item) => total + item.value, 0);

    // Dentro do seu componente, você pode formatar o valor total das despesas
    const formattedTotalExpenses = `R$ ${totalValue.toFixed(2)}`; // Limita a 2 casas decimais
    // Substitua o ponto (.) pela vírgula (,) na string formatada
    const formattedTotalExpensesWithComma = formattedTotalExpenses.replace('.', ',');
 
    const renderLegend = (text, color) => {
      return (
        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View
            style={{
              height: 18,
              width: 18,
              marginRight: 10,
              borderRadius: 4,
              backgroundColor: color || 'white',
            }}
          />
          <Text style={{color: '#504c50', fontSize: 16}}>{text || ''}</Text>
        </View>
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="white" />
        <View style={styles.header}>
          
          <View style={styles.petProfile}>
            <Image
              source={require("../assets/foto-pet-default.jpg")}
              style={styles.fotoPet}
            />
            <Text style={styles.nomePet}>Zeus</Text>
          </View>
  
          <View style={styles.containerPeriodFilter}>
            <Text style={{ color: "white", fontSize: 25, fontWeight: 'bold'}}>Período</Text>
            <View style={styles.buttonsPeriodFilter}>
              <Text style={{fontWeight: "bold", color: "white", fontSize: 16}}>˅</Text>
              <SelectDropdown
                  data={monthTest}
                  onSelect={(selectedItem, index) => {
                    setSelectedMonth(monthNumberToMonthName(index + 1))
                  }}
                  buttonStyle={styles.ButtonDropDown}
                  buttonTextStyle={styles.ButtonTextDropDown}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                  defaultValue={"Outubro"}
                />
  
                <Text style={{fontWeight: "bold", color: "white", fontSize: 16}}>  ˅</Text>
  
                <SelectDropdown
                  data={yearTest}
                  defaultValue={2023}
                  onSelect={(selectedItem, index) => {
                    setSelectedYear(selectedItem)
                  }}
                  buttonStyle={styles.ButtonDropDownAno}
                  buttonTextStyle={styles.ButtonTextDropDown}
  
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }}
                />
            </View>
          </View>
        </View>
  

                
        <ScrollView style={styles.body}>
          <View style={styles.despesasContainer}>
            <DespesasSwiper cardsData={cardsData}></DespesasSwiper>
          </View>
  
          <View style={styles.dashboard}>
          <View
              style={{
                marginHorizontal: 30,
                borderRadius: 10,
                backgroundColor: "#e0d9d2",
                justifyContent: 'center',
                alignItems: 'center',
              }}>
  
  
              {/*********************    Custom Header component      ********************/}
              <Text
                style={{
                  color: '#504c50',
                  fontSize: 32,
                  fontWeight: 'bold',
                  marginBottom: 12,
                }}>
                Dashboard
              </Text>
              {/****************************************************************************/}
  
              {refresh && <ActivityIndicator size="large" color="#468c9c" />} 
              <PieChart
                donut
                data={data}
                innerCircleColor="#e0d9d2"
                innerRadius = {60}
                textSize={18}
                centerLabelComponent={() => {
                  return (
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                      <Text style={{color: '#504c50', fontSize: 18}}>Total</Text>
                      <Text style={{color: '#504c50', fontSize: 12}}>{formattedTotalExpensesWithComma}</Text>
                    </View>
                  );
                }}
              />
  
  
              {/*********************    Custom Legend component      ********************/}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  marginTop: 10,
                }}>
                {renderLegend('Alimentação', '#B86D37')}
                {renderLegend('Higiene', '#46719C')}
                {renderLegend('Brinquedos', '#469C72')}
                {renderLegend('Veterinário', '#446957')}
              </View>
              {/****************************************************************************/}
  
            </View>
          </View>
  
        </ScrollView>
  
  
        <View style={styles.footer}>
  
            <Image
              source={require("../assets/icon-app.png")}
              style={styles.logo}
            />
                    
            <AddModal></AddModal>

            <ListModal></ListModal>
  
        </View>
       
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#e0d9d2",
      alignItems: "center",
      justifyContent: "center",
    },
  
    header: {
      backgroundColor: "#468c9c", // Cor de fundo azul
      width: "100%", // Largura total
      height: 180, // Altura da barra azul
      position: "absolute", // Posição absoluta
      top: 0, // No topo
      paddingTop: 40,
      flexDirection: "row", // Para alinhar a imagem horizontalmente
      padding: 8,
      alignItems: "center",
      shadowColor: "black",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowRadius: 10,
      elevation: 10,
    },
  
    petProfile: {
      flexDirection: "column", // Alinhe os itens verticalmente
      alignItems: "flex-start", // Alinhe à esquerda
      marginTop: 8, // Espaço acima do nome do pet
    },
  
    fotoPet: {
      width: 80, // Largura da imagem
      height: 80, // Altura da imagem
      borderRadius: 50, // Bordas arredondadas (metade da largura/altura)
    },
  
    logo: {
      marginLeft: 24,
      width: 50, // Largura da imagem
      height: 50, // Altura da imagem
    },

    nomePet: {
      color: "white", // Cor do texto
      fontSize: 16, // Tamanho da fonte
      marginTop: 4,
      marginLeft: 20,
    },
  
    containerPeriodFilter: {
      width: "70%",
      flexDirection: "columns", // Alinhe os itens verticalmente
      marginLeft: 16,
      alignItems: "center",
      justifyContent: "space-around",
      // borderColor: "red", // Cor da borda
      // borderWidth: 2, // Largura da borda
    },
  
    buttonsPeriodFilter: {
      width: "70%",
      flexDirection: "row", // Alinhe os itens verticalmente
      alignItems: "center",
      justifyContent: "space-between",
      // borderColor: "red", // Cor da borda
      // borderWidth: 2, // Largura da borda
    },
  
    periodFilter: {
      width: 100, 
      color: "white", // Cor do texto
      fontSize: 22, // Tamanho da fonte
    },
  
    body: {
      flex: 1,
      marginTop: 136,
      // borderColor: "red", // Cor da borda
      // borderWidth: 2, // Largura da borda
    },
  
    despesasContainer: {
      height: 240,
      marginTop: 44,
      // borderColor: "red", // Cor da borda
      // borderWidth: 2, // Largura da borda
    },
  
    dashboard: {
      justifyContent: 'center',
      alignItems: 'center',
      // borderColor: "red", // Cor da borda
      // borderWidth: 2, // Largura da borda
    },
  
    footer: {
      flexDirection: "row",
      backgroundColor: "#468c9c", // Cor de fundo da barra de rodapé
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      height: 60, // Altura da barra de rodapé
    },
  
    footerButton: {
      // Estilos para os botões no rodapé
      backgroundColor: "#468c9c", // Cor de fundo do botão
      padding: 10, // Espaçamento interno do botão
      borderRadius: 50, // Bordas arredondadas do botão
    },
  
    buttonText: {
      color: "#468c9c", // Cor do texto dos botões
      fontSize: 16, // Tamanho da fonte do texto
    },
  
    ButtonDropDown: {
      backgroundColor: "#468c9c",
      width: 130
  
    },
  
    ButtonDropDownAno: {
      backgroundColor: "#468c9c",
      width: 80
  
    },
  
    ButtonTextDropDown: {
      color: "white",
    }
  });
  