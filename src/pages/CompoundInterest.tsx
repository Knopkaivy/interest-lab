import { CalcProvider } from "../context/CalcContext";
import ResultsSummary from "../components/CompoundInterest/ResultsSummary";
import InputPanel from "../components/CompoundInterest/InputPanel";
import GrowthSchedule from "../components/CompoundInterest/GrowthSchedule";
import CompoundChart from "../components/CompoundInterest/CompoundChart";

export default function CompoundInterest(){
  return(
    <CalcProvider >
      <div className="app">
        <div className="grid">
          <InputPanel/>
          <ResultsSummary/>
          <CompoundChart/>
          <GrowthSchedule/>
        </div>
      </div>
    </CalcProvider>
  )
}