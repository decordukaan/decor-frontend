function DeliveryPolicyPage() {
    return (
      <div className="container mx-auto sm:my-20 my-14 max-w-3xl px-4">
        <h1 className="sm:text-[38px] text-[28px] font-bold text-[#373737] sm:mb-[38px] mb-[24px] ">
          Delivery Policy
        </h1>
        <p className="text-[#373737] text-sm mb-6">Last Updated: 01-01-2025</p>

        <h2 className="text-[20px] font-semibold text-[#373737] mt-8 mb-4">1. Shipping Timelines</h2>
        <ul className="list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1">
          <li><strong>Kerala:</strong> Estimated 5 working days</li>
          <li><strong>Other States:</strong> Estimated 7 working days</li>
        </ul>
        <p className="sm:text-[18px] text-[16px] text-[#373737] mt-4">
          Delivery timelines are estimates only and may be affected by external factors like weather, logistics issues, or public holidays.
        </p>

        <h2 className="text-[20px] font-semibold text-[#373737] mt-8 mb-4">2. Free Delivery Across India</h2>
        <p className="sm:text-[18px] text-[16px] text-[#373737]">
          We offer free standard shipping for all orders across India.
        </p>
        <p className="sm:text-[18px] text-[16px] text-[#373737] mt-4">
          Remote locations may have extended delivery timelines due to logistics constraints.
        </p>

        <h2 className="text-[20px] font-semibold text-[#373737] mt-8 mb-4">3. Shipment Tracking</h2>
        <p className="sm:text-[18px] text-[16px] text-[#373737]">
          Customers will receive a tracking link via email/SMS once their order is shipped.
        </p>
        <p className="sm:text-[18px] text-[16px] text-[#373737] mt-4">
          Tracking may take 24-48 hours to be updated by the courier partner.
        </p>

        <h2 className="text-[20px] font-semibold text-[#373737] mt-8 mb-4">4. Delivery Issues</h2>
        <ul className="list-disc sm:text-[18px] text-[16px] list-inside text-[#373737] space-y-1">
          <li>
            If your package is delayed beyond the expected timeline, please contact
            <a href="mailto:info@decordukaan.com" className="text-blue-600 underline"> info@decordukaan.com</a>.
          </li>
          <li>If the order is marked delivered but not received, report it within 24 hours.</li>
        </ul>
      </div>
    );
  }

  export default DeliveryPolicyPage;
