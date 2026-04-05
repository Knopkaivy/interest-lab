import { useCalc } from "../context/CalcContext";
import "./GrowthSchedule.css";

export default function GrowthSchedule(){
    const {schedule, finalAmount} = useCalc();
    const fmt = (n: number) => "$" + Math.round(n).toLocaleString();

    return (
        <div className="growth-schedule">
            <div className="card-label">Year-by-year growth</div>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Balance</th>
                            <th>Total Interest</th>
                            <th>Gained this year</th>
                            <th className="bar-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map(row =>(
                            <tr key={row.year}>
                                <td>{row.year}</td>
                                <td>{fmt(row.balance)}</td>
                                <td className="td-interest">{fmt(row.interest)}</td>
                                <td className="td-gain">+{fmt(row.yearlyGain)}</td>
                                <td className="bar-cell">
                                    <div className="bar-wrap">
                                        <div className="bar-fill" style={{width: `${(row.balance / finalAmount) * 100}%`}}></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}