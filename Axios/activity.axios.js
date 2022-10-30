import axios from "axios";
const baseUrl = "https://mind-craft-server.herokuapp.com";

export const getActivity = async (topic) => {

    return (
    await axios.get(`${baseUrl}/getactivity/${topic}`)
)}