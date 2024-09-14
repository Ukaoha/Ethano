import { Axios } from "./Axios";

export const users = async () => {
    const { data } = await Axios.get('users');
    return data;
  };
  
  export const posts = async () => {
    const { data } = await Axios.get('posts');
    return data;
  };
  
  export const todos = async () => {
    const { data } = await Axios.get('todos');
    return data;
  };
  
  export const albums = async () => {
    const { data } = await Axios.get('albums');
    return data;
  };
  