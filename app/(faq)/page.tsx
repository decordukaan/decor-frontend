'use client';

import { Accordion, Container, Title } from '@mantine/core';

const faqData = [
  {
    value: 'delivery-time',
    question: 'How long does delivery take?',
    answer: (
      <>
        <p>
          The delivery time depends on your location. Once your order is
          confirmed, our team processes it within 24 hours.
        </p>
        <p>
          <strong>Metro Cities:</strong> 3-5 business days
          <br />
          <strong>Tier 2 & 3 Cities:</strong> 7 business days
          <br />
          <strong>Remote Areas:</strong> 7 business days
        </p>
        <p>
          You will receive a tracking link once your order is shipped. In case
          of unexpected delays, we will notify you.
        </p>
      </>
    ),
  },
  {
    value: 'payment-methods',
    question: 'What payment methods do you accept?',
    answer: (
      <>
        <p>We accept the following payment methods:</p>
        <ul>
          <li>
            <strong>Online Payments:</strong> You can pay using Credit/Debit
            Cards, UPI, and Net Banking for a seamless transaction.
          </li>
          <li>
            <strong>Cash on Delivery (COD):</strong> Cash on Delivery (COD)
            orders may include an additional handling fee, which will be
            displayed at checkout. This fee is non-refundable even if the order
            is canceled
          </li>
        </ul>
        <p>
          The advance fee ensures that your order is genuine and helps us
          provide efficient service. For faster checkout, we recommend online
          payments.
        </p>
      </>
    ),
  },
  {
    value: 'return-policy',
    question: 'Can I return my product?',
    answer: (
      <>
        <p>
          Yes, we accept returns if the product is damaged during transit.
          However, to qualify for a return:
        </p>
        <ul>
          <li>
            The damage must be reported within <strong>24 hours</strong> of
            delivery.
          </li>
          <li>
            A valid <strong>unboxing video</strong> is required as proof of
            damage.
          </li>
          <li>
            Once we verify the issue, we will initiate a replacement or refund
            as per our policy.
          </li>
        </ul>
        <p>
          Please ensure you inspect the product immediately upon arrival and
          report any issues within the given timeframe.
        </p>
      </>
    ),
  },
  {
    value: 'order-tracking',
    question: 'How do I track my order?',
    answer: (
      <>
        <p>
          Once your order is shipped, you will receive an SMS and email with a
          tracking link. You can use this link to check your order status in
          real time.
        </p>
        <p>
          If you do not receive a tracking link within 48 hours after placing
          your order, please contact our support team for assistance.
        </p>
        <p>
          For urgent queries, you can reach out via email or phone for an update
          on your order status.
        </p>
      </>
    ),
  },
  {
    value: 'shipping-policy',
    question: 'What is your shipping policy?',
    answer: (
      <>
        <p>
          We currently deliver across India, covering most cities and towns. We
          do not provide international shipping at this time.
        </p>
        <h3>Order Processing Time</h3>
        <p>
          Orders are processed within 1-2 business days after confirmation.
          Orders placed on weekends or public holidays will be processed on the
          next working day. Customers will receive an order confirmation via
          email/SMS.
        </p>
        <h3>Estimated Delivery Time</h3>
        <ul>
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
        <p>
          External factors such as weather conditions, strikes, or logistical
          delays may impact delivery times.
        </p>
        <h3>Shipping Charges</h3>
        <p>
          Shipping charges may vary depending on the product and delivery
          location. Some products qualify for free shipping, while others may
          have applicable charges, which will be displayed at checkout.
        </p>
        <p>
          <strong>Cash on Delivery (COD) Fee:</strong> An additional COD
          handling fee may apply, which will be shown at checkout. In some
          cases, we may request an advance payment for COD orders to ensure the
          authenticity of the order and reduce fraudulent transactions.
        </p>
        <h3>Order Tracking</h3>
        <p>
          You will receive a tracking link once your order is shipped. In case
          of unexpected delays, we will notify you.
        </p>
        <h3>Shipping Partners</h3>
        <p>
          We work with reliable courier services, including Delhivery, Blue
          Dart, DTDC, and India Post, ensuring timely and secure deliveries.
        </p>
        <h3>Failed Deliveries & Return to Origin (RTO)</h3>
        <p>
          If a delivery attempt fails due to incorrect address, customer
          unavailability, or non-payment (for COD orders), our team will contact
          you for a reattempt. If the order is returned to us due to multiple
          failed attempts, a refund will be processed (excluding shipping
          charges).
        </p>
        <h3>Damaged or Missing Items – Unboxing Video Required</h3>
        <p>
          If you receive a damaged, defective, or missing item, you must notify
          us within 24 hours of delivery. To process a replacement or refund,
          you must provide a clear, unedited, single-shot unboxing video showing
          the package being opened for the first time. This video will help us
          verify the issue. If the unboxing video is not provided or if the
          damage claim is found to be invalid after verification, we may not be
          able to process the replacement or refund.
        </p>
        <h3>Address Changes</h3>
        <p>
          If you need to modify the shipping address after placing an order,
          please contact us within 12 hours at info@decordukaan.com or
          9895560404. Address changes after dispatch are not possible.
        </p>
        <h3>Contact Us</h3>
        <p>For any shipping-related queries, please reach out to us:</p>
        <ul>
          <li>📧 Email: info@decordukaan.com</li>
          <li>📞 Phone: 9895560404</li>
          <li>
            📍 Address: 15/651 Moochikkal Tower, Moochikkal, Kerala, PIN 676307
          </li>
        </ul>
      </>
    ),
  },
];

function FaqPage() {
  return (
    <div>
      <section
        style={{
          backgroundImage: "url('/images/carousel-3.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          width: '100%',
        }}
        className='flex flex-col justify-center items-center'
      >
        <h1 className='sm:text-[38px] text-[28px] text-center leading-[30px] font-bold text-[#373737]'>
          Most Frequently Asked Questions
        </h1>
        <p className='sm:text-[20px] text-[18px] leading-[24px] text-center font-medium mt-[24px] text-[#373737] sm:max-w-3xl sm:mx-auto mx-[20px]'>
          "Find answers to common questions about our home decor products,
          delivery times, payment options, returns, and more. Whether you're
          looking for details on order tracking or product care, our FAQ section
          has you covered!
        </p>
      </section>
      <div className='mx-[20px] sm:mx-0'>
        <div className='container mx-auto sm:my-[72px] my-[52px] sm:max-w-3xl'>
          <Accordion variant='separated'>
            {faqData.map(({ value, question, answer }) => (
              <Accordion.Item p={10} mt={30} key={value} value={value}>
                <Accordion.Control style={{ fontSize: '18px' }}>
                  {question}
                </Accordion.Control>
                <Accordion.Panel style={{ fontSize: '18px' }}>
                  {answer}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
