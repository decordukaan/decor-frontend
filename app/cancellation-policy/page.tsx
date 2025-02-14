function CancellationPolicyPage() {
    return (
      <div className="container mx-auto sm:my-20 my-14 max-w-3xl px-4">
        <h1 className="sm:text-[38px] text-[28px] font-bold text-[#373737] sm:mb-[38px] mb-[24px]">
          Cancellation Policy
        </h1>
        <p className="text-[#373737] text-sm mb-6">Last Updated: 01-01-2025</p>

        <h2 className="text-[20px] font-semibold text-[#373737] mt-8 mb-4">1. Order Cancellation</h2>
        <p className="sm:text-[18px] text-[16px] text-[#373737]">
          Orders can be canceled within <strong>12 hours</strong> of placing them.
        </p>
        <p className="sm:text-[18px] text-[16px] text-[#373737]">
          Once shipped, orders <strong>cannot</strong> be canceled.
        </p>
        <p className="sm:text-[18px] text-[16px] text-[#373737]">
          COD orders include a <strong>₹50 non-refundable handling fee</strong>, which will not be refunded even if the order is canceled.
        </p>

        <h2 className="text-[20px] font-semibold text-[#373737] mt-8 mb-4">2. Cancellation by DecorDukaan</h2>
        <p className="sm:text-[18px] text-[16px] text-[#373737]">
          We reserve the right to cancel orders due to stock unavailability, payment failure, or other unforeseen reasons.
        </p>
      </div>
    );
  }

  export default CancellationPolicyPage;
