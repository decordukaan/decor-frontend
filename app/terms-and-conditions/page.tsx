function TermsAndConditionPage() {
  return (
    <div className='container mx-auto sm:my-20 my-14 max-w-3xl px-4'>
      <h1 className='sm:text-[38px] text-[28px] font-bold text-[#373737] sm:mb-[38px] mb-[24px] '>
        Terms and Conditions
      </h1>
      <p className='text-[#373737] text-sm mb-6'>Last Updated: 02-03-2025</p>

      <p className='sm:text-[18px] text-[16px] text-[#373737] mb-6'>
        Welcome to <strong>DecorDukaan</strong>, owned and operated by Reforms
        Marketing Solution. By accessing or using our website{' '}
        <a
          href='https://www.decordukaan.com'
          className='text-blue-600 underline'
        >
          www.decordukaan.com
        </a>
        , you agree to the terms mentioned below. If you do not agree, please
        refrain from using our services.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        1. General Information
      </h2>
      <p className='sm:text-[18px] text-[16px]'>
        <strong>Brand Name:</strong> DecorDukaan
      </p>
      <p className='sm:text-[18px] text-[16px]'>
        <strong>Parent Company:</strong> Reforms Marketing Solution
      </p>
      <p className='sm:text-[18px] text-[16px]'>
        <strong>Registered Address:</strong> 15/651 Moochikkal Tower,
        Moochikkal, Kerala - 676307
      </p>
      <p className='sm:text-[18px] text-[16px]'>
        <strong>Contact Email:</strong> info@decordukaan.com
      </p>
      <p className='sm:text-[18px] text-[16px]'>
        <strong>Customer Support:</strong> 9:30 AM - 6:30 PM (Monday to
        Saturday)
      </p>
      <p className='sm:text-[18px] text-[16px] font-semibold'>
        Free Delivery Across India
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        2. User Responsibilities
      </h2>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1'>
        <li>
          Customers must provide accurate personal details for invoicing and
          shipping.
        </li>
        <li>
          Any misuse of our website for fraudulent activities is strictly
          prohibited.
        </li>
        <li>
          By placing an order, customers agree to our return, refund, and
          cancellation policies.
        </li>
      </ul>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        3. Pricing & Payments
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        All prices are in INR (₹) and include applicable taxes.
      </p>
      <p className='sm:text-[18px] text-[16px] font-semibold mt-4'>
        Accepted Payment Methods:
      </p>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] mt-4 space-y-1'>
        <li>Online Payments (Credit/Debit Cards, UPI, Net Banking)</li>
        <li>
          Cash on Delivery (COD) Fee: An additional COD handling fee may apply,
          which will be shown at checkout.
        </li>
      </ul>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        4. Intellectual Property
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        All images, designs, and content on DecorDukaan are our exclusive
        property and cannot be copied or reproduced without permission.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        5. Governing Law
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        These terms are governed by Indian law, and any disputes will be
        resolved in Kerala courts.
      </p>
    </div>
  );
}

export default TermsAndConditionPage;
