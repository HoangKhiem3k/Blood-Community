// import Navbar from './components/NavBar';
import About from './components/About';
import Advice from './components/Advice';
import DonateBox from './components/DonateBox';
import HomeSection from './components/HomeSection';
import Navbar from './components/Navbar';
import TopDonors from './components/TopDonors';
import DonationEvents from './components/DonationEvents';
import Faq from './components/Faq';
import Footer from './components/Footer';

function LandingPage() {
    return (
        <div
            style={{
                background: '#fff' /* fallback for old browsers */,
                background: '-webkit-linear-gradient(to right, #fff, #fffde3)' /* Chrome 10-25, Safari 5.1-6 */,
                background: 'linear-gradient(to right, #fff, #fffde3)',
            }}
        >
            <Navbar />
            <HomeSection />
            <About />
            <Advice />
            <TopDonors />
            <DonateBox />
            <DonationEvents />
            <Faq />
            <Footer/>
        </div>
    );
}

export default LandingPage;
