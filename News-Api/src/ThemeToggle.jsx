import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((currTheme) => {

      return currTheme === 'light' ? 'dark' : 'light';
  
          })

 
    const color = theme === "light" ? "	#202020" : "#FFF";
    const backgroundColor = theme === "light" ? "#FFF" : "#202020";
  
    document.body.style.color = color;
    document.body.style.backgroundColor = backgroundColor;
  
        }

   return (
    <button onClick={toggleTheme} className={`button__${theme}`}>
    {`${theme}`} mode
    </button>
    
  );
};

export default ToggleTheme;
