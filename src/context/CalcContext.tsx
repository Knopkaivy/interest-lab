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
    monthlyContribution: number;
    setMonthlyContribution: (val: number) => void;
    rate: number;
    setRate: (val: number) => void;
    years: number;
    setYears: (val: number) => void;
    frequency: number;
    setFrequency: (val: number) => void;
    finalAmount: number;
    totalMonthlyContributions: number;
    totalInterest: number;
    schedule: ScheduleRow[];
}

export const CalcContext = createContext<CalcContextType | null >(null);

export function CalcProvider({children}: {children: React.ReactNode}){
    const [principal, setPrincipal] = useState(1000);
    const [monthlyContribution, setMonthlyContribution] = useState(0);
    const [rate, setRate] = useState(10);
    const [years, setYears] = useState(20);
    const [frequency, setFrequency] = useState(12);

    const totalMonthlyContributions = useMemo(()=>{
        return monthlyContribution * years * 12;
    }, [monthlyContribution, years]);

    const finalAmount = useMemo(()=>{
        const r = rate /100/ frequency;
        const compoundIndex = Math.pow(1 + r, years * frequency);
        const monthsToFrequesncy = 12 / frequency;
        const principalGrowth = principal * compoundIndex;
        const monthlyContributionsGrowth = (monthlyContribution * monthsToFrequesncy * (compoundIndex - 1) / r) || 0;
        return principalGrowth + monthlyContributionsGrowth;
    }, [principal, monthlyContribution, rate, years, frequency]);

    const totalInterest = useMemo(()=>{
        return finalAmount - principal - totalMonthlyContributions;
    }, [finalAmount, principal, totalMonthlyContributions]);

    const schedule = useMemo(()=>{
        const r = rate / 100/frequency;
        return Array.from({length: years}, (_, i)=>{
            const year = i + 1;
            const yearContribution = year * 12 * monthlyContribution;
            const compoundIndexCurrent = Math.pow(1 + r, year * frequency);
            const compoundIndexPrew = Math.pow(1 + r, (year - 1) * frequency);
            const monthsToFrequesncy = 12 / frequency;
            const monthlyBalance = (monthlyContribution * monthsToFrequesncy * (compoundIndexCurrent - 1) / r) || 0;
            const monthlyBalancePrev = (monthlyContribution * monthsToFrequesncy * (compoundIndexPrew - 1) / r) || 0;
            const balance = principal * compoundIndexCurrent + monthlyBalance;
            const prevBalance = principal * compoundIndexPrew + monthlyBalancePrev;
            return{
                year,
                balance,
                interest: balance - principal - yearContribution,
                yearlyGain: balance - prevBalance - 12 * monthlyContribution,
            }
        });
    }, [principal, rate, years, frequency]);

    return(
        <CalcContext.Provider value={{
            principal, setPrincipal,
            monthlyContribution, setMonthlyContribution,
            rate, setRate,
            years, setYears,
            frequency, setFrequency,
            finalAmount,
            totalMonthlyContributions,
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