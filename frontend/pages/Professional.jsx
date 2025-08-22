import React, { useState } from 'react';

const Card = ({ children, className = "" }) => (
  <div className={`border border-gray-200 rounded-xl ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg",
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
    email: "📧",
    linkedin: "💼", 
    financial: "💰",
    corporate: "🏢"
  };

  const severityColors = {
    critical: "destructive",
    high: "default", 
    medium: "secondary"
  };

  const icon = iconMap[type];

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200/60 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-sm text-2xl">
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
          <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
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

const PhishingInfographic = () => {
  return (
    <Card className="p-8 bg-gradient-to-br from-white to-blue-50/30 shadow-xl border border-blue-100">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Anatomy of a Phishing Email</h3>
        <p className="text-gray-600">Learn to identify red flags in suspicious emails</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-300 p-6 mb-6">
        <div className="space-y-4">
          {/* Email Header */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">From:</span>
                  <span className="font-mono text-sm bg-red-100 px-2 py-1 rounded border-red-200 text-black">
                    ceo@your-company.net
                  </span>
                  <Badge variant="destructive" className="text-xs">🚩 FAKE DOMAIN</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Subject:</span>
                  <span className="font-semibold text-red-600">URGENT: Verify Your Account Now!</span>
                  <Badge variant="destructive" className="text-xs">🚩 URGENCY TACTICS</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              <span className="bg-yellow-100 px-1 rounded">Dear Employee,</span>
              <Badge variant="secondary" className="text-xs ml-2">🚩 GENERIC GREETING</Badge>
            </p>
            
            <p className="text-sm text-gray-700">
              Your account will be <span className="bg-red-100 px-1 rounded font-semibold">suspended in 24 hours</span> 
              unless you verify your credentials immediately.
              <Badge variant="destructive" className="text-xs ml-2">🚩 THREAT</Badge>
            </p>

            <div className="bg-blue-600 text-white px-4 py-2 rounded text-center cursor-pointer hover:bg-blue-700 transition-colors relative">
              <span className="font-medium">VERIFY ACCOUNT NOW</span>
              <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">🚩 SUSPICIOUS BUTTON</Badge>
            </div>

            <p className="text-xs text-gray-500">
              If you hover over the button, you'll see: 
              <span className="font-mono bg-red-100 px-1 rounded ml-1">http://fake-verification-site.com</span>
              <Badge variant="destructive" className="text-xs ml-2">🚩 MALICIOUS LINK</Badge>
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-lg text-red-600 mb-3 flex items-center gap-2">
            <span className="text-2xl">🚨</span>
            Red Flags to Watch For:
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold text-xs mt-1">•</span>
              <span className='text-black'>Generic greetings instead of your name</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold text-xs mt-1">•</span>
              <span className='text-black'>Urgent language creating false deadlines</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold text-xs mt-1">•</span>
              <span className='text-black'>Suspicious sender domains (look closely!)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold text-xs mt-1">•</span>
              <span className='text-black'>Threats of account suspension</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold text-xs mt-1">•</span>
              <span className='text-black'>Links that don't match the claimed destination</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg text-green-600 mb-3 flex items-center gap-2">
            <span className="text-2xl">✅</span>
            What to Do Instead:
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold text-xs mt-1">•</span>
              <span className='text-black'>Verify directly with your IT department</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold text-xs mt-1">•</span>
              <span className='text-black'>Check the sender's email address carefully</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold text-xs mt-1">•</span>
              <span className='text-black'>Hover over links before clicking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold text-xs mt-1">•</span>
              <span className='text-black'>Use official company portals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold text-xs mt-1">•</span>
              <span className='text-black'>Report suspicious emails to security</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

const ProfessionalChecklist = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const checklistItems = [
    {
      id: 1,
      item: "Verify sender's email address matches their actual domain",
      category: "Email Verification"
    },
    {
      id: 2,
      item: "Check if the email uses your actual name, not generic terms",
      category: "Personalization"
    },
    {
      id: 3,
      item: "Look for urgency tactics or threats of account suspension",
      category: "Content Analysis"
    },
    {
      id: 4,
      item: "Hover over links to see actual destination URLs",
      category: "Link Safety"
    },
    {
      id: 5,
      item: "Verify requests through official company channels",
      category: "Verification"
    },
    {
      id: 6,
      item: "Check for spelling/grammar errors in professional emails",
      category: "Quality Check"
    },
    {
      id: 7,
      item: "Be wary of unexpected attachments or downloads",
      category: "Attachment Safety"
    },
    {
      id: 8,
      item: "Report suspicious emails to your IT security team",
      category: "Reporting"
    }
  ];

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <Card className="p-6 bg-white shadow-lg rounded-xl border border-gray-200/60">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          <h3 className="font-semibold text-lg text-gray-900">Email Security Checklist</h3>
        </div>
        <Badge variant="default" className="bg-blue-100 text-blue-800">
          {completedCount}/{checklistItems.length} Complete
        </Badge>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round((completedCount / checklistItems.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid gap-3">
        {checklistItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              checkedItems[item.id] 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200'
            }`}
            onClick={() => toggleCheck(item.id)}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
              checkedItems[item.id] 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 hover:border-blue-400'
            }`}>
              {checkedItems[item.id] && <span className="text-xs">✓</span>}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium mb-1 transition-colors ${
                checkedItems[item.id] ? 'text-green-800 line-through' : 'text-gray-800'
              }`}>
                {item.item}
              </p>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                checkedItems[item.id] 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const CaseStudyCard = ({ title, scenario, loss, lesson, impact }) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-white to-orange-50/30 shadow-lg border border-orange-100">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-orange-100 text-2xl">⚠️</div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <Badge variant="destructive" className="mt-1">Real Case Study</Badge>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-gray-900 mb-2">What Happened:</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{scenario}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-3 rounded-lg border border-red-100">
            <h4 className="font-semibold text-sm text-red-800 mb-1">Financial Loss:</h4>
            <p className="text-sm text-red-700">{loss}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-sm text-blue-800 mb-1">Business Impact:</h4>
            <p className="text-sm text-blue-700">{impact}</p>
          </div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
          <h4 className="font-semibold text-sm text-green-800 mb-1">Key Lesson:</h4>
          <p className="text-sm text-green-700">{lesson}</p>
        </div>
      </div>
    </Card>
  );
};

const ProfessionalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit bg-white/10 text-white border-white/20">
                💼 Enterprise Security Training
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Protect Your Business with{" "}
                <span className="text-yellow-300">CyberShield Pro</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Essential cybersecurity training for busy professionals. Learn to identify advanced threats, 
                protect sensitive data, and safeguard your organization from sophisticated attacks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className=" text-blue-600 hover:bg-gray-100 shadow-xl">
                  📊 Start Assessment
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 border-2">
                  📈 View Analytics
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-sm text-white/80">Professionals Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">₹50M+</div>
                  <div className="text-sm text-white/80">Losses Prevented</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-white/80">Threat Detection</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🏢</div>
                  <p className="text-lg font-medium">Enterprise Security</p>
                  <p className="text-sm opacity-80">Professional & Trusted</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-xl">
                <span className="text-3xl">💼</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <Tabs defaultValue="infographic" className="space-y-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Professional Security Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Actionable insights and tools designed for time-conscious professionals who handle sensitive data.
            </p>
          </div>

          <TabsList className="grid w-full grid-cols-4 gap-4 p-2 bg-gray-100 rounded-lg">
            <TabsTrigger
              value="infographic"
              className="flex items-center justify-center gap-2 py-3 px-6 w-full"
            >
              📊 Email Analysis
            </TabsTrigger>

            <TabsTrigger
              value="threats"
              className="flex items-center justify-center gap-2 py-3 px-6 w-full"
            >
              🎯 Corporate Threats
            </TabsTrigger>

            <TabsTrigger
              value="checklist"
              className="flex items-center justify-center gap-2 py-3 px-6 w-full"
            >
              ✅ Security Checklist
            </TabsTrigger>

            <TabsTrigger
              value="cases"
              className="flex items-center justify-center gap-2 py-3 px-6 w-full"
            >
              📈 Case Studies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="infographic" className="space-y-8">
            <div className="max-w-5xl mx-auto">
              <PhishingInfographic />
            </div>
          </TabsContent>

          <TabsContent value="threats" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ThreatCard
                  title="Spear Phishing Attacks"
                  description="Highly targeted emails impersonating executives, IT, or trusted business partners"
                  examples={[
                    "CEO requesting urgent wire transfers",
                    "IT department asking for password resets",
                    "HR requesting personal information updates"
                  ]}
                  type="email"
                  severity="critical"
                />
                <ThreatCard
                  title="LinkedIn & Professional Scams"
                  description="Fake recruiters and business connections harvesting professional data"
                  examples={[
                    "Recruiters requesting sensitive company info",
                    "Investment opportunities from 'connections'",
                    "Fake business partnership proposals"
                  ]}
                  type="linkedin"
                  severity="high"
                />
                <ThreatCard
                  title="Financial & Tax Fraud"
                  description="Sophisticated scams targeting your financial information and business accounts"
                  examples={[
                    "Fake income tax refund notifications",
                    "Cryptocurrency investment schemes",
                    "Business loan pre-approval scams"
                  ]}
                  type="financial"
                  severity="high"
                />
              </div>
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border border-blue-100">
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">🏆</div>
                    <h3 className="font-semibold text-lg text-gray-900">Security Score</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Email Security</span>
                      <span className="text-green-600 font-bold">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Data Protection</span>
                      <span className="text-yellow-600 font-bold">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Access Control</span>
                      <span className="text-blue-600 font-bold">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    View Detailed Report
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="checklist" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <ProfessionalChecklist />
            </div>
          </TabsContent>

          <TabsContent value="cases" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <CaseStudyCard
                title="Senior Manager Falls for CEO Fraud"
                scenario="A finance manager received an urgent email from the 'CEO' requesting an immediate wire transfer of ₹25 lakhs for a confidential acquisition. The email looked authentic with correct signatures and formatting."
                loss="₹25,00,000 transferred"
                impact="3 days operations halt, client trust issues"
                lesson="Always verify high-value requests through multiple channels, never rely on email alone for financial transactions."
              />
              
              <CaseStudyCard
                title="HR Data Breach via Fake IT Support"
                scenario="An HR executive received a call from 'IT support' claiming to need access to employee databases for a security update. The caller had insider knowledge and seemed legitimate."
                loss="2,000+ employee records compromised"
                impact="GDPR fines, legal notices, reputation damage"
                lesson="IT support requests should always be verified through official ticketing systems, never through unsolicited calls."
              />

              <CaseStudyCard
                title="LinkedIn Investment Scam"
                scenario="A marketing director was approached by a 'connection' on LinkedIn offering exclusive crypto investment opportunities. The profile seemed legitimate with many mutual connections."
                loss="₹8,00,000 personal investment"
                impact="Personal financial distress affecting work"
                lesson="Professional networks are not investment platforms. Always research investment opportunities independently."
              />

              <CaseStudyCard
                title="Fake Vendor Invoice Fraud"
                scenario="Accounts payable received an invoice from a regular vendor with updated banking details. The email requested immediate payment due to 'banking issues' at their end."
                loss="₹12,00,000 paid to fraudulent account"
                impact="Delayed project deliveries, vendor disputes"
                lesson="Banking detail changes must be verified through official vendor communication channels, not email requests."
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default ProfessionalPage;