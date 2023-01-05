import axios from "axios";
const baseUrl = "https://mindcraft-server.onrender.com";

export const createUser = async (name, email) => {

  return (await axios.post(`${baseUrl}/createuser`, {
    user: {
      email: email,
      name: name,
    },
  }))
};

export const getSingleUser = async (email) => {

  return await axios.get(`${baseUrl}/getsingleuser/${email}`);
};


export const updateImage = async (email, image) => {
  await axios
    .post(`${baseUrl}/updateimage`, {
      
        email: email,
        image: image,
     
    })
    .then((res) => {
      
    });
};

export const getprofile = async (email) => {

  return await axios.get(`${baseUrl}/getprofile/${email}`);
};
