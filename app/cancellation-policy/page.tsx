function CancellationPolicyPage() {
  return (
    <div className='container mx-auto sm:my-20 my-14 max-w-3xl px-4'>
      <h1 className='sm:text-[38px] text-[28px] font-bold text-[#373737] sm:mb-[38px] mb-[24px]'>
        Cancellation Policy
      </h1>
      <p className='text-[#373737] text-sm mb-6'>Last Updated: 23-02-2025</p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        1. Order Cancellation
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        Orders can be canceled within <strong>12 hours</strong> of placing them.
      </p>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        Once shipped, orders <strong>cannot</strong> be canceled.
      </p>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        Cash on Delivery (COD) orders may include an additional handling fee,
        which will be displayed at checkout. This fee is non-refundable even if
        the order is canceled.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        2. Cancellation by DecorDukaan
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        We reserve the right to cancel orders due to stock unavailability,
        payment failure, or other unforeseen reasons.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        3. Refund Process
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        If an order is canceled, the refund will be processed within 5-7
        business days. The refund will be credited to the original payment
        method.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        4. Contact Us
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        For any cancellation-related queries, please reach out to us:
        <br />
        📧 Email:{' '}
        <a
          href='mailto:info@decordukaan.com'
          className='text-blue-600 underline'
        >
          info@decordukaan.com
        </a>
        <br />
        📞 Phone: 9895560404
      </p>
    </div>
  );
}

export default CancellationPolicyPage;
