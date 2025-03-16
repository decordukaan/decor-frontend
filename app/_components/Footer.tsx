'use client';

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaLongArrowAltRight,
} from 'react-icons/fa';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoIosCall } from 'react-icons/io';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer>
      <div
        className='flex justify-center items-center bg-cover bg-center sm:h-[300px] h-[250px] w-full'
        style={{ backgroundImage: "url('/images/footer-bg.jpg')" }}
      >
        <div className='bg-[#ffffee] bg-opacity-90 sm:p-6 py-6 px-5 rounded-lg text-center sm:text-left flex flex-col justify-center items-center sm:w-[350px] w-[80%] h-auto'>
          <h2 className='sm:text-[18px] text-[16px] text-[#373737] leading-[24px]'>
            Bring Your Dream Space to Life with Decor Dukaan!
          </h2>
          <Link href='/all-products'>
            <button className='group bg-[#373737] flex justify-center sm:justify-between items-center gap-3 rounded-md p-3 text-[#ffffee] mt-4 w-auto sm:w-auto'>
              Shop now
              <span>
                <FaLongArrowAltRight />
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className='container mx-auto sm:mt-12 md:px-[60px] xl:px-0 px-[20px] py-6'>
        <div className='grid grid-cols-2  md:grid-cols-4 sm:gap-6 gap-9'>
          {/* Support Section */}
          <div>
            <h4 className='sm:text-lg text-[16px] font-semibold text-[#373737]'>
              Support
            </h4>
            <ul className='sm:text-base text-[14px] text-[#373737] sm:mt-4 mt-2 sm:space-y-2'>
              {[
                { href: '/contact-us', text: 'Contact Us' },
                { href: '/terms-and-conditions', text: 'Terms & Conditions' },
                { href: '/privacy-policy', text: 'Privacy Policy' },
                { href: '/shipping-policy', text: 'Shipping Policy' },
                {
                  href: '/payment-refund-policy',
                  text: 'Payment Refund Policy',
                },
                { href: '/cancellation-policy', text: 'Cancellation Policy' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className='inline-block pb-1 relative group'
                  >
                    {item.text}
                    <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 sm:group-hover:w-full'></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className='sm:text-lg text-[16px] font-semibold text-[#373737]'>
              Quick Links
            </h4>
            <ul className='sm:text-base text-[14px] text-[#373737] sm:mt-4 mt-2 sm:space-y-2'>
              {[
                { href: '/about-us', text: 'About Us' },
                { href: '/all-products', text: 'Products' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className='inline-block pb-1 relative group'
                  >
                    {item.text}
                    <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 sm:group-hover:w-full'></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div>
            <h4 className='sm:text-lg text-[16px] font-semibold text-[#373737]'>
              Get in touch
            </h4>
            <ul className='sm:text-base text-[14px] text-[#373737] sm:mt-4 mt-2 sm:space-y-2'>
              <li className='flex items-center sm:gap-2'>
                <IoIosCall className='sm:text-[30px] sm:block hidden text-[20px]' />
                <span className='inline-block pb-1 relative group'>
                  +91 9895560404
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 sm:group-hover:w-full'></span>
                </span>
              </li>
              <li className='flex items-center sm:gap-2'>
                <MdOutlineMailOutline className='sm:text-[30px] sm:block hidden text-[20px]' />
                <span className='inline-block pb-1 relative group'>
                  info@decordukaan.com
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 sm:group-hover:w-full'></span>
                </span>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h4 className='sm:text-lg text-[16px] font-semibold text-[#373737]'>
              Follow Us
            </h4>
            <div className='flex items-center gap-3 mt-4'>
              {[
                {
                  href: 'https://www.instagram.com/decor.dukaan?igsh=MXR5aGo3ZzkzbHdleg==',
                  icon: (
                    <FaInstagram className='text-[20px] sm:text-[30px] hover:text-[#E4405F]' />
                  ),
                },
                {
                  href: 'https://www.facebook.com/share/15fW2cKAN5',
                  icon: (
                    <RiFacebookCircleLine className='text-[20px] sm:text-[30px] hover:text-[#1877F2]' />
                  ),
                },
                {
                  href: 'https://wa.link/mzhvdr',
                  icon: (
                    <FaWhatsapp className='text-[20px] sm:text-[30px] hover:text-[#25D366]' />
                  ),
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className='sm:pb-0 pb-[30px] pt-[40px] sm:pt-0 text-center'>
          <Link href='/'>
            <span className='text-[34px] md:text-[60px] lg:text-[90px] xl:text-[130px] font-bold text-yellow-600 text-opacity-40'>
              D E C O R D U K A A N
            </span>
          </Link>
        </div>
      </div>

      <div className='text-center'>
        Marketed by Reforms Marketing Solution, © 2025. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
