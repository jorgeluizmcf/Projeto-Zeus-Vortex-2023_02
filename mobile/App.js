import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import AppDropDown from "./components/AppDropDown";
import AnoDropDown from "./components/AnoDropDown";
import { useState } from "react";
import DespesasSwiper from "./components/Swipper";
import { PieChart } from "react-native-gifted-charts";

export default function App() {
  const [monthToFilter, setMonthToFilter] = useState();
  const [yearsToFilter, setYearsToFilter] = useState();


  const data=[  {value: 200, color: '#B86D37', text: '25%'},
                {value: 200, color: '#46719C', text: '25%'},
                {value: 200, color: '#469C72', text: '25%'},
                {value: 200, color: '#446957', text: '25%'}, ];

  const months = [
    { label: "Janeiro", value: "janeiro" },
    { label: "Fevereiro", value: "fevereiro" },
    { label: "Março", value: "março" },
    { label: "Abril", value: "abril" },
    { label: "Maio", value: "maio" },
    { label: "Junho", value: "junho" },
    { label: "Julho", value: "julho" },
    { label: "Agosto", value: "agosto" },
    { label: "Setembro", value: "setembro" },
    { label: "Outubro", value: "outubro" },
    { label: "Novembro", value: "novembro" },
    { label: "Dezembro", value: "dezembro" }
  ];
  const years = [
    { label: "2023", value: 2023 },
    { label: "2022", value: 2022 },
];

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
    <View style={styles.container}>
      <View style={styles.header}>
        
        <View style={styles.petProfile}>
          <Image
            source={require("./assets/foto-pet-default.jpg")}
            style={styles.fotoPet}
          />
          <Text style={styles.nomePet}>Zeus</Text>
        </View>

        <View style={styles.containerPeriodFilter}>
          <AppDropDown
            style={styles.periodFilter}
            options={months}
            selected={monthToFilter}
            setSelected={setMonthToFilter}
            valueField="value"
            placeholder="Outubro"
          />
          <AnoDropDown
            style={styles.periodFilter}
            options={years}
            selected={yearsToFilter}
            setSelected={setYearsToFilter}
            valueField="value"
            placeholder="2023"
          />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.despesasContainer}>
          <DespesasSwiper></DespesasSwiper>
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


            <PieChart
              donut
              data={data}
              innerCircleColor="#e0d9d2"
              innerRadius = {60}
              showValuesAsLabels={true}
              showText
              textSize={18}
              centerLabelComponent={() => {
                return (
                  <View>
                    <Text style={{color: '#504c50', fontSize: 18}}>Total</Text>
                    <Text style={{color: '#504c50', fontSize: 36}}>90</Text>
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

      </View>


      <View style={styles.footer}>
        {/* Botão 1 */}
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            // Lógica para o botão 1
          }}
        >
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>

        {/* Botão 2 */}
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            // Lógica para o botão 2
          }}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

                {/* Botão 3 */}
                <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            // Lógica para o botão 2
          }}
        >
          <Text style={styles.buttonText}>Listar</Text>
        </TouchableOpacity>

      </View>
     
    </View>
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
    height: 136, // Altura da barra azul
    position: "absolute", // Posição absoluta
    top: 0, // No topo
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

  nomePet: {
    color: "white", // Cor do texto
    fontSize: 16, // Tamanho da fonte
    marginLeft: 20,
  },

  containerPeriodFilter: {
    width: "70%",
    flexDirection: "row", // Alinhe os itens verticalmente
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "space-around",
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
    backgroundColor: "white", // Cor de fundo do botão
    padding: 10, // Espaçamento interno do botão
    borderRadius: 5, // Bordas arredondadas do botão
  },

  buttonText: {
    color: "#468c9c", // Cor do texto dos botões
    fontSize: 16, // Tamanho da fonte do texto
  },
});
