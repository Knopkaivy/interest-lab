import { LoanProvider } from "../context/LoanContext";
import LoanInputPanel from "../components/LoanInputPanel";
import LoanResultsSummary from "../components/LoanResultsSummary";
import LoanAmortizationSchedule from "../components/LoanAmortizationSchedule";
import LoanChart from "../components/LoanChart";

export default function LoanCalculator(){
  return(
    <LoanProvider>
      <div className="app">       
          <div className="grid">
            <LoanInputPanel/>
            <LoanResultsSummary/>
            <LoanChart/>
            <LoanAmortizationSchedule/>
          </div>
      </div>
    </LoanProvider>
  )
}