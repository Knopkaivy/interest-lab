import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import './Header.css';

export default function Header(){
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {theme, toggleTheme} = useTheme();

    const getTagline = (pathname: string): string =>{
      switch(pathname){
        case '/compound': return 'compound interest';
        case '/loan': return 'loan calculator';
        default: return 'financial calculator';
      }
    }

  return(
        <div className="header">
          <div className="logo">Interest<span>Lab</span></div>
          <div className="tagline">{getTagline(pathname)}</div>
          <div className="buttons-container">
            {
                pathname !== '/' &&
                <button className="header-btn" onClick={() => navigate("/")}>
                    Back
                </button>
            }
            <button className="header-btn" onClick={toggleTheme}>
                {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
  )
}