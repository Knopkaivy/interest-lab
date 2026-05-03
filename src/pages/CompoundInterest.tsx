import { CalcProvider } from "../context/CalcContext";
import ResultsSummary from "../components/ResultsSummary";
import InputPanel from "../components/InputPanel";
import GrowthSchedule from "../components/GrowthSchedule";

export default function CompoundInterest(){
  return(
    <CalcProvider >
      <div className="app">
        <div className="grid">
          <InputPanel/>
          <ResultsSummary/>
          <GrowthSchedule/>
        </div>
      </div>
    </CalcProvider>
  )
}