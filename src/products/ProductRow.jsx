/**
 * 
 * @param {{name: string, onStock: boolean, price: string}} product
 */
export default function ProductRow({product}) {
    const style= product.onStock ? undefined : {color: "#999"};
    return <tr>
        <td style={style}>{product.name}</td>
        <td>{product.price}</td>
    </tr>;
}