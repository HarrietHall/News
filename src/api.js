import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://news-api-ney0.onrender.com/api",
});

export const getArticles = (topic, sort_by, order) => {
  return newsApi
    .get("/articles", {
      params: { topic: topic, sort_by: sort_by, order: order },
    })
    .then((res) => {
      return res.data.article;
    });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getArticleComments = (article_id, comment_id) => {
  return newsApi
    .get(`/articles/${article_id}/comments`, {
      params: { comment_id: comment_id },
    })
    .then((res) => {
      return res.data.comments;
    });
};
export const deleteComment = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`).then((res) => {
       return res
  });
};

export const patchArticleVotes = (article_id, newVotes) => {
  const patchRequestBody = {
    inc_votes: newVotes,
  };
  return newsApi
    .patch(`/articles/${article_id}`, patchRequestBody)
    .then((res) => {
      return res.data.article;
    });
};

export const getUsers = () => {
  return newsApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const postComment = (article_id, newComment, user) => {
  const postRequestBody = {
    username: user,
    body: newComment,
  };

  return newsApi
    .post(`/articles/${article_id}/comments`, postRequestBody)
    .then((res) => {
      return res.data.comment;
    });
};
