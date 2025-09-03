

import HeroSection from '@/components/user/home/HeroSection'
import HomeBanner from '@/components/user/home/HomeBanner'
import InfoBar from '@/components/user/home/InfoBar'
import InstaSection from '@/components/user/home/InstaSection'
import MusicBanner from '@/components/user/home/MusicBanner'
import ProductsSection from '@/components/user/home/products/ProductSection'
import React from 'react'

export default function HomePage() {
  return (
    <div className='bg-white'>
       <HomeBanner />
       <InfoBar />
       <ProductsSection />
       <MusicBanner />
       <ProductsSection />
       <HeroSection />
       <ProductsSection />
       <ProductsSection />
      
       <InstaSection />


    </div>
  )
}
