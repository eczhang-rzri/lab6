export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer>
            <p>&copy; {year} CodeCraft Labs. All rights reserved.</p>
        </footer>
    )
}