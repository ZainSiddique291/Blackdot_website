import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TrustBenefits from '../components/home/TrustBenefits';
import CategorySection from '../components/home/CategorySection';
import CategorySlidersSection from '../components/home/CategorySlidersSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import LuxuryCampaignAd from '../components/home/LuxuryCampaignAd';
import BrandValues from '../components/home/BrandValues';
import PromoBanner from '../components/home/PromoBanner';
import CustomerReviews from '../components/home/CustomerReviews';
import VerifiedBy from '../components/home/VerifiedBy';
import TrustedPartners from '../components/home/TrustedPartners';
import Newsletter from '../components/home/Newsletter';

export default function Home({ onNavigateShop }) {
  return (
    <main className="overflow-hidden">
      {/* 1. Hero Section with Sharp Bottle Animation and Staggered Text */}
      <HeroSection onShopClick={onNavigateShop} />

      {/* 2. Trust Benefits */}
      <TrustBenefits />

      {/* 3. Category Highlights Tiles */}
      <CategorySection onSelectCategory={onNavigateShop} />

      {/* 4. Separate Category Sliders: Beauty Creams, Serums, Lotions */}
      <CategorySlidersSection onNavigateShop={onNavigateShop} />

      {/* 5. Signature Featured Products Collection */}
      <FeaturedProducts onNavigateShop={onNavigateShop} />

      {/* 6. Editorial Luxury Campaign Advertisement */}
      <LuxuryCampaignAd onNavigateShop={onNavigateShop} />

      {/* 7. Skincare Product Values & Philosophy */}
      <BrandValues />

      {/* 7. Limited-Time Offer Section with Floating Bottle Animation */}
      <PromoBanner onNavigateShop={onNavigateShop} />

      {/* 8. Verified By Quality & Safety Standards */}
      <VerifiedBy />

      {/* 9. Customer Reviews with Smooth Hover Elevation */}
      <CustomerReviews />

      {/* 10. Trusted Partners & Stockists Continuous Slider */}
      <TrustedPartners />

      {/* 11. VIP Newsletter Club */}
      <Newsletter />
    </main>
  );
}
