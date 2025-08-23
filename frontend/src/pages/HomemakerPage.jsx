import React, { useState } from "react";

const Card = ({ children, className = "" }) => (
  <div className={`border border-gray-200 rounded-xl ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default:
      "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-md hover:shadow-lg",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
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
    default: "bg-rose-100 text-rose-800 border-rose-200",
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const Tabs = ({ children, defaultValue, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={`${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className = "", activeTab, setActiveTab }) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 ${className}`}
  >
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({
  children,
  value,
  className = "",
  activeTab,
  setActiveTab,
}) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      activeTab === value
        ? "bg-white text-gray-900 shadow-sm"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
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

const ThreatCard = ({ title, description, examples, type, severity }) => {
  const iconMap = {
    shopping: "🛒",
    banking: "🏦",
    bills: "💡",
    community: "👥",
  };

  const severityColors = {
    high: "destructive",
    medium: "default",
    low: "secondary",
  };

  const icon = iconMap[type];

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-rose-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200/60 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 shadow-sm text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 leading-tight">
              {title}
            </h3>
            <Badge variant={severityColors[severity]} className="mt-2">
              {severity.charAt(0).toUpperCase() + severity.slice(1)} Risk
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-5 text-sm leading-relaxed">
        {description}
      </p>

      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full"></span>
          Common Examples:
        </h4>
        <ul className="space-y-2.5 ml-3">
          {examples.map((example, index) => (
            <li
              key={index}
              className="text-sm text-gray-700 flex items-start gap-3 group"
            >
              <span className="text-red-500 text-xs mt-1.5 font-bold group-hover:text-red-600 transition-colors">
                •
              </span>
              <span className="leading-relaxed group-hover:text-gray-900 transition-colors">
                {example}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

const SafetyTips = () => {
  const tips = [
    {
      id: 1,
      tip: "Check seller ratings & reviews before buying online",
      category: "Online Shopping",
    },
    {
      id: 2,
      tip: "Banks never ask for OTP or PIN via SMS/call",
      category: "Banking Safety",
    },
    {
      id: 3,
      tip: "Verify bills through official websites or apps",
      category: "Bill Payments",
    },
    {
      id: 4,
      tip: "Don't share UPI PIN or bank details with anyone",
      category: "Digital Payments",
    },
    {
      id: 5,
      tip: "Use secure payment methods (COD/trusted gateways)",
      category: "Payment Security",
    },
    {
      id: 6,
      tip: "Be cautious of 'too good to be true' deals",
      category: "Deal Verification",
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200/60">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💡</span>
        <h3 className="font-semibold text-lg text-gray-900">
          Smart Shopping Tips
        </h3>
      </div>

      <div className="grid gap-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100/50 hover:shadow-md transition-all duration-200"
          >
            <span className="text-green-500 text-lg mt-0.5 font-bold">✓</span>
            <div className="flex-1">
              <p className="text-sm font-medium mb-1 text-gray-800">
                {tip.tip}
              </p>
              <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-rose-100 text-rose-700 font-medium">
                {tip.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SafeShoppingGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Which online deal looks suspicious?",
      options: [
        {
          text: "iPhone 14 - ₹15,000 (90% off) - Limited time offer!",
          correct: true,
        },
        { text: "Kurta set - ₹800 (40% off) - Free delivery", correct: false },
        {
          text: "Kitchen utensils - ₹500 (20% off) - COD available",
          correct: false,
        },
      ],
      explanation:
        "Extremely high discounts (90% off) on expensive items like iPhones are usually scams. Real discounts are typically 10-40%.",
    },
    {
      id: 2,
      question: "Which SMS about KYC update is genuine?",
      options: [
        {
          text: "Visit your nearest branch to update KYC documents",
          correct: true,
        },
        {
          text: "Click here immediately to update KYC or account will be blocked",
          correct: false,
        },
        {
          text: "Reply with Aadhaar & PAN numbers to complete KYC",
          correct: false,
        },
      ],
      explanation:
        "Banks ask you to visit branches for KYC updates. They never ask for immediate action via links or personal details via SMS.",
    },
    {
      id: 3,
      question: "How should you verify an electricity bill payment request?",
      options: [
        { text: "Click the link in SMS and pay immediately", correct: false },
        {
          text: "Check the official electricity board app/website",
          correct: true,
        },
        { text: "Call the phone number mentioned in the SMS", correct: false },
      ],
      explanation:
        "Always verify bills through official apps or websites. Scammers send fake urgent payment requests to create panic.",
    },
  ];

  const handleAnswer = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    const isCorrect = questions[currentQuestion].options[optionIndex].correct;

    setTimeout(() => {
      if (isCorrect) setScore(score + 1);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-rose-50 to-pink-50 shadow-xl border border-rose-100">
        <div className="text-6xl mb-4">
          {score >= 2 ? "🎉" : score === 1 ? "🙂" : "😅"}
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-900">
          {score >= 2
            ? "Excellent!"
            : score === 1
            ? "Good Job!"
            : "Keep Learning!"}
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          You got {score} out of {questions.length} questions correct!
        </p>
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
            <span className="font-medium text-black">Your Score:</span>
            <span className="text-rose-600 font-bold text-lg">
              {score}/{questions.length}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
            <span className="font-medium text-black">Success Rate:</span>
            <span className="text-green-600 font-bold text-lg">
              {Math.round((score / questions.length) * 100)}%
            </span>
          </div>
        </div>
        <Button
          onClick={resetGame}
          className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
        >
          🎯 Try Again
        </Button>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="p-8 bg-gradient-to-br from-white to-rose-50/30 shadow-xl border border-rose-100">
      <div className="flex justify-between items-center mb-6">
        <Badge variant="secondary" className="bg-rose-100 text-rose-800">
          Question {currentQuestion + 1} of {questions.length}
        </Badge>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Score:</span>
          <Badge variant="default" className="bg-green-100 text-green-800">
            {score}/{questions.length}
          </Badge>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-6 text-gray-900">
        {question.question}
      </h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let buttonClass =
            "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";

          if (selectedAnswer === null) {
            buttonClass +=
              "border-gray-200 hover:border-rose-300 hover:bg-rose-50 bg-white text-black";
          } else if (selectedAnswer === index) {
            if (option.correct) {
              buttonClass += "border-green-500 bg-green-50 text-green-800";
            } else {
              buttonClass += "border-red-500 bg-red-50 text-red-800";
            }
          } else if (option.correct && selectedAnswer !== null) {
            buttonClass += "border-green-500 bg-green-50 text-green-800";
          } else {
            buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
          }

          return (
            <button
              key={index}
              onClick={() => selectedAnswer === null && handleAnswer(index)}
              className={buttonClass}
              disabled={selectedAnswer !== null}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium">{option.text}</span>
                {selectedAnswer !== null && option.correct && (
                  <span className="ml-auto text-green-600 text-xl">✓</span>
                )}
                {selectedAnswer === index && !option.correct && (
                  <span className="ml-auto text-red-600 text-xl">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 text-lg">💡</span>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Explanation:</h4>
              <p className="text-sm text-blue-800">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-rose-600 to-pink-600 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>
    </Card>
  );
};

const VideoTutorial = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const tutorials = [
    {
      id: 1,
      title: "How to Spot Fake Online Deals",
      duration: "3:45",
      description: "Learn to identify genuine vs fake shopping offers",
      thumbnail: "🛒",
      topic: "Shopping Safety",
    },
    {
      id: 2,
      title: "KYC Update Scam Prevention",
      duration: "2:30",
      description: "Understand how to handle KYC update requests safely",
      thumbnail: "🏦",
      topic: "Banking Security",
    },
    {
      id: 3,
      title: "Safe Bill Payment Methods",
      duration: "4:15",
      description: "Step-by-step guide to verify and pay bills securely",
      thumbnail: "💡",
      topic: "Bill Payments",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg border border-rose-100">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">📹</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Video Tutorial: {tutorials[currentVideo].title}
          </h3>
          <Badge variant="default" className="mb-4">
            {tutorials[currentVideo].topic}
          </Badge>
          <p className="text-gray-600 mb-4">
            {tutorials[currentVideo].description}
          </p>
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
            <span>⏱️ {tutorials[currentVideo].duration}</span>
            <span>•</span>
            <span>👁️ Hindi/English</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-inner border-2 border-dashed border-rose-200">
          <div className="text-center">
            <div className="text-4xl mb-3">
              {tutorials[currentVideo].thumbnail}
            </div>
            <p className="text-gray-600 mb-4">
              Video player would be embedded here
            </p>
            <Button className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700">
              ▶️ Play Tutorial
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {tutorials.map((tutorial, index) => (
          <Card
            key={tutorial.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              currentVideo === index
                ? "bg-rose-50 border-rose-200"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setCurrentVideo(index)}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{tutorial.thumbnail}</div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-900 mb-1">
                  {tutorial.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    ⏱️ {tutorial.duration}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {tutorial.topic}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const HomemakerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-pink-700 to-purple-800">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="w-fit bg-white/10 text-white border-white/20"
              >
                🏡 For Smart Homemakers
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Shop Safe, Stay Secure with{" "}
                <span className="text-yellow-300">CyberShield</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Protecting your family's finances with easy-to-understand
                cybersecurity guidance. Learn to spot scams, shop safely online,
                and keep your digital payments secure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className=" text-rose-600 hover:bg-gray-100 shadow-xl"
                >
                  🎥 Watch Tutorials
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 border-2"
                >
                  👥 Join Community
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">25K+</div>
                  <div className="text-sm text-white/80">
                    Families Protected
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">₹50L+</div>
                  <div className="text-sm text-white/80">Money Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-white/80">Trust Score</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🛡️</div>
                  <p className="text-lg font-medium">Safe Shopping Guide</p>
                  <p className="text-sm opacity-80">Simple & Trustworthy</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-xl">
                <span className="text-3xl">🏡</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <Tabs defaultValue="tutorials" className="space-y-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Choose Your Learning Method
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Easy-to-follow tutorials and practical tips designed for busy
              homemakers. Learn at your own pace!
            </p>
          </div>

          <TabsList className="grid w-full grid-cols-3 gap-4 p-2 bg-gray-100 rounded-lg">
            <TabsTrigger
              value="tutorials"
              className="flex items-center justify-center gap-2 py-3 px-6 w-full"
            >
              🎥 Video Tutorials
            </TabsTrigger>

            <TabsTrigger
              value="game"
              className="flex items-center justify-center gap-2 py-3 px-6 w-full"
            >
              🎯 Quick Quiz
            </TabsTrigger>

            <TabsTrigger
              value="threats"
              className="flex items-center justify-center gap-2 py-3 px-6 w-full"
            >
              🛡️ Know the Risks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tutorials" className="space-y-8">
            <VideoTutorial />
          </TabsContent>

          <TabsContent value="game" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <SafeShoppingGame />
            </div>
          </TabsContent>

          <TabsContent value="threats" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ThreatCard
                  title="E-commerce Scams"
                  description="Fake shopping deals and websites designed to steal your money and personal information"
                  examples={[
                    "90% off iPhone deals from unknown websites",
                    "Fake 'Mega Sale' offers via WhatsApp forwards",
                    "Clone websites of popular shopping apps",
                  ]}
                  type="shopping"
                  severity="high"
                />
                <ThreatCard
                  title="KYC Update Fraud"
                  description="Fake messages claiming your bank account will be blocked if you don't update KYC immediately"
                  examples={[
                    "SMS: 'Update KYC in 24 hours or account blocked'",
                    "Calls asking for Aadhaar and PAN details over phone",
                    "Fake bank emails with suspicious links",
                  ]}
                  type="banking"
                  severity="high"
                />
                <ThreatCard
                  title="Bill Payment Scams"
                  description="Urgent fake bill notifications to trick you into paying on fraudulent websites"
                  examples={[
                    "SMS: 'Electricity will be cut in 2 hours, pay now'",
                    "Fake gas subsidy update messages",
                    "Duplicate payment links for popular services",
                  ]}
                  type="bills"
                  severity="medium"
                />
              </div>
              <div>
                <SafetyTips />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default HomemakerPage;
