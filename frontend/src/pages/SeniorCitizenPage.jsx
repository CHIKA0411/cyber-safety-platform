import React, { useState, useRef, useEffect } from "react";

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
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md hover:shadow-lg",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl",
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
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
    warning: "bg-orange-100 text-orange-800 border-orange-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variantStyles[variant]} ${className}`}
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
    className={`inline-flex h-14 items-center justify-center rounded-lg bg-gray-100 p-1 ${className}`}
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
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
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

// Text-to-Speech Component
const TextToSpeech = ({ text, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported("speechSynthesis" in window);
  }, []);

  const speak = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  return (
    <Button
      onClick={speak}
      variant="secondary"
      size="default"
      className={`${className} bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300`}
    >
      {isPlaying ? "⏸️ Stop Reading" : "🔊 Listen to this"}
    </Button>
  );
};

const FontSizeToggle = ({ fontSize, setFontSize }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-600 font-medium">Text Size:</span>
    <div className="flex gap-1 border border-gray-300 rounded-lg p-1">
      <button
        onClick={() => setFontSize("normal")}
        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
          fontSize === "normal"
            ? "bg-green-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Normal
      </button>
      <button
        onClick={() => setFontSize("large")}
        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
          fontSize === "large"
            ? "bg-green-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Large
      </button>
      <button
        onClick={() => setFontSize("xl")}
        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
          fontSize === "xl"
            ? "bg-green-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Extra Large
      </button>
    </div>
  </div>
);

const ThreatCard = ({
  title,
  description,
  examples,
  type,
  severity,
  fontSize,
}) => {
  const iconMap = {
    phone: "📞",
    bank: "🏦",
    remote: "💻",
    general: "🛡️",
  };

  const severityColors = {
    high: "destructive",
    medium: "warning",
    low: "secondary",
  };

  const icon = iconMap[type];
  const textSizeClass =
    fontSize === "xl"
      ? "text-xl"
      : fontSize === "large"
      ? "text-lg"
      : "text-base";
  const headingSize =
    fontSize === "xl"
      ? "text-3xl"
      : fontSize === "large"
      ? "text-2xl"
      : "text-xl";

  const cardText = `${title}. ${description}. Common examples include: ${examples.join(
    ". "
  )}.`;

  return (
    <Card className="p-8 bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200/60">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 shadow-sm text-4xl">
            {icon}
          </div>
          <div>
            <h3
              className={`font-bold ${headingSize} text-gray-900 leading-tight mb-3`}
            >
              {title}
            </h3>
            <Badge
              variant={severityColors[severity]}
              className="text-base px-4 py-2"
            >
              {severity === "high"
                ? "High Risk ⚠️"
                : severity === "medium"
                ? "Medium Risk ⚠️"
                : "Low Risk ✅"}
            </Badge>
          </div>
        </div>
        <TextToSpeech text={cardText} />
      </div>

      <p
        className={`text-gray-700 mb-6 ${textSizeClass} leading-relaxed font-medium`}
      >
        {description}
      </p>

      <div className="space-y-4">
        <h4
          className={`font-semibold ${textSizeClass} text-gray-900 flex items-center gap-3`}
        >
          <span className="w-2 h-6 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></span>
          सामान्य उदाहरण / Common Examples:
        </h4>
        <ul className="space-y-3 ml-4">
          {examples.map((example, index) => (
            <li
              key={index}
              className={`${textSizeClass} text-gray-800 flex items-start gap-4 group`}
            >
              <span className="text-red-500 text-lg mt-1 font-bold group-hover:text-red-600 transition-colors">
                •
              </span>
              <span className="leading-relaxed group-hover:text-gray-900 transition-colors font-medium">
                {example}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

const SafetyGuide = ({ fontSize }) => {
  const textSizeClass =
    fontSize === "xl"
      ? "text-xl"
      : fontSize === "large"
      ? "text-lg"
      : "text-base";
  const headingSize =
    fontSize === "xl"
      ? "text-2xl"
      : fontSize === "large"
      ? "text-xl"
      : "text-lg";

  const guidelines = [
    {
      id: 1,
      title: "Never Share OTP",
      subtitle: "OTP कभी न बताएं",
      description:
        "Banks will never ask for your OTP over phone. If someone calls asking for OTP, immediately hang up.",
      category: "Phone Safety",
    },
    {
      id: 2,
      title: "Verify Before Installing Apps",
      subtitle: "Apps इंस्टॉल करने से पहले सत्यापित करें",
      description:
        "Never install apps like AnyDesk or TeamViewer if someone on phone asks you to. These give them control of your phone.",
      category: "App Safety",
    },
    {
      id: 3,
      title: "Keep Bank Details Private",
      subtitle: "बैंक की जानकारी गुप्त रखें",
      description:
        "Never share your account number, debit card number, or PIN with anyone over phone or WhatsApp.",
      category: "Banking",
    },
    {
      id: 4,
      title: "Ask Family First",
      subtitle: "पहले परिवार से पूछें",
      description:
        "If someone claims emergency or urgent money need, always verify with family members first.",
      category: "Emergency Calls",
    },
    {
      id: 5,
      title: "Hang Up and Call Back",
      subtitle: "फोन काटें और वापस कॉल करें",
      description:
        "If someone claims to be from bank, hang up and call the bank directly using the number on your passbook.",
      category: "Verification",
    },
    {
      id: 6,
      title: "Don't Trust Caller ID",
      subtitle: "कॉलर ID पर भरोसा न करें",
      description:
        "Scammers can fake caller ID to show bank names. Always verify independently.",
      category: "Phone Safety",
    },
  ];

  const guideText = guidelines
    .map((g) => `${g.title}. ${g.description}`)
    .join(" ");

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl border border-gray-200/60">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🛡️</span>
          <h3 className={`font-semibold ${headingSize} text-gray-900`}>
            सुरक्षा गाइड / Safety Guide
          </h3>
        </div>
        <TextToSpeech text={guideText} />
      </div>

      <div className="grid gap-4">
        {guidelines.map((guide) => (
          <div
            key={guide.id}
            className="flex items-start gap-4 p-6 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 hover:shadow-md transition-all duration-200"
          >
            <span className="text-green-600 text-2xl mt-1 font-bold">✓</span>
            <div className="flex-1">
              <h4 className={`${textSizeClass} font-bold mb-1 text-gray-900`}>
                {guide.title}
              </h4>
              <p
                className={`text-gray-600 font-medium mb-2`}
                style={{
                  fontSize:
                    fontSize === "xl"
                      ? "18px"
                      : fontSize === "large"
                      ? "16px"
                      : "14px",
                }}
              >
                {guide.subtitle}
              </p>
              <p
                className={`${textSizeClass} font-medium mb-3 text-gray-800 leading-relaxed`}
              >
                {guide.description}
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full bg-green-200 text-green-800 font-medium`}
                style={{
                  fontSize:
                    fontSize === "xl"
                      ? "16px"
                      : fontSize === "large"
                      ? "14px"
                      : "12px",
                }}
              >
                {guide.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 text-2xl">📋</span>
          <div>
            <h4 className={`font-bold ${textSizeClass} text-blue-900 mb-2`}>
              Print This Guide
            </h4>
            <p className={`${textSizeClass} text-blue-800 mb-4`}>
              Keep this guide near your phone for quick reference
            </p>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="border-blue-300 text-blue-800 hover:bg-blue-100"
            >
              🖨️ Print Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmergencyContacts = ({ fontSize }) => {
  const textSizeClass =
    fontSize === "xl"
      ? "text-xl"
      : fontSize === "large"
      ? "text-lg"
      : "text-base";
  const headingSize =
    fontSize === "xl"
      ? "text-2xl"
      : fontSize === "large"
      ? "text-xl"
      : "text-lg";

  const contacts = [
    {
      name: "Cyber Crime Helpline",
      number: "1930",
      description: "Report online fraud",
    },
    {
      name: "Police Helpline",
      number: "100",
      description: "Emergency police help",
    },
    { name: "Banking Fraud", number: "1930", description: "Report bank fraud" },
    {
      name: "Consumer Helpline",
      number: "1915",
      description: "Consumer complaints",
    },
  ];

  return (
    <Card className="p-8 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg border border-red-200">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">🚨</span>
        <h3 className={`font-semibold ${headingSize} text-red-900`}>
          Emergency Numbers
        </h3>
      </div>

      <div className="grid gap-4">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-red-100"
          >
            <div>
              <div className={`font-bold ${textSizeClass} text-gray-900`}>
                {contact.name}
              </div>
              <div
                className="text-gray-600"
                style={{
                  fontSize:
                    fontSize === "xl"
                      ? "18px"
                      : fontSize === "large"
                      ? "16px"
                      : "14px",
                }}
              >
                {contact.description}
              </div>
            </div>
            <div className={`font-bold text-2xl text-red-600`}>
              {contact.number}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const SeniorCitizenPage = () => {
  const [fontSize, setFontSize] = useState("normal");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-blue-700 to-teal-800">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge
                variant="secondary"
                className="w-fit bg-white/10 text-white border-white/20 text-lg px-4 py-2"
              >
                👴👵 For Senior Citizens
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Stay Safe from{" "}
                <span className="text-yellow-300">Phone Scams</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Simple, clear guidance to protect yourself from phone frauds,
                fake bank calls, and online scams. Available in multiple
                languages with audio support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className=" text-green-600 hover:bg-gray-100 shadow-xl text-xl px-8 py-4"
                >
                  🛡️ Start Learning
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 border-2 text-xl px-8 py-4"
                >
                  🔊 Audio Guide
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">25K+</div>
                  <div className="text-lg text-white/80">Seniors Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">500K+</div>
                  <div className="text-lg text-white/80">Scams Prevented</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-lg text-white/80">Support Available</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📞</div>
                  <p className="text-2xl font-medium">Phone Safety</p>
                  <p className="text-lg opacity-80">Simple & Clear</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-xl">
                <span className="text-4xl">🛡️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6 flex justify-center">
          <FontSizeToggle fontSize={fontSize} setFontSize={setFontSize} />
        </div>

        <Tabs defaultValue="guide" className="space-y-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-4xl font-bold text-gray-900">
              Choose What You Need
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
              Everything you need to stay safe, presented in simple and clear
              language
            </p>
          </div>

          <TabsList className="grid w-full grid-cols-3 gap-4 p-2 bg-gray-100 rounded-lg">
            <TabsTrigger
              value="guide"
              className="flex items-center justify-center gap-3 py-4 px-6 w-full text-lg"
            >
              🛡️ Safety Guide
            </TabsTrigger>

            <TabsTrigger
              value="threats"
              className="flex items-center justify-center gap-3 py-4 px-6 w-full text-lg"
            >
              ⚠️ Common Scams
            </TabsTrigger>

            <TabsTrigger
              value="emergency"
              className="flex items-center justify-center gap-3 py-4 px-6 w-full text-lg"
            >
              🚨 Emergency Help
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-8">
            <div className="max-w-5xl mx-auto">
              <SafetyGuide fontSize={fontSize} />
            </div>
          </TabsContent>

          <TabsContent value="threats" className="space-y-8">
            <div className="max-w-5xl mx-auto space-y-8">
              <ThreatCard
                title="Fake Bank Calls (नकली बैंक कॉल)"
                description="Fraudsters call pretending to be from your bank, asking for OTP, card details, or asking you to install apps"
                examples={[
                  '"Sir, your ATM card is blocked, please share the OTP we sent"',
                  '"Ma\'am, update your KYC by installing this app and sharing screen"',
                  '"Your account will be closed, verify details immediately"',
                ]}
                type="bank"
                severity="high"
                fontSize={fontSize}
              />
              <ThreatCard
                title="Phone/Voice Scams (फ़ोन धोखाधड़ी)"
                description="Fake calls claiming emergency, lottery wins, or threats to create panic and steal money"
                examples={[
                  '"Your son/daughter is in trouble, send money immediately"',
                  '"Congratulations! You won ₹25 lakhs, pay tax to claim"',
                  '"Police case against you, pay fine to avoid arrest"',
                ]}
                type="phone"
                severity="high"
                fontSize={fontSize}
              />
              <ThreatCard
                title="Remote Access Scams (रिमोट एक्सेस धोखाधड़ी)"
                description="Scammers ask you to install apps like AnyDesk or TeamViewer to control your phone and steal money"
                examples={[
                  '"Install this app to update your pension status"',
                  '"Technical support: install TeamViewer for bank security update"',
                  '"Government benefit: share screen to complete registration"',
                ]}
                type="remote"
                severity="high"
                fontSize={fontSize}
              />
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <EmergencyContacts fontSize={fontSize} />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default SeniorCitizenPage;
