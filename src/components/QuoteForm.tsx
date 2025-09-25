import React, { useState } from 'react';

interface FormData {
  serviceType: string;
  fromPostcode: string;
  toPostcode: string;
  moveDate: string;
  bedrooms: string;
  name: string;
  email: string;
  phone: string;
  additionalInfo: string;
}

const QuoteForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    fromPostcode: '',
    toPostcode: '',
    moveDate: '',
    bedrooms: '',
    name: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission
    if (typeof gtag !== 'undefined') {
      gtag('event', 'quote_form_submit', {
        event_category: 'Lead Generation',
        event_label: formData.serviceType
      });
    }

    try {
      // Send form data to Formspree (replace with your form endpoint)
      const response = await fetch('https://formspree.io/f/mqayagpb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: formData.serviceType,
          from_postcode: formData.fromPostcode,
          to_postcode: formData.toPostcode,
          move_date: formData.moveDate,
          property_size: formData.bedrooms,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.additionalInfo,
          _subject: `New Quote Request from ${formData.name}`,
          _replyto: formData.email
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);

        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({
            serviceType: '',
            fromPostcode: '',
            toPostcode: '',
            moveDate: '',
            bedrooms: '',
            name: '',
            email: '',
            phone: '',
            additionalInfo: ''
          });
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Fallback: create mailto link
      const subject = `Quote Request from ${formData.name}`;
      const body = `
Service: ${formData.serviceType}
From: ${formData.fromPostcode}
To: ${formData.toPostcode}
Move Date: ${formData.moveDate}
Property Size: ${formData.bedrooms}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Additional Info: ${formData.additionalInfo}
      `;
      window.location.href = `mailto:tigrexmove@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    setIsSubmitting(false);
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Quote Request Received!</h3>
          <p className="text-gray-600 mb-6">
            Thank you! We'll contact you within 15 minutes with your personalized quote.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Need immediate help?</strong><br />
              Call us now: <a href="tel:+442038089393" className="font-semibold text-blue-600">+44 20 3808 9393</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto" id="quote-form">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Quote</h3>
        <p className="text-gray-600">Quick response in 15 minutes or less</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service Type */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
            Service Type *
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a service</option>
            <option value="residential">Residential Moving</option>
            <option value="commercial">Commercial Moving</option>
            <option value="packing">Packing Services</option>
            <option value="storage">Storage Solutions</option>
            <option value="international">International Removals</option>
            <option value="man-van">Man & Van</option>
            <option value="emergency">Emergency Move</option>
          </select>
        </div>

        {/* From/To Postcodes */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="fromPostcode" className="block text-sm font-medium text-gray-700 mb-2">
              From Postcode *
            </label>
            <input
              type="text"
              id="fromPostcode"
              name="fromPostcode"
              value={formData.fromPostcode}
              onChange={handleInputChange}
              required
              placeholder="e.g. SW1A 1AA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="toPostcode" className="block text-sm font-medium text-gray-700 mb-2">
              To Postcode *
            </label>
            <input
              type="text"
              id="toPostcode"
              name="toPostcode"
              value={formData.toPostcode}
              onChange={handleInputChange}
              required
              placeholder="e.g. M1 1AA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Move Date and Bedrooms */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="moveDate" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date *
            </label>
            <input
              type="date"
              id="moveDate"
              name="moveDate"
              value={formData.moveDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
              Property Size
            </label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select size</option>
              <option value="studio">Studio</option>
              <option value="1-bed">1 Bedroom</option>
              <option value="2-bed">2 Bedroom</option>
              <option value="3-bed">3 Bedroom</option>
              <option value="4-bed">4+ Bedroom</option>
              <option value="office">Office/Commercial</option>
            </select>
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows={3}
            placeholder="Special items, access issues, etc."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Getting Your Quote...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span>Get My Free Quote</span>
            </>
          )}
        </button>

        {/* Trust Indicators */}
        <div className="text-center pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>No spam</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>15min response</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;