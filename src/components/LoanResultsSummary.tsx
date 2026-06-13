import { useLoan } from "../context/LoanContext";
import "./LoanResultsSummary.css";

export default function LoanResultsSummary(){
    const {
        monthlyPayment,
        totalPayment,
        totalInterest,
        totalFullInterest,
        schedule,
        extraPayment,
    } = useLoan();

    const fmt = (n: number) => "$" + Math.round(n).toLocaleString();
    const originalTerm = schedule.length;

    return(
        <div className="loan__results-summary">
            <h2 className="loan__card-label">Summary</h2>
            <div className="loan__stat-row">
                <div className="loan__stat-key">Monthly payment</div>
                <div className="loan__stat-val">{fmt(monthlyPayment)}</div>
            </div>

            {extraPayment > 0 && (
                <div className="loan__stat-row">
                    <div className="loan__stat-key">Monthly with extra</div>
                    <div className="loan__stat-val accent">{fmt(monthlyPayment + extraPayment)}</div>
                </div>
            )}
            
            <div className="loan__stat-row">
                <div className="loan__stat-key">Total payment</div>
                <div className="loan__stat-val">{fmt(totalPayment)}</div>
            </div>

            <div className="loan__stat-row">
                <div className="loan__stat-key">Payoff in</div>
                <div className="loan__stat-val">
                    {originalTerm} <span className="loan__unit">months</span>
                </div>
            </div>

            <div className="loan__stat-row">
                <div className="loan__stat-key">Total interest</div>
                <div className="loan__stat-val purple">{fmt(totalInterest)}</div>
            </div>

            { extraPayment > 0 &&
                (<div className="loan__stat-row">
                    <div className="loan__stat-key">Total interest saved</div>
                    <div className="loan__stat-val accent">{fmt(totalFullInterest - totalInterest)}</div>
                </div>)
            }
        </div>
    )
}