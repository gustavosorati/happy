import axios from "axios";
import { Platform } from "react-native";


export const api = axios.create({
  baseURL: Platform.OS === "android"
    ? "http://192.168.12.7:3333/"
    : "http://localhost:3333/",
});
