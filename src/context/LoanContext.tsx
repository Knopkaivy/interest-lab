import { createContext, useContext, useMemo, useState } from "react";

interface AmortizationRow {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
}

interface LoanContextType {
    loanAmount: number;
    setLoanAmount: (val: number) => void;
    interestRate: number;
    setInterestRate: (val: number) => void;
    loanTerm: number;
    setLoanTerm: (val: number) => void;
    extraPayment: number;
    setExtraPayment: (val: number) => void;
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    totalFullInterest: number;
    minPaymentSchedule: AmortizationRow[];
    schedule: AmortizationRow[];
}

export const LoanContext = createContext<LoanContextType | null >(null);

export function LoanProvider({children}: {children: React.ReactNode}){
    const [loanAmount, setLoanAmount] = useState(25000);
    const [interestRate, setInterestRate] = useState(6.5);
    const [loanTerm, setLoanTerm] = useState(60);
    const [extraPayment, setExtraPayment] = useState(0);

    const monthlyPayment = useMemo(() =>{
        const r = interestRate/100/12;
        if(r === 0) return loanAmount/loanTerm;
        return (loanAmount * r * Math.pow(1 + r, loanTerm))/(Math.pow(1 + r, loanTerm) - 1);
    }, [loanAmount, interestRate, loanTerm]);

    const minPaymentSchedule = useMemo(()=>{
        const r = interestRate/100/12;
        const rows: AmortizationRow[] = [];
        let balance = loanAmount;
        let month = 0;
        while(balance > 0){
            month++;
            const interestCharge = balance * r;
            const principalCharge = Math.min(monthlyPayment - interestCharge, balance);
            balance -= principalCharge;

            rows.push({
                month,
                payment: principalCharge + interestCharge,
                principal: principalCharge,
                interest: interestCharge,
                balance: Math.max(balance, 0),
            });
            if(balance <= 0) break;
        }
        return rows;
    }, [loanAmount, interestRate, monthlyPayment]);

    const schedule = useMemo(()=>{
        const r = interestRate/100/12;
        const rows: AmortizationRow[] = [];
        let balance = loanAmount;
        let month = 0;
        while(balance > 0){
            month++;
            const interestCharge = balance * r;
            const principalCharge = Math.min(monthlyPayment - interestCharge + extraPayment, balance);
            balance -= principalCharge;

            rows.push({
                month,
                payment: principalCharge + interestCharge,
                principal: principalCharge,
                interest: interestCharge,
                balance: Math.max(balance, 0),
            });
            if(balance <= 0) break;
        }
        return rows;
    }, [loanAmount, interestRate, monthlyPayment, extraPayment]);

    const totalPayment = useMemo(()=>{
        return schedule.reduce((sum, row) => sum + row.payment, 0)
    }, [schedule]);

    const totalInterest = useMemo(()=>{
        return totalPayment - loanAmount;
    }, [totalPayment, loanAmount]);

    const totalFullInterest = useMemo(()=>{
        return (monthlyPayment * loanTerm) - loanAmount;
    }, [loanAmount, monthlyPayment, loanTerm]);

    return (
        <LoanContext.Provider value={{
            loanAmount, setLoanAmount,
            interestRate, setInterestRate,
            loanTerm, setLoanTerm,
            extraPayment, setExtraPayment,
            monthlyPayment,
            totalPayment,
            totalInterest,
            totalFullInterest,
            minPaymentSchedule,
            schedule,
        }}>
            {children}
        </LoanContext.Provider>
    );
}

export function useLoan(){
    const ctx = useContext(LoanContext);
    if(!ctx){
        throw new Error('useLoan must be used inside <LoanProvider>');
    }
    return ctx;
}