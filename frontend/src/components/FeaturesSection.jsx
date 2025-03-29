import { useState } from 'react';
import {
  Clock,
  Calendar,
  UserCheck,
  FileText,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

const features = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Real-time Queue Updates",
    description: "Get instant notifications about your position and estimated wait times."
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Smart Scheduling",
    description: "Book appointments and manage your medical schedule with ease."
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: "Digital Registration",
    description: "Complete your registration process digitally without paperwork."
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Medical History Access",
    description: "Access your complete medical history and reports in one place."
  }
];

const registrationSteps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up with your basic information and email address."
  },
  {
    number: "02",
    title: "Complete Profile",
    description: "Add your medical history and personal details."
  },
  {
    number: "03",
    title: "Verify Identity",
    description: "Upload required documents for identity verification."
  },
  {
    number: "04",
    title: "Ready to Use",
    description: "Start using the platform to manage your healthcare needs."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    text: "This platform has completely transformed my healthcare experience. No more waiting in long queues!"
  },
  {
    name: "Michael Chen",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    text: "The real-time updates and digital registration process are game-changers. Highly recommended!"
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
    text: "Managing appointments and accessing medical records has never been easier."
  }
];

const faqs = [
  {
    question: "How does the queue system work?",
    answer: "Our queue system uses real-time technology to track patient positions and estimated wait times. You'll receive notifications about your position and when it's your turn."
  },
  {
    question: "Is my medical information secure?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your medical information. All data is stored securely and only accessible to authorized healthcare providers."
  },
  {
    question: "Can I book appointments in advance?",
    answer: "Yes, you can schedule appointments up to 30 days in advance through our platform. You'll receive reminders and can manage your appointments easily."
  },
  {
    question: "What documents do I need for registration?",
    answer: "You'll need a valid government ID, proof of address, and any relevant medical insurance information. All documents can be uploaded digitally during the registration process."
  }
];

function FeaturesSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#121212]">
      <div className="container mx-auto px-4">
        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Cut The Queue?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1C1C1C] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Steps to Get Registered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {registrationSteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-[#1C1C1C] p-6 rounded-xl shadow-lg"
              >
                <div className="absolute -top-4 left-6 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
                {index < registrationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What Our Users Say
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white dark:bg-[#1C1C1C] p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white dark:bg-[#1C1C1C] shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <ArrowLeft className="w-6 h-6 text-blue-500" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white dark:bg-[#1C1C1C] shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <ArrowRight className="w-6 h-6 text-blue-500" />
              </button>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1C1C1C] rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection; 