import React from 'react';

function ShippingPolicyPage() {
  return (
    <div className='container mx-auto sm:my-20 my-14 max-w-3xl px-4'>
      <h1 className='text-3xl font-bold mb-6'>
        Shipping Policy – Decor Dukaan
      </h1>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Delivery Timelines</h2>
        <ul className='list-disc pl-5 space-y-2'>
          <li>
            <strong>All India Delivery:</strong> Orders are typically delivered
            within 5 to 7 working days.
          </li>
          <li>
            <strong>Order Processing:</strong> Orders are processed within 2
            working days before shipping.
          </li>
          <li>
            Delivery timelines may vary due to weather conditions, logistics
            delays, or public holidays.
          </li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Shipping Charges</h2>
        <ul className='list-disc pl-5 space-y-2'>
          <li>
            Shipping charges may apply based on the product, delivery location,
            and order value.
          </li>
          <li>Any applicable shipping fee will be calculated at checkout.</li>
          <li>
            Deliveries to remote locations may take longer due to logistics
            constraints.
          </li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Order Tracking</h2>
        <ul className='list-disc pl-5 space-y-2'>
          <li>
            A tracking link will be sent via email/SMS once your order is
            shipped.
          </li>
          <li>
            Tracking updates may take 24-48 hours to reflect, depending on the
            courier partner.
          </li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>
          Replacement & Delivery Issues
        </h2>
        <h3 className='text-xl font-semibold mb-2'>Replacement Policy</h3>
        <ul className='list-disc pl-5 space-y-2'>
          <li>
            We accept replacement requests for damaged, defective, or incorrect
            products.
          </li>
          <li>
            Customers must raise a request within 24 hours of delivery by
            emailing support@decordukaan.com with images/videos as proof.
          </li>
          <li>
            Once verified, the replacement will be delivered within 7-10 working
            days.
          </li>
          <li>Replacements are subject to stock availability.</li>
        </ul>

        <h3 className='text-xl font-semibold mt-4 mb-2'>Delivery Issues</h3>
        <ul className='list-disc pl-5 space-y-2'>
          <li>
            If your package is delayed beyond the expected timeframe, please
            contact our support team.
          </li>
          <li>
            If the order is marked as delivered but not received, report the
            issue within 24 hours for investigation.
          </li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Need Help?</h2>
        <p>
          📞 Call/WhatsApp: +91 9895560404
          <br />
          📧 Email: support@decordukaan.com
        </p>
      </section>
    </div>
  );
}

export default ShippingPolicyPage;
