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
          <strong>Kerala:</strong> Orders are usually delivered within{' '}
          <strong>5 working days</strong>.<br />
          <strong>Other States:</strong> Deliveries may take up to{' '}
          <strong>7 working days</strong>.
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
            <strong>Cash on Delivery (COD):</strong> Available with a ₹50
            advance non-refundable fee to confirm your order.
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
