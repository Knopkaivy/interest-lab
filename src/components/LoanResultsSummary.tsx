import { useLoan } from "../context/LoanContext";
import "./LoanResultsSummary.css";

export default function LoanResultsSummary(){
    const {
        monthlyPayment,
        totalPayment,
        totalInterest,
        schedule,
        extraPayment,
    } = useLoan();

    const fmt = (n: number) => "$" + Math.round(n).toLocaleString();
    const originalTerm = schedule.length;

    return(
        <div className="results-summary">
            <div className="card-label">
                Summary
            </div>
            <div className="stat-row">
                <div className="stat-key">Monthly payment</div>
                <div className="stat-val">{fmt(monthlyPayment)}</div>
            </div>

            {extraPayment > 0 && (
                <div className="stat-row">
                    <div className="stat-key">Monthly with extra</div>
                    <div className="stat-val accent">{fmt(monthlyPayment + extraPayment)}</div>
                </div>
            )}

            <div className="stat-row">
                <div className="stat-key">Payoff in</div>
                <div className="stat-val">
                    {originalTerm} <span className="unit">months</span>
                </div>
            </div>

            <div className="stat-row">
                <div className="stat-key">Total interest</div>
                <div className="stat-val purple">{fmt(totalInterest)}</div>
            </div>

            <div className="stat-row">
                <div className="stat-key">Total payment</div>
                <div className="stat-val">{fmt(totalPayment)}</div>
            </div>
        </div>
    )
}