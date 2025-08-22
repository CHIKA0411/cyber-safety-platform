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
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg"
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
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200"
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

const ReportModal = ({ isOpen, onClose, indicator, onSubmit }) => {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [proofUrl, setProofUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({
      indicator,
      type: reportType,
      description,
      proofUrl
    });
    onClose();
    setReportType('');
    setDescription('');
    setProofUrl('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Report Indicator</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Reporting:</span>
          <div className="font-mono text-sm text-gray-900 break-all mt-1">{indicator}</div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type *
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select type...</option>
              <option value="scam">Scam</option>
              <option value="spam">Spam</option>
              <option value="harassment">Harassment</option>
              <option value="phishing">Phishing</option>
              <option value="malware">Malware</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              placeholder="Additional details about this threat..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proof URL (Optional)
            </label>
            <input
              type="url"
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://screenshot.com/proof"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSubmit} className="flex-1" disabled={!reportType}>
              🚨 Submit Report
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReputationCard = ({ indicator, reputation, onReport }) => {
  const getReputationBadge = (score) => {
    if (score >= 80) return { variant: "success", text: "Trusted", icon: "✅" };
    if (score >= 50) return { variant: "warning", text: "Caution", icon: "⚠️" };
    if (score >= 20) return { variant: "destructive", text: "Suspicious", icon: "⚠️" };
    return { variant: "destructive", text: "Dangerous", icon: "🚨" };
  };

  const badge = getReputationBadge(reputation.score);

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200/60">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{badge.icon}</span>
            <Badge variant={badge.variant}>
              {badge.text} ({reputation.score}/100)
            </Badge>
          </div>
          <div className="font-mono text-sm text-gray-900 break-all bg-gray-100 p-2 rounded">
            {indicator}
          </div>
        </div>
        <Button 
          size="sm" 
          variant="destructive" 
          onClick={() => onReport(indicator)}
          className="ml-4"
        >
          🚨 Report
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-xl font-bold text-gray-900">{reputation.total_reports}</div>
          <div className="text-xs text-gray-600">Total Reports</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-xl font-bold text-gray-900">{reputation.unique_reporters}</div>
          <div className="text-xs text-gray-600">Reporters</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-gray-900">Recent Reports:</h4>
        <div className="space-y-1">
          {reputation.report_types.map((report, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-700 capitalize">{report.type}</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {report.count}
                </Badge>
                <span className="text-gray-500 text-xs">
                  {new Date(report.last_seen).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const TrendingThreats = () => {
  const threats = [
    {
      indicator: "free-netflix-trial.scam.com",
      score: 5,
      reports: 1247,
      trend: "up"
    },
    {
      indicator: "whatsapp-premium-offer.net",
      score: 12,
      reports: 892,
      trend: "up"
    },
    {
      indicator: "crypto-investment-guru.biz",
      score: 8,
      reports: 756,
      trend: "down"
    },
    {
      indicator: "+91-9876543210",
      score: 3,
      reports: 634,
      trend: "up"
    }
  ];

  return (
    <Card className="p-6 bg-white shadow-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📈</span>
        <h3 className="font-semibold text-lg text-gray-900">Trending Threats</h3>
      </div>

      <div className="space-y-4">
        {threats.map((threat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100"
          >
            <div className="flex-1">
              <div className="font-mono text-sm text-gray-900 mb-1 break-all">
                {threat.indicator}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">
                  Risk: {threat.score}/100
                </Badge>
                <span className="text-xs text-gray-600">
                  {threat.reports} reports
                </span>
              </div>
            </div>
            <div className="ml-4 text-center">
              <div className={`text-lg ${threat.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                {threat.trend === 'up' ? '📈' : '📉'}
              </div>
              <div className="text-xs text-gray-600 capitalize">{threat.trend}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const CommunityStats = () => {
  const stats = [
    { label: "Reports This Week", value: "2,847", icon: "📊", change: "+12%" },
    { label: "Active Contributors", value: "15,230", icon: "👥", change: "+8%" },
    { label: "Threats Identified", value: "45,672", icon: "🎯", change: "+15%" },
    { label: "Community Score", value: "94.2%", icon: "⭐", change: "+2%" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 bg-gradient-to-br from-white to-indigo-50/30 shadow-md border border-indigo-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <Badge variant="success" className="text-xs">
              {stat.change}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </Card>
      ))}
    </div>
  );
};

const CommunityReputationPage = () => {
  const [reportModal, setReportModal] = useState({ isOpen: false, indicator: '' });
  
  // Mock data for demonstration
  const sampleReputations = [
    {
      indicator: "suspicious-bank-alert.com",
      score: 15,
      total_reports: 234,
      unique_reporters: 89,
      report_types: [
        { type: "phishing", count: 156, last_seen: "2025-08-22T10:30:00Z" },
        { type: "scam", count: 78, last_seen: "2025-08-21T15:45:00Z" }
      ]
    },
    {
      indicator: "+91-8765432109",
      score: 8,
      total_reports: 187,
      unique_reporters: 92,
      report_types: [
        { type: "spam", count: 124, last_seen: "2025-08-23T09:15:00Z" },
        { type: "harassment", count: 63, last_seen: "2025-08-22T14:20:00Z" }
      ]
    },
    {
      indicator: "crypto-doubler-pro.net",
      score: 3,
      total_reports: 456,
      unique_reporters: 178,
      report_types: [
        { type: "scam", count: 289, last_seen: "2025-08-23T11:00:00Z" },
        { type: "phishing", count: 167, last_seen: "2025-08-22T16:30:00Z" }
      ]
    }
  ];

  const handleReport = (indicator) => {
    setReportModal({ isOpen: true, indicator });
  };

  const handleReportSubmit = (reportData) => {
    console.log('Report submitted:', reportData);
    // In real implementation, this would call the API
    alert(`Report submitted for ${reportData.indicator}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🛡️</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Community Reputation Center
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Powered by community reports, our reputation system helps identify and track online threats. 
            One tap to report, collective intelligence to protect everyone.
          </p>
        </div>

        <CommunityStats />

        <Tabs defaultValue="search" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 gap-4 p-2 bg-gray-100 rounded-lg">
            <TabsTrigger value="search" className="flex items-center justify-center gap-2 py-3 px-6 w-full">
              🔍 Search Reputation
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center justify-center gap-2 py-3 px-6 w-full">
              ⏰ Recent Reports
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center justify-center gap-2 py-3 px-6 w-full">
              📈 Trending Threats
            </TabsTrigger>
            <TabsTrigger value="contribute" className="flex items-center justify-center gap-2 py-3 px-6 w-full">
              🤝 Contribute
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-8">
            <Card className="p-6 bg-white shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Check Indicator Reputation</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter URL, phone number, email, or IP address..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Button className="px-8">
                  🔍 Check
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Search our database of community-reported threats and reputation scores.
              </p>
            </Card>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sampleReputations.map((reputation, index) => (
                <ReputationCard
                  key={index}
                  indicator={reputation.indicator}
                  reputation={reputation}
                  onReport={handleReport}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Latest Community Reports</h3>
                {sampleReputations.map((reputation, index) => (
                  <Card key={index} className="p-4 bg-white shadow-md border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-mono text-sm text-gray-900 break-all mb-2">
                          {reputation.indicator}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="destructive">
                            {reputation.report_types[0].type}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {reputation.total_reports} reports from {reputation.unique_reporters} users
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Last reported: {new Date(reputation.report_types[0].last_seen).toLocaleString()}
                        </div>
                      </div>
                      <Button size="sm" variant="destructive" onClick={() => handleReport(reputation.indicator)}>
                        🚨 Report
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <div>
                <TrendingThreats />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <TrendingThreats />
              <Card className="p-6 bg-white shadow-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl">🎯</span>
                  <h3 className="font-semibold text-lg text-gray-900">Threat Categories</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { type: "Phishing", count: 1847, percentage: 35 },
                    { type: "Scam", count: 1456, percentage: 28 },
                    { type: "Spam", count: 892, percentage: 17 },
                    { type: "Malware", count: 634, percentage: 12 },
                    { type: "Harassment", count: 423, percentage: 8 }
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{category.type}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-16 text-right">
                          {category.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contribute" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-xl border border-indigo-100">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤝</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Join Our Community</h3>
                  <p className="text-gray-600 mb-6">
                    Help protect millions by reporting threats you encounter. Every report makes the internet safer.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-sm text-gray-700">One-click reporting from any scan result</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-sm text-gray-700">Build community reputation scores</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-sm text-gray-700">Earn contributor badges and recognition</span>
                    </div>
                  </div>
                  <Button className="mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg">
                    🚀 Start Contributing
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl">📊</span>
                  <h3 className="font-semibold text-lg text-gray-900">Your Impact</h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600 mb-1">47</div>
                    <div className="text-sm text-green-700">Reports Submitted</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600 mb-1">12,890</div>
                    <div className="text-sm text-blue-700">People Protected</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-3xl font-bold text-purple-600 mb-1">Gold</div>
                    <div className="text-sm text-purple-700">Contributor Level</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-600">🏆</span>
                    <span className="font-semibold text-yellow-800">Achievement Unlocked!</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Threat Hunter - You've identified 25+ unique threats
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <ReportModal
          isOpen={reportModal.isOpen}
          onClose={() => setReportModal({ isOpen: false, indicator: '' })}
          indicator={reportModal.indicator}
          onSubmit={handleReportSubmit}
        />
      </div>
    </div>
  );
};

export default CommunityReputationPage;