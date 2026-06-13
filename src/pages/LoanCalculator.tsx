import { LoanProvider } from "../context/LoanContext";
import LoanInputPanel from "../components/LoanCalculator/LoanInputPanel";
import LoanResultsSummary from "../components/LoanCalculator/LoanResultsSummary";
import LoanAmortizationSchedule from "../components/LoanCalculator/LoanAmortizationSchedule";
import LoanChart from "../components/LoanCalculator/LoanChart";

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