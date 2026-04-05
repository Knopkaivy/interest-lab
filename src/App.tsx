import { CalcProvider } from "./context/CalcContext";
import ResultsSummary from "./components/ResultsSummary";
import InputPanel from "./components/InputPanel";
import GrowthSchedule from "./components/GrowthSchedule";
import "./App.css";

export default function App(){
  return(
    <CalcProvider >
      <div className="app">
        <div className="header">
          <div className="logo">Interest<span>Lab</span></div>
          <div className="tagline">compound interest explorer</div>
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