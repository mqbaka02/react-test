/**
 * 
 * @param {string} placeholder
 * @param {string} value
 * @param {{s: string} => void} onChange
 */
export default function Input({placeholder, value, onChange}) {
    return <>
        <div>
            <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="form-ctrl" />
        </div>
    </>;
}