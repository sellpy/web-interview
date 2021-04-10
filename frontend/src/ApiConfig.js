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

export default {getAllItems,deleteItem };