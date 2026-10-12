import React, { useState, useEffect, useRef } from 'react';

// Authentic high-fidelity visual assets (100% Canine Focused)
const ASSETS = {
  logo: './logo.png',
  aboutJohnAndDebra: 'https://static.wixstatic.com/media/d2f760_b517283a5db846fdac96e6812bc8a591~mv2.png/v1/fill/w_605,h_405,al_c,q_85,enc_avif,quality_auto/J%26D%20Furology%201.png',
  aboutGrooming: 'https://static.wixstatic.com/media/d2f760_8ee46f7f02c242168ea127cddb8f39d7~mv2.png/v1/fill/w_392,h_301,al_c,q_85,enc_avif,quality_auto/J%26D%20Grooming%20Pic.png',
  aboutBeachWalk: 'https://static.wixstatic.com/media/d2f760_d480509ea7b24fe4bebac7c4a2d18508~mv2.png/v1/fill/w_342,h_232,al_c,q_85,enc_avif,quality_auto/J%26D%20Furology%20Dog%20Beach%20Walk.png',
  aboutDaycare: 'https://static.wixstatic.com/media/d2f760_e80b124b294f47d7af8bb1b24c9816ef~mv2.png/v1/fill/w_393,h_254,al_c,q_85,enc_avif,quality_auto/J%26D%20Furology%20Doggy%20DayCare%202.png',
  aboutSeating: 'https://static.wixstatic.com/media/d2f760_f89bcdd5e7594ac0a694afe406d08917~mv2.png/v1/fill/w_276,h_179,al_c,q_85,enc_avif,quality_auto/J%26D%20Furology%20Seating.png',
  heroDog: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxPTOz-VoFuc_qlwf9u7REUMUCp6ecmAPyQiHj1fukgwovfe-n2IyX5s-3vClJY8JYoSaeMSA896FKno-xSlbv-PAeRs1AoVnkqWw4YutIXTbTZCgd9hUoXmy1RIBL9-34RJJjF9lDGWgg7UFi9Q5L1mAXCVV2ouYHyb_4xvvVQqoGyFmmH1vY-qR9koAnsFdI8_fNDFoyn-iqllS6-HbJP-1FdqqqPTlza65PS-maAPwR5oxLSoxU',
  cardBeagle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA53fNxenMvyNovEoZAHs1mZQ2n9O4v9gQOE-OSUWA5EtDtn3WOjRh_Zc9ByS-Afij2zz6ruxdQ2NpuLNHLoPzHpqG1EzT2__afodXzgP7Y9rrYC5gLIy2bB6MFh0OK2wYKLU8bo2GCZlDCTH6sq8q7Sv6-VlsSdsivuwhJrOFlKly1tuFJGtTer_8qwZT2cOc3jesx6Tzc_D00O9lkZ9Q8rW6J605vIdfeRs4wNypmOFcl7gOhzJ7F',
  cardTreats: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoyR9IfrMQS_ZvTugtKQo5FyUp5Pku_G_LBCliX4LENo9EevdqzQ4bpq2-apOay4PaVfR9Rp3I4MlYyNATzJV9hgZsUAcFMfLrztO3QOkx_-6UQMPbO5BloKrqtM2igb9YRY1S5HsFLBbjvTQNxipc6h5xE9VGz6Y4_rzVndnU_sdJTFVR7aMOMyGHN_Fg5Vdaxi8fW2lc_9TKI-K-TFaAU5js1bbdKDF3XsHjC8UO09qkSGYwTS1v',
  goldenDoodle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9NhCcjp82uXJE-Hq_kYvVPQ_d-SI6Vwfi4pP9PX7Pj7ndus_NzaNRjctwNACpWttrO5uWEwPG5U4IBhcnBNmu_du4p6AfJh-0sSh_ktixIE6q4ooMFq6yxuJOY4Id0S50v8wPCBwhjkM1Y07VELopL3BG4Rz4M3mvDwG9Op7NIiv0oEJtD5C6vP7D074seO5BSzDB1T0NYbmi08brod5M-raK3Y46G3HP0WI_oI_kP4IN2aKgiAwx',
  frenchBulldog: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnKEd2DxpNTHrixBrK7skHwwU7M42v2iIXXJicXu8y6Og-s47wxF4lWL6ldj5on7VoALmVtniQBUYPnW_oZvsN6UZSVHApjwHWumOPmQWRbBhynUM0-wMHgNnEZNFn8AZIpaXMoa_QCSUXlE0PZzqSnQrLqYQfSnHriV-Za0WXhwvaoLaRHMDQq3JmyeAdm9OZKC5VXVwXrb0Y7wCdOG0cLAL7CaVGJklxIwJS8iWIF-CwvyDNbW-R',
  cavalierSpaniel: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYxDCDtDjsOrlSb8CiVlTVt169rAxeprzyzNxZ7dikBpmbS83lMbK2ab2ANUTnGeM6BdoagFQQl3zvYwSghkwsTyy64_TIoAzgGxTW_6uB21CcJ-PqOhBjN9Eo_wKiT8C6RS3kPGlw1FCQ1Q3wnnx22z-QcTIxo0KdYXkjYvavVtwuVkvm5jCYE9YUgYRicYAxGZeF9cQsQzoyKrWg0hPPUagQKYugfqWC2JfpQXn55DS6uWKGbm2h',
  peekingDog: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtm0bLPa6S_5mzp7ieE8S3b1ysDwybSXQXThiqZO5kbsz53N1d-aNo4LkxVncuWYAo4Yz-yGuAB_XkBjtElomAVzlFqFScxyUAzfYhe2BkwbJspchK_s_h8kX8XlXenjvLaYRW2CsSF2DbCzwlZCRsvAWU1opkmT32Pg-EvEfQGEqqpStdEJt2lPSnWtqYCBxEeIvhtnL1gQ5LrWV3V7CpB4Ny2iCiny_pYsU2bhGKakLlwblteqyj',
  serviceThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHu6I2VD_gyLf8Sk5-A6Ueu7fw9ltZWHyHL_wGpDGOLUmGPLT-M_ceJXdfx5yFHGZe2WWvYqV8BRi5g78HmHgIv63UCVYym84H5yRjSGnWpGhYDqW_M5LJECTaKbgSiwcXGSCKbcDYJfOVhhjkz2ojN8kwP0hmnID86JIpdx4OslpQ_Ljf3zNsQRhl-mU1ro4db88OkU6v56g6NC5Fhyfhs-9WLpQsZtrqPZRL-BYAx3wy7lzAxg6t',
  gridDog: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsVMWQ29Jnagxi4tGtBZNFnFM1Ejm6Acu_VpetLH3JXG3PzY1RieGRHuld7Y1wunVu6kJ9ndSyJtrG2d8Ypnwa6gkocOAPtiwRrld46og8X-DQnmdruIvHzdsvBE8-Vqpo0zn9ee4eAk1lvDWQ2U5oJ2eFTBRAtJNr9ahN-q7q8t6y_T8ReKO6Pzmu4rK-IcWhrkbDyCkCrBRm46QVO0vEh6YSo-UC8iPHOQgodVMfmf2EoXcXAxw-',
  sliderBefore: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp0fphT13W35-6U0ddXDE54xe3KdMSESMWzS3DOK4dKbhh49BBa8aau0rbKFhqeVbEp37TYVuAvXx4M9Pzcfhb8uLWmehOhvLvEj-SxtsoeY_AHa5bhTMqH3Xh-rZ0DDAjaJDtwcgpur2vChjhI1G0tjJZdXJFC98DOA-IJZIwgRvxvMNaIBnRf2Kq7zr4JnfkXVrsluDhnJaHsjWm1p9q8knc3nKShmIKBW6OkRI_CP10Vccm8GFq',
  sliderAfter: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnLg8dXrKupzWctjosznuEx3TGrwWC7l4HBEk-4WLe4atXRiUehHkKEEe26mUrvGP3-QiOXQEXQaSJDg6MVejoC-0QTjtR60_VmGlmZNmY9kWS5b45MosrlbefRj-x3wfyLmRT0Mn-r9tFzTkONgZ2Z8Q7BNXd0MWwca0hDItpop7uSQWBv27fpzVeGDUVinl3kr91QzBtZNU9GhK5G1RlTiV-689RF5x2wT2LoYCSWvTIl4O0OxU-',
  testimonialPet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzrX6hLswuJX7ZJNKDNjOH2czZNDC8erPK2CuinOauBAirEgBodiJ3mO_9bYEE_g8JpGNlB2iQKmZm4lkeo8yGVLWsELZQm3I3ynQ17bWYHrcx4oV3g8XKmsbHtWJvbZ-zdLggZbWgXJJNNFu7VZymtH5EgwSSwTXZ__Knp3JXdE0v9LWfPBIh8xRciswy_kA_ZLgBgQ_5srKSLAakBRHeEpMy3m4vQpAb9K5VMEwnclQkCT1q0Jfq',
  galleryTeddy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwi5O1Z3EG_YLaXG6fVBntsat2A8W9JdOjZDelzW_-C1Ohgmg35MHfxO4cz3bzfLTDMsbRkNaKJtUL99ajXbSCl-B1Nd7jPGxmTWW4dzT1Bej0eZGiSlI1qw_C3BaPE7DRaWcbEgDT2zypCOVZnsxFNNJmWFNDDXWkBhJyeiJ36-Ntnt6eyPkOHkofSybk1aJcJ6Q0U0-zNCBmm-mb0BHn_6eHnnOpTDLcWMDNpCneGfe2bprkINC2',
  galleryFacial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI9JX2KgLD9Yvs5wGBQN4jA8wjDfpf1BL9WzA5q0tqEjOF3xWE19yPe4EFD8c_ICL99IlNXGcr-JlDeNqEPbggPLq5D3TjD76tButcGvhchV-MxESC2CIGv9U2gnZRDqEROjvclgHThf9SRUC67a4UVBz8WONrOwKeKhyLPm0ExUMMz28V6LX9DkJfQ_52P6r8OjE1Bw8FmstOGjpN2IoE1bzJrYlQUz0bojZUdR7vrliohdnHxlyF',
  galleryPuppy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBotaRD_6NnAidfYiTMaMl70SjcL7ZWayhPJq1UKOHPLI0K8pgoifVUbc1XB2OaOkNn2cojEW3Emq5bexPkre0U1bAtbwFkeWD4JUWP5GT5nufgsnXrxyA2jsJCofDdvCBmEQnpVb2m-rA5_bcROd5cJxRRC4aAtgOAMRGVo6s5aE2EECdnEv7upSh7XPDmvOl0aiCo60C5Njpf1mPtjBBnMwxJqArecyuR08jK-zKz19x0kdHUb0BD'
};

// Real Authentic Packages from www.furologypawspa.com (Dogs Only)
interface ServicePackage {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  category: 'groom' | 'bath' | 'daycare';
  title: string;
  tagline: string;
  desc: string;
  duration: string;
  estimateRate: string;
  includes: string[];
  image: string;
}

const AUTHENTIC_SERVICES: ServicePackage[] = [
  {
    id: 'signature',
    name: 'Furology Paw Spa Signature',
    badge: 'Ultimate VIP',
    badgeColor: 'bg-[#FF1493] text-white',
    category: 'groom',
    title: 'The Signature Spa Retreat',
    tagline: 'Complete head-to-tail royal makeover with digital keepsake photo collage',
    desc: 'The pinnacle of pet pampering! Features a pre-groom "Paws & Relax" massage with botanical Aroma Paws oils, Green Groom organic shampoo, Blueberry facial cleanse, full scissor styling, bandanas or bows, scented spritz, and a digital photo collage texted directly to you.',
    duration: '2.5 – 4 hours',
    estimateRate: 'Consultation quote based on breed & coat',
    includes: ['Aroma Paws Oil Massage', 'Blueberry Facial', 'Custom Scissor Haircut', 'Green Groom Bath', 'Digital Photo Collage', 'Designer Bow or Bandana'],
    image: ASSETS.serviceThumb
  },
  {
    id: 'major-makeover',
    name: 'The Major Make-o-Fur',
    badge: 'Full Haircut',
    badgeColor: 'bg-[#38D430] text-[#111827]',
    category: 'groom',
    title: 'The Major Make-o-Fur Package',
    tagline: 'Full-body breed pattern or custom lifestyle haircut',
    desc: 'Complete coat transformation! Includes full-body clipping and hand-scissoring, soothing Green Groom bath, gentle ear cleansing, sanitary trim, paw pad trim, nail clip & filing, and warm hand fluff dry.',
    duration: '2.5 – 3.5 hours',
    estimateRate: 'Custom estimate by breed & weight',
    includes: ['Full Body Haircut', 'Green Groom Bath', 'Fluff Blowdry', 'Ear Cleansing & Nails', 'Sanitary & Pad Shave'],
    image: ASSETS.goldenDoodle
  },
  {
    id: 'minor-makeover',
    name: 'The Minor Make-o-Fur',
    badge: 'Outline Trim',
    badgeColor: 'bg-[#F4F6F0] text-[#111827]',
    category: 'groom',
    title: 'The Minor Make-o-Fur Package',
    tagline: 'Perimeter shaping, feather trimming, and face tidy',
    desc: 'Perfect for maintainers between major haircuts. Includes a refreshing Green Groom bath, warm fluff dry, face & eye trim, sanitary area cleanup, pad shave, feet round-up, and contour outline scissoring.',
    duration: '2 – 3 hours',
    estimateRate: 'Custom estimate by coat length',
    includes: ['Outline Feather Trim', 'Face & Eyes Scissoring', 'Sanitary Tidy', 'Nails & Ears', 'Aroma Paws Spritz'],
    image: ASSETS.cavalierSpaniel
  },
  {
    id: 'mini-makeover',
    name: 'The Mini Make-o-Fur',
    badge: 'Hygiene & Cleanse',
    badgeColor: 'bg-white text-[#111827]',
    category: 'groom',
    title: 'The Mini Make-o-Fur Package',
    tagline: 'Deep organic bath with targeted sanitary and paw touch-ups',
    desc: 'Targeted hygiene styling. Pre-groom brush out, organic bath with coat-tailored shampoo, blow dry, nail clipping, ear cleansing, eye trim, and sanitary/paw pad hygiene clipping.',
    duration: '1.5 – 2.5 hours',
    estimateRate: 'Tailored to pet size & coat',
    includes: ['Sanitary Cleanse', 'Paw Pad Shave', 'Nail Trimming', 'Ear Flush', 'Natural Coat Wash'],
    image: ASSETS.frenchBulldog
  },
  {
    id: 'fur-refresher',
    name: 'The Fur-Refresher / Essentials',
    badge: 'Fast Refresh',
    badgeColor: 'bg-[#38D430] text-[#111827]',
    category: 'bath',
    title: 'The Fur-Refresher Bath & Brush',
    tagline: 'Invigorating warm hydrobath, deshed blow dry & brush out',
    desc: 'Restores silky softness and ocean-fresh fragrance. Hydro-massage bath, coat conditioning, thorough brush-out, nail dremel filing, and Aroma Paws finishing mist.',
    duration: '1.5 – 2 hours',
    estimateRate: 'By breed size & drying time',
    includes: ['Hydro-Massage Bath', 'High-Velocity Blowout', 'Nail Dremel Filing', 'Breath Refresh', 'Aroma Paws Mist'],
    image: ASSETS.cardBeagle
  },
  {
    id: 'daycare',
    name: 'Oceanfront Doggie Daycare',
    badge: '$20 / hr (1 Dog)',
    badgeColor: 'bg-[#FF1493] text-white',
    category: 'daycare',
    title: 'Doggie Daycare with Ocean View',
    tagline: 'Safe, fun socializing on ground level of Ocean Park Resort',
    desc: 'For small & medium dogs up to 40 lbs! Offers structured playtime, organic treats, potty walks, quiet cuddle breaks, and digital photo collages/selfie updates texted to pet parents. Ideal for locals and resort guests enjoying Myrtle Beach!',
    duration: 'Hourly or Short-Term Daycare',
    estimateRate: '$20/hr (1 Dog) · $35/hr (2 Dogs)',
    includes: ['Up to 40 lbs Limit for Safety', 'Supervised Play & Rest', 'Organic Healthy Snacks', 'Text Photos & Updates', 'Oceanfront Breeze'],
    image: ASSETS.gridDog
  }
];

const AUTHENTIC_TESTIMONIALS = [
  {
    quote: '"FURology was incredible! Debra and her team took such gentle care of Charlie. Having the paw spa right on Ocean Boulevard is so convenient for beach days. The scissor work was world-class and Charlie came home happy!"',
    author: 'Sarah M. & Charlie',
    role: 'Golden Retriever Parent · Myrtle Beach Local',
    avatar: ASSETS.testimonialPet
  },
  {
    quote: '"No more 4-hour cage anxieties at traditional salons! The Aroma Paws oil massage and blueberry facial left Bella smelling like fresh blueberries. We loved receiving the digital photo collage right to our phone!"',
    author: 'Dave & Tina K. with Bella',
    role: 'Labradoodle Parents · Market Common, SC',
    avatar: ASSETS.cardBeagle
  },
  {
    quote: '"Debra brings over 40 years of grooming experience and it truly shows. Winston used to hate grooming, but now he walks into FURology wagging his tail. Best groomer we have found in South Carolina!"',
    author: 'Jason R. with Winston',
    role: 'Cavalier Spaniel Parent · Grand Strand, SC',
    avatar: ASSETS.cavalierSpaniel
  },
  {
    quote: '"We were staying at Ocean Park Resort and needed someone to watch our 16-lb pup while we spent the morning on the boardwalk. FURology daycare was a lifesaver! Safe, sweet, and he got a blueberry bath too!"',
    author: 'Megan & Rob P. with Cooper',
    role: 'Ocean Park Resort Guests · Traveling with Dog',
    avatar: ASSETS.frenchBulldog
  }
];

export default function App() {
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Woof Easter Egg state
  const [showWoof, setShowWoof] = useState(false);

  // Active Service Selection
  const [selectedService, setSelectedService] = useState<ServicePackage>(AUTHENTIC_SERVICES[0]);

  // Add-on treatments confirmed
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['Blueberry Facial']);

  // Before & After comparison slider
  const [sliderPos, setSliderPos] = useState<number>(50);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Testimonial index
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  // FAQ open item
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Price / Duration Estimator
  const [estWeight, setEstWeight] = useState<'small' | 'medium' | 'large'>('small');
  const [estServiceType, setEstServiceType] = useState<string>('signature');
  const [estIncludeDaycare, setEstIncludeDaycare] = useState(false);

  // Booking Form state
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    phone: '',
    email: '',
    addressOrResort: '',
    petNameBreed: '',
    petWeight: 'under25',
    serviceRequested: 'Furology Paw Spa Signature',
    serviceLocation: 'Ocean Park Resort Spa (1905 S Ocean Blvd)',
    hasRabiesProof: 'yes',
    preferredDate: '',
    notes: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Newsletter feedback state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Back to top visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Business open/closed status (Eastern Time: Tues-Sat 8:30 AM - 5:00 PM)
  const [businessStatus, setBusinessStatus] = useState({
    isOpen: true,
    text: 'OPEN NOW · TUES–SAT 8:30 AM – 5 PM',
    subText: 'Call (843) 580-DOGS for same-day availability'
  });

  useEffect(() => {
    const checkHours = () => {
      const now = new Date();
      const nyTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      const hours = nyTime.getHours();
      const minutes = nyTime.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      const day = nyTime.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, ... 6 = Saturday

      // Closed Sun (0), Mon (1). Open Tue (2) - Sat (6) from 8:30 AM to 5:00 PM
      const isWorkingDay = day >= 2 && day <= 6;
      const isWorkingHour = totalMinutes >= 510 && totalMinutes < 1020;
      const isOpen = isWorkingDay && isWorkingHour;

      if (isOpen) {
        setBusinessStatus({
          isOpen: true,
          text: 'OPEN NOW · CLOSES 5:00 PM',
          subText: 'Call 843-580-DOGS (3647) for appointment openings'
        });
      } else {
        setBusinessStatus({
          isOpen: false,
          text: 'CLOSED NOW · OPENS 8:30 AM TUESDAY',
          subText: 'Book online 24/7 or leave us a message'
        });
      }
    };

    checkHours();
    const interval = setInterval(checkHours, 60000);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const triggerWoof = () => {
    setShowWoof(true);
    setTimeout(() => setShowWoof(false), 2200);
  };

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      const msg = document.getElementById('booking-success-message');
      if (msg) msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  const selectServiceForBooking = (pkg: ServicePackage) => {
    setSelectedService(pkg);
    setBookingFormData(prev => ({ ...prev, serviceRequested: pkg.name }));
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#F9F9F9] text-[#111827] overflow-x-hidden selection:bg-[#38D430] selection:text-[#111827]">
      {/* ======================================================== */}
      {/* TOP RESORT & LOCATION NOTICE BAR                         */}
      {/* ======================================================== */}
      <div className="bg-[#111827] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center font-bold tracking-wide border-b-2 border-[#111827] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <span className="bg-[#FF1493] text-white px-2 py-0.5 rounded text-[10px] uppercase font-black shrink-0">
          OCEAN VIEW FACILITY
        </span>
        <span className="truncate max-w-[280px] sm:max-w-none">
          Ground Level <strong>Ocean Park Resort</strong> · 1905 S. Ocean Blvd, Myrtle Beach
        </span>
        <span className="hidden sm:inline text-gray-500">|</span>
        <a href="tel:8435803647" className="text-[#38D430] hover:underline flex items-center gap-1 font-black shrink-0">
          <i className="fa-solid fa-phone text-xs text-[#FF1493]"></i> 843-580-DOGS
        </a>
      </div>

      {/* ======================================================== */}
      {/* 1. FLOATING HEADER (PRESERVED DESKTOP + CLEAR MOBILE)    */}
      {/* ======================================================== */}
      <header className="sticky top-2 z-50 px-3 sm:px-6 max-w-6xl mx-auto my-1.5 sm:my-2" aria-label="Main Navigation">
        <div className="bg-white/95 backdrop-blur-md b-border rounded-full py-1.5 sm:py-2 px-3 sm:px-5 shadow-brutal flex items-center justify-between transition-all duration-300">
          {/* Brand Logo with Interactive Easter Egg */}
          <div
            className="relative flex items-center cursor-pointer select-none py-0.5 sm:py-1 group"
            onClick={triggerWoof}
            title="Click for a playful surprise!"
          >
            <img
              src={ASSETS.logo}
              alt="Furology Paw Spa & Retreat"
              className="h-8 sm:h-10 md:h-11 w-auto object-contain hover:scale-105 transition-transform drop-shadow-sm"
            />
            {/* Woof Easter Egg Tooltip */}
            {showWoof && (
              <div className="absolute -top-10 left-6 sm:left-12 bg-[#38D430] text-[#111827] b-border px-3 py-1 rounded-full text-xs font-black shadow-brutal animate-bounce whitespace-nowrap z-50">
                WOOF! 🐾 Ocean Park Resort!
              </div>
            )}
          </div>

          {/* Desktop Nav Links (Preserved Desktop) */}
          <nav className="hidden lg:flex items-center space-x-5 text-sm font-bold tracking-tight">
            <a href="#about" className="hover:text-[#FF1493] transition-colors">About Us</a>
            <a href="#services" className="hover:text-[#FF1493] transition-colors">Make-o-Fur Menu</a>
            <a href="#daycare" className="hover:text-[#FF1493] transition-colors">Doggie Daycare</a>
            <a href="#estimator" className="hover:text-[#FF1493] transition-colors">Quote Estimator</a>
            <a href="#reviews" className="hover:text-[#FF1493] transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-[#FF1493] transition-colors">FAQ &amp; Policies</a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="tel:8435803647"
              className="inline-flex items-center gap-1 bg-[#F4F6F0] hover:bg-[#FF1493]/10 b-border text-[11px] sm:text-xs uppercase tracking-wider font-black px-2.5 sm:px-3 py-1.5 rounded-full shadow-brutal-sm transition-all"
            >
              <i className="fa-solid fa-phone text-[#FF1493] text-[10px] sm:text-xs"></i>
              <span className="hidden sm:inline">(843) 580-3647</span>
              <span className="sm:hidden">Call</span>
            </a>
            <a
              href="#booking"
              className="inline-flex items-center gap-1 bg-[#38D430] hover:bg-[#30bd29] text-[#111827] b-border text-[11px] sm:text-xs uppercase tracking-wider font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-brutal-sm transition-all active:translate-y-0.5"
            >
              <span>Book</span>
              <span className="text-xs">🐾</span>
            </a>
            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation drawer"
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 b-border rounded-full flex items-center justify-center bg-white hover:bg-[#F4F6F0] shadow-brutal-sm active:scale-95 transition-transform"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xs sm:text-sm`}></i>
            </button>
          </div>
        </div>

        {/* Clear Mobile Drawer Sheet */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white b-border-thick rounded-3xl p-4 sm:p-5 shadow-brutal-lg flex flex-col space-y-3 font-bold text-center animate-in fade-in slide-in-from-top-3 duration-200 z-50">
            {/* Status & Location Pill */}
            <div className="bg-[#F4F6F0] b-border p-3 rounded-2xl text-left text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-black text-[#111827] flex items-center gap-1.5 text-xs">
                  <i className="fa-solid fa-location-dot text-[#FF1493]"></i>
                  1905 S. Ocean Blvd
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full b-border ${businessStatus.isOpen ? 'bg-[#38D430] text-[#111827]' : 'bg-[#FF1493] text-white'}`}>
                  {businessStatus.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
              <p className="text-gray-600 text-[11px]">Ground Level Ocean Park Resort (Ocean View)</p>
            </div>

            {/* Clear Nav Grid */}
            <div className="grid grid-cols-2 gap-2 text-left text-xs font-black">
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-[#38D430]/15 hover:bg-[#38D430]/30 b-border rounded-xl flex items-center gap-2"
                href="#services"
              >
                <span>✂️</span>
                <span>Make-o-Fur Menu</span>
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-[#FF1493]/10 hover:bg-[#FF1493]/20 b-border rounded-xl flex items-center gap-2"
                href="#daycare"
              >
                <span>🏖️</span>
                <span>Doggie Daycare</span>
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-white hover:bg-[#F4F6F0] b-border rounded-xl flex items-center gap-2"
                href="#estimator"
              >
                <span>🧮</span>
                <span>Price Estimator</span>
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-white hover:bg-[#F4F6F0] b-border rounded-xl flex items-center gap-2"
                href="#about"
              >
                <span>⭐</span>
                <span>About Our Story</span>
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-white hover:bg-[#F4F6F0] b-border rounded-xl flex items-center gap-2"
                href="#reviews"
              >
                <span>💬</span>
                <span>Guest Reviews</span>
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-white hover:bg-[#F4F6F0] b-border rounded-xl flex items-center gap-2"
                href="#faq"
              >
                <span>📋</span>
                <span>Rabies &amp; Policies</span>
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
              <a
                href="tel:8435803647"
                className="btn-brutal bg-white text-[#111827] py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <i className="fa-solid fa-phone text-[#FF1493]"></i> Call Salon
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="btn-brutal bg-[#38D430] text-[#111827] py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
                href="#booking"
              >
                Book Now 🐾
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ======================================================== */}
        {/* 2. HERO SECTION                                          */}
        {/* (Clean, Uncluttered Mobile Layout + Preserved Desktop)    */}
        {/* ======================================================== */}
        <section className="relative pt-3 sm:pt-10 pb-8 sm:pb-20 px-3 sm:px-4 overflow-hidden graph-paper-bg">
          {/* 2A. MOBILE CLEAR HERO (< lg:block) */}
          <div className="lg:hidden max-w-lg mx-auto flex flex-col items-center text-center space-y-4">
            {/* Clear Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white b-border px-3.5 py-1 rounded-full shadow-brutal-sm text-xs font-black">
              <span className="flex text-amber-500 text-xs">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>
              <span className="uppercase text-[#111827] tracking-wider text-[11px]">
                5.0 RATED · OCEAN VIEW SPA
              </span>
            </div>

            {/* Clear, Punchy Mobile Headline */}
            <h1 className="font-display uppercase text-3xl sm:text-4xl leading-[1.05] tracking-tight text-[#111827]">
              SPA DAYS FOR YOUR<br />PET'S BEST FRIEND 🐾
            </h1>

            {/* Clear Mobile Dog Card */}
            <div className="w-full relative rounded-2xl b-border overflow-hidden shadow-brutal bg-[#38D430] h-56 flex items-end justify-center">
              <img
                alt="Happy groomed dog at FURology Paw Spa"
                className="w-full h-full object-cover object-top"
                src={ASSETS.heroDog}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-white b-border px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-brutal-sm">
                🏖️ Ocean Park Resort
              </div>
              <div className="absolute top-2 right-2 bg-[#FF1493] text-white b-border px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-brutal-sm">
                40+ Yrs Exp
              </div>
            </div>

            {/* Clear, Legible Subtitle */}
            <p className="text-xs text-gray-800 font-medium leading-relaxed px-1">
              Myrtle Beach’s only <strong>Green Grooming &amp; Doggie Daycare</strong> facility with an ocean view at Ocean Park Resort! Over 40+ years loving mastery by Debra &amp; John Burns.
            </p>

            {/* Primary Action Buttons */}
            <div className="w-full space-y-2 pt-1">
              <a
                href="#booking"
                className="btn-brutal w-full bg-[#38D430] hover:bg-[#30bd29] text-[#111827] py-3.5 rounded-full font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-brutal"
              >
                <span>Book Appointment</span>
                <span>🐾</span>
              </a>
              <a
                href="tel:8435803647"
                className="btn-brutal w-full bg-white hover:bg-[#F4F6F0] text-[#111827] py-3 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-phone text-[#FF1493]"></i>
                <span>(843) 580-3647 · Call Us</span>
              </a>
            </div>

            {/* 3 Clear Micro Badges */}
            <div className="grid grid-cols-3 gap-1.5 w-full pt-1 text-[10px] font-black text-[#111827]">
              <div className="bg-white b-border p-2 rounded-xl text-center shadow-brutal-sm">
                <span className="block text-sm">🌿</span>
                <span>100% Organic</span>
              </div>
              <div className="bg-white b-border p-2 rounded-xl text-center shadow-brutal-sm">
                <span className="block text-sm">🌊</span>
                <span>Ocean View</span>
              </div>
              <div className="bg-white b-border p-2 rounded-xl text-center shadow-brutal-sm">
                <span className="block text-sm">🛡️</span>
                <span>Rabies Safe</span>
              </div>
            </div>
          </div>

          {/* 2B. DESKTOP PRESERVED HERO (hidden lg:grid - exact look user loves) */}
          <div className="hidden lg:grid max-w-6xl mx-auto grid-cols-12 gap-10 items-center">
            {/* Left Hero Copy */}
            <div className="col-span-7 flex flex-col items-start z-10">
              <div className="inline-flex flex-wrap items-center gap-2 bg-white b-border px-4 py-1.5 rounded-full shadow-brutal-sm mb-4 text-xs font-black">
                <span className="flex text-amber-500 text-xs">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="uppercase text-[#111827] tracking-wider">
                  5.0 STAR · OCEAN VIEW RETREAT
                </span>
                <span className="bg-[#38D430] text-[#111827] b-border px-2 py-0.2 rounded-full text-[10px]">
                  GREEN GROOM
                </span>
              </div>

              <h1 className="font-display uppercase text-6xl md:text-7xl leading-[0.95] tracking-tight mb-4 text-[#111827]">
                SPA DAYS FOR YOUR{' '}
                <span className="inline-flex items-center align-middle bg-[#38D430] text-[#111827] px-3 py-0.5 rounded-full b-border text-3xl rotate-[-3deg] shadow-brutal-sm mx-1">
                  🐶
                </span>
                <br />
                PET'S BEST FRIEND{' '}
                <span className="inline-flex items-center align-middle bg-[#FF1493] text-white px-2 py-0.5 rounded-full b-border text-2xl rotate-[5deg] shadow-brutal-sm mx-1">
                  ❤️
                </span>
              </h1>

              <p className="text-gray-800 text-base md:text-lg max-w-xl mb-6 font-medium leading-relaxed">
                The Grand Strand’s only <strong>Green Grooming &amp; Doggie Daycare</strong> facility with an ocean view! Located on the ground level of Ocean Park Resort with mobile van options. Over <strong>40+ years of loving expertise</strong> by Debra &amp; John Burns.
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="#booking"
                  className="btn-brutal bg-[#38D430] hover:bg-[#30bd29] text-[#111827] px-7 py-3.5 rounded-full font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Book Appointment</span>
                  <span className="opacity-60">|</span>
                  <span>🐶</span>
                </a>
                <a
                  href="tel:8435803647"
                  className="btn-brutal bg-white hover:bg-[#F4F6F0] text-[#111827] px-6 py-3.5 rounded-full font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-phone text-xs text-[#FF1493]"></i>
                  <span>(843) 580-3647</span>
                </a>
              </div>

              <div className="mt-8 flex items-center gap-4 text-xs font-bold text-gray-700">
                <div className="flex items-center gap-1.5 bg-white b-border px-2.5 py-1 rounded-full shadow-brutal-sm">
                  <i className="fa-solid fa-water text-[#38D430]"></i>
                  <span>Ocean View Salon &amp; Mobile</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white b-border px-2.5 py-1 rounded-full shadow-brutal-sm">
                  <i className="fa-solid fa-leaf text-[#006e04]"></i>
                  <span>100% Organic Products</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white b-border px-2.5 py-1 rounded-full shadow-brutal-sm">
                  <i className="fa-solid fa-shield-heart text-[#FF1493]"></i>
                  <span>Rabies Certified Care</span>
                </div>
              </div>
            </div>

            {/* Right Hero Arch Visual */}
            <div className="col-span-5 relative flex justify-center items-center">
              <div className="w-80 h-[400px] bg-[#38D430] b-border-thick rounded-t-[140px] rounded-b-3xl relative overflow-hidden shadow-brutal-lg flex items-end justify-center">
                <img
                  alt="Happy groomed dog at FURology Paw Spa Myrtle Beach"
                  className="w-full h-full object-cover object-top scale-105 hover:scale-110 transition-transform duration-500"
                  src={ASSETS.heroDog}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="absolute -top-2 left-6 bg-white b-border px-3 py-1 rounded-full shadow-brutal -rotate-12 text-xl select-none animate-pulse">
                🦴
              </div>

              <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#FF1493] text-white b-border rounded-full flex items-center justify-center shadow-brutal select-none z-20">
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg className="w-full h-full p-1 spin-badge" viewBox="0 0 100 100">
                    <path
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      fill="none"
                      id="circlePathHeroDesktop"
                    ></path>
                    <text className="text-[9px] font-black uppercase tracking-widest fill-white">
                      <textPath startOffset="0%" xlinkHref="#circlePathHeroDesktop">
                        ★ 40+ YRS EXP · OCEAN VIEW SPA ·
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-8 h-8 rounded-full bg-[#38D430] text-[#111827] b-border flex items-center justify-center text-xs">
                    🐾
                  </div>
                </div>
              </div>

              <div className="serrated-card absolute -bottom-6 -left-6 py-2.5 px-6 rounded-lg shadow-brutal text-white text-left z-20">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🌊</div>
                  <div>
                    <p className="text-[9px] uppercase font-black tracking-widest text-[#38D430] leading-tight">RESORT &amp; MOBILE</p>
                    <p className="font-display text-base tracking-wide uppercase leading-tight text-white">OCEAN PARK RESORT</p>
                    <p className="text-[9px] opacity-90">1905 S. Ocean Blvd &amp; Mobile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. ABOUT FUROLOGY & FOUNDERS (AUTHENTIC ABOUT PAGE)      */}
        {/* ======================================================== */}
        <section id="about" className="py-10 sm:py-16 px-3 sm:px-6 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white b-border px-3 py-1 rounded-full shadow-brutal-sm">
              ABOUT FUROLOGY PAW SPA &amp; RETREAT
            </span>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-[#111827] mt-2">
              “PAWS, RELAX &amp; REFRESH”
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-gray-700 max-w-2xl mx-auto mt-2">
              Our mission is to Paws-i-tively transform your pet both inside and out with gentleness, trust, and over 40 years of loving experience.
            </p>
          </div>

          {/* Core About Grid: Founders Feature + Mission Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-8 sm:mb-10">
            {/* Left Col (5 cols): Founders Card & Track Record */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div className="bg-white b-border rounded-2xl p-4 sm:p-5 shadow-brutal relative overflow-hidden">
                <div className="relative rounded-xl overflow-hidden b-border mb-4 bg-neutral-100">
                  <img
                    alt="Debra and John Burns at Furology Paw Spa"
                    className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-300"
                    src={ASSETS.aboutJohnAndDebra}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#111827] text-white text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-full b-border shadow-brutal-sm">
                    Debra &amp; John Burns
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#38D430] text-[#111827] text-[10px] font-black uppercase px-2.5 py-1 rounded-full b-border shadow-brutal-sm">
                    Owners &amp; Founders
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#38D430] animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                      Ocean Park Resort · Myrtle Beach, SC
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-[#111827]">
                    Debra &amp; John Burns
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    Debra brings over 40 years of master grooming expertise. Her gentle philosophy ensures every guest experiences unconditional kindness and a calm, happy spa visit.
                  </p>
                </div>

                {/* 4 Key Milestone Stats */}
                <div className="grid grid-cols-2 gap-2 pt-4 mt-4 border-t-2 border-dashed border-gray-200">
                  <div className="p-2.5 bg-[#F4F6F0] b-border rounded-xl text-center">
                    <span className="font-display text-2xl text-[#111827] block leading-none">40+</span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-gray-600">Years Experience</span>
                  </div>
                  <div className="p-2.5 bg-[#F4F6F0] b-border rounded-xl text-center">
                    <span className="font-display text-2xl text-[#FF1493] block leading-none">28</span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-gray-600">Yrs Four Paws Only</span>
                  </div>
                  <div className="p-2.5 bg-[#F4F6F0] b-border rounded-xl text-center">
                    <span className="font-display text-2xl text-[#38D430] block leading-none">5,000+</span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-gray-600">Furry Clients</span>
                  </div>
                  <div className="p-2.5 bg-[#F4F6F0] b-border rounded-xl text-center">
                    <span className="font-display text-2xl text-[#111827] block leading-none">2016</span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-gray-600">Myrtle Beach Est.</span>
                  </div>
                </div>
              </div>

              {/* Emotional Well-being Guarantee Box */}
              <div className="bg-[#FF1493] text-white b-border rounded-2xl p-4 sm:p-5 shadow-brutal text-left">
                <div className="flex items-start gap-3">
                  <span className="text-2xl sm:text-3xl">🐾</span>
                  <div>
                    <h4 className="font-display text-lg uppercase tracking-wide leading-tight">
                      Our "Never Push" Guarantee
                    </h4>
                    <p className="text-xs font-semibold mt-1 text-pink-100 leading-relaxed">
                      "Your pet’s safety &amp; emotional well-being are of utmost importance to us. We will NEVER push your pet to do anything he or she is not comfortable with."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col (7 cols): Detailed Authentic Story & Philosophy */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {/* Mission Card */}
              <div className="bg-white b-border rounded-2xl p-5 sm:p-6 shadow-brutal text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#38D430] text-[#111827] text-[10px] font-black uppercase px-2 py-0.5 rounded b-border">
                    Our Mission
                  </span>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                    Inside &amp; Out Transformation
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-[#111827] mb-3">
                  A SANCTUARY TO PAWS, RELAX &amp; REFRESH
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                  Here at <strong>“Furology Paw Spa &amp; Retreat”</strong>, our mission is to <em>Paws-i-tively transform your pet both inside and out</em>. Our goal for your furry family member is to provide a full day, &frac12; day, or just a few minutes to <strong>“Paws, Relax &amp; Refresh”</strong>.
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Whether it be from a long day of beach travel or just the stress of everyday life, our oceanfront resort sanctuary offers a peaceful, cage-minimal environment where pups feel pampered, safe, and truly cherished.
                </p>
              </div>

              {/* The History & Massachusetts Roots */}
              <div className="bg-white b-border rounded-2xl p-5 sm:p-6 shadow-brutal text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#FF1493] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded b-border">
                    The Heritage
                  </span>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                    Four Paws Only Inc. · Dracut, MA
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-[#111827] mb-3">
                  40+ YEARS OF DEDICATED ANIMAL CARE
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                  Debra has over <strong>40 years of experience</strong> in the pet grooming &amp; pet sitting industry, including <strong>28 years as the owner/operator of Four Paws Only Inc.</strong>, a renowned pet grooming spa in Dracut, Massachusetts. With a staff of 4 and over 5,000 furry clients, Four Paws Only was the undisputed top pet grooming facility in the area.
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  In early 2016, seeking way less snow and much more sunshine, Debra, her husband John, and their 3 retrievers sold Four Paws Only and relocated to the Myrtle Beach area. <strong>Furology Paw Spa &amp; Retreat was born!</strong>
                </p>
              </div>

              {/* Modern Flare & Safe Practices */}
              <div className="bg-[#F4F6F0] b-border rounded-2xl p-5 sm:p-6 shadow-brutal text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#111827] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded b-border">
                    Our Philosophy
                  </span>
                  <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                    Modern Styling · Gentle Touch
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-[#111827] mb-2">
                  BUILT ON TRUST &amp; LASTING RELATIONSHIPS
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                  Furology continues to provide professional pet styling designs with a modern flare combined with kind, gentle, and safe practices. These are all of the key factors that made Four Paws Only such a huge success.
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
                  Our staff strives to build a lasting relationship with our clients. These kinds of relationships begin with trust and a “Paws-i-tive” grooming experience. We look forward to making your pet look and feel “Fur-tastic”!
                </p>

                {/* Direct Action Chips */}
                <div className="flex flex-wrap gap-2 pt-4 mt-3 border-t border-gray-300">
                  <a
                    href="tel:8435803647"
                    className="btn-brutal bg-[#38D430] text-[#111827] px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-phone text-xs"></i>
                    <span>Call 1-843-580-DOGS (3647)</span>
                  </a>
                  <a
                    href="#booking"
                    className="btn-brutal bg-white hover:bg-[#111827] hover:text-white text-[#111827] px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Request Appointment</span>
                    <span>🐾</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Real Photo Showcase from Furology Website */}
          <div className="bg-white b-border rounded-2xl p-4 sm:p-6 shadow-brutal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-1">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FF1493] block">
                  INSIDE FUROLOGY PAW SPA &amp; RETREAT
                </span>
                <h4 className="font-display text-lg sm:text-2xl uppercase tracking-wide text-[#111827]">
                  REAL RESORT &amp; SALON MOMENTS
                </h4>
              </div>
              <span className="text-xs font-bold text-gray-500">
                Ground Level Ocean Park Resort · Myrtle Beach
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
              <div className="group rounded-xl b-border overflow-hidden bg-neutral-100 shadow-brutal-sm">
                <div className="h-32 sm:h-44 overflow-hidden">
                  <img
                    alt="Debra gently grooming dog"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    src={ASSETS.aboutGrooming}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-2 sm:p-2.5 bg-white text-left">
                  <span className="font-display text-[11px] sm:text-xs uppercase text-[#111827] block truncate">
                    Gentle Master Styling
                  </span>
                  <span className="text-[9px] text-gray-500 font-bold block truncate">
                    Stress-free scissoring by Debra
                  </span>
                </div>
              </div>

              <div className="group rounded-xl b-border overflow-hidden bg-neutral-100 shadow-brutal-sm">
                <div className="h-32 sm:h-44 overflow-hidden">
                  <img
                    alt="Dog beach walk Myrtle Beach"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    src={ASSETS.aboutBeachWalk}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-2 sm:p-2.5 bg-white text-left">
                  <span className="font-display text-[11px] sm:text-xs uppercase text-[#111827] block truncate">
                    Oceanfront Retreat
                  </span>
                  <span className="text-[9px] text-gray-500 font-bold block truncate">
                    Beach walks &amp; sunshine
                  </span>
                </div>
              </div>

              <div className="group rounded-xl b-border overflow-hidden bg-neutral-100 shadow-brutal-sm">
                <div className="h-32 sm:h-44 overflow-hidden">
                  <img
                    alt="Daycare pup playing"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    src={ASSETS.aboutDaycare}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-2 sm:p-2.5 bg-white text-left">
                  <span className="font-display text-[11px] sm:text-xs uppercase text-[#111827] block truncate">
                    Daycare Up to 40 lbs
                  </span>
                  <span className="text-[9px] text-gray-500 font-bold block truncate">
                    Safe, small-dog socialization
                  </span>
                </div>
              </div>

              <div className="group rounded-xl b-border overflow-hidden bg-neutral-100 shadow-brutal-sm">
                <div className="h-32 sm:h-44 overflow-hidden">
                  <img
                    alt="Furology salon seating"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    src={ASSETS.aboutSeating}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-2 sm:p-2.5 bg-white text-left">
                  <span className="font-display text-[11px] sm:text-xs uppercase text-[#111827] block truncate">
                    Tranquil Spa Lounge
                  </span>
                  <span className="text-[9px] text-gray-500 font-bold block truncate">
                    Cage-minimal comfort
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. REAL MAKE-O-FUR SERVICE MENU SELECTOR                 */}
        {/* ======================================================== */}
        <section id="services" className="py-8 sm:py-14 px-3 sm:px-4 max-w-6xl mx-auto graph-paper-bg">
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-10">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white b-border px-3 py-1 rounded-full shadow-brutal-sm">
              AUTHENTIC SPA MENU
            </span>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-[#111827] mt-2">
              SIGNATURE "MAKE-O-FUR" SERVICES
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">
              Select any package below to view genuine inclusions, estimated duration, and tailored pricing approach.
            </p>
          </div>

          {/* 4A. MOBILE HIGH-CLARITY SERVICE SELECTOR (lg:hidden) */}
          <div className="lg:hidden space-y-3">
            {/* Clear Mobile Tabs */}
            <div className="grid grid-cols-2 gap-2">
              {AUTHENTIC_SERVICES.map(pkg => {
                const isSelected = selectedService.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedService(pkg)}
                    className={`p-2.5 rounded-xl b-border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#38D430] text-[#111827] shadow-brutal font-black scale-101'
                        : 'bg-white text-gray-800 shadow-brutal-sm'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-black tracking-wider block opacity-80">{pkg.badge}</span>
                    <span className="font-display text-xs uppercase leading-tight mt-0.5">{pkg.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Service Clear Card */}
            <div className="bg-white b-border-thick rounded-2xl p-4 shadow-brutal">
              <div className="flex items-start justify-between gap-3 border-b-2 border-gray-100 pb-3 mb-3">
                <div className="flex-1">
                  <span className="text-[9px] font-black uppercase bg-[#38D430] text-[#111827] b-border px-2 py-0.5 rounded shadow-brutal-sm">
                    {selectedService.category === 'daycare' ? 'DOGGIE DAYCARE' : 'MAKE-O-FUR GROOMING'}
                  </span>
                  <h3 className="font-display text-xl uppercase tracking-wide mt-1.5 text-[#111827]">
                    {selectedService.title}
                  </h3>
                  <p className="text-[11px] text-gray-600 font-bold">{selectedService.tagline}</p>
                </div>
                <div className="w-14 h-14 rounded-xl b-border overflow-hidden shrink-0 shadow-brutal-sm">
                  <img
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    src={selectedService.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed font-medium mb-3">
                {selectedService.desc}
              </p>

              {/* Inclusions */}
              <div className="bg-[#F4F6F0] b-border rounded-xl p-3 mb-3">
                <span className="text-[10px] font-black uppercase text-[#111827] block mb-1.5">What's Included:</span>
                <div className="space-y-1.5 text-xs font-bold text-gray-800">
                  {selectedService.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <i className="fa-solid fa-circle-check text-[#38D430] text-xs"></i>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rate & Duration */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-bold">
                <div className="bg-[#F4F6F0] b-border p-2 rounded-xl text-center">
                  <span className="text-gray-500 uppercase text-[9px] block">Duration</span>
                  <span className="text-[#111827] font-black text-xs">{selectedService.duration}</span>
                </div>
                <div className="bg-[#F4F6F0] b-border p-2 rounded-xl text-center">
                  <span className="text-gray-500 uppercase text-[9px] block">Pricing</span>
                  <span className="text-[#FF1493] font-black text-xs truncate block">{selectedService.estimateRate}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => selectServiceForBooking(selectedService)}
                className="btn-brutal w-full bg-[#38D430] hover:bg-[#30bd29] py-3 rounded-full font-display text-base uppercase tracking-wider text-center text-[#111827] flex items-center justify-center gap-2"
              >
                <span>Book This Package 🐾</span>
              </button>
            </div>
          </div>

          {/* 4B. DESKTOP 2-COLUMN LAYOUT (hidden lg:grid - preserved exact look) */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
            {/* Left: Package List Selector */}
            <div className="col-span-6 space-y-3">
              {AUTHENTIC_SERVICES.map(pkg => {
                const isSelected = selectedService.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedService(pkg)}
                    className={`p-4 bg-white b-border rounded-2xl cursor-pointer hover:bg-[#F4F6F0] transition-all shadow-brutal-sm ${
                      isSelected ? 'ring-3 ring-[#111827] bg-[#F4F6F0] shadow-brutal' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-3.5 h-3.5 rounded-full b-border ${isSelected ? 'bg-[#FF1493]' : 'bg-white'}`}></span>
                        <div>
                          <h4 className="font-display text-lg uppercase leading-tight">{pkg.name}</h4>
                          <p className="text-xs text-gray-500 font-medium">{pkg.tagline}</p>
                        </div>
                      </div>
                      <span className={`text-[11px] font-black b-border px-2.5 py-0.5 rounded-full whitespace-nowrap ${pkg.badgeColor}`}>
                        {pkg.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Detailed Package Card & Booking Handoff */}
            <div className="col-span-6 bg-white b-border-thick rounded-3xl p-6 sm:p-8 shadow-brutal">
              <div className="flex items-start justify-between gap-4 border-b-2 border-gray-100 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase bg-[#38D430] text-[#111827] b-border px-2 py-0.5 rounded shadow-brutal-sm">
                    {selectedService.category === 'daycare' ? 'DOGGIE DAYCARE' : 'MAKE-O-FUR GROOMING'}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide mt-2 text-[#111827]">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-semibold">{selectedService.tagline}</p>
                </div>
                <div className="w-16 h-16 rounded-xl b-border overflow-hidden flex-shrink-0 shadow-brutal-sm">
                  <img
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    src={selectedService.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed font-medium mb-5">
                {selectedService.desc}
              </p>

              {/* Inclusions Checkmarks */}
              <div className="bg-[#F4F6F0] b-border rounded-xl p-4 mb-5">
                <span className="text-xs font-black uppercase text-[#111827] block mb-2">Package Inclusions:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-gray-800">
                  {selectedService.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <i className="fa-solid fa-circle-check text-[#38D430] text-xs"></i>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transparent Rate & Duration Notice */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-6 font-bold">
                <div className="bg-white b-border p-3 rounded-xl shadow-brutal-sm">
                  <span className="text-gray-500 uppercase text-[10px] block">Estimated Duration:</span>
                  <span className="text-[#111827] font-black text-sm">{selectedService.duration}</span>
                </div>
                <div className="bg-white b-border p-3 rounded-xl shadow-brutal-sm">
                  <span className="text-gray-500 uppercase text-[10px] block">Pricing Model:</span>
                  <span className="text-[#FF1493] font-black text-sm">{selectedService.estimateRate}</span>
                </div>
              </div>

              {/* Instant Book Button */}
              <a
                href="#booking"
                onClick={() => setBookingFormData(prev => ({ ...prev, serviceRequested: selectedService.name }))}
                className="btn-brutal w-full bg-[#38D430] hover:bg-[#30bd29] py-3.5 rounded-full font-display text-lg uppercase tracking-wider text-center text-[#111827] flex items-center justify-center gap-2"
              >
                <span>Select &amp; Request Appointment</span>
                <span>🐾</span>
              </a>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. DOGGIE DAYCARE SECTION (EXCLUSIVE OCEAN VIEW)         */}
        {/* ======================================================== */}
        <section id="daycare" className="py-8 sm:py-14 px-3 sm:px-4 max-w-6xl mx-auto">
          <div className="bg-[#F4F6F0] b-border-thick rounded-3xl p-4 sm:p-10 shadow-brutal-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
              {/* Left Info */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="text-[10px] sm:text-xs font-black uppercase bg-[#FF1493] text-white b-border px-3 py-1 rounded-full shadow-brutal-sm mb-2.5">
                  Ocean Park Resort Amenity
                </span>
                <h2 className="font-display text-2xl sm:text-5xl uppercase tracking-tight text-[#111827] leading-tight mb-2 sm:mb-3">
                  OCEAN VIEW DOGGIE DAYCARE
                </h2>
                <p className="text-xs sm:text-base text-gray-800 font-medium leading-relaxed mb-4">
                  Planning a beach day, visiting Myrtle Beach's attractions, or staying at Ocean Park Resort? Leave your pup in Debra's loving care! We provide safe, air-conditioned socialization and personal cuddle time for <strong>dogs up to 40 lbs</strong>.
                </p>

                {/* Daycare Rates Card */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full mb-4 sm:mb-6">
                  <div className="bg-white b-border p-3 sm:p-4 rounded-2xl shadow-brutal-sm text-center">
                    <span className="text-[10px] uppercase font-black text-gray-500 block">Single Dog</span>
                    <span className="font-display text-2xl sm:text-3xl text-[#111827]">$20</span>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-600 block">/ hour</span>
                  </div>
                  <div className="bg-white b-border p-3 sm:p-4 rounded-2xl shadow-brutal-sm text-center">
                    <span className="text-[10px] uppercase font-black text-gray-500 block">Two Dogs</span>
                    <span className="font-display text-2xl sm:text-3xl text-[#FF1493]">$35</span>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-600 block">/ hour</span>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2 text-xs font-bold text-gray-700 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-camera text-[#38D430]"></i>
                    <span>Digital photo collages &amp; selfie text updates sent directly to you!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-bone text-[#FF1493]"></i>
                    <span>Organic gourmet snacks, structured potty breaks &amp; gentle play</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-shield-dog text-[#006e04]"></i>
                    <span>Up to 40 lbs limit ensures calm, stress-free small-dog camaraderie</span>
                  </div>
                </div>

                <a
                  href="#booking"
                  onClick={() => setBookingFormData(prev => ({ ...prev, serviceRequested: 'Oceanfront Doggie Daycare' }))}
                  className="btn-brutal bg-[#38D430] hover:bg-[#30bd29] text-[#111827] px-6 py-3 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <span>Reserve Daycare Slot</span>
                  <span>| 🌊</span>
                </a>
              </div>

              {/* Right Mosaic & Dog Photo */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-sm h-52 sm:h-72 rounded-2xl b-border overflow-hidden shadow-brutal relative bg-white">
                  <img
                    alt="Happy Daycare Dog at Ocean Park Resort"
                    className="w-full h-full object-cover"
                    src={ASSETS.gridDog}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white b-border px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black shadow-brutal-sm">
                    🏖️ Ocean Park Resort
                  </div>
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-[#38D430] text-[#111827] b-border px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black shadow-brutal-sm">
                    Up to 40 lbs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. INTERACTIVE PRICE & DURATION ESTIMATOR               */}
        {/* ======================================================== */}
        <section id="estimator" className="py-8 sm:py-14 px-3 sm:px-4 max-w-4xl mx-auto">
          <div className="bg-white b-border rounded-3xl p-4 sm:p-10 shadow-brutal text-center">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#FF1493] text-white b-border px-3 py-1 rounded-full shadow-brutal-sm">
              TRANSPARENT ESTIMATES
            </span>
            <h2 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-[#111827] mt-2">
              PET CARE ESTIMATE CALCULATOR
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-md mx-auto mb-5 sm:mb-8">
              Every pup is unique. Select your dog’s weight, desired Make-o-Fur package, and add-ons to preview typical duration and pricing factors.
            </p>

            <div className="max-w-xl mx-auto text-left space-y-4 sm:space-y-6">
              {/* 1. Pet Weight Picker */}
              <div>
                <label className="text-xs font-black uppercase text-gray-700 block mb-1.5 sm:mb-2">1. Your Dog's Weight Range:</label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: 'small', label: 'Small 🐶', sub: 'Under 25 lbs' },
                    { id: 'medium', label: 'Medium 🦮', sub: '25 – 45 lbs' },
                    { id: 'large', label: 'Large 🐕', sub: '45+ lbs' }
                  ].map(w => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setEstWeight(w.id as any)}
                      className={`p-2.5 sm:p-3 rounded-xl b-border text-center transition-all ${
                        estWeight === w.id ? 'bg-[#38D430] text-[#111827] font-black shadow-brutal-sm scale-102' : 'bg-[#F4F6F0] hover:bg-[#38D430]/10 font-bold'
                      }`}
                    >
                      <span className="block text-xs sm:text-sm uppercase font-black">{w.label}</span>
                      <span className="text-[9px] sm:text-[10px] text-gray-600 block">{w.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Package Selection */}
              <div>
                <label className="text-xs font-black uppercase text-gray-700 block mb-1.5 sm:mb-2">2. Desired Service Package:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                  {[
                    { id: 'signature', label: 'Signature Spa Package (VIP Haircut + Photo)' },
                    { id: 'major', label: 'The Major Make-o-Fur (Full Styling Haircut)' },
                    { id: 'minor', label: 'The Minor Make-o-Fur (Outline & Hygiene Trim)' },
                    { id: 'refresher', label: 'The Fur-Refresher (Bath, Nails & Blowout)' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setEstServiceType(p.id)}
                      className={`p-2.5 sm:p-3 rounded-xl b-border text-left transition-all ${
                        estServiceType === p.id ? 'bg-[#111827] text-[#38D430] shadow-brutal-sm font-black' : 'bg-[#F4F6F0] hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Add-on Daycare Checkbox */}
              <div
                onClick={() => setEstIncludeDaycare(!estIncludeDaycare)}
                className="p-3 bg-[#F4F6F0] b-border rounded-xl flex items-center justify-between cursor-pointer active:scale-99 transition-transform"
              >
                <div>
                  <span className="font-bold text-xs block text-[#111827]">Add 2 Hours of Ocean View Doggie Daycare?</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-500">Playtime before or after spa ($20/hr, dogs &le; 40 lbs)</span>
                </div>
                <input
                  type="checkbox"
                  checked={estIncludeDaycare}
                  onChange={e => setEstIncludeDaycare(e.target.checked)}
                  className="w-5 h-5 text-[#FF1493] rounded b-border focus:ring-0 cursor-pointer ml-2"
                />
              </div>

              {/* Calculation Summary Box */}
              <div className="p-4 sm:p-5 bg-[#F4F6F0] b-border rounded-2xl shadow-brutal">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-300 pb-3 mb-3">
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase font-black text-gray-500">Estimated Window:</span>
                    <p className="font-display text-lg sm:text-xl text-[#111827]">
                      {estServiceType === 'refresher' ? '1.5 – 2.0 Hours' : '2.5 – 3.5 Hours'}
                      {estIncludeDaycare ? ' + 2 hrs Daycare' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] sm:text-[10px] uppercase font-black text-gray-500">Pricing Basis:</span>
                    <p className="font-bold text-xs sm:text-sm text-[#FF1493]">
                      {estServiceType === 'refresher' ? '$55 – $85 est.' : estServiceType === 'minor' ? '$70 – $95 est.' : '$85 – $130+ est.'}
                      {estIncludeDaycare ? ' + $40 Daycare' : ''}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-600 leading-tight">
                  * Note: Accurate pricing is finalized upon hands-on consultation. Variables include coat thickness, brush-out/matting severity, scissor detail, drying time, and pet temperament.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('booking');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-brutal w-full bg-[#38D430] hover:bg-[#30bd29] text-[#111827] py-3 rounded-full font-black text-xs uppercase tracking-wider mt-4 text-center block"
                >
                  Lock In Your Consultation Date →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 7. HOLISTIC WELLNESS BANNER (ADD-ONS & AROMA PAWS)       */}
        {/* ======================================================== */}
        <section className="py-8 sm:py-12 px-3 sm:px-4 max-w-6xl mx-auto">
          <div className="relative bg-[#38D430] b-border-thick rounded-3xl p-4 sm:p-10 shadow-brutal overflow-visible">
            {/* Playful Dog Peeking Over Top Edge */}
            <div className="absolute -top-10 sm:-top-12 right-4 sm:right-16 w-16 sm:w-24 h-16 sm:h-24 pointer-events-none select-none z-10">
              <div className="relative w-full h-full">
                <img
                  alt="Peeking puppy at Furology"
                  className="w-14 sm:w-20 h-14 sm:h-20 rounded-full object-cover b-border shadow-brutal-sm"
                  src={ASSETS.peekingDog}
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -top-1 sm:-top-2 right-0 bg-[#FF1493] text-white b-border px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-black shadow-brutal-sm">
                  WOOF!
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
              {/* 3 Add-on Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
                {/* Facial */}
                <div
                  onClick={() => toggleAddon('Blueberry Facial')}
                  className={`bg-white b-border rounded-xl p-3 sm:p-4 shadow-brutal flex flex-col justify-between hover:-translate-y-1 transition-all cursor-pointer ${
                    selectedAddons.includes('Blueberry Facial') ? 'ring-3 ring-[#111827] bg-[#F4F6F0]' : ''
                  }`}
                >
                  <div>
                    <span className="text-[10px] sm:text-xs bg-[#38D430] text-[#111827] b-border px-2 py-0.5 rounded font-black uppercase">FACIAL</span>
                    <h4 className="font-display text-base sm:text-lg uppercase tracking-wide mt-1">Blueberry Facial</h4>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-1">Gently brightens face folds, cleans tear stains, and smells divine.</p>
                  </div>
                  <span className="text-[11px] sm:text-xs font-black text-[#FF1493] mt-2 block">
                    {selectedAddons.includes('Blueberry Facial') ? '✓ ADDED TO BOOKING' : '+ ADD TO SPA ($15)'}
                  </span>
                </div>

                {/* Aroma Paws Oils */}
                <div
                  onClick={() => toggleAddon('Aroma Paws Massage')}
                  className={`bg-white b-border rounded-xl p-3 sm:p-4 shadow-brutal flex flex-col justify-between hover:-translate-y-1 transition-all cursor-pointer ${
                    selectedAddons.includes('Aroma Paws Massage') ? 'ring-3 ring-[#111827] bg-[#F4F6F0]' : ''
                  }`}
                >
                  <div>
                    <span className="text-[10px] sm:text-xs bg-[#FF1493] text-white b-border px-2 py-0.5 rounded font-black uppercase">MASSAGE</span>
                    <h4 className="font-display text-base sm:text-lg uppercase tracking-wide mt-1">Aroma Paws Oils</h4>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-1">Pre-groom relaxing rub with Coconut Papaya or Vanilla Lemongrass oils.</p>
                  </div>
                  <span className="text-[11px] sm:text-xs font-black text-[#FF1493] mt-2 block">
                    {selectedAddons.includes('Aroma Paws Massage') ? '✓ ADDED TO BOOKING' : '+ ADD TO SPA ($18)'}
                  </span>
                </div>

                {/* Pawdicure & Balm */}
                <div
                  onClick={() => toggleAddon('Pawdicure & Balm')}
                  className={`bg-white b-border rounded-xl p-3 sm:p-4 shadow-brutal flex flex-col justify-between hover:-translate-y-1 transition-all cursor-pointer ${
                    selectedAddons.includes('Pawdicure & Balm') ? 'ring-3 ring-[#111827] bg-[#F4F6F0]' : ''
                  }`}
                >
                  <div>
                    <span className="text-[10px] sm:text-xs bg-[#111827] text-white b-border px-2 py-0.5 rounded font-black uppercase">PAWS</span>
                    <h4 className="font-display text-base sm:text-lg uppercase tracking-wide mt-1">Pawdicure &amp; Balm</h4>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-1">Smooth nail dremel filing + organic botanical pad soothing balm.</p>
                  </div>
                  <span className="text-[11px] sm:text-xs font-black text-[#FF1493] mt-2 block">
                    {selectedAddons.includes('Pawdicure & Balm') ? '✓ ADDED TO BOOKING' : '+ ADD TO SPA ($15)'}
                  </span>
                </div>
              </div>

              {/* Right Promotional Text */}
              <div className="lg:col-span-5 flex flex-col items-start">
                <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-[#111827] leading-tight">
                  BENEFIT YOUR PET WITH HOLISTIC WELLNESS
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#111827] mt-2 sm:mt-3 leading-relaxed">
                  Warm therapeutic baths, soothing essential botanicals, and high-velocity deshedding blowouts that keep Myrtle Beach homes fur-free.
                </p>
                <a
                  href="#booking"
                  className="btn-brutal bg-[#111827] hover:bg-neutral-800 text-white font-black text-xs uppercase px-5 py-3 rounded-full mt-3 sm:mt-5 inline-block"
                >
                  Apply To Your Appointment →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8. BEFORE & AFTER SLIDER (SCRUFFY TO FLUFFY)             */}
        {/* ======================================================== */}
        <section className="py-8 sm:py-14 px-3 sm:px-4 max-w-5xl mx-auto">
          <div className="bg-white b-border rounded-3xl p-4 sm:p-10 shadow-brutal text-center">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#FF1493] text-white b-border px-3.5 py-1 rounded-full shadow-brutal-sm">
              REAL RESULTS
            </span>
            <h2 className="font-display text-2xl sm:text-5xl uppercase tracking-tight text-[#111827] mt-2 mb-1">
              SCRUFFY TO FLUFFY!
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-4 sm:mb-8 max-w-md mx-auto">
              Drag the interactive slider handle or tap below to see the dramatic FURology transformation.
            </p>

            {/* Quick Mobile Tap Pills */}
            <div className="flex sm:hidden justify-center gap-2 mb-3">
              <button
                type="button"
                onClick={() => setSliderPos(90)}
                className={`px-3 py-1 rounded-full text-xs font-black b-border transition-all ${
                  sliderPos > 70 ? 'bg-[#FF1493] text-white shadow-brutal-sm' : 'bg-gray-100'
                }`}
              >
                🐶 See Scruffy
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(50)}
                className="px-3 py-1 rounded-full text-xs font-black b-border bg-white"
              >
                ⇄ Half / Half
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(10)}
                className={`px-3 py-1 rounded-full text-xs font-black b-border transition-all ${
                  sliderPos < 30 ? 'bg-[#38D430] text-[#111827] shadow-brutal-sm' : 'bg-gray-100'
                }`}
              >
                ✨ See Fluffy
              </button>
            </div>

            {/* Slider Container */}
            <div
              ref={sliderContainerRef}
              className="relative w-full max-w-2xl mx-auto h-60 sm:h-96 rounded-2xl b-border overflow-hidden select-none shadow-brutal cursor-ew-resize touch-pan-x"
            >
              <img
                alt="Fluffy groomed dog after spa"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                src={ASSETS.sliderAfter}
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 bg-[#38D430] text-[#111827] b-border px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase shadow-brutal-sm z-10">
                AFTER: FLUFFY ✨
              </span>

              {/* Before Overlay */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[#111827]"
                style={{ width: `${sliderPos}%` }}
              >
                <div
                  className="relative h-full"
                  style={{
                    width: sliderContainerRef.current ? `${sliderContainerRef.current.offsetWidth}px` : '100%'
                  }}
                >
                  <img
                    alt="Matted dog before grooming"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    src={ASSETS.sliderBefore}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 bg-[#FF1493] text-white b-border px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase shadow-brutal-sm z-10 whitespace-nowrap">
                  BEFORE: SCRUFFY 🐶
                </span>
              </div>

              {/* Divider Handle */}
              <div
                className="absolute inset-y-0 -ml-4 flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-1 h-full bg-[#111827]"></div>
                <div className="absolute w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#38D430] text-[#111827] b-border flex items-center justify-center shadow-brutal-sm text-xs font-black">
                  ⇄
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={e => setSliderPos(Number(e.target.value))}
                aria-label="Drag to compare before and after pet grooming"
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30 m-0 p-0"
              />
            </div>

            <p className="text-[11px] sm:text-xs text-gray-500 mt-2.5 sm:mt-4 font-bold">
              <i className="fa-solid fa-arrows-left-right mr-1"></i> Slide left or right across the pet image
            </p>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 9. REAL CLIENT REVIEWS & TESTIMONIALS                    */}
        {/* ======================================================== */}
        <section id="reviews" className="py-8 sm:py-14 px-3 sm:px-4 max-w-6xl mx-auto">
          <div className="bg-white b-border-thick rounded-3xl overflow-hidden shadow-brutal-lg grid grid-cols-1 md:grid-cols-12">
            {/* Cell 1: What We Care The Most */}
            <div className="md:col-span-5 p-4 sm:p-8 border-b-2 md:border-b-0 md:border-r-2 b-border flex flex-col justify-between bg-[#F4F6F0]">
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full b-border bg-[#38D430] text-[#111827] flex items-center justify-center text-base sm:text-xl mb-2 sm:mb-4 shadow-brutal-sm">
                  🐶
                </div>
                <h2 className="font-display text-2xl sm:text-5xl uppercase tracking-tight text-[#111827] leading-tight">
                  WHAT WE CARE THE MOST?
                </h2>
                <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1.5 sm:mt-3 leading-relaxed">
                  <strong>FURology Paw Spa &amp; Retreat</strong> — focuses on emotional pacing, certified gentle handling, and holistic hygiene. Located on the ground level of Ocean Park Resort with driveway mobile service across Myrtle Beach.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-2.5 sm:pt-4 border-t border-gray-300 flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-xs font-black uppercase">Rating:</span>
                <span className="text-amber-500 text-xs">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="text-xs font-black">5.0 Star Myrtle Beach Favorite</span>
              </div>
            </div>

            {/* Right: Testimonial Quote Switcher */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div className="p-3.5 sm:p-6 border-b-2 b-border flex items-center justify-between bg-white">
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">VERIFIED CLIENTS</span>
                  <span className="font-display text-xl sm:text-3xl text-[#111827]">0{activeTestimonial + 1} / 0{AUTHENTIC_TESTIMONIALS.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((activeTestimonial - 1 + AUTHENTIC_TESTIMONIALS.length) % AUTHENTIC_TESTIMONIALS.length)}
                    aria-label="Previous review"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full b-border bg-[#F4F6F0] hover:bg-[#38D430] flex items-center justify-center shadow-brutal-sm text-xs font-black active:scale-90 transition-transform"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((activeTestimonial + 1) % AUTHENTIC_TESTIMONIALS.length)}
                    aria-label="Next review"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full b-border bg-[#F4F6F0] hover:bg-[#38D430] flex items-center justify-center shadow-brutal-sm text-xs font-black active:scale-90 transition-transform"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-8 flex-1 bg-white">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#FF1493] text-white b-border flex items-center justify-center text-xs sm:text-sm shadow-brutal-sm mb-2.5">
                  <i className="fa-solid fa-quote-left"></i>
                </div>
                <p className="text-xs sm:text-base font-medium text-gray-800 leading-relaxed min-h-[50px]">
                  {AUTHENTIC_TESTIMONIALS[activeTestimonial].quote}
                </p>
                <div className="mt-3">
                  <h4 className="font-display text-base sm:text-xl uppercase tracking-wider text-[#111827] leading-tight">
                    {AUTHENTIC_TESTIMONIALS[activeTestimonial].author}
                  </h4>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-500">
                    {AUTHENTIC_TESTIMONIALS[activeTestimonial].role}
                  </span>
                </div>
              </div>

              <div className="p-3.5 sm:p-5 border-t-2 b-border bg-[#F4F6F0] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl b-border overflow-hidden bg-white shadow-brutal-sm">
                    <img
                      alt="Client dog"
                      className="w-full h-full object-cover"
                      src={AUTHENTIC_TESTIMONIALS[activeTestimonial].avatar}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black block">Digital Keepsake Photos</span>
                    <span className="text-[10px] text-gray-500">Every guest receives text updates</span>
                  </div>
                </div>
                <a
                  href="#booking"
                  className="btn-brutal bg-white hover:bg-[#38D430] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Book Schedule</span>
                  <span>| 🐶</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 10. FAQ & SPA POLICIES (REAL FUROLOGY POLICIES)          */}
        {/* ======================================================== */}
        <section id="faq" className="py-8 sm:py-14 px-3 sm:px-4 max-w-4xl mx-auto">
          <div className="text-center mb-5 sm:mb-10">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white b-border px-3 py-1 rounded-full shadow-brutal-sm">
              ESSENTIAL POLICIES &amp; INFO
            </span>
            <h2 className="font-display text-2xl sm:text-5xl uppercase tracking-tight text-[#111827] mt-2">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">Vaccinations, business hours, and resort appointment details.</p>
          </div>

          <div className="space-y-2.5 sm:space-y-4">
            {[
              {
                q: 'What vaccination documents are required prior to grooming or daycare?',
                a: 'For the safety of all guests and team members, proof of current Rabies vaccination certificate is strictly required for all dogs prior to any grooming or daycare service. We also strongly recommend distemper/parvo and bordetella vaccinations, and pets must be on flea/tick preventative.'
              },
              {
                q: 'Where are you located and what are your business hours?',
                a: 'FURology Paw Spa & Retreat is located on the ground level of Ocean Park Resort at 1905 S. Ocean Boulevard, Myrtle Beach, SC 29577. We operate Tuesday through Saturday from 8:30 AM to 5:00 PM by appointment. We are closed on Sunday, Monday, and alternating Tuesdays.'
              },
              {
                q: 'What is the weight limit for Doggie Daycare?',
                a: 'Our oceanfront daycare welcomes small and medium dogs up to 40 lbs. This weight limit is strictly enforced to maintain a gentle, stress-free, and safe socialization environment where all dogs feel secure.'
              },
              {
                q: 'How long does a "Make-o-Fur" grooming session take?',
                a: 'A thorough, gentle grooming session typically takes 2.0 to 4.0 hours depending on your dog’s breed, size, coat condition, scissor complexity, and disposition. We never rush. We text you immediately when your pup is fluffed, styled, and ready for pickup with a digital photo!'
              },
              {
                q: 'Do you offer mobile grooming to homes and resort villas?',
                a: 'Yes! In addition to our flagship oceanfront spa at Ocean Park Resort, we operate our fully self-contained, climate-controlled mobile grooming salon van that parks directly in your Myrtle Beach driveway.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white b-border rounded-2xl overflow-hidden shadow-brutal">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between font-bold text-xs sm:text-base hover:bg-[#F4F6F0] transition-colors"
                  >
                    <span className="pr-2">{faq.q}</span>
                    <span className="text-base sm:text-lg font-black shrink-0 text-[#FF1493]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-3.5 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-gray-700 font-medium border-t border-gray-100 pt-2.5 sm:pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 12. ONLINE APPOINTMENT REQUEST FORM                      */}
        {/* ======================================================== */}
        <section id="booking" className="py-8 sm:py-14 px-3 sm:px-4 max-w-5xl mx-auto">
          <div className="bg-white b-border-thick rounded-3xl p-4 sm:p-10 shadow-brutal-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#38D430] text-[#111827] b-border px-3 py-1 rounded-full text-xs font-black uppercase mb-1.5 sm:mb-2 shadow-brutal-sm">
                  <span>🗓️ APPOINTMENT INQUIRY</span>
                </div>
                <h2 className="font-display text-2xl sm:text-5xl uppercase tracking-tight text-[#111827]">
                  BOOK YOUR PET'S SPA RETREAT
                </h2>
              </div>

              {/* Dynamic Live Status Indicator */}
              <div className="bg-[#F4F6F0] b-border p-2.5 sm:p-3 rounded-2xl flex items-center gap-2.5 sm:gap-3 shadow-brutal-sm">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      businessStatus.isOpen ? 'bg-[#38D430]' : 'bg-[#FF1493]'
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      businessStatus.isOpen ? 'bg-[#38D430]' : 'bg-[#FF1493]'
                    }`}
                  ></span>
                </span>
                <div>
                  <span className="text-xs font-black uppercase block">{businessStatus.text}</span>
                  <span className="text-[10px] text-gray-500 font-bold">{businessStatus.subText}</span>
                </div>
              </div>
            </div>

            {/* Selected Add-ons Pill Indicator */}
            {selectedAddons.length > 0 && (
              <div className="mb-4 p-2.5 sm:p-3 bg-[#F4F6F0] b-border rounded-xl flex items-center gap-2 flex-wrap text-xs font-bold">
                <span className="text-[#FF1493] uppercase font-black text-[11px] sm:text-xs">Requested Add-ons:</span>
                {selectedAddons.map(a => (
                  <span key={a} className="bg-white b-border px-2 py-0.5 rounded-full shadow-brutal-sm flex items-center gap-1 text-[11px] sm:text-xs">
                    {a}
                    <button
                      type="button"
                      onClick={() => toggleAddon(a)}
                      className="text-gray-400 hover:text-[#FF1493] font-black"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1" htmlFor="parent-name">Pet Parent Name *</label>
                  <input
                    id="parent-name"
                    required
                    type="text"
                    value={bookingFormData.name}
                    onChange={e => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                    placeholder="e.g. Debra Burns"
                    className="w-full bg-[#F4F6F0] b-border rounded-xl px-4 py-3 text-base sm:text-sm font-medium focus:ring-0 focus:border-[#FF1493] shadow-brutal-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1" htmlFor="parent-phone">Phone Number (For Updates) *</label>
                  <input
                    id="parent-phone"
                    required
                    type="tel"
                    value={bookingFormData.phone}
                    onChange={e => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                    placeholder="(843) 580-3647"
                    className="w-full bg-[#F4F6F0] b-border rounded-xl px-4 py-3 text-base sm:text-sm font-medium focus:ring-0 focus:border-[#FF1493] shadow-brutal-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1" htmlFor="parent-email">Email Address *</label>
                  <input
                    id="parent-email"
                    required
                    type="email"
                    value={bookingFormData.email}
                    onChange={e => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                    placeholder="furologypawspa@gmail.com"
                    className="w-full bg-[#F4F6F0] b-border rounded-xl px-4 py-3 text-base sm:text-sm font-medium focus:ring-0 focus:border-[#FF1493] shadow-brutal-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1" htmlFor="parent-location">Myrtle Beach Address / Resort Stay *</label>
                  <input
                    id="parent-location"
                    required
                    type="text"
                    value={bookingFormData.addressOrResort}
                    onChange={e => setBookingFormData({ ...bookingFormData, addressOrResort: e.target.value })}
                    placeholder="Ocean Park Resort Room # or Address"
                    className="w-full bg-[#F4F6F0] b-border rounded-xl px-4 py-3 text-base sm:text-sm font-medium focus:ring-0 focus:border-[#FF1493] shadow-brutal-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1" htmlFor="pet-breed">Dog Name &amp; Breed *</label>
                  <input
                    id="pet-breed"
                    required
                    type="text"
                    value={bookingFormData.petNameBreed}
                    onChange={e => setBookingFormData({ ...bookingFormData, petNameBreed: e.target.value })}
                    placeholder="e.g. Bailey (Goldendoodle)"
                    className="w-full bg-[#F4F6F0] b-border rounded-xl px-4 py-3 text-base sm:text-sm font-medium focus:ring-0 focus:border-[#FF1493] shadow-brutal-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1" htmlFor="booking-service">Service Requested *</label>
                  <select
                    id="booking-service"
                    value={bookingFormData.serviceRequested}
                    onChange={e => setBookingFormData({ ...bookingFormData, serviceRequested: e.target.value })}
                    className="w-full bg-[#F4F6F0] b-border rounded-xl px-4 py-3 text-base sm:text-sm font-medium focus:ring-0 focus:border-[#FF1493] shadow-brutal-sm"
                  >
                    <option value="Furology Paw Spa Signature">Furology Paw Spa Signature (VIP)</option>
                    <option value="The Major Make-o-Fur">The Major Make-o-Fur (Full Scissor Haircut)</option>
                    <option value="The Minor Make-o-Fur">The Minor Make-o-Fur (Outline &amp; Face Trim)</option>
                    <option value="The Mini Make-o-Fur">The Mini Make-o-Fur (Hygiene &amp; Bath)</option>
                    <option value="The Fur-Refresher / Essentials">The Fur-Refresher / Essentials (Bath &amp; Brush)</option>
                    <option value="Oceanfront Doggie Daycare">Ocean View Doggie Daycare ($20/hr)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1" htmlFor="service-venue">Location Preference *</label>
                  <select
                    id="service-venue"
                    value={bookingFormData.serviceLocation}
                    onChange={e => setBookingFormData({ ...bookingFormData, serviceLocation: e.target.value })}
                    className="w-full bg-[#F4F6F0] b-border rounded-xl px-4 py-3 text-base sm:text-sm font-medium focus:ring-0 focus:border-[#FF1493] shadow-brutal-sm"
                  >
                    <option value="Ocean Park Resort Spa (1905 S Ocean Blvd)">Ocean Park Resort Salon (1905 S Ocean Blvd)</option>
                    <option value="Mobile Van Service (Driveway Service)">Mobile Van Service (At Your Driveway)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1" htmlFor="preferred-date">Preferred Date (Tues – Sat) *</label>
                  <input
                    id="preferred-date"
                    required
                    type="date"
                    value={bookingFormData.preferredDate}
                    onChange={e => setBookingFormData({ ...bookingFormData, preferredDate: e.target.value })}
                    className="w-full bg-[#F4F6F0] b-border rounded-xl px-4 py-3 text-base sm:text-sm font-medium focus:ring-0 focus:border-[#FF1493] shadow-brutal-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1" htmlFor="rabies-proof">Proof of Current Rabies Vaccination? *</label>
                  <select
                    id="rabies-proof"
                    value={bookingFormData.hasRabiesProof}
                    onChange={e => setBookingFormData({ ...bookingFormData, hasRabiesProof: e.target.value })}
                    className="w-full bg-[#F4F6F0] b-border rounded-xl px-4 py-3 text-base sm:text-sm font-medium focus:ring-0 focus:border-[#FF1493] shadow-brutal-sm"
                  >
                    <option value="yes">Yes, I will bring/email certificate</option>
                    <option value="pending">Scheduling vet update before visit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1" htmlFor="special-notes">Special Coat Condition, Health or Notes</label>
                <textarea
                  id="special-notes"
                  rows={2}
                  value={bookingFormData.notes}
                  onChange={e => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
                  placeholder="Sensitivities, puppy anxiety, desired haircut style..."
                  className="w-full bg-[#F4F6F0] b-border rounded-xl px-4 py-3 text-base sm:text-sm font-medium focus:ring-0 focus:border-[#FF1493] shadow-brutal-sm"
                ></textarea>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="btn-brutal w-full bg-[#38D430] hover:bg-[#30bd29] py-3.5 sm:py-4 rounded-2xl font-display text-lg sm:text-2xl uppercase tracking-wider text-[#111827] shadow-brutal flex items-center justify-center gap-2"
                >
                  <span>REQUEST APPOINTMENT WITH DEBRA</span>
                  <span>🐾</span>
                </button>
              </div>
            </form>

            {/* Submission Confirmation */}
            {bookingSubmitted && (
              <div
                id="booking-success-message"
                className="mt-5 p-4 sm:p-6 bg-[#38D430]/20 b-border rounded-2xl text-center shadow-brutal animate-in fade-in zoom-in-95 duration-200"
              >
                <span className="text-3xl sm:text-4xl">🎉</span>
                <h3 className="font-display text-xl sm:text-2xl uppercase mt-2 text-[#111827]">THANK YOU! APPOINTMENT REQUEST RECEIVED!</h3>
                <p className="text-xs sm:text-sm font-medium text-gray-800 mt-2 max-w-lg mx-auto">
                  We received your inquiry for <strong>{bookingFormData.petNameBreed || 'your dog'}</strong> ({bookingFormData.serviceRequested}) at <strong>{bookingFormData.serviceLocation}</strong>! Debra or John will reach out via phone at <strong>{bookingFormData.phone || '(843) 580-3647'}</strong> to confirm your appointment window.
                </p>
                <div className="mt-3 pt-2.5 border-t border-emerald-400 flex flex-wrap justify-center gap-3 text-xs font-black">
                  <a href="tel:8435803647" className="underline text-[#111827]">
                    Need immediate confirmation? Call (843) 580-DOGS
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 13. MARQUEE TICKER STRIP (ELECTRIC LIME & JET BLACK)     */}
        {/* ======================================================== */}
        <section className="py-3 sm:py-4 bg-[#38D430] b-border-thick overflow-hidden select-none">
          <div className="marquee-track font-display text-xl sm:text-3xl uppercase tracking-wider text-[#111827] space-x-6 sm:space-x-8">
            <span>GREEN GROOMING 🌿</span>
            <span className="text-[#FF1493]">•</span>
            <span>OCEAN VIEW DAYCARE 🏖️</span>
            <span className="text-[#FF1493]">•</span>
            <span>AROMA PAWS OILS 🌸</span>
            <span className="text-[#FF1493]">•</span>
            <span>BLUEBERRY FACIAL 🫐</span>
            <span className="text-[#FF1493]">•</span>
            <span>40+ YRS EXPERIENCE ✂️</span>
            <span className="text-[#FF1493]">•</span>
            <span>OCEAN PARK RESORT 🌊</span>
            <span className="text-[#FF1493]">•</span>
            <span>MOBILE ON-SITE VAN 🚐</span>
            <span className="text-[#FF1493]">•</span>
            <span>DIGITAL PHOTO COLLAGES 📸</span>
            <span className="text-[#FF1493]">•</span>
            {/* Duplicated for smooth loop */}
            <span>GREEN GROOMING 🌿</span>
            <span className="text-[#FF1493]">•</span>
            <span>OCEAN VIEW DAYCARE 🏖️</span>
            <span className="text-[#FF1493]">•</span>
            <span>AROMA PAWS OILS 🌸</span>
            <span className="text-[#FF1493]">•</span>
            <span>BLUEBERRY FACIAL 🫐</span>
            <span className="text-[#FF1493]">•</span>
            <span>40+ YRS EXPERIENCE ✂️</span>
            <span className="text-[#FF1493]">•</span>
            <span>OCEAN PARK RESORT 🌊</span>
            <span className="text-[#FF1493]">•</span>
            <span>MOBILE ON-SITE VAN 🚐</span>
            <span className="text-[#FF1493]">•</span>
            <span>DIGITAL PHOTO COLLAGES 📸</span>
            <span className="text-[#FF1493]">•</span>
          </div>
        </section>
      </main>

      {/* ======================================================== */}
      {/* 14. DARK FOOTER (AUTHENTIC DETAILS & HOURS)              */}
      {/* ======================================================== */}
      <footer className="bg-[#111827] text-white pt-10 sm:pt-14 pb-24 md:pb-12 px-4 border-t-4 border-[#111827]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-display text-lg sm:text-xl uppercase tracking-wider mb-3 sm:mb-4 text-[#38D430]">FURology Directory</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-medium">
              <li><a href="#about" className="hover:text-[#FF1493] transition-colors">About Debra &amp; John Burns</a></li>
              <li><a href="#services" className="hover:text-[#FF1493] transition-colors">Make-o-Fur Grooming Menu</a></li>
              <li><a href="#daycare" className="hover:text-[#FF1493] transition-colors">Ocean View Daycare ($20/hr)</a></li>
              <li><a href="#estimator" className="hover:text-[#FF1493] transition-colors">Interactive Quote Calculator</a></li>
              <li><a href="#reviews" className="hover:text-[#FF1493] transition-colors">Guest Reviews &amp; Stories</a></li>
              <li><a href="#faq" className="hover:text-[#FF1493] transition-colors">Vaccination Requirements</a></li>
              <li><a href="#booking" className="hover:text-[#FF1493] transition-colors">Request Appointment</a></li>
            </ul>
          </div>

          {/* Center Brand & Mission */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="bg-white p-2 rounded-xl b-border mb-3 inline-block shadow-brutal-sm">
              <img
                src={ASSETS.logo}
                alt="Furology Paw Spa & Retreat"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 font-medium max-w-sm mb-4 leading-relaxed">
              Area’s only green pet grooming &amp; doggie daycare facility with an ocean view. Conveniently located on the ground level of Ocean Park Resort with full mobile van service across the Grand Strand. Over 40+ years loving canine expertise by Debra &amp; John Burns.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 mb-4">
              <a href="https://www.instagram.com/furologypawspa" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 border border-gray-600 rounded bg-neutral-900 hover:bg-[#FF1493] flex items-center justify-center text-xs transition-colors">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/furologypawspa" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 border border-gray-600 rounded bg-neutral-900 hover:bg-[#FF1493] flex items-center justify-center text-xs transition-colors">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="mailto:furologypawspa@gmail.com" aria-label="Email" className="w-9 h-9 border border-gray-600 rounded bg-neutral-900 hover:bg-[#FF1493] flex items-center justify-center text-xs transition-colors">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="font-display text-lg sm:text-xl uppercase tracking-wider mb-2 text-[#38D430]">Resort Contact &amp; Hours</h4>
            <div className="space-y-2 text-xs text-gray-300 font-bold mb-4">
              <div className="flex items-start gap-2">
                <i className="fa-solid fa-location-dot text-[#FF1493] mt-0.5"></i>
                <div>
                  <p className="text-white">1905 S. Ocean Boulevard</p>
                  <p className="text-gray-400 text-[11px]">Ground Level, Ocean Park Resort, Myrtle Beach, SC 29577</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-phone text-[#FF1493]"></i>
                <a href="tel:8435803647" className="hover:text-white">843-580-DOGS (843-580-3647)</a>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-[#FF1493]"></i>
                <a href="mailto:furologypawspa@gmail.com" className="hover:text-white">furologypawspa@gmail.com</a>
              </div>
              <div className="flex items-start gap-2">
                <i className="fa-solid fa-clock text-[#FF1493] mt-0.5"></i>
                <div>
                  <p>Tuesday – Saturday: 8:30 AM – 5:00 PM</p>
                  <p className="text-gray-400 text-[11px]">Closed Sunday, Monday &amp; Alternating Tuesdays</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <form
              onSubmit={e => {
                e.preventDefault();
                setNewsletterSubmitted(true);
              }}
              className="relative flex items-center"
            >
              <input
                type="email"
                required
                disabled={newsletterSubmitted}
                value={newsletterSubmitted ? "You're subscribed! 🐾" : newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Join pet parent updates..."
                className="w-full bg-neutral-900 border border-gray-700 rounded-full py-2.5 pl-4 pr-12 text-xs text-white focus:outline-none focus:border-[#38D430]"
              />
              {!newsletterSubmitted && (
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 w-8 h-8 rounded-full bg-[#FF1493] hover:bg-[#e10080] text-white flex items-center justify-center text-xs transition-colors"
                >
                  <i className="fa-solid fa-paw"></i>
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="max-w-6xl mx-auto border-t border-neutral-800 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-medium gap-2 text-center">
          <p>© 2026 FURology Paw Spa &amp; Retreat · Debra &amp; John Burns · All Rights Reserved.</p>
          <p>Ground Level Ocean Park Resort · Myrtle Beach, South Carolina</p>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* 15. MOBILE STICKY BOTTOM ACTION BAR (TOUCH-OPTIMIZED)    */}
      {/* ======================================================== */}
      <aside
        aria-label="Mobile Quick Contact Bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md b-border border-b-0 py-2.5 px-3 flex items-center justify-between gap-2 shadow-brutal-lg"
      >
        <a
          href="tel:8435803647"
          className="btn-brutal bg-white hover:bg-[#F4F6F0] flex-1 py-2.5 rounded-full text-center text-[11px] font-black uppercase flex items-center justify-center gap-1.5 text-[#111827]"
        >
          <i className="fa-solid fa-phone text-[#FF1493]"></i> Call
        </a>
        <a
          href="https://maps.google.com/?q=1905+S+Ocean+Blvd+Myrtle+Beach+SC+29577"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brutal bg-[#F4F6F0] hover:bg-gray-100 flex-1 py-2.5 rounded-full text-center text-[11px] font-black uppercase flex items-center justify-center gap-1.5 text-[#111827]"
        >
          <i className="fa-solid fa-location-dot text-[#38D430]"></i> Map
        </a>
        <a
          href="#booking"
          className="btn-brutal bg-[#38D430] hover:bg-[#30bd29] text-[#111827] flex-[1.4] py-2.5 rounded-full text-center text-[11px] font-black uppercase flex items-center justify-center gap-1.5"
        >
          <i className="fa-solid fa-calendar-check"></i> Book Spa
        </a>
      </aside>

      {/* Floating Back to Top Button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-18 md:bottom-8 right-4 z-40 w-10 h-10 sm:w-11 sm:h-11 bg-white hover:bg-[#38D430] b-border rounded-full flex items-center justify-center shadow-brutal text-sm font-black transition-all duration-300 text-[#111827] ${
          showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        ↑
      </button>
    </div>
  );
}
