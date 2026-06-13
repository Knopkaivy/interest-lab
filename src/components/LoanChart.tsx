import { Area, AreaChart, Tooltip, XAxis, YAxis, Label } from 'recharts';
import type { TooltipContentProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useMemo } from 'react';

import { useLoan } from "../context/LoanContext";
import './LoanChart.css';
import type { AxisTick } from 'recharts/types/util/types';

interface ScheduleRow {
    month: number,
    minBalance: number,
    balance: number,
}

const LoanChart = ({ isAnimationActive = true }) =>{
    const {extraPayment, minPaymentSchedule, schedule} = useLoan();

    const data = useMemo((): ScheduleRow[] =>{
        if (!minPaymentSchedule?.length || !schedule?.length) return [];

        return minPaymentSchedule.map((minRow, i) =>({
            month: minRow.month,
            minBalance: minRow.balance || 0,
            balance: schedule[i] ? schedule[i].balance : 0,
        }))

    }, [minPaymentSchedule, schedule]);

    const CustomTooltip = ({active, payload, label}: TooltipContentProps<ValueType, NameType>) =>{
        if(active && payload && payload.length){
            return (
                <div className='loan-chart__tooltip'>
                    <p>{`Month: ${label}`}</p>
                    <p>{`Balance: $${Math.round(Number(payload[1].value)).toLocaleString()}`}</p>
                    {
                        extraPayment ? <p>{`With Extra Payment: $${Math.round(Number(payload[0].value)).toLocaleString()}`}</p> : <></>
                    }
                </div>
            )
        }
    }

const formatCurrency = (number: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  });

  return formatter.format(number).replace(/\b([0-9.]+)[Kk]\b/, '$1');
};


    const getTicks = (): AxisTick[] => {
        const monthsArray = minPaymentSchedule.map(row => row.month).filter(month => month % 12 === 0);
        return monthsArray;
    };
    
    if (!data.length) return null;

    return(
        <div className="loan-chart">
            <h2 className='loan-chart__card-label'>Payoff Chart</h2>
            <AreaChart
                style={{ width: '100%', aspectRatio: 3 }}
                responsive
                data={data}
                margin={{ top: 30, right: 40, left: 30, bottom: 20 }}
            >
                <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff0080" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff0080" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} ticks={getTicks()} textAnchor="end">
                    <Label className='loan-chart__label' value="Time (Months)" position="insideBottom" offset={-10} />
                </XAxis>
                <YAxis tickFormatter={formatCurrency} width="auto" tick={{ fontSize: 11, fill: "#64748b" }}>
                    <Label className='loan-chart__label' value="Loan Balance ($K)" position="insideLeft" angle={-90}  offset={-15} />
                </YAxis>
                <Tooltip content={CustomTooltip}  />
                <Area
                type="monotone"
                dataKey="balance"
                stroke="#ff0080"
                fillOpacity={1}
                fill="url(#colorUv)"
                isAnimationActive={isAnimationActive}
                />
                <Area
                type="monotone"
                dataKey="minBalance"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorPv)"
                isAnimationActive={isAnimationActive}
                />
            </AreaChart>
        </div>
    )
}

export default LoanChart;