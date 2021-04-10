import axios from "axios";

const API_URL = "http://localhost:8080/";

async function getAllItems() {
  const { data: items } = await axios.get(API_URL);
  return items;
}

export default {getAllItems };