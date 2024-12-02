/**
 * 
 * @param {string} name
 */
export default function ProductCategoryRow({name}) {
    return <tr>
        <td colSpan={2} className="ctg">{name}</td>
    </tr>;
}