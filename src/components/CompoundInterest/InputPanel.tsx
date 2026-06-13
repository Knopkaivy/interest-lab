import { useCalc } from "../../context/CalcContext";
import "./InputPanel.css";

export default function InputPanel(){
    const {principal, setPrincipal, rate, setRate, years, setYears, frequency, setFrequency} = useCalc();

    return(
        <div className="input-panel">
            <h2 className="input-panel__card-label">Parameters</h2>
            <div className="input-panel__field">
                <div className="input-panel__field-label">
                    <span>Principal</span>
                    <span>${principal.toLocaleString()}</span>
                </div>
                <input id="inputPrincipal" type="range" min={1000} max={10000} step={500} value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
            </div>
            <div className="input-panel__field">
                <div className="input-panel__field-label">
                    <span>Annual rate</span>
                    <span>{rate}%</span>
                </div>
                <input id="inputRate" type="range" min={.5} max={20} step={.5} value={rate} onChange={e => setRate(Number(e.target.value))} />
            </div>
            <div className="input-panel__field">
                <div className="input-panel__field-label">
                    <span>Time period</span>
                    <span>{years} years</span>
                </div>
                <input id="inputYears" type="range" min={1} max={50} step={1} value={years} onChange={e => setYears(Number(e.target.value))} />
            </div>
            <div className="input-panel__field">
                <div className="input-panel__field-label">
                    <span>Comppound frequency</span>
                </div>
                <div className="input-panel__field-radio">
                    <input name="frequency" id="annual" type="radio" value={1} checked={frequency === 1} onChange={() => setFrequency(1)} />
                    <label htmlFor="annual" className="input-panel__field-radio-label">Annual</label>
                    <input name="frequency" id="qtrly" type="radio" value={4} checked={frequency === 4} onChange={() => setFrequency(4)} />
                    <label htmlFor="qtrly" className="input-panel__field-radio-label">Qtrly</label>
                    <input name="frequency" id="monthly" type="radio" value={12} checked={frequency === 12}  onChange={() => setFrequency(12)} />
                    <label htmlFor="monthly" className="input-panel__field-radio-label">Monthly</label>
                    <input name="frequency" id="daily" type="radio" value={365} checked={frequency === 365}  onChange={() => setFrequency(365)} />
                    <label htmlFor="daily" className="input-panel__field-radio-label">Daily</label>
                </div>
            </div>
        </div>
    )
}