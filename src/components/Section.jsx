export default function Section({header, children}){
    return (
        <div>
            <section>
                <h2>{header}</h2>
                {children}
            </section>
        </div>

    )
}