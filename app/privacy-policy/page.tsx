function PrivacyPolicyPage() {
  return (
    <div className='container mx-auto sm:my-20 my-14 max-w-3xl px-4'>
      <h1 className='sm:text-[38px] text-[28px] font-bold text-[#373737] sm:mb-[38px] mb-[24px]'>
        Privacy Policy
      </h1>
      <p className='text-[#373737] text-sm mb-6'>Last Updated: 02-03-2025</p>

      <p className='sm:text-[18px] text-[16px] text-[#373737] mb-6'>
        Decor Dukaan, a brand of Reforms Marketing Solution, is committed to
        safeguarding your privacy and ensuring the security of your personal
        information.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        1. Data Collection
      </h2>

      <h3 className='text-[18px] font-semibold text-[#373737] mt-4 mb-2'>
        Personal Data
      </h3>
      <p className='sm:text-[18px] text-[16px] text-[#373737] mb-2'>
        We collect the following personal details for invoicing and shipping
        purposes:
      </p>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1'>
        <li>Name</li>
        <li>Address</li>
        <li>Email</li>
        <li>Phone Number</li>
      </ul>

      <h3 className='text-[18px] font-semibold text-[#373737] mt-4 mb-2'>
        Payment Data
      </h3>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1'>
        <li>We do not store card details.</li>
        <li>
          Payments are processed through secure and encrypted payment gateways.
        </li>
      </ul>

      <h3 className='text-[18px] font-semibold text-[#373737] mt-4 mb-2'>
        Cookies & Tracking
      </h3>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        We use cookies to collect browsing data to enhance website functionality
        and user experience.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        2. How We Use Your Information
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737] mb-2'>
        We use your information for the following purposes:
      </p>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1'>
        <li>Order Processing: To process orders and ensure timely delivery.</li>
        <li>
          Customer Support: To respond to inquiries and provide assistance.
        </li>
        <li>
          Website Improvement: To analyze data and offer a personalized shopping
          experience.
        </li>
      </ul>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        3. Data Protection & Security
      </h2>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1'>
        <li>We employ SSL encryption to ensure the safety of user data.</li>
        <li>
          User data is never sold or shared, except with trusted logistics and
          payment partners for order fulfillment.
        </li>
      </ul>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        4. Customer Rights
      </h2>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1'>
        <li>Customers can request data deletion at any time.</li>
        <li>
          Customers can unsubscribe from marketing emails through the provided
          opt-out options.
        </li>
      </ul>

      <p className='sm:text-[18px] text-[16px] text-[#373737] mt-6'>
        For any privacy-related concerns, please contact us at
        support@decordukaan.com.
      </p>
    </div>
  );
}

export default PrivacyPolicyPage;
