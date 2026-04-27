import {useLoan} from "../context/LoanContext";
import "./LoanAmortizationSchedule.css";

export default function LoanAmortizationSchedule(){
    const {schedule} = useLoan();

    const fmt = (n: number) => Math.round(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const rows = schedule.map(row => {
        return <tr key={row.month}>
            <td>{row.month}</td>
            <td>{fmt(row.payment)}</td>
            <td className="td-interest">{fmt(row.interest)}</td>
            <td>{fmt(row.principal)}</td>
            <td className="td-gain">{fmt(row.balance)}</td>
        </tr>
    })

    return(
        <div className="amortization">
            <div className="card-label">Amortiztion schedule</div>
            <div className="table-wrap--loan">
                <table>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Payment($)</th>
                            <th>Interest($)</th>
                            <th>Principal($)</th>
                            <th>Balance($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}