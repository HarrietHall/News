import './ArticleListCard.css'


const ArticleListCard = ({title, author, topic, comment_count,votes,  article_img_url, created_at}) => {

    return (
  
      <li className="ArticleListCard" >
           <h2>Title: {title}</h2>
        <p>Author: {author}</p>
        <p>Topic: {topic}</p>
        <p>comment_count: {comment_count}</p>
        <p>votes: {votes}</p>
        <p>article_img_url: {article_img_url}</p>
        <p>created_at: {created_at}</p>
      </li>
    );
  };
  
  export default ArticleListCard;
  