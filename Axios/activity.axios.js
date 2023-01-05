import axios from "axios";
const baseUrl = "https://mindcraft-server.onrender.com";









export const getActivity = async (topic) => {

    return (
    await axios.get(`${baseUrl}/getactivity/${topic}`)
)}