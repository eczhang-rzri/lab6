const values = [
    'Relentless Learning and Growth',
    'Creative Problem Solving',
    'Curiosity-Driven Exploration'
]

export default function ValueList() {
    return (
        <div>
            <h3>Remember to live out our values</h3>
            <ol>
                {values.map((value, index) => (
                    <li key={index}>
                        {value}
                    </li>
                ))}
            </ol>
        </div>
    )
}