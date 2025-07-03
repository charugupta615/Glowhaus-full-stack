import React, { useState } from 'react';
import './FAQSection.css';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  { question: "What makes Glowhaus the leading platform for businesses in beauty and wellness?", answer: "Glowhaus provides powerful tools, simplified booking, and seamless management for salons and spas." },
  { question: "How does Glowhaus help my business grow?", answer: "Glowhaus offers marketing tools, customer management, and analytics to help grow your business." },
  { question: "Are there any hidden costs?", answer: "No, Glowhaus operates with a transparent pricing model." },
  { question: "Is there a minimum commitment or contract?", answer: "No commitment is required. You can use Glowhaus at your convenience." },
  { question: "Does Glowhaus support businesses of all sizes?", answer: "Yes, from small businesses to large franchises, Glowhaus caters to all." },
  { question: "What types of businesses can use Glowhaus?", answer: "Glowhaus supports salons, spas, barbershops, and wellness centers." },
  { question: "How can Glowhaus help reduce no-shows?", answer: "Glowhaus sends automated reminders to customers, reducing no-shows significantly." },
  { question: "Can I migrate my data from my previous system to Glowhaus?", answer: "Yes, Glowhaus provides assistance to migrate your existing data." }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently asked questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <span>{faq.question}</span>
            {openIndex === index ? <FaMinus /> : <FaPlus />}
          </div>
          {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
