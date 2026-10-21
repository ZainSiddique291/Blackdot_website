import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TrustBenefits from '../components/home/TrustBenefits';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandStory from '../components/home/BrandStory';
import PromoBanner from '../components/home/PromoBanner';
import CustomerReviews from '../components/home/CustomerReviews';
import Newsletter from '../components/home/Newsletter';

export default function Home({ onNavigateShop, onNavigateAbout }) {
  return (
    <main>
      <HeroSection onShopClick={onNavigateShop} />
      <TrustBenefits />
      <CategorySection onSelectCategory={onNavigateShop} />
      <FeaturedProducts onNavigateShop={onNavigateShop} />
      <BrandStory onNavigateAbout={onNavigateAbout} />
      <PromoBanner onNavigateShop={onNavigateShop} />
      <CustomerReviews />
      <Newsletter />
    </main>
  );
}
