import axios from "axios";
const baseUrl = "https://mindcraft-server.onrender.com";

export const updateTopic = async (email, topic) => {
  await axios
    .post(`${baseUrl}/topic`, {
      user: {
        email: email,
        topic: topic,
      },
    })
    .then((res) => {
      
    });
};

export const getTest = async (topic) => {
  console.log(topic);
  return (
  await axios.get(`${baseUrl}/test/${topic}`)
)};

export const updateSeverity = async (email,ans) => {
   console.log(email,ans);
    await axios.post(`${baseUrl}/updateseverity`,{
        email: email,
        ans: ans
    })
}
