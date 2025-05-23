import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import NetworkAnimation from '../components/Common/NetworkAnimation';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    // Initialize with your public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Validate form inputs
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // EmailJS configuration
        const templateParams = {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        };

        // Send email using environment variables
        const result = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams
        );

        console.log('Email sent successfully:', result.text);
        
        // Success handling
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmitError(true);

        setTimeout(() => {
          setSubmitError(false);
        }, 5000);
      }

      setIsSubmitting(false);
    }
  };

  // Company details
  const companyDetails = {
    name: "Mihir Nagda",
    address: "Mumbai, Maharashtra, India - 421202",
    // phone: "",
    email: "mihirnagda28@gmail.com"
  };

  // Social media links
  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/mihir-28" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com/in/mihir-an28" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com/kyayaar_mihir" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com/kyayaar.mihir" }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <NetworkAnimation opacity={0.15} zIndex={0} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -top-48 -left-48"></div>
        <div className="h-96 w-96 rounded-full bg-cta/5 blur-3xl absolute -bottom-48 -right-48"></div>
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cta mb-6">Get In Touch</h1>
          <p className="text-text/80 max-w-2xl mx-auto">
            Have questions about our blockchain supply chain solutions? Contact us for more information,
            partnership opportunities, or technical support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-6 md:p-8 shadow-lg"
          >
            <h2 className="text-2xl font-display font-bold text-cta mb-6">Send Me A Message</h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-text/90 mb-1 text-sm">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-background/60 border ${errors.name ? 'border-red-500/50' : 'border-cta/20'} 
                              rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-text/90 mb-1 text-sm">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-background/60 border ${errors.email ? 'border-red-500/50' : 'border-cta/20'} 
                              rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                    placeholder="Your email address"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-text/90 mb-1 text-sm">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-background/60 border ${errors.subject ? 'border-red-500/50' : 'border-cta/20'} 
                              rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                    placeholder="Message subject"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-text/90 mb-1 text-sm">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-background/60 border ${errors.message ? 'border-red-500/50' : 'border-cta/20'} 
                              rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200`}
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-cta/20 hover:bg-cta/30 text-cta border border-cta/30 
                              rounded-lg transition-all duration-300 font-medium flex items-center justify-center
                              ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-cta" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : 'Send Message'}
                  </button>

                  {/* Success message */}
                  {submitSuccess && (
                    <div className="mt-4 bg-green-500/20 border border-green-500/30 text-green-500 px-4 py-3 rounded-lg text-sm">
                      Your message has been sent successfully! We'll get back to you soon.
                    </div>
                  )}

                  {/* Error message */}
                  {submitError && (
                    <div className="mt-4 bg-red-500/20 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg text-sm">
                      Something went wrong! Please try again later.
                    </div>
                  )}
                </div>
              </div>
            </form>
          </motion.div>

          {/* Company Details and Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Company Info Card */}
            <div className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-6 md:p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-display font-bold text-cta mb-6">Information</h2>

              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-cta/10 text-cta">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-cta font-medium">{companyDetails.name}</h3>
                    <p className="text-text/70 mt-1">{companyDetails.address}</p>
                  </div>
                </div>

                {/* <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-cta/10 text-cta">
                    <FaPhone />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-cta font-medium">Phone</h3>
                    <p className="text-text/70 mt-1">{companyDetails.phone}</p>
                  </div>
                </div> */}

                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-cta/10 text-cta">
                    <FaEnvelope />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-cta font-medium">Email</h3>
                    <p className="text-text/70 mt-1">{companyDetails.email}</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-6 border-t border-text/10">
                <h3 className="text-text/80 font-medium mb-4">Connect With Me</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 flex items-center justify-center rounded-full bg-cta/10 text-cta border border-cta/20 
                               hover:bg-cta/20 transition-all duration-300"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-display font-bold text-cta mb-4">Our Location</h3>
              <div className="rounded-lg overflow-hidden border border-cta/20 aspect-[16/9]">
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7982976497588!2d72.89521477531603!3d19.072603882131272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6279e6fa183%3A0x8b414750f755e236!2sSomaiya%20Vidyavihar%20University!5e0!3m2!1sen!2sin!4v1741985294342!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                  aria-label="Map showing our office location in Mumbai"
                ></iframe>
              </div>
              <div className="flex items-center mt-4 text-sm text-text/70">
                <FaMapMarkerAlt className="text-cta mr-2" />
                <span>Mumbai, Maharashtra, India - 421202</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;