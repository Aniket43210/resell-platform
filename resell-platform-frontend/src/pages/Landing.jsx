import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Favorites from '../components/landing/Favorites';
import About from '../components/landing/About';
import CTA from '../components/landing/CTA';
import Footer from '../components/layout/Footer';

export default function Landing() {
    return (
        <div className='bg-[#efefe7] text-[#1f1f14] font-sans'>
            <Navbar />

            <main>
                <Hero />
                <Features />
                <Favorites />
                <About />
                <CTA />
                <Footer />
            </main>
        </div>
    )
}