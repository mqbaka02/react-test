/**
 * 
 * @param {boolean} checked 
 * @param {{s: string} => void} onChange 
 * @param {string} label 
 * @param {string} name 
 */
export default function Checkbox({checked, onChange, label, name}){
    return <div className="frm-chk">
        <input type="checkbox" className="frm-chk-input" checked={checked} onChange={e=> onChange(e.target.checked)} id={name}/>
        <label htmlFor={name} className="frm-chk-label">{label}</label>
    </div>;
}