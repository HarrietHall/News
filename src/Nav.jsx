import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext.jsx";
import { getUsers } from "./api.js";
import './Nav.css'

const Nav = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getUsers().then((usersData) => {
      setUsers(usersData);
    });
  }, []);

  function handleLogin(event) {
    event.preventDefault();
    setUser(selectedUser);
  }

  return (
    <nav className="Nav">
      <Link to="/" className="Home_link">
        Home{"            "}
      </Link>
      <Link to="/coding" className="Coding_link">
        Coding{"            "}
      </Link>
      <Link to="/cooking" className="Cooking_link">
        Cooking{"            "}
      </Link>
      <Link to="/football" className="football_link">
        Football
      </Link>

      <form className="login_box" onSubmit={handleLogin}>
        <aside className="user">
          {user ? (
            <p>Logged in as: {user}</p>
          ) : (
            <>
              <label htmlFor="login_username">Username:</label>
              <select
                name="username"
                id="loginUsername"
                value={selectedUser}
                onChange={(event) => {
                  setSelectedUser(event.target.value);
                }}
              >
                <option value="emptyBox"></option>
                {users.map((user) => (
                  <option key={user.username} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>

              <button type="submit">Login</button>
            </>
          )}
        </aside>
      </form>
    </nav>
  );
};

export default Nav;
