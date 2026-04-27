import { useNavigate } from "react-router-dom";
import { LoanProvider } from "../context/LoanContext";
import LoanInputPanel from "../components/LoanInputPanel";
import LoanResultsSummary from "../components/LoanResultsSummary";
import LoanAmortizationSchedule from "../components/LoanAmortizationSchedule";

export default function LoanCalculator(){
  const navigate = useNavigate();
  return(
    <LoanProvider>
      <div className="app">        
          <div className="header">
            <div className="logo">Interest<span>Lab</span></div>
            <div className="tagline">explore the power of compound interest</div>
            <button className="back-btn" onClick={() => navigate("/")}>
              Back
            </button>
          </div>
          <div className="grid">
            <LoanInputPanel/>
            <LoanResultsSummary/>
            <LoanAmortizationSchedule/>
          </div>
      </div>
    </LoanProvider>
  )
}