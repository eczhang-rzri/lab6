const events = [
    { date: 'Feb 7', description: 'Employee Hack-a-thon'},
    { date: 'Mar 7', description: 'Food Bank Volunteering'},
    { date: 'Apr 4', description: 'Company Retreat'}
]

export default function EventList() {
    return (
        <div>
            <h3>Upcoming Events</h3>
            <ul>
                {events.slice(0, 4).map((event, index) => (
                    <li key={index}>
                        <strong>{event.date}</strong>: {event.description}
                    </li>
                ))}
            </ul>
        </div>
    )
}
