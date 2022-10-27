import axios from "axios";
const baseUrl = "https://mind-craft-server.herokuapp.com";

export const getMusic  = async (topic) => {return (
    await axios.get(`${baseUrl}/getmusic/${topic}`)
)}