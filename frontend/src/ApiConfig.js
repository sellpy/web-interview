import axios from "axios";

const API_URL = "http://localhost:8080/";

async function getAllItems() {
  const { data: items } = await axios.get(API_URL);
  return items;
}
async function deleteItem(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}

async function updateItem(id, payload) {
  const { data: newItem } = await axios.put(`${API_URL}${id}`, payload);
  return newItem;
}


export default {getAllItems,deleteItem,updateItem };
