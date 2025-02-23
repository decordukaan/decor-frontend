function ShippingPolicyPage() {
  return (
    <div className='container mx-auto sm:my-20 my-14 max-w-3xl px-4'>
      <h1 className='sm:text-[38px] text-[28px] font-bold text-[#373737] sm:mb-[38px] mb-[24px] '>
        Shipping Policy
      </h1>
      <p className='text-[#373737] text-sm mb-6'>Last Updated: 23-02-2025</p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        1. Shipping Coverage
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        We currently deliver across India, covering most cities and towns. We do
        not provide international shipping at this time.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        2. Order Processing Time
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        Orders are processed within 1-2 business days after confirmation. Orders
        placed on weekends or public holidays will be processed on the next
        working day. Customers will receive an order confirmation via email/SMS.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        3. Estimated Delivery Time
      </h2>
      <ul className='list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1'>
        <li>
          <strong>Metro Cities:</strong> 3-5 business days
        </li>
        <li>
          <strong>Tier 2 & 3 Cities:</strong> 5-7 business days
        </li>
        <li>
          <strong>Remote Areas:</strong> 7-10 business days
        </li>
      </ul>
      <p className='sm:text-[18px] text-[16px] text-[#373737] mt-4'>
        External factors such as weather conditions, strikes, or logistical
        delays may impact delivery times.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        4. Shipping Charges
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        Shipping charges may vary depending on the product and delivery
        location. Some products qualify for free shipping, while others may have
        applicable charges, which will be displayed at checkout.
      </p>
      <p className='sm:text-[18px] text-[16px] text-[#373737] mt-4'>
        Cash on Delivery (COD) Fee: An additional COD handling fee may apply,
        which will be shown at checkout. In some cases, we may request an
        advance payment for COD orders to ensure the authenticity of the order
        and reduce fraudulent transactions.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        5. Order Tracking
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        You will receive a tracking link once your order is shipped. In case of unexpected delays, we will notify you.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        6. Shipping Partners
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        We work with reliable courier services, including Delhivery, Blue Dart,
        DTDC, and India Post, ensuring timely and secure deliveries.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        7. Failed Deliveries & Return to Origin (RTO)
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        If a delivery attempt fails due to incorrect address, customer
        unavailability, or non-payment (for COD orders), our team will contact
        you for a reattempt. If the order is returned to us due to multiple
        failed attempts, a refund will be processed (excluding shipping
        charges).
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        8. Damaged or Missing Items – Unboxing Video Required
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        If you receive a damaged, defective, or missing item, you must notify us
        within 24 hours of delivery. To process a replacement or refund, you
        must provide a clear, unedited, single-shot unboxing video showing the
        package being opened for the first time. This video will help us verify
        the issue. If the unboxing video is not provided or if the damage claim
        is found to be invalid after verification, we may not be able to process
        the replacement or refund.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        9. Address Changes
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        If you need to modify the shipping address after placing an order,
        please contact us within 12 hours at{' '}
        <a
          href='mailto:info@decordukaan.com'
          className='text-blue-600 underline'
        >
          info@decordukaan.com
        </a>{' '}
        or 9895560404. Address changes after dispatch are not possible.
      </p>

      <h2 className='text-[20px] font-semibold text-[#373737] mt-8 mb-4'>
        10. Contact Us
      </h2>
      <p className='sm:text-[18px] text-[16px] text-[#373737]'>
        For any shipping-related queries, please reach out to us:
      </p>
      <ul className='list-none sm:text-[18px] text-[16px] text-[#373737] space-y-1'>
        <li>
          📧 Email:{' '}
          <a
            href='mailto:info@decordukaan.com'
            className='text-blue-600 underline'
          >
            info@decordukaan.com
          </a>
        </li>
        <li>📞 Phone: 9895560404</li>
        <li>
          📍 Address: 15/651 Moochikkal Tower, Moochikkal, Kerala, PIN 676307
        </li>
      </ul>
    </div>
  );
}

export default ShippingPolicyPage;
