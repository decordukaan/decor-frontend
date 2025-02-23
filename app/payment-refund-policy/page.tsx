function PaymentRefundPolicyPage() {
  return (
    <div className='container mx-auto sm:my-20 my-14 max-w-3xl px-4'>
      <h1 className='sm:text-[38px] text-[28px] font-bold text-[#373737] sm:mb-[38px] mb-[24px]'>
        Payment & Refund Policy
      </h1>
      <p className='text-[#373737] text-sm mb-6'>Last Updated: 23-02-2025</p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        1. Payment Methods
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        We accept the following payment methods:
      </p>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] mt-4 space-y-1'>
        <li>Online Payments: Credit/Debit Cards, UPI, Net Banking</li>
        <li>
          Cash on Delivery (COD) Fee: An additional COD handling fee may apply,
          which will be shown at checkout.
        </li>
      </ul>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        2. Refund & Return Policy
      </h2>
      <h3 className='text-[18px] font-semibold text-[#373737] mt-4 mb-2'>
        Eligibility for Returns & Replacements
      </h3>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1'>
        <li>
          Return/replacement requests must be raised within 24 hours of
          delivery.
        </li>
        <li>
          A single-shot, unedited unboxing video is mandatory to claim
          refunds/replacements.
        </li>
        <li>
          The product must be unused, undamaged, and in original packaging.
        </li>
      </ul>

      <h3 className='text-[18px] font-semibold text-[#373737] mt-4 mb-2'>
        Refund Process
      </h3>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1'>
        <li>
          Refunds are processed only after the returned product is received and
          inspected.
        </li>
        <li>
          If there are discrepancies (damages not shown in the unboxing video,
          missing accessories, or used items), the refund may be withheld,
          denied, or partially refunded.
        </li>
        <li>
          Refunds for prepaid orders will be issued to the original payment
          method within 7-10 business days.
        </li>
      </ul>

      <h3 className='text-[18px] font-semibold text-[#373737] mt-4 mb-2'>
        Non-Refundable Items
      </h3>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1'>
        <li>
          COD ₹50 handling fee is non-refundable, even if the order is canceled.
        </li>
        <li>If the return request is not submitted within 24 hours.</li>
        <li>
          If the unboxing video does not meet our guidelines (edited,
          incomplete, or missing product details).
        </li>
      </ul>
    </div>
  );
}

export default PaymentRefundPolicyPage;
