import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { WelcomeMessage } from './components/WelcomeMessage';
import { analyzeJobField } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const analysisData = urlParams.get('analysis');

    if (analysisData) {
      try {
        // Decode from base64 and then decode URI components to handle Unicode characters correctly.
        const decodedData = decodeURIComponent(escape(atob(analysisData)));
        const parsedResult: AnalysisResult = JSON.parse(decodedData);
        setAnalysisResult(parsedResult);
        setJobTitle(parsedResult.jobTitle);
        // Clean up the URL to avoid confusion on subsequent searches
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (err) {
        console.error("Failed to parse shared analysis data:", err);
        setError("The shared analysis link appears to be invalid or corrupted.");
        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const handleAnalysis = useCallback(async (title: string) => {
    if (!title) {
      setError('Please enter a job title or field.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setJobTitle(title);

    try {
      const result = await analyzeJobField(title);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError('Failed to get analysis. The AI may be busy, or an error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <SearchForm onAnalyze={handleAnalysis} isLoading={isLoading} />
          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorDisplay message={error} />}
            {analysisResult && <ResultsDisplay result={analysisResult} />}
            {!isLoading && !error && !analysisResult && <WelcomeMessage />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;