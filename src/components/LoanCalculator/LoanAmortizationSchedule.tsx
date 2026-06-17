import {useLoan} from "../../context/LoanContext";
import { exportCsv } from "../../utils/exportCsv";
import "./LoanAmortizationSchedule.css";

export default function LoanAmortizationSchedule(){
    const {schedule} = useLoan();

    const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const rows = schedule.map(row => {
        return <tr key={row.month}>
            <td>{row.month}</td>
            <td>{fmt(row.payment)}</td>
            <td className="amortization__td-interest">{fmt(row.interest)}</td>
            <td>{fmt(row.principal)}</td>
            <td className="amortization__td-balance">{fmt(row.balance)}</td>
        </tr>
    })

    
    const handleExport = () =>{
        exportCsv(
            'loan-amortization-schedule',
            ['Month', 'Payment', 'Interest', 'Principal', 'Balance'],
            schedule.map(row =>[
                row.month, row.payment.toFixed(2), row.interest.toFixed(2), row.principal.toFixed(2), row.balance.toFixed(2)
            ])
        )
    }

    return(
        <div className="amortization">
            <div className="amortization__heading-container">

                <h2 className="amortization__card-label">Amortization schedule($)</h2>
                <button type="button" className="amortization__export-btn" onClick={handleExport}>Export CSV</button>
            </div>
            <div className="amortization__table-wrap--loan">
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