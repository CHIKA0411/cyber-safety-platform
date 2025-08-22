import React, { useState } from 'react';

const Card = ({ children, className = "" }) => (
  <div className={`border border-gray-200 rounded-xl ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md hover:shadow-lg",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500"
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

const Badge = ({ children, variant = "default", className = "" }) => {
  const variantStyles = {
    destructive: "bg-red-100 text-red-800 border-red-200",
    default: "bg-green-100 text-green-800 border-green-200",
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
    warning: "bg-orange-100 text-orange-800 border-orange-200"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Tabs = ({ children, defaultValue, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <div className={`${className}`}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className = "", activeTab, setActiveTab }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 ${className}`}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ children, value, className = "", activeTab, setActiveTab }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      activeTab === value 
        ? 'bg-white text-gray-900 shadow-sm' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    } ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, className = "", activeTab }) => {
  if (activeTab !== value) return null;
  return <div className={className}>{children}</div>;
};

const ThreatCard = ({ title, description, examples, type, severity, icon }) => {
  const severityColors = {
    high: "destructive",
    medium: "warning", 
    low: "secondary"
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-orange-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-orange-200/60 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 shadow-sm text-3xl">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 leading-tight">{title}</h3>
            <Badge variant={severityColors[severity]} className="mt-2">
              {severity === 'high' ? 'ಅಪಾಯ ಹೆಚ್ಚು' : severity === 'medium' ? 'ಮಧ್ಯಮ ಅಪಾಯ' : 'ಕಡಿಮೆ ಅಪಾಯ'}
            </Badge>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-5 text-sm leading-relaxed">{description}</p>
      
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
          ಸಾಮಾನ್ಯ ಉದಾಹರಣೆಗಳು:
        </h4>
        <ul className="space-y-2.5 ml-3">
          {examples.map((example, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start gap-3 group">
              <span className="text-red-500 text-xs mt-1.5 font-bold group-hover:text-red-600 transition-colors">•</span>
              <span className="leading-relaxed group-hover:text-gray-900 transition-colors">{example}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

const QRCodeEducation = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "QR ಕೋಡ್ ಎಂದರೇನು?",
      content: "QR ಕೋಡ್ ಎಂದರೆ ಚೌಕಾಕಾರದ ಚುಕ್ಕಿಗಳ ಗುಂಪು. ಇದನ್ನು ಫೋನ್‌ನ ಕ್ಯಾಮೆರಾದಿಂದ ಸ್ಕ್ಯಾನ್ ಮಾಡಬಹುದು.",
      visual: "📱",
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200"
    },
    {
      title: "ಸರಿಯಾದ QR ಕೋಡ್",
      content: "ದುಕಾನದಾರ ತನ್ನ QR ಕೋಡ್ ತೋರಿಸುತ್ತಾನೆ. ನೀವು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಹಣ ಕಳುಹಿಸುತ್ತೀರಿ. ಇದು ಸುರಕ್ಷಿತ!",
      visual: "✅",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      title: "ತಪ್ಪು QR ಕೋಡ್",
      content: "ಯಾರಾದರೂ QR ಕೋಡ್ ಕಳುಹಿಸಿ 'ಹಣ ಪಡೆಯಲು ಇದನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' ಎಂದು ಹೇಳಿದರೆ, ಅದು ವಂಚನೆ!",
      visual: "❌",
      bgColor: "from-red-50 to-pink-50",
      borderColor: "border-red-200"
    },
    {
      title: "ಹೇಗೆ ಗುರುತಿಸುವುದು?",
      content: "ನಿಜವಾದ QR ಕೋಡ್‌ನಲ್ಲಿ ನೀವು PIN ಟೈಪ್ ಮಾಡಬೇಕಾಗಿಲ್ಲ. PIN ಕೇಳಿದರೆ ಅದು ವಂಚನೆ!",
      visual: "🔐",
      bgColor: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <Card className={`p-8 bg-gradient-to-br ${step.bgColor} shadow-xl ${step.borderColor} border-2`}>
      <div className="text-center mb-6">
        <div className="text-8xl mb-4">{step.visual}</div>
        <Badge variant="secondary" className="mb-4">
          ಹಂತ {currentStep + 1} / {steps.length}
        </Badge>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
        <p className="text-lg text-gray-700 leading-relaxed max-w-md mx-auto">
          {step.content}
        </p>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="outline" 
          onClick={prevStep}
          className={currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""}
          disabled={currentStep === 0}
        >
          ◀ ಹಿಂದೆ
        </Button>
        
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">
          {currentStep === steps.length - 1 ? "🔄 ಪುನಃ ಆರಂಭ" : "ಮುಂದೆ ▶"}
        </Button>
      </div>
    </Card>
  );
};

const AudioTipsSection = () => {
  const [playingTip, setPlayingTip] = useState(null);

  const audioTips = [
    {
      id: 1,
      title: "UPI ಸುರಕ್ಷತೆ",
      description: "UPI PIN ಯಾರಿಗೂ ಹೇಳಬೇಡಿ",
      duration: "1:30",
      kannada: true
    },
    {
      id: 2,
      title: "ವಂಚನೆ ಕರೆಗಳು",
      description: "ಬ್ಯಾಂಕ್ ಕರೆ ಎಂದು ಹೇಳುವವರ ಬಗ್ಗೆ ಎಚ್ಚರ",
      duration: "2:15",
      kannada: true
    },
    {
      id: 3,
      title: "ಲಾಟರಿ ವಂಚನೆ",
      description: "ನೀವು ಲಾಟರಿ ಗೆದ್ದಿದ್ದೀರಿ ಎಂಬ ಸುಳ್ಳು ಸಂದೇಶಗಳು",
      duration: "1:45",
      kannada: true
    },
    {
      id: 4,
      title: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
      description: "ನಕಲಿ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಎಚ್ಚರ",
      duration: "2:00",
      kannada: true
    }
  ];

  const togglePlayTip = (tipId) => {
    if (playingTip === tipId) {
      setPlayingTip(null);
    } else {
      setPlayingTip(tipId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">🎧 ಆಡಿಯೋ ಸಲಹೆಗಳು</h3>
        <p className="text-gray-600">ಕೇಳಿ ಮತ್ತು ಕಲಿಯಿರಿ - ಕನ್ನಡದಲ್ಲಿ</p>
      </div>

      <div className="grid gap-4">
        {audioTips.map((tip) => (
          <div
            key={tip.id}
            className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <button
              onClick={() => togglePlayTip(tip.id)}
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                playingTip === tip.id
                  ? 'bg-red-500 text-white'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {playingTip === tip.id ? '⏸️' : '▶️'}
            </button>
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{tip.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{tip.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {tip.duration}
                </Badge>
                <Badge variant="default" className="text-xs bg-orange-100 text-orange-800">
                  ಕನ್ನಡ
                </Badge>
              </div>
            </div>

            <Button variant="outline" size="sm" className="flex-shrink-0">
              📥 ಡೌನ್‌ಲೋಡ್
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button className="bg-green-600 hover:bg-green-700">
          🎵 ಎಲ್ಲಾ ಆಡಿಯೋ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ
        </Button>
      </div>
    </div>
  );
};

const CommunityStories = () => {
  const stories = [
    {
      id: 1,
      name: "ರಾಮಣ್ಣ - ಬೆಳಗಾವಿ",
      story: "ಒಬ್ಬನು ಫೋನ್ ಮಾಡಿ 'ನಿಮಗೆ ₹50,000 ಲಾಟರಿ ಸಿಕ್ಕಿದೆ' ಎಂದನು. ಆದರೆ ನಾನು ಈ ಅಪ್ಲಿಕೇಶನ್‌ನಿಂದ ಕಲಿತಿದ್ದರಿಂದ ಅವನನ್ನು ನಂಬಲಿಲ್ಲ!",
      saved: "₹15,000",
      emoji: "👨‍🌾"
    },
    {
      id: 2,
      name: "ಲಕ್ಷ್ಮಮ್ಮ - ಮೈಸೂರು",
      story: "WhatsApp ನಲ್ಲಿ ನಕಲಿ ಸರ್ಕಾರಿ ಯೋಜನೆಯ ಸಂದೇಶ ಬಂದಿತು. ಅದರಲ್ಲಿ ಹಣ ಕೇಳುತ್ತಿದ್ದರು. ನಾನು ತಕ್ಷಣ ಸಂದೇಶ ಅಳಿಸಿದೆ.",
      saved: "₹8,000",
      emoji: "👵"
    },
    {
      id: 3,
      name: "ಮಂಜುನಾಥ - ಬೀದರ್",
      story: "QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದಾಗ PIN ಕೇಳಿತು. ಈ ಅಪ್ಲಿಕೇಶನ್‌ನಿಂದ ಕಲಿತಿದ್ದರಿಂದ ತಕ್ಷಣ ರದ್ದು ಮಾಡಿದೆ!",
      saved: "₹25,000",
      emoji: "👨"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">👥 ನಮ್ಮ ಸಮುದಾಯದ ಅನುಭವಗಳು</h3>
        <p className="text-gray-600">ನಿಜವಾದ ಜನರ ನಿಜವಾದ ಕಥೆಗಳು</p>
      </div>

      <div className="grid gap-4">
        {stories.map((story) => (
          <Card key={story.id} className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{story.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{story.name}</h4>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    ₹{story.saved} ಉಳಿಸಿದರು
                  </Badge>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "{story.story}"
                </p>
                <div className="flex items-center gap-1 mt-3">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-500">⭐</span>
                  ))}
                  <span className="text-xs text-gray-500 ml-2">ಪರಿಶೀಲಿತ ಕಥೆ</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const RuralPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-700 to-green-800">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit bg-white/10 text-white border-white/20">
                👨‍🌾 ಗ್ರಾಮೀಣ ಸಮುದಾಯಕ್ಕಾಗಿ
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                ಆನ್‌ಲೈನ್ ವಂಚನೆಯಿಂದ{" "}
                <span className="text-yellow-300">ಸುರಕ್ಷಿತವಾಗಿರಿ</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                ಕನ್ನಡದಲ್ಲಿ ಸರಳವಾಗಿ ಕಲಿಯಿರಿ. UPI, QR ಕೋಡ್, ಮತ್ತು ಫೋನ್ ವಂಚನೆಗಳಿಂದ ಹೇಗೆ ಸುರಕ್ಷಿತವಾಗಿರುವುದು ಎಂದು ತಿಳಿಯಿರಿ.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className=" text-orange-600 hover:bg-gray-100 shadow-xl">
                  🎯 ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 border-2">
                  📱 ವೀಡಿಯೋ ವೀಕ್ಷಿಸಿ
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1 ಲಕ್ಷ+</div>
                  <div className="text-sm text-white/80">ಜನರು ಸುರಕ್ಷಿತ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">₹50 ಲಕ್ಷ</div>
                  <div className="text-sm text-white/80">ಹಣ ಉಳಿಸಲಾಗಿದೆ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-white/80">ಕನ್ನಡದಲ್ಲಿ</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🛡️</div>
                  <p className="text-lg font-medium">ಸೈಬರ್ ಸುರಕ್ಷತೆ</p>
                  <p className="text-sm opacity-80">ಕನ್ನಡದಲ್ಲಿ ಸರಳವಾಗಿ</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-xl">
                <span className="text-3xl">🏡</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <Tabs defaultValue="qr-education" className="space-y-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">ನಿಮಗೆ ಬೇಕಾದುದನ್ನು ಆರಿಸಿ</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ಸರಳ ಮತ್ತು ವೇಗವಾದ ಕಲಿಕೆ. ನಿಮ್ಮ ಸಮಯಕ್ಕೆ ತಕ್ಕಂತೆ ಕಲಿಯಿರಿ!
            </p>
          </div>

          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 p-2 bg-gray-100 rounded-lg">
            <TabsTrigger value="qr-education" className="flex flex-col items-center gap-1 py-3 px-2 text-xs lg:text-sm">
              📱 QR ಕೋಡ್ ಸುರಕ್ಷತೆ
            </TabsTrigger>
            <TabsTrigger value="threats" className="flex flex-col items-center gap-1 py-3 px-2 text-xs lg:text-sm">
              ⚠️ ವಂಚನೆಗಳು
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex flex-col items-center gap-1 py-3 px-2 text-xs lg:text-sm">
              🎧 ಆಡಿಯೋ ಸಲಹೆ
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex flex-col items-center gap-1 py-3 px-2 text-xs lg:text-sm">
              👥 ಅನುಭವಗಳು
            </TabsTrigger>
          </TabsList>

          <TabsContent value="qr-education" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <QRCodeEducation />
            </div>
          </TabsContent>

          <TabsContent value="threats" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <ThreatCard
                  title="QR ಕೋಡ್ ವಂಚನೆ"
                  description="ನಕಲಿ QR ಕೋಡ್‌ಗಳಿಂದ ನಿಮ್ಮ ಹಣ ಕಳ್ಳತನ ಮಾಡುವ ಪ್ರಯತ್ನಗಳು"
                  examples={[
                    "WhatsApp ನಲ್ಲಿ QR ಕೋಡ್ ಕಳುಹಿಸಿ ಹಣ ಪಡೆಯಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಎಂದು ಹೇಳುವುದು",
                    "ಫೋನ್‌ನಲ್ಲಿ QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದಾಗ UPI PIN ಕೇಳುವುದು",
                    "ದುಕಾನದ QR ಕೋಡ್‌ನ ಮೇಲೆ ಬೇರೆ ಸ್ಟಿಕ್ಕರ್ ಅಂಟಿಸುವುದು"
                  ]}
                  type="qr"
                  severity="high"
                  icon="📱"
                />
                <ThreatCard
                  title="ಸರ್ಕಾರಿ ಯೋಜನೆ ವಂಚನೆ"
                  description="ನಕಲಿ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಹೆಸರಿನಲ್ಲಿ ಹಣ ಕೇಳುವ ವಂಚನೆ"
                  examples={[
                    "PM Kisan ಯೋಜನೆಯ ಹೆಸರಿನಲ್ಲಿ ₹500 ಕೇಳುವುದು",
                    "ರೈತರಿಗೆ ವಿಶೇಷ ಸಹಾಯಧನ ಎಂದು ನಕಲಿ ಸಂದೇಶ",
                    "Aadhaar ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹಣ ಕೇಳುವುದು"
                  ]}
                  type="government"
                  severity="high"
                  icon="🏛️"
                />
              </div>
              <div className="space-y-6">
                <ThreatCard
                  title="ಲಾಟರಿ ವಂಚನೆ"
                  description="ನೀವು ಲಾಟರಿ ಗೆದ್ದಿದ್ದೀರಿ ಎಂಬ ಸುಳ್ಳು ಸಂದೇಶಗಳು"
                  examples={[
                    "KBC ಲಾಟರಿಯಲ್ಲಿ ₹25 ಲಕ್ಷ ಗೆದ್ದಿದ್ದೀರಿ ಎಂಬ SMS",
                    "ಗೆಲುವಿನ ಹಣ ಪಡೆಯಲು ಮೊದಲು ₹5000 ಕಟ್ಟಿ ಎಂದು ಹೇಳುವುದು",
                    "ಮಹಾನ್ ನಂಬರ್‌ಗಳಿಂದ ಬರುವ ಲಾಟರಿ ಕರೆಗಳು"
                  ]}
                  type="lottery"
                  severity="medium"
                  icon="🎰"
                />
                <ThreatCard
                  title="ಬ್ಯಾಂಕ್ ವಂಚನೆ ಕರೆಗಳು"
                  description="ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿ ಎಂದು ನಟಿಸಿ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ಕೇಳುವುದು"
                  examples={[
                    "ನಿಮ್ಮ ಖಾತೆ ಬಂದ್ ಆಗುತ್ತದೆ, OTP ಕೊಡಿ ಎಂದು ಕೇಳುವುದು",
                    "ATM ಕಾರ್ಡ್ ಅಪ್‌ಡೇಟ್ ಮಾಡಲು CVV ಸಂಖ್ಯೆ ಕೇಳುವುದು",
                    "ಫೋನ್‌ನಲ್ಲಿ PIN ಸಂಖ್ಯೆ ಹೇಳಲು ಒತ್ತಾಯಿಸುವುದು"
                  ]}
                  type="bank"
                  severity="high"
                  icon="🏦"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <AudioTipsSection />
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <CommunityStories />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Quick Action Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ತಕ್ಷಣ ಸಹಾಯ ಬೇಕೇ?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            ವಂಚನೆ ಎಂದು ಅನುಮಾನವಾದರೆ, ತಕ್ಷಣ ಈ ಸಂಖ್ಯೆಗಳಿಗೆ ಕರೆ ಮಾಡಿ
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/10 border border-white/20 backdrop-blur-sm">
              <div className="text-4xl mb-2">🚨</div>
              <h3 className="text-white font-bold mb-2">ಸೈಬರ್ ಅಪರಾಧ</h3>
              <p className="text-2xl font-bold text-yellow-300">1930</p>
              <p className="text-white/80 text-sm">24/7 ಲಭ್ಯ</p>
            </Card>
            <Card className="p-6 bg-white/10 border border-white/20 backdrop-blur-sm">
              <div className="text-4xl mb-2">📞</div>
              <h3 className="text-white font-bold mb-2">ಬ್ಯಾಂಕ್ ಸಹಾಯ</h3>
              <p className="text-2xl font-bold text-yellow-300">ನಿಮ್ಮ ಬ್ಯಾಂಕ್</p>
              <p className="text-white/80 text-sm">ಕಾರ್ಡ್ ಬ್ಲಾಕ್ ಮಾಡಿ</p>
            </Card>
            <Card className="p-6 bg-white/10 border border-white/20 backdrop-blur-sm">
              <div className="text-4xl mb-2">👮</div>
              <h3 className="text-white font-bold mb-2">ಪೊಲೀಸ್</h3>
              <p className="text-2xl font-bold text-yellow-300">100</p>
              <p className="text-white/80 text-sm">ತುರ್ತು ಸೇವೆ</p>
            </Card>
          </div>
          <div className="mt-8">
            <Button size="lg" className=" text-green-600 hover:bg-gray-100 shadow-xl mr-4">
              📱 ಅಪ್ಲಿಕೇಶನ್ ಡೌನ್‌ಲೋಡ್
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 border-2">
              💬 ಸಹಾಯ ಚಾಟ್
            </Button>
          </div>
        </div>
      </section>

      {/* Tips Banner */}
      <section className="bg-orange-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Card className="p-8 bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🎯 ಮುಖ್ಯ ನೆನಪಿಟ್ಟುಕೊಳ್ಳಬೇಕಾದ ವಿಷಯಗಳು
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">🔐</div>
                <h4 className="font-bold text-gray-900 mb-1">UPI PIN</h4>
                <p className="text-sm text-gray-600">ಯಾರಿಗೂ ಹೇಳಬೇಡಿ</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-bold text-gray-900 mb-1">QR ಕೋಡ್</h4>
                <p className="text-sm text-gray-600">PIN ಕೇಳಿದರೆ ವಂಚನೆ</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">🎰</div>
                <h4 className="font-bold text-gray-900 mb-1">ಲಾಟರಿ</h4>
                <p className="text-sm text-gray-600">ಮೊದಲು ಹಣ ಕೇಳಿದರೆ ನಂಬಬೇಡಿ</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">📞</div>
                <h4 className="font-bold text-gray-900 mb-1">ವಂಚನೆ ಕರೆ</h4>
                <p className="text-sm text-gray-600">ತಕ್ಷಣ ಕರೆ ಕಟ್ ಮಾಡಿ</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default RuralPage;