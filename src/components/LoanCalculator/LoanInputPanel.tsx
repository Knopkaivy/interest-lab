import {useLoan} from "../../context/LoanContext";
import "./LoanInputPanel.css"

export default function LoanInputPanel(){
    const {
        loanAmount, setLoanAmount,
        interestRate, setInterestRate,
        loanTerm, setLoanTerm,
        extraPayment, setExtraPayment,
    } = useLoan();

    return (
        <div className="loan-input__panel">
            <h2 className="loan-input__card-label">Loan parameters</h2>
            <div className="loan-input__field">
                <div className="loan-input__field-label">
                    <span>Loan amount</span>
                    <span>${loanAmount.toLocaleString()}</span>
                </div>
                <input type="number" min={1000} max={100000} step={500} value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
            </div>

                <div className="loan-input__field">
                    <div className="loan-input__field-label">
                        <span>Interest rate</span>
                        <span>{interestRate}%</span>
                    </div>
                    <input type="number" min={0} max={25} step={.1} value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                </div>

                <div className="loan-input__field">
                    <div className="loan-input__field-label">
                        <span>Loan term</span>
                        <span>{loanTerm} mo</span>
                    </div>
                    <input type="number" min={0} max={360} step={1} value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} />
                </div>
            <div className="loan-input__field">
                <div className="loan-input__field-label">
                    <span>Extra monthly payment</span>
                    <span>${extraPayment}</span>
                </div>
                <input type="number" min={0} max={1000} step={25} value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} />
            </div>
        </div>
    )
}