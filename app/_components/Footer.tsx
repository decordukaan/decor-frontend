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

const Footer = () => {
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
          <button className='group bg-[#373737] flex justify-center sm:justify-between items-center gap-3 rounded-md p-3 text-[#ffffee] mt-4 w-auto sm:w-auto'>
            Shop now
            <span>
              <FaLongArrowAltRight />
            </span>
          </button>
        </div>
      </div>
      <div className='container mx-auto sm:my-12 sm:px-4 px-[20px] py-6'>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 sm:gap-6 gap-9'>
          {/* Support Section */}
          <div>
            <h4 className='sm:text-lg text-[16px] font-semibold text-[#373737]'>
              Support
            </h4>
            <ul className='sm:text-base text-[14px] text-[#373737] sm:mt-4 mt-2 sm:space-y-2'>
              <li>
                <Link href='/contact-us' className=' pb-1 relative group'>
                  Contact Us
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
              <li>
                <Link
                  href='/terms-and-conditions'
                  className='inline-block pb-1 relative group'
                >
                  Terms & Conditions
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
              <li>
                <Link
                  href='/delivery-policy'
                  className='inline-block pb-1 relative group'
                >
                  Delivery Policy
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
              <li>
                <Link
                  href='/payment-refund-policy'
                  className='inline-block pb-1 relative group'
                >
                  Payment Refund Policy
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
              <li>
                <Link
                  href='/cancellation-policy'
                  className='inline-block pb-1 relative group'
                >
                  Cancellation Policy
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
              <li>
                <Link href='/faq' className=' pb-1 relative group'>
                  FAQs
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Quick Links Section */}
          <div>
            <h4 className='sm:text-lg text-[16px] font-semibold text-[#373737]'>
              Quick Links
            </h4>
            <ul className='sm:text-base text-[14px] text-[#373737] sm:mt-4 mt-2 sm:space-y-2'>
              <li>
                <Link
                  href='/about-us'
                  className='inline-block pb-1 relative group'
                >
                  About Us
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
              <li>
                <span className='inline-block pb-1 relative group'>
                  Categories
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </span>
              </li>
              <li>
                <Link
                  href='/products'
                  className='inline-block pb-1 relative group'
                >
                  Products
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Get in Touch Section */}
          <div>
            <h4 className='sm:text-lg text-[16px] font-semibold text-[#373737]'>
              Get in touch
            </h4>
            <ul className='sm:text-base text-[14px] text-[#373737] sm:mt-4 mt-2 sm:space-y-2'>
              <li className=' flex items-center sm:gap-2'>
                <IoIosCall className='sm:text-[30px] sm:block hidden text-[20px]' />
                <span className='inline-block pb-1 relative group'>
                  +91 1234567890 / +91 9876543210
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </span>
              </li>
              <li className=' flex items-center sm:gap-2'>
                <MdOutlineMailOutline className='sm:text-[30px] sm:block hidden text-[20px]' />
                <span className='inline-block pb-1 relative group'>
                  dev.decordukaan@gmail.com
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
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
              <FaInstagram className='sm:text-[30px] text-[20px] transition-all duration-300 hover:text-[#E4405F]' />
              <RiFacebookCircleLine className='sm:text-[30px] text-[20px] transition-all duration-300 hover:text-[#1877F2]' />
              <FaWhatsapp className='sm:text-[30px] text-[20px] transition-all duration-300 hover:text-[#25D366]' />
            </div>
          </div>
        </div>
        <div className='sm:pb-[0px] pb-[30px] pt-[40px] sm:pt-[72px] flex justify-center'>
          <Link
            href='/'
            className='text-[34px] sm:text-[120px] font-bold text-yellow-600 text-opacity-40 text-center'
          >
            D E C O R D U K A A N
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
