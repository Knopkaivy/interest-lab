import { useCalc } from "../../context/CalcContext";
import { exportCsv } from "../../utils/exportCsv";
import "./GrowthSchedule.css";

export default function GrowthSchedule(){
    const {schedule} = useCalc();
    const fmt = (n: number) => Math.round(n).toLocaleString();

    const handleExport = () => {
        exportCsv(
            'compound-interest-schedule',
            ['Year', 'Yearly Gain', 'Total Interest', 'End of Year Balance'],
            schedule.map(row => [
                row.year, Math.round(row.yearlyGain), Math.round(row.interest), Math.round(row.balance)
            ])
        )
    }

    return (
        <div className="growth-schedule">
            <div className="growth-schedule__heading-container">
                <h2 className="growth-schedule__card-label">Year-by-year growth ($)</h2>
                <button type="button" className="growth-schedule__export-btn" onClick={handleExport} >Export CSV</button>
            </div>
            <div className="growth-schedule__table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Yearly Gain</th>
                            <th>Total Interest</th>
                            <th>End Balance</th>
                            <th className="growth-schedule__bar-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map(row =>(
                            <tr key={row.year}>
                                <td>{row.year}</td>
                                <td>{fmt(row.yearlyGain)}</td>
                                <td className="growth-schedule__td-interest">{fmt(row.interest)}</td>
                                <td className="growth-schedule__td-balance">{fmt(row.balance)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}