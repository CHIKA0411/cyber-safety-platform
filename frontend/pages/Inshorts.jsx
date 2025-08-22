import React, { useState, useEffect } from 'react';

const Badge = ({ children, variant = "default", className = "" }) => {
  const variantStyles = {
    destructive: "bg-red-100 text-red-800 border-red-200",
    default: "bg-blue-100 text-blue-800 border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    success: "bg-green-100 text-green-800 border-green-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md hover:shadow-lg",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const StoryCard = ({ story, onReadMore }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const severityColors = {
    critical: "destructive",
    high: "warning",
    medium: "default",
    low: "success"
  };

  const demographicColors = {
    students: "purple",
    professionals: "default", 
    rural: "success",
    seniors: "warning",
    homemakers: "orange"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant={demographicColors[story.demographic]} className="text-xs">
              {story.demographicIcon} {story.demographic.charAt(0).toUpperCase() + story.demographic.slice(1)}
            </Badge>
            <Badge variant={severityColors[story.severity]} className="text-xs">
              {story.severity.toUpperCase()}
            </Badge>
          </div>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-gray-400 hover:text-yellow-500 transition-colors"
          >
            {isBookmarked ? "⭐" : "☆"}
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span>{story.location}</span>
          <span>•</span>
          <span>{story.timeAgo}</span>
          <span>•</span>
          <span>{story.readTime} read</span>
        </div>
      </div>

      {/* Story Image */}
      <div className="relative h-48 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-6xl opacity-80">{story.icon}</div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/20 text-white border-white/20 backdrop-blur-sm">
            {story.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {story.title}
        </h2>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {story.summary}
        </p>

        {/* Key Points */}
        <div className="space-y-2 mb-4">
          {story.keyPoints.slice(0, 2).map((point, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-red-500 text-xs mt-1">•</span>
              <span className="text-xs text-gray-700">{point}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              👀 {story.views}
            </span>
            <span className="flex items-center gap-1">
              💬 {story.comments}
            </span>
            <span className="flex items-center gap-1">
              🔄 {story.shares}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onReadMore(story)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Read More →
          </Button>
        </div>
      </div>
    </div>
  );
};

const FilterTabs = ({ activeFilter, onFilterChange, demographicCounts }) => {
  const filters = [
    { key: 'all', label: '📱 All Stories', icon: '🌟' },
    { key: 'students', label: '🎓 Students', icon: '🎓' },
    { key: 'professionals', label: '💼 Professionals', icon: '💼' },
    { key: 'rural', label: '🌾 Rural', icon: '🌾' },
    { key: 'seniors', label: '👴 Seniors', icon: '👴' },
    { key: 'homemakers', label: '🏠 Homemakers', icon: '🏠' }
  ];

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.label.split(' ').slice(1).join(' ')}</span>
              {filter.key !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className={`ml-1 ${activeFilter === filter.key ? 'bg-white/20 text-white border-white/30' : ''}`}
                >
                  {demographicCounts[filter.key] || 0}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const TopHeader = ({ location, onLocationChange }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🛡️</div>
            <div>
              <h1 className="text-xl font-bold">CyberShield</h1>
              <p className="text-sm opacity-90">Stay Safe, Stay Informed</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span>📍</span>
              <select 
                value={location} 
                onChange={(e) => onLocationChange(e.target.value)}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-black text-sm"
              >
                <option value="bangalore">Bangalore</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="chennai">Chennai</option>
                <option value="hyderabad">Hyderabad</option>
              </select>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              🔔
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailModal = ({ story, isOpen, onClose }) => {
  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{story.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="purple">{story.demographic}</Badge>
            <Badge variant="warning">{story.severity}</Badge>
            <span className="text-sm text-gray-500">{story.location} • {story.timeAgo}</span>
          </div>

          <div className="h-48 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center rounded-lg mb-6">
            <div className="text-6xl">{story.icon}</div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{story.fullContent}</p>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Safety Points:</h3>
              <ul className="space-y-2">
                {story.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Prevention Tips:</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {story.preventionTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span className="text-blue-800">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CyberShieldFeed = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [location, setLocation] = useState('bangalore');
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stories = [
    {
      id: 1,
      title: "New WhatsApp Scam Targeting College Students in Bangalore",
      summary: "Fraudsters are sending fake scholarship messages through WhatsApp, asking students to share personal details and pay processing fees.",
      demographic: "students",
      demographicIcon: "🎓",
      location: "Bangalore, Karnataka",
      timeAgo: "2 hours ago",
      readTime: "2 min",
      severity: "high",
      category: "Social Media",
      icon: "📱",
      views: "2.3k",
      comments: "45",
      shares: "128",
      keyPoints: [
        "Fake scholarship messages asking for personal details",
        "Requests for processing fees ranging from ₹500-2000",
        "Messages appear to come from government departments"
      ],
      fullContent: "A new WhatsApp scam has emerged targeting college students across Bangalore. Scammers are sending messages claiming to offer government scholarships, asking students to share Aadhaar numbers, bank details, and pay small processing fees. The Cyber Crime Police have received over 50 complaints in the past week.",
      preventionTips: [
        "Never share personal documents via WhatsApp",
        "Government scholarships never require processing fees",
        "Verify through official government websites only",
        "Report suspicious messages immediately"
      ]
    },
    {
      id: 2,
      title: "IT Professional Loses ₹3 Lakh to Fake Trading App",
      summary: "A software engineer from Electronic City fell victim to a sophisticated trading app scam that promised guaranteed returns on cryptocurrency investments.",
      demographic: "professionals",
      demographicIcon: "💼",
      location: "Bangalore, Karnataka", 
      timeAgo: "5 hours ago",
      readTime: "3 min",
      severity: "critical",
      category: "Investment Fraud",
      icon: "💰",
      views: "4.1k",
      comments: "87",
      shares: "203",
      keyPoints: [
        "Fake trading app with professional-looking interface",
        "Initial small profits to build trust",
        "Unable to withdraw money when requested"
      ],
      fullContent: "A 28-year-old software engineer lost ₹3 lakh to fraudsters operating a fake cryptocurrency trading app. The victim was approached through LinkedIn and convinced to invest in what appeared to be a legitimate trading platform. After initial profits, the app became inaccessible when he tried to withdraw funds.",
      preventionTips: [
        "Verify trading platforms with SEBI registration",
        "Be wary of guaranteed return promises",
        "Start with very small amounts if testing new platforms",
        "Check app reviews from multiple sources"
      ]
    },
    {
      id: 3,
      title: "Rural Areas Face Surge in Fake Government Scheme Messages",
      summary: "Villages across Karnataka report increase in SMS scams claiming PM-KISAN benefits, asking farmers to update KYC details urgently.",
      demographic: "rural",
      demographicIcon: "🌾",
      location: "Rural Karnataka",
      timeAgo: "8 hours ago", 
      readTime: "2 min",
      severity: "medium",
      category: "Government Fraud",
      icon: "🚜",
      views: "1.8k",
      comments: "32",
      shares: "89",
      keyPoints: [
        "Fake SMS claiming PM-KISAN account will be blocked",
        "Links leading to fraudulent websites",
        "Asking for bank details and OTP verification"
      ],
      fullContent: "Rural communities are being targeted with fake SMS messages claiming their PM-KISAN accounts need immediate KYC updates. These messages create urgency by stating benefits will be stopped, leading farmers to malicious websites that steal banking information.",
      preventionTips: [
        "Government never asks for OTP via SMS",
        "Use only official government websites",
        "Visit local bank or government office for clarification",
        "Don't click on links in suspicious messages"
      ]
    },
    {
      id: 4,
      title: "Senior Citizens Targeted with Fake Medical Emergency Calls",
      summary: "Elderly residents receive calls claiming their family member is hospitalized, demanding immediate money transfer for treatment.",
      demographic: "seniors",
      demographicIcon: "👴",
      location: "Bangalore, Karnataka",
      timeAgo: "12 hours ago",
      readTime: "2 min", 
      severity: "critical",
      category: "Phone Fraud",
      icon: "📞",
      views: "3.2k",
      comments: "67",
      shares: "156",
      keyPoints: [
        "Callers claim family member in accident",
        "Create urgency demanding immediate money transfer",
        "Use emotional manipulation tactics"
      ],
      fullContent: "Fraudsters are targeting senior citizens with fake medical emergency calls, claiming their children or grandchildren have been in accidents and need immediate money for treatment. These emotional manipulation tactics have resulted in several elderly people transferring large sums.",
      preventionTips: [
        "Always verify by calling family member directly",
        "Don't make immediate money transfers under pressure", 
        "Ask for hospital details and verify independently",
        "Keep emergency contact numbers handy"
      ]
    },
    {
      id: 5,
      title: "Work-From-Home Job Scam Targets Homemakers",
      summary: "Fraudulent job postings promise easy money for data entry work from home, but ask for registration fees and personal documents.",
      demographic: "homemakers",
      demographicIcon: "🏠",
      location: "Bangalore, Karnataka",
      timeAgo: "1 day ago",
      readTime: "3 min",
      severity: "high",
      category: "Employment Fraud", 
      icon: "💻",
      views: "2.7k",
      comments: "54",
      shares: "112",
      keyPoints: [
        "Promises of earning ₹15000-25000 monthly",
        "Requires upfront registration fees",
        "Asks for bank details and ID documents"
      ],
      fullContent: "Homemakers seeking part-time work are being targeted by scammers offering data entry jobs with attractive pay. After collecting registration fees and personal documents, these fraudsters disappear, leaving victims without jobs and at risk of identity theft.",
      preventionTips: [
        "Legitimate employers never ask for registration fees",
        "Research company background thoroughly",
        "Meet employers in person when possible",
        "Be wary of jobs requiring no skills but high pay"
      ]
    },
    {
      id: 6,
      title: "Fake University Admission Alerts Hit Student WhatsApp Groups",
      summary: "Scammers infiltrate college WhatsApp groups, sharing fake admission opportunities for prestigious universities requiring application fees.",
      demographic: "students", 
      demographicIcon: "🎓",
      location: "Bangalore, Karnataka",
      timeAgo: "1 day ago",
      readTime: "2 min",
      severity: "medium",
      category: "Education Fraud",
      icon: "🎓",
      views: "1.9k",
      comments: "41",
      shares: "73",
      keyPoints: [
        "Fake admission opportunities for IITs and IIMs",
        "Requires application fees and document submission",
        "Uses official-looking logos and letterheads"
      ],
      fullContent: "Students preparing for competitive exams are being targeted through WhatsApp group messages offering direct admissions to prestigious institutions. These scams use official logos and create fake application processes to collect money and personal documents.",
      preventionTips: [
        "Verify admissions only through official university websites",
        "Legitimate admissions don't require fees via WhatsApp",
        "Cross-check with university admission offices",
        "Be suspicious of 'guaranteed admission' offers"
      ]
    }
  ];

  const filteredStories = activeFilter === 'all' ? stories : stories.filter(story => story.demographic === activeFilter);

  const demographicCounts = {
    students: stories.filter(s => s.demographic === 'students').length,
    professionals: stories.filter(s => s.demographic === 'professionals').length,
    rural: stories.filter(s => s.demographic === 'rural').length,
    seniors: stories.filter(s => s.demographic === 'seniors').length,
    homemakers: stories.filter(s => s.demographic === 'homemakers').length
  };

  const handleReadMore = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader location={location} onLocationChange={setLocation} />
      
      <FilterTabs 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter}
        demographicCounts={demographicCounts}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeFilter === 'all' ? 'Latest Security Alerts' : 
               `Stories for ${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
            </h2>
            <Badge variant="success" className="bg-green-100 text-green-800">
              {filteredStories.length} stories
            </Badge>
          </div>
          <p className="text-gray-600">Stay informed about the latest cybersecurity threats in your area</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard 
              key={story.id} 
              story={story} 
              onReadMore={handleReadMore}
            />
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-600">Try selecting a different category or location</p>
          </div>
        )}
      </div>

      <DetailModal 
        story={selectedStory} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default CyberShieldFeed;