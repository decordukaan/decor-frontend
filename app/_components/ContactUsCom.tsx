function ContactUsCom() {
  return (
    <div className='bg-gray-50 text-gray-800 min-h-screen'>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: "url('/images/contact-us.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          width: '100%',
        }}
        className='text-[#373737] flex flex-col justify-center items-center'
      >
        <h1 className='text-[38px] font-bold text-[#373737]'>
          We'd Love to Hear from You!
        </h1>
        <p className='text-[20px] leading-[24px] text-center font-medium mt-[24px] text-[#373737] max-w-3xl mx-auto'>
          Reach out to us for any queries, feedback, or assistance. Our team is
          here to help you make your home truly special.
        </p>
      </section>

      {/* Contact Information */}
      <section className='py-16 px-8 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-12'>
        <div className='bg-yellow-600 bg-opacity-10 shadow-lg rounded-lg p-6 text-center'>
          <h2 className='text-xl font-semibold mb-4'>Email Us</h2>
          <p className='text-gray-600'>support@decordukaan.com</p>
        </div>
        <div className='bg-yellow-600 bg-opacity-10 shadow-lg rounded-lg p-6 text-center'>
          <h2 className='text-xl font-semibold mb-4'>Call Us</h2>
          <p className='text-gray-600'>+91 98765 43210</p>
        </div>
        <div className='bg-yellow-600 bg-opacity-10 shadow-lg rounded-lg p-6 text-center'>
          <h2 className='text-xl font-semibold mb-4'>Visit Us</h2>
          <p className='text-gray-600'>123 Decor Street, Home City, HC 56789</p>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className='pt-16 pb-20 bg-yellow-700 bg-opacity-20'>
        <div className='container mx-auto'>
          <h2 className='text-[38px] font-semibold text-center'>
            Send Us a Message
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-[42px]'>
            {/* Contact Form */}
            <div className='bg-white shadow-lg rounded-lg p-8 '>
              <form className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-gray-700 mb-2' htmlFor='name'>
                      Your Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      className='w-full border border-gray-300 rounded-lg p-3'
                      placeholder='Enter your name'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700 mb-2' htmlFor='email'>
                      Your Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='w-full border border-gray-300 rounded-lg p-3'
                      placeholder='Enter your email'
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-gray-700 mb-2' htmlFor='subject'>
                    Subject
                  </label>
                  <input
                    type='text'
                    id='subject'
                    className='w-full border border-gray-300 rounded-lg p-3'
                    placeholder='Enter the subject'
                    required
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-2' htmlFor='message'>
                    Your Message
                  </label>
                  <textarea
                    id='message'
                    className='w-full border border-gray-300 rounded-lg p-3'
                    rows={5}
                    placeholder='Write your message here'
                    required
                  ></textarea>
                </div>
                <div className='text-center'>
                  <button
                    type='submit'
                    className='px-8 py-3 bg-yellow-500 hover:bg-yellow-500 hover:bg-opacity-30 hover:text-yellow-600 text-white font-semibold rounded-lg'
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Map Section */}
            <div className='rounded-lg overflow-hidden shadow-lg'>
              <iframe
                title='Decor Dukaan Location'
                className='w-full h-full min-h-[400px]'
                src='https://www.google.com/maps/embed/v1/place?q=123+Decor+Street,+Home+City,+HC+56789&key=YOUR_GOOGLE_MAPS_API_KEY'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ContactUsCom;
