import React, { useState } from "react";

const faqData = [
  {
    question: "I have purchased Job posting plan on HireHustle. How do I create my job listing?",
    answer: "To create a job listing, log into your HireHustle recruiter account, navigate to 'Job Postings', and follow the guided steps."
  },
  {
    question: "What is the difference between Resume Database Access (Resdex) and a Job posting?",
    answer: "Resdex gives access to resumes, while Job Posting allows job seekers to apply to your listings."
  },
  {
    question: "How is Resdex lite different from Resdex?",
    answer: "Resdex Lite is a limited version with fewer search filters and lower resume view/download limits."
  },
  {
    question: "What information is needed to create a \"requirement\" in Resdex Lite?",
    answer: "You’ll need job title, skills, experience range, location, and industry details."
  },
  {
    question: "What is Assisted Hiring?",
    answer: "Assisted Hiring connects you with recruitment experts who help shortlist suitable candidates."
  },
  {
    question: "What happens when I purchase the Assisted hiring offering?",
    answer: "You’ll be contacted by our hiring team to understand your requirement and start sourcing candidates."
  },
  {
    question: "How does pricing work for the different HireHustle recruiter plans?",
    answer: "Pricing varies based on duration, access level, and additional features like branding and promotions."
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-24">
      <div className="text-center mb-10">
        <p className="text-sm text-orange-600 font-semibold uppercase">Any Doubts?</p>
        <h2 className="text-3xl font-bold text-gray-900">Frequently asked questions</h2>
      </div>

      <div className="max-w-6xl mx-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border-b border-dashed border-gray-300 py-4 cursor-pointer transition-all duration-300"
            onClick={() => toggleIndex(index)}
          >
            <div className="flex justify-between items-center">
              <p className="text-base text-gray-900 font-medium">{faq.question}</p>
              <span className="text-2xl font-bold text-gray-800">{openIndex === index ? "−" : "+"}</span>
            </div>

            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                openIndex === index ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
