import { Navbar } from "../../components/globals";
import { Dashboard } from "../../components/dashboard";
export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <Dashboard />
            </main>
        </>
    );
}
