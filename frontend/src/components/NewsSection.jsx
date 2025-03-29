import { useState } from "react";
import { ExternalLink } from "lucide-react";

function NewsSection() {
  const [news] = useState([
    {
      id: 1,
      title: "New Healthcare Policy Implementation",
      description: "Major changes in healthcare policies affecting patient care and hospital management.",
      date: "2024-03-15",
      source: "Healthcare Weekly",
      link: "#"
    },
    {
      id: 2,
      title: "Breakthrough in Medical Technology",
      description: "Revolutionary AI-powered diagnostic tools showing promising results in early disease detection.",
      date: "2024-03-14",
      source: "Med Tech Today",
      link: "#"
    },
    {
      id: 3,
      title: "COVID-19 Update: New Guidelines",
      description: "Updated protocols for healthcare facilities regarding COVID-19 prevention and treatment.",
      date: "2024-03-13",
      source: "Health Authority",
      link: "#"
    }
  ]);

  return (
    <div className="bg-[#1C1C1C] rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-white">
        Healthcare News & Updates
      </h2>
      <div className="space-y-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="border-b border-gray-800 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            </div>
            <p className="text-gray-400 mb-2">
              {item.description}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{item.source}</span>
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
        View All News
      </button>
    </div>
  );
}

export default NewsSection; 