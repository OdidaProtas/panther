import {Colors} from "react-native-paper";

const tintColorLight = '#1E352F';
const tintColorDark = Colors.greenA200;

export default {
  light: {
    text: '#1E352F',
    background: '#EAFFDA',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
