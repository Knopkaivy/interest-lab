import { BarChart, Bar, XAxis, YAxis, Tooltip,Label } from 'recharts';
import type { TooltipContentProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useCalc } from "../../context/CalcContext";
import './CompoundChart.css'

 const CompoundChart = () =>{
    const {schedule} = useCalc();

    const formatCurrency = (number: number) => {
        const formatter = new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
            maximumFractionDigits: 1
        });

        return formatter.format(number).replace(/\b([0-9.]+)[Kk]\b/, '$1');
    };

    
    const CustomTooltip = ({active, payload, label}: TooltipContentProps<ValueType, NameType>) =>{
        if(active && payload && payload.length){
            return (
                <div className='compound-chart__tooltip'>
                    <p>{`Year: ${label}`}</p>
                    {payload.map((item, index) => (
                    <p key={index} >
                        {`Balance: $${Math.round(Number(item.value)).toLocaleString()}`}
                    </p>
                    ))}
                </div>
            )
        }
    }

    return(
        <div className="compound-chart">
            <h2 className='compound-chart__card-label'>Compound Chart</h2>
            <BarChart
            responsive
            data={schedule}
            margin={{ top: 0, right: 10, left: 20, bottom: 15 }}
            >
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748b" }} textAnchor="end" >
                    <Label className='compound-chart__label' value="Time (Years)" position="insideBottom" offset={-10} />
                </XAxis>
                <YAxis  tickFormatter={formatCurrency} width="auto" tick={{ fontSize: 11, fill: "#64748b" }} >
                    <Label className='compound-chart__label' value="Balance ($K)" position="insideLeft" angle={-90}  offset={-15} />
                </YAxis>
                <Tooltip cursor={false} content={CustomTooltip} />
                <Bar dataKey="balance" fill="#7c6af7" activeBar={{ fill: '#ff0080', stroke: '#ff0080' }} radius={[10, 10, 0, 0]} />
            </BarChart>
        </div>
    )
}

export default CompoundChart;