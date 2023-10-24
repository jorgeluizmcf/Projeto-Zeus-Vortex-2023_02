import { View, Text, StyleSheet, } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function AppDropDown({
  options,
  selected,
  setSelected,
  placeholder,
  lista,
  classnames,
  disable,
}) {
  const renderItem = (item) => (
    <View>
      <Text>{item.label}</Text>
    </View>
  );

  return (
      <Dropdown
        style={styles.dropdown}
        disable={disable}
        data={options}
        labelField="label"
        valueField="value"
        label="Dropdown"
        placeholder={placeholder}
        value={selected}
        onChange={(item) => {
          setSelected(lista ? item : item.value);
        }}
        renderItem={(item) => renderItem(item)}
        textError="Error"
        placeholderStyle={{ opacity: 0.5, fontSize: 18 }}
        selectedTextStyle={{
          color: "white",
          fontSize: 24,
        }}
        containerStyle={{
          borderRadius: 8,
        }}
      />
  );
}

const styles = StyleSheet.create({
    dropdown:{
        width: 80
    }
})
