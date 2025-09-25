import React from 'react';

const PhoneButton: React.FC = () => {
  const phoneNumber = '+44 7459 665 002';

  const handlePhoneClick = () => {
    // Track phone click for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'phone_click', {
        event_category: 'Contact',
        event_label: phoneNumber
      });
    }
  };

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handlePhoneClick}
      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
      aria-label="Call Tigrex Move"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
      <span className="hidden sm:inline">Call Now</span>
      <span className="sm:hidden">{phoneNumber}</span>
    </a>
  );
};

export default PhoneButton;