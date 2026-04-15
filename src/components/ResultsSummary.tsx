import { useCalc } from "../context/CalcContext";
import "./ResultsSummary.css";

export default function ResultsSummary(){
    const {principal, years, finalAmount, totalInterest} = useCalc();
    const fmt = (n: number) => "$" + Math.round(n).toLocaleString();
    const multiplier = (finalAmount / principal).toFixed(2);

    return(
        <div className="results-summary">
            <div className="card-label">Results</div>
            <div className="stat-row">
                <div className="stat-key">Starting principal</div>
                <div className="stat-val">{fmt(principal)}</div>
            </div>
            <div className="stat-row">
                <div className="stat-key">Interes earned</div>
                <div className="stat-val purple">{fmt(totalInterest)}</div>
            </div>
            <div className="stat-row">
                <div className="stat-key">Final balance after {years}y</div>
                <div className="stat-val accent">{fmt(finalAmount)}<span className="multiplier">{multiplier}x</span></div>
            </div>
        </div>
    );
}