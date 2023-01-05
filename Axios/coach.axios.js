import axios from "axios";
const baseUrl = "https://mindcraft-server.onrender.com";

export const getCoach = async () => {
  return await axios.get(`${baseUrl}/getcoach`);
};

export const sendMail = async (content) => {
  return await axios.post(`${baseUrl}/sendmail`,{
    name:content.name,
    topic:content.topic,
    email:content.email,
    description:content.description
  });
};
