import HeroSection from '@/components/user/home/HeroSection'
import HomeBanner from '@/components/user/home/HomeBanner'
import InfoBar from '@/components/user/home/InfoBar'
import InstaSection from '@/components/user/home/InstaSection'
import MusicBanner from '@/components/user/home/MusicBanner'
import BeautySection from '@/components/user/home/products/BeautyProducts'
import ProductsSection from '@/components/user/home/products/BeautyProducts'
import Electronics from '@/components/user/home/products/ElectronicsProducts'
import KitchenProducts from '@/components/user/home/products/KitchenProducts'
import React from 'react'

export default function HomePage() {
  return (
    <div className='bg-white'>
       <HomeBanner />
       <InfoBar />
       <KitchenProducts />
       <MusicBanner />
       <BeautySection/>
       <HeroSection />
       <Electronics />
       {/* <ProductsSection /> */}
      
       <InstaSection />


    </div>
  )
}
