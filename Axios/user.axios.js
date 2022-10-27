import axios from "axios";
const baseUrl = "https://mind-craft-server.herokuapp.com";

export const createUser = async (name, email) => {
  console.log('====================================');
  console.log(name,email);
  console.log('====================================');
  return (await axios.post(`${baseUrl}/createuser`, {
    user: {
      email: email,
      name: name,
    },
  }))
};

export const getSingleUser = async (email) => {
  console.log('====================================');
  console.log(email);
  console.log('====================================');
  return await axios.get(`${baseUrl}/getsingleuser/${email}`);
};



export const getprofile = async (email) => {

  return await axios.get(`${baseUrl}/getprofile/${email}`);
};
