import Navbar from "@/components/LandingPage/Navbar";
import Hero from "@/components/LandingPage/Hero";
import Facilities from "@/components/LandingPage/Facilities";
import Rooms from "@/components/LandingPage/Rooms";
import Reviews from "@/components/LandingPage/Reviews";
import RegistrationForm from "@/components/FormPendaftaran";
import Footer from "@/components/LandingPage/Footer";
import BottomNav from "@/components/LandingPage/BottomNav";
import FloatingWA from "@/components/LandingPage/FloatingWA";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Facilities />
      <Rooms />
      <Reviews />
      <RegistrationForm />
      <Footer />


      {/* Mobile Navigation & Floating Actions */}
      <BottomNav />
      <FloatingWA />
    </main>
  );
}
