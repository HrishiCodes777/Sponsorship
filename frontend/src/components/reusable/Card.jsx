export default function Card({ columns, data }) {
    if (data.length === 0) return <div>No data available</div>;

    return (
        <div className="card-container">
            {data.map((item, index) => (
                <div key={index} className="card">
                    {columns.map((column, colIndex) => (
                        <div key={colIndex} className="card-item">
                            <strong>{column.label}:</strong> {item[column.key]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}