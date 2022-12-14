import axios from "axios";
const baseUrl = "https://mindcraft-server.onrender.com";

export const createPost = async (post) => {

  return await axios.post(`${baseUrl}/createpost`, {
    Post: post,
  });
};

export const getPost = async (topic) => {

  return await axios.get(`${baseUrl}/getpost/${topic}`);
};
export const getStory = async (topic) => {
  return await axios.get(`${baseUrl}/getstory/${topic}`);
};

export const createComment = async (postid, content) => {
  await axios.post(`${baseUrl}/createcomment`, {
    content: content,
    postid: postid,
  });
};
export const createStory = async (topic, user, content) => {
  await axios.post(`${baseUrl}/createstory`, {
    story: content,
    topic: topic,
    owner: user,
  });
};

export const getComment = async (postid) => {
  return await axios.get(`${baseUrl}/getcomment/${postid}`);
};
