import VideoHero from '@/components/VideoHero';
import Header from '@/components/Header';
import BusinessUnits from '@/components/BusinessUnits';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <Header currentPage="home" />

      {/* Video Hero Section */}
      <VideoHero videoSrc="/homepage-video.mp4" />

      {/* Business Units Section */}
      <BusinessUnits />

      {/* Footer */}
      <Footer />
    </div>
  );
}

