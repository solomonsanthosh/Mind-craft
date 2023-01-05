import axios from "axios";
const baseUrl = "https://mindcraft-server.onrender.com";

export const getMusic  = async (topic) => {return (
    await axios.get(`${baseUrl}/getmusic/${topic}`)
)}