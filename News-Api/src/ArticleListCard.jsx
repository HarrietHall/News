import './ArticleListCard.css'


const ArticleListCard = ({title, author, topic, comment_count, created_at}) => {

    return (
  
   <section className="articleListCard" >

           <h2>{title}</h2>
        <p>Posted by {author} on {created_at}</p>
        <p>Topic: {topic}</p>
        <p>{comment_count} comments</p>
    
   </section>
    );
  };
  
  export default ArticleListCard;
  