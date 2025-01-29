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
        className='flex justify-start  items-center'
        style={{
          backgroundImage: "url('/images/footer-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px',
          width: '100%',
        }}
      >
        <div className='bg-[#ffffee] ml-[100px] bg-opacity-90 p-[40px] rounded-lg h-[200px] w-[350px]'>
          <h2 className='text-[18px] text-[#373737] leading-[24px]'>
            Bring Your Dream Space to Life with Decor Dukaan!
          </h2>
          <button className='group bg-[#373737] flex justify-between items-center gap-3 rounded-md p-[12px] text-[#ffffee] mt-[24px] '>
            Shop now
            <span className='mt-1 '>
              <FaLongArrowAltRight />
            </span>
          </button>
        </div>
      </div>
      <div className='container mx-auto my-[72px]'>
        <div className='flex justify-between items-start'>
          <div>
            <h4 className='text-[20px] font-semibold text-[#373737]'>
              Support
            </h4>
            <ul className='text-[18px] text-[#373737] mt-[18px] space-y-2'>
              <li className='group relative cursor-pointer'>
                <Link href='/contact-us'>
                  Contact Us
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
              <li className='group relative cursor-pointer'>
                Terms & Conditions
                <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
              </li>
              <li className='group relative cursor-pointer'>
                Privacy Policy
                <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-[20px] font-semibold text-[#373737]'>
              Quick Links
            </h4>
            <ul className='text-[18px] text-[#373737] mt-[18px] space-y-2'>
              <li className='group relative cursor-pointer'>
                <Link href='/about-us'>
                  About Us
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
              <li className='group relative cursor-pointer'>
                Categories
                <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
              </li>
              <li className='group relative cursor-pointer'>
                <Link href='/product-detail'>
                  Products
                  <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-[20px] font-semibold text-[#373737]'>
              Get in touch
            </h4>
            <ul className='text-[18px] text-[#373737] mt-[18px] space-y-2'>
              <li className='group relative cursor-pointer flex justify-start items-center gap-2'>
                <IoIosCall />
                +91 1234567890/+91 9876543210
                <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
              </li>
              <li className='group relative cursor-pointer flex justify-start items-center gap-2'>
                <MdOutlineMailOutline />
                dev.decordukaan@gmail.com
                <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#373737] transition-all duration-300 group-hover:w-full'></span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-[20px] font-semibold text-[#373737]'>
              Follow Us
            </h4>
            <div className='flex items-center justify-start gap-3 mt-[18px]'>
              <FaInstagram size={30} />
              <RiFacebookCircleLine size={30} />
              <FaWhatsapp size={30} />
            </div>
          </div>
        </div>
        <div className='mt-[72px] flex justify-center items-center'>
          <Link
            href='/'
            className='text-[100px] font-bold text-yellow-600 text-opacity-40'
          >
            D E C O R D U K A A N
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
