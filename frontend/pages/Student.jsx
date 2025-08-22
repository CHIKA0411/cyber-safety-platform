import React, { useState } from 'react';


const Card = ({ children, className = "" }) => (
  <div className={`border border-gray-200 rounded-xl ${className}`}>
    {children}
  </div>
);


const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md hover:shadow-lg",
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
    default: "bg-blue-100 text-blue-800 border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border-gray-200"
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


const ThreatCard = ({ title, description, examples, type, severity }) => {
  const iconMap = {
    social: "📱",
    job: "💼", 
    gaming: "🎮",
    general: "🛡️"
  };

  const severityColors = {
    high: "destructive",
    medium: "default", 
    low: "secondary"
  };

  const icon = iconMap[type];

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200/60 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 shadow-sm text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 leading-tight">{title}</h3>
            <Badge variant={severityColors[severity]} className="mt-2">
              {severity.charAt(0).toUpperCase() + severity.slice(1)} Risk
            </Badge>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-5 text-sm leading-relaxed">{description}</p>
      
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></span>
          Common Examples:
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


const QuickTips = () => {
  const tips = [
    {
      id: 1,
      tip: "Always check the URL before entering personal info",
      category: "Website Safety"
    },
    {
      id: 2,
      tip: "If it sounds too good to be true, it probably is",
      category: "Job Scams"
    },
    {
      id: 3,
      tip: "Never give personal details in DMs from strangers",
      category: "Social Media"
    },
    {
      id: 4,
      tip: "Use official app stores for downloads only",
      category: "App Safety"
    },
    {
      id: 5,
      tip: "Enable 2FA on all your accounts",
      category: "Account Security"
    },
    {
      id: 6,
      tip: "Don't click suspicious links, even from friends",
      category: "Phishing"
    }
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200/60">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💡</span>
        <h3 className="font-semibold text-lg text-gray-900">Quick Safety Tips</h3>
      </div>

      <div className="grid gap-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-100/50 hover:shadow-md transition-all duration-200"
          >
            <span className="text-green-500 text-lg mt-0.5 font-bold">✓</span>
            <div className="flex-1">
              <p className="text-sm font-medium mb-1 text-gray-800">{tip.tip}</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700 font-medium">
                {tip.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SpotTheFakeGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Which email looks suspicious?",
      options: [
        { text: "support@netflix.com - Your account will be suspended", correct: false },
        { text: "noreply@netfl1x-security.com - Verify your account now!", correct: true },
        { text: "billing@netflix.com - Payment receipt for your subscription", correct: false }
      ],
      explanation: "The second email has a suspicious domain (netfl1x instead of netflix) and uses urgency tactics typical of phishing."
    },
    {
      id: 2,
      question: "Which job offer is likely a scam?",
      options: [
        { text: "Software Engineer at Google - Apply through careers.google.com", correct: false },
        { text: "Data Entry - Earn ₹5000/day working from home - No experience needed!", correct: true },
        { text: "Marketing Intern at local startup - Unpaid but good experience", correct: false }
      ],
      explanation: "Unrealistic pay for simple work and 'no experience needed' for high-paying jobs are red flags."
    },
    {
      id: 3,
      question: "Which website URL is safe for online banking?",
      options: [
        { text: "https://www.hdfc-bank-online.net", correct: false },
        { text: "https://www.hdfcbank.com", correct: true },
        { text: "http://hdfcbank-secure.com", correct: false }
      ],
      explanation: "Official bank websites use HTTPS and the exact bank name. Avoid sites with extra words or HTTP."
    }
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
      <Card className="p-8 text-center bg-gradient-to-br from-indigo-50 to-blue-50 shadow-xl border border-indigo-100">
        <div className="text-6xl mb-4">
          {score >= 2 ? '🎉' : score === 1 ? '🙂' : '😅'}
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-900">
          {score >= 2 ? 'Great Job!' : score === 1 ? 'Good Try!' : 'Keep Learning!'}
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          You got {score} out of {questions.length} questions correct!
        </p>
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
            <span className="font-medium text-black">Your Score:</span>
            <span className="text-indigo-600 font-bold text-lg">{score}/{questions.length}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
            <span className="font-medium text-black">Success Rate:</span>
            <span className="text-green-600 font-bold text-lg">{Math.round((score/questions.length) * 100)}%</span>
          </div>
        </div>
        <Button onClick={resetGame} className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
          🎯 Try Again
        </Button>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  
  return (
    <Card className="p-8 bg-gradient-to-br from-white to-indigo-50/30 shadow-xl border border-indigo-100">
      <div className="flex justify-between items-center mb-6">
        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
          Question {currentQuestion + 1} of {questions.length}
        </Badge>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Score:</span>
          <Badge variant="default" className="bg-green-100 text-green-800">
            {score}/{questions.length}
          </Badge>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-6 text-gray-900">{question.question}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
          
          if (selectedAnswer === null) {
            buttonClass += "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 bg-white text-black";
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
          className="bg-gradient-to-r from-indigo-600 to-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
    </Card>
  );
};



const StudentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit bg-white/10 text-white border-white/20">
                🎓 For Students, By Students
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Stay Safe Online with{" "}
                <span className="text-yellow-300">CyberShield</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Interactive cybersecurity training designed for tech-savvy students. Learn to spot scams, 
                avoid phishing attacks, and protect yourself from online threats through fun, engaging games.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className=" text-indigo-600 hover:bg-gray-100 shadow-xl">
                  🎯 Start Challenge
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 border-2">
                  👥 Join Community
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-sm text-white/80">Students Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1M+</div>
                  <div className="text-sm text-white/80">Scams Identified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-sm text-white/80">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🛡️</div>
                  <p className="text-lg font-medium">Cybersecurity Learning</p>
                  <p className="text-sm opacity-80">Interactive & Engaging</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-xl">
                <span className="text-3xl">🛡️</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <Tabs defaultValue="game" className="space-y-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Choose Your Learning Path</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Interactive challenges designed for your busy student life. Quick, effective, and actually fun!
            </p>
          </div>

            <TabsList className="grid w-full grid-cols-3 gap-4 p-2 bg-gray-100 rounded-lg">
                <TabsTrigger
                    value="game"
                    className="flex items-center justify-center gap-2 py-3 px-6 w-full"
                >
                    🎯 Spot the Fake
                </TabsTrigger>

                <TabsTrigger
                    value="threats"
                    className="flex items-center justify-center gap-2 py-3 px-6 w-full"
                >
                    🛡️ Know Your Threats
                </TabsTrigger>

                <TabsTrigger
                    value="leaderboard"
                    className="flex items-center justify-center gap-2 py-3 px-6 w-full"
                >
                    🏆 Leaderboard
                </TabsTrigger>
            </TabsList>

          <TabsContent value="game" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <SpotTheFakeGame />
            </div>
          </TabsContent>

          <TabsContent value="threats" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ThreatCard
                  title="Social Media Phishing"
                  description="Fake login pages and suspicious DMs targeting your social accounts"
                  examples={[
                    "Fake Instagram login pages with misspelled URLs",
                    "Messages claiming your account will be deleted",
                    "Suspicious friend requests from fake profiles"
                  ]}
                  type="social"
                  severity="high"
                />
                <ThreatCard
                  title="Job & Internship Scams"
                  description="Too-good-to-be-true job offers designed to steal your money or data"
                  examples={[
                    "Earn ₹2000 daily by liking YouTube videos",
                    "Pay registration fees for guaranteed jobs",
                    "Internships requiring upfront payments"
                  ]}
                  type="job"
                  severity="high"
                />
                <ThreatCard
                  title="Gaming & App Fraud"
                  description="Malicious apps and in-game purchase scams targeting gamers"
                  examples={[
                    "Free game credits from unknown sources",
                    "Modded APKs with hidden malware",
                    "Fake gaming tournaments with entry fees"
                  ]}
                  type="gaming"
                  severity="medium"
                />
              </div>
              <div>
                <QuickTips />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-8">
            <Card className="p-8 text-center bg-gradient-to-br from-white to-indigo-50/50 shadow-xl border border-indigo-100">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Leaderboard Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                Compete with fellow students, earn badges, and climb the cybersecurity champion ranks!
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">🥇</Badge>
                    <span className="font-medium text-gray-900">CyberNinja_2024</span>
                  </div>
                  <span className="text-indigo-600 font-bold">2,450 pts</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800">🥈</Badge>
                    <span className="font-medium text-gray-900">ScamSlayer_Pro</span>
                  </div>
                  <span className="text-indigo-600 font-bold">2,380 pts</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">🥉</Badge>
                    <span className="font-medium text-gray-900">PhishFighter</span>
                  </div>
                  <span className="text-indigo-600 font-bold">2,120 pts</span>
                </div>
              </div>
              <Button className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
                ⚡ Join Competition
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default StudentPage;