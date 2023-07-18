import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="Nav">
      <Link to="/" className="Nav_link">
        Home
        {" "}
      </Link>
      <Link to="/articles/:article_id" className="Nav_link">
        Items 
        {" "}
      </Link>
      <Link to="/users" className="Nav_link">
       Users
        {" "}
      </Link>
    </nav>
  );
};


export default Nav;