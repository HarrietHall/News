import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://news-api-ney0.onrender.com/api",
});

export const getArticles = () => {
  return newsApi.get("/articles").then((res) => {
    return res.data.article;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getArticleComments = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const patchArticleVotes = (article_id) => {
    const patchRequestBody = {
     inc_votes: newVotes
    };
    return newsApi
      .patch(`/articles/${article_id}`, patchRequestBody)
      .then((res) => {
          return res.data.article;
      });
  };
  
  export const getUsers = () => {
    return newsApi.get('/users').then((res) => {
      return res.data.users
    })
  
  }