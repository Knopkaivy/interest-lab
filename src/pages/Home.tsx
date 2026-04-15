import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home(){
  const navigate = useNavigate();

  return(
    <div className="app">
        <div className="header">
            <div className="logo">Interest<span>Lab</span></div>
            <div className="tagline">financial calculators</div>
        </div>
        <div className="home-grid">
            <div className="calc-card" onClick={() => navigate("/compound")}>
                <div className="calc-card-title">Compound Interest</div>
                <div className="calc-card-desc">
                    See how your investment grows over time with the power of compounding.
                </div>
                <div className="calc-card-link">Open calculator</div>
            </div>

            <div className="calc-card" onClick={() => navigate("/loan")}>
                <div className="calc-card-title">Loan Payoff</div>
                <div className="calc-card-desc">
                    Calculate your amortization schedule and see how extra payments can save you money on interest.
                </div>
                <div className="calc-card-link">Open calculator</div>
            </div>
        </div>
    </div>
  )
}