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
    <footer className='bg-gray-100'>
      <div
        className='flex justify-center items-center bg-cover bg-center h-[300px] w-full'
        style={{ backgroundImage: "url('/images/footer-bg.jpg')" }}
      >
        <div className='bg-[#ffffee] bg-opacity-90 p-6 rounded-lg text-center sm:text-left sm:w-[350px] w-[90%] h-auto'>
          <h2 className='text-[18px] text-[#373737] leading-[24px]'>
            Bring Your Dream Space to Life with Decor Dukaan!
          </h2>
          <button className='group bg-[#373737] flex justify-center sm:justify-between items-center gap-3 rounded-md p-3 text-[#ffffee] mt-4 w-full sm:w-auto'>
            Shop now
            <span>
              <FaLongArrowAltRight />
            </span>
          </button>
        </div>
      </div>
      <div className='container mx-auto my-12 px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          <div>
            <h4 className='text-lg font-semibold text-[#373737]'>Support</h4>
            <ul className='text-base text-[#373737] mt-4 space-y-2'>
              <li>
                <Link href='/contact-us'>Contact Us</Link>
              </li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className='text-lg font-semibold text-[#373737]'>Quick Links</h4>
            <ul className='text-base text-[#373737] mt-4 space-y-2'>
              <li>
                <Link href='/about-us'>About Us</Link>
              </li>
              <li>Categories</li>
              <li>
                <Link href='/products'>Products</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-lg font-semibold text-[#373737]'>Get in touch</h4>
            <ul className='text-base text-[#373737] mt-4 space-y-2'>
              <li className='flex items-center gap-2'>
                <IoIosCall /> +91 1234567890 / +91 9876543210
              </li>
              <li className='flex items-center gap-2'>
                <MdOutlineMailOutline /> dev.decordukaan@gmail.com
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-lg font-semibold text-[#373737]'>Follow Us</h4>
            <div className='flex items-center gap-3 mt-4'>
              <FaInstagram size={30} />
              <RiFacebookCircleLine size={30} />
              <FaWhatsapp size={30} />
            </div>
          </div>
        </div>
        <div className='mt-12 flex justify-center'>
          <Link href='/' className='text-4xl sm:text-6xl font-bold text-yellow-600 text-opacity-40 text-center'>
            D E C O R D U K A A N
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
