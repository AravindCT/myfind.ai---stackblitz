import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Users, Gavel, FileText, Bank, Shield, DollarSign } from 'lucide-react';

type FAQCategory = {
  icon: React.ReactNode;
  title: string;
  questions: {
    q: string;
    a: string | React.ReactNode;
  }[];
};

export default function FAQ() {
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (title: string) => {
    setOpenCategories(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const faqCategories: FAQCategory[] = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Registration & Account",
      questions: [
        {
          q: "How do I register on the platform?",
          a: "To register, click on the 'Sign Up' button in the top right corner. Fill in your details including name, email, and phone number. Upload required KYC documents (PAN card, Aadhaar card). Once verified, you can start participating in auctions."
        },
        {
          q: "What documents are required for registration?",
          a: "Required documents include: Valid ID proof (Aadhaar/Passport/Driving License), PAN Card, Address proof, and Recent photograph. For companies: Registration certificate, Board resolution, and Authorized signatory documents."
        }
      ]
    },
    {
      icon: <Gavel className="h-6 w-6" />,
      title: "Bidding Process",
      questions: [
        {
          q: "How do I participate in an auction?",
          a: "1. Register and complete KYC verification\n2. Browse available properties\n3. Submit EMD (Earnest Money Deposit) for properties you're interested in\n4. Once EMD is approved, you can place bids during the auction period"
        },
        {
          q: "What is the minimum bid increment?",
          a: "The minimum bid increment varies for each property and is clearly mentioned in the property details. You must bid at least this amount above the current highest bid."
        },
        {
          q: "Can I cancel my bid?",
          a: "No, once placed, bids cannot be cancelled or withdrawn. Please ensure you carefully review all property details and terms before placing a bid."
        }
      ]
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Payments & EMD",
      questions: [
        {
          q: "What is EMD and how much do I need to pay?",
          a: "EMD (Earnest Money Deposit) is a security deposit required to participate in auctions. The amount varies by property, typically 5-10% of the reserve price. It's refundable for unsuccessful bidders."
        },
        {
          q: "How do I pay the EMD?",
          a: "EMD can be paid through RTGS/NEFT to the bank account mentioned in the property details. After payment, upload the payment proof on the platform for verification."
        },
        {
          q: "When will EMD be refunded?",
          a: "For unsuccessful bidders, EMD will be refunded within 3-5 working days after auction completion. For successful bidders, it will be adjusted against the final payment."
        }
      ]
    },
    {
      icon: <Bank className="h-6 w-6" />,
      title: "Property & Documentation",
      questions: [
        {
          q: "Can I inspect the property before bidding?",
          a: "Yes, property inspection dates are listed in the property details. You can visit the property on these dates after scheduling an appointment through the platform."
        },
        {
          q: "What documents will I receive after winning the auction?",
          a: "Successful bidders will receive: Sale Certificate, Property Documents, NOC from the bank, and Transfer Deed. The exact documentation may vary based on property type and location."
        }
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Legal & Compliance",
      questions: [
        {
          q: "Are these properties legally verified?",
          a: "Yes, all properties are legally verified by the respective banks. However, we recommend conducting your own due diligence and legal verification before bidding."
        },
        {
          q: "What happens if there are pending legal issues?",
          a: "Banks ensure properties are free from major legal encumbrances before auction. Any known legal issues are disclosed in the property details. However, buyers are advised to conduct independent verification."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our bank property auction platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleCategory(category.title)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-blue-600">{category.icon}</div>
                  <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
                </div>
                {openCategories[category.title] ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openCategories[category.title] && (
                <div className="border-t border-gray-200">
                  {category.questions.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0">
                      <button
                        onClick={() => toggleQuestion(`${category.title}-${index}`)}
                        className="w-full text-left p-6 hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-900">{faq.q}</span>
                        {openQuestions[`${category.title}-${index}`] ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {openQuestions[`${category.title}-${index}`] && (
                        <div className="px-6 pb-6 text-gray-600 whitespace-pre-line">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}