import { useNavigate } from "react-router-dom";
import { CalcProvider } from "../context/CalcContext";
import ResultsSummary from "../components/ResultsSummary";
import InputPanel from "../components/InputPanel";
import GrowthSchedule from "../components/GrowthSchedule";

export default function CompoundInterest(){
    const navigate = useNavigate();
  return(
    <CalcProvider >
      <div className="app">
        <div className="header">
          <div className="logo">Interest<span>Lab</span></div>
          <div className="tagline">compound interest explorer</div>
          <button className="back-btn" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
        <div className="grid">
          <InputPanel/>
          <ResultsSummary/>
          <GrowthSchedule/>
        </div>
      </div>
    </CalcProvider>
  )
}