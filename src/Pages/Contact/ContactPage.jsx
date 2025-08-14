import React, { useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-light dark:bg-slate-900">
      <div className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch with Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions about our courses or need support? We're here to help you 
            on your English learning journey.
          </p>
        </div>
      </div>

      <div className="container p-2 sm:p-6 lg:px-36 mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-dark dark:text-light mb-6">
                Contact Information
              </h2>
              <p className="text-slate-600 dark:text-gray-400 mb-8">
                Reach out to us through any of the following channels. Our team is 
                ready to assist you with any questions or concerns.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark dark:text-light mb-1">Email</h3>
                  <p className="text-slate-600 dark:text-gray-400">support@learnverse.com</p>
                  <p className="text-slate-600 dark:text-gray-400">info@learnverse.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark dark:text-light mb-1">Phone</h3>
                  <p className="text-slate-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-slate-600 dark:text-gray-400">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark dark:text-light mb-1">Address</h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    123 Education Street<br />
                    Learning District, LD 12345<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark dark:text-light mb-1">Business Hours</h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-dark dark:text-light mb-1">
                    How quickly will I receive a response?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-dark dark:text-light mb-1">
                    Do you offer technical support?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    Yes, our technical support team is available to help with any platform issues.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-dark dark:text-light mb-1">
                    Can I schedule a consultation?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    Absolutely! Mention your preferred time in the message and we'll arrange a call.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-dark dark:text-light mb-6">
              Send us a Message
            </h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-dark dark:text-light focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-dark dark:text-light focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-dark dark:text-light focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="courses">Course Information</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="feedback">Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark dark:text-light mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-dark dark:text-light focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <PaperAirplaneIcon className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
