import { createContext, useContext, useMemo, useState } from "react";

interface ScheduleRow {
    year: number;
    balance: number;
    interest: number;
    yearlyGain: number;
}

interface CalcContextType {
    principal: number;
    setPrincipal: (val: number) => void;
    rate: number;
    setRate: (val: number) => void;
    years: number;
    setYears: (val: number) => void;
    frequency: number;
    setFrequency: (val: number) => void;
    finalAmount: number;
    totalInterest: number;
    schedule: ScheduleRow[];
}

export const CalcContext = createContext<CalcContextType | null >(null);

export function CalcProvider({children}: {children: React.ReactNode}){
    const [principal, setPrincipal] = useState(1000);
    const [rate, setRate] = useState(7);
    const [years, setYears] = useState(20);
    const [frequency, setFrequency] = useState(12);
    const finalAmount = useMemo(()=>{
        const r = rate /100/ frequency;
        return principal * Math.pow(1 + r, years * frequency);
    }, [principal, rate, years, frequency]);
    const totalInterest = useMemo(()=>{
        return finalAmount - principal;
    }, [finalAmount, principal]);
    const schedule = useMemo(()=>{
        const r = rate / 100/frequency;
        return Array.from({length: years}, (_, i)=>{
            const year = i + 1;
            const balance = principal * Math.pow(1 + r, year * frequency);
            const prevBalance = principal * Math.pow(1 + r, (year -1) * frequency);
            return{
                year,
                balance,
                interest: balance - principal,
                yearlyGain: balance - prevBalance,
            }
        });
    }, [principal, rate, years, frequency]);
    return(
        <CalcContext.Provider value={{
            principal, setPrincipal,
            rate, setRate,
            years, setYears,
            frequency, setFrequency,
            finalAmount,
            totalInterest,
            schedule
        }}>
            {children}
        </CalcContext.Provider>
    )
}

export function useCalc(){
    const ctx = useContext(CalcContext);
    if(!ctx){
        throw new Error('useCalc must be used inside <CalcProvider>');
    }
    return ctx;
}