import axios from "axios";
const baseUrl = "http://192.168.0.105:8000";

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
