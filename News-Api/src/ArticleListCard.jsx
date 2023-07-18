import './ArticleListCard.css'


const ArticleListCard = ({title, author, topic, comment_count,votes, created_at}) => {

    return (
  
      <li className="ArticleListCard" >
           <h2>Title: {title}</h2>
        <p>Posted by {author} on {created_at}</p>
        <p>Topic: {topic}</p>
        <p>{comment_count} comments</p>
        <p>votes: {votes}</p>
               
      </li>
    );
  };
  
  export default ArticleListCard;
  