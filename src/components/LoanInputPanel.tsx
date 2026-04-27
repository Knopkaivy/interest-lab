import {useLoan} from "../context/LoanContext";
import "./LoanInputPanel.css"

export default function LoanInputPanel(){
    const {
        loanAmount, setLoanAmount,
        interestRate, setInterestRate,
        loanTerm, setLoanTerm,
        extraPayment, setExtraPayment,
    } = useLoan();

    const termOptions = [
        {label: "24 mo", value: 24},
        {label: "36 mo", value: 36},
        {label: "48 mo", value: 48},
        {label: "60 mo", value: 60},
        {label: "72 mo", value: 72},
    ]
    const termOptionsRows = termOptions.map(option => {
        return <button key={option.value} className={`freq-btn${loanTerm === option.value ? " active" : ""}`} onClick={() => setLoanTerm(option.value)}>{option.label}</button>
        }
    )

    return (
        <div className="input-panel">
            <div className="card-label">Loan parameters</div>
            <div className="field">
                <div className="field-label">
                    <span>Loan amount</span>
                    <span>${loanAmount.toLocaleString()}</span>
                </div>
                <input type="number" min={1000} max={100000} step={500} value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
            </div>

                <div className="field">
                    <div className="field-label">
                        <span>Interest rate</span>
                        <span>{interestRate}%</span>
                    </div>
                    <input type="number" min={0} max={25} step={.1} value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                </div>

                <div className="field">
                    <div className="field-label">
                        <span>Loan term</span>
                    </div>
                    <div className="select-row">
                        {termOptionsRows}
                    </div>
                </div>
            <div className="field">
                <div className="field-label">
                    <span>Extra monthly payment</span>
                    <span>${extraPayment}</span>
                </div>
                <input type="number" min={0} max={1000} step={25} value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} />
            </div>
        </div>
    )
}