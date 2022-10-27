import axios from "axios";
const baseUrl = "https://mind-craft-server.herokuapp.com";

export const getActivity = async (topic) => {
    console.log('====================================');
    console.log(topic,'lol');
    console.log('====================================');
    return (
    await axios.get(`${baseUrl}/getactivity/${topic}`)
)}