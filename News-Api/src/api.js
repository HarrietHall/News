import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://news-api-ney0.onrender.com/api",
});

export const getArticles = () => {
  return newsApi.get("/articles").then((res) => {
    return res.data.article;
  });
};

