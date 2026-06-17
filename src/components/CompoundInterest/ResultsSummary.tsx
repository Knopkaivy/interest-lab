import { useCalc } from "../../context/CalcContext";
import "./ResultsSummary.css";

export default function ResultsSummary(){
    const {principal, totalMonthlyContributions, years, finalAmount, totalInterest} = useCalc();
    const fmt = (n: number) => "$" + Math.round(n).toLocaleString();
    const multiplier = (finalAmount / principal).toFixed(2);

    return(
        <div className="results-summary">
            <h2 className="results-summary__card-label">Results</h2>
            <div className="results-summary__stat-row">
                <div className="results-summary__stat-key">Starting principal</div>
                <div className="results-summary__stat-val">{fmt(principal)}</div>
            </div>
            <div className="results-summary__stat-row">
                <div className="results-summary__stat-key">Total Contributions</div>
                <div className="results-summary__stat-val">{fmt(totalMonthlyContributions)}</div>
            </div>
            <div className="results-summary__stat-row">
                <div className="results-summary__stat-key">Interest earned</div>
                <div className="results-summary__stat-val accent">{fmt(totalInterest)}</div>
            </div>
            <div className="results-summary__stat-row">
                <div className="results-summary__stat-key">Final balance after {years}y</div>
                <div className="results-summary__stat-val purple">{fmt(finalAmount)}<span className="results-summary__multiplier">{multiplier}x</span></div>
            </div>
        </div>
    );
}