import {useLoan} from "../context/LoanContext";
import "./LoanAmortizationSchedule.css";

export default function LoanAmortizationSchedule(){
    const {schedule} = useLoan();

    const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const rows = schedule.map(row => {
        return <tr key={row.month}>
            <td>{row.month}</td>
            <td>{fmt(row.payment)}</td>
            <td className="td-interest">{fmt(row.interest)}</td>
            <td>{fmt(row.principal)}</td>
            <td className="td-balance">{fmt(row.balance)}</td>
        </tr>
    })

    return(
        <div className="amortization">
            <div className="card-label">Amortization schedule($)</div>
            <div className="table-wrap--loan">
                <table>
                    <thead>
                        <tr>
                            <th>Mo</th>
                            <th>Payment</th>
                            <th>Interest</th>
                            <th>Principal</th>
                            <th>Balance</th>
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