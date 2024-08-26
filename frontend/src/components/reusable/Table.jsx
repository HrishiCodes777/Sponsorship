export default function Table({columns,data}){
    if (data.length === 0) return <div>No data available</div>;

    return (
        <table className="table">
            <thead>
                <tr>
                {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}