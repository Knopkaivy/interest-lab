import { useCalc } from "../../context/CalcContext";
import "./GrowthSchedule.css";

export default function GrowthSchedule(){
    const {schedule} = useCalc();
    const fmt = (n: number) => Math.round(n).toLocaleString();

    return (
        <div className="growth-schedule">
            <h2 className="growth-schedule__card-label">Year-by-year growth ($)</h2>
            <div className="growth-schedule__table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Gained this year</th>
                            <th>EOY Balance</th>
                            <th>Total Interest</th>
                            <th className="growth-schedule__bar-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map(row =>(
                            <tr key={row.year}>
                                <td>{row.year}</td>
                                <td className="growth-schedule__td-gain">{fmt(row.yearlyGain)}</td>
                                <td>{fmt(row.balance)}</td>
                                <td className="growth-schedule__td-interest">{fmt(row.interest)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}