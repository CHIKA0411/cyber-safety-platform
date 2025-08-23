import React, { useState, useEffect, useRef } from 'react';

const CybersecurityChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am a cybersecurity chatbot. Ask me anything you want to know about cybersecurity topics.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;


  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isLoading]);


  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const callGeminiAPI = async (prompt) => {
    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    
    const maxRetries = 5;
    let currentRetry = 0;
    
    while (currentRetry < maxRetries) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          if (result.candidates && result.candidates.length > 0 &&
              result.candidates[0].content && result.candidates[0].content.parts &&
              result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
          } else {
            throw new Error('Unexpected API response structure.');
          }
        } else {
          const errorData = await response.json();
          if (response.status === 429) {
            const delay = Math.pow(2, currentRetry) * 1000;
            console.log(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            currentRetry++;
          } else {
            throw new Error(`API returned status code ${response.status}: ${JSON.stringify(errorData)}`);
          }
        }
      } catch (error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          const delay = Math.pow(2, currentRetry) * 1000;
          console.log(`Network error. Retrying in ${delay / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          currentRetry++;
        } else {
          throw error;
        }
      }
    }
    throw new Error('Max retries exceeded.');
  };


  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await callGeminiAPI(userMessage.text);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Oops! Something went wrong. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-100"></div>
      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200"></div>
    </div>
  );


  const formatMessage = (text) => {
 
    const boldText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    const italicText = boldText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    const formattedText = italicText.replace(/\n/g, '<br>');
    
    return { __html: formattedText };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4 font-sans">
      <div className="flex flex-col justify-end w-full max-w-4xl min-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200">
        
        <div className="p-6 border-b border-indigo-200 bg-gradient-to-r from-indigo-600 to-blue-700 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CyberShield Assistant</h1>
              <p className="text-indigo-100 text-sm">Your AI cybersecurity companion</p>
            </div>
          </div>
        </div>


        <div 
          ref={chatHistoryRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white"
          style={{ minHeight: '400px', maxHeight: '60vh' }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-5 py-3 rounded-2xl break-words shadow-md ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                }`}
              >
                <div 
                  dangerouslySetInnerHTML={formatMessage(message.text)}
                  className={`prose prose-sm max-w-none ${
                    message.sender === 'user' ? 'prose-invert' : 'prose-gray'
                  }`}
                />
              </div>
            </div>
          ))}
          

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-5 py-3 rounded-2xl rounded-bl-sm bg-white text-gray-800 border border-gray-200 shadow-md">
                <LoadingDots />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-white rounded-b-2xl border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about cybersecurity..."
              disabled={isLoading}
              className="flex-1 p-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-100"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <LoadingDots />
                </div>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CybersecurityChatbot;