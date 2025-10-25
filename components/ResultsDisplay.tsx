import React, { useState, useCallback } from 'react';
import type { AnalysisResult, Course, ApiResource, Community } from '../types';
import { ResultSection } from './ResultSection';
import { BriefcaseIcon, HistoryIcon, LightBulbIcon, BookOpenIcon, CodeBracketIcon, UsersIcon, ExternalLinkIcon, ShareIcon } from './icons';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleShare = useCallback(() => {
    if (!result) return;
    try {
      const jsonString = JSON.stringify(result);
      // To handle potential Unicode characters in the analysis, we first URI-encode the string,
      // then encode it to base64. This makes the link more robust.
      const encodedData = btoa(unescape(encodeURIComponent(jsonString)));
      const shareUrl = `${window.location.origin}${window.location.pathname}?analysis=${encodedData}`;

      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopyStatus('copied');
        setTimeout(() => {
          setCopyStatus('idle');
        }, 2500);
      }).catch(err => {
        console.error("Could not copy text: ", err);
      });
    } catch (error) {
      console.error("Failed to create share link:", error);
    }
  }, [result]);


  return (
    <div className="space-y-8 animate-fade-in">
       <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <h2 className="text-3xl font-bold text-center text-gray-200 sm:text-left">
          Analysis for: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{result.jobTitle}</span>
        </h2>
        <button
          onClick={handleShare}
          disabled={copyStatus === 'copied'}
          className="flex items-center shrink-0 gap-2 px-4 py-2 font-semibold text-sm bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200 disabled:bg-green-700 disabled:cursor-default"
        >
          <ShareIcon className="w-4 h-4" />
          {copyStatus === 'idle' ? 'Share Results' : 'Link Copied!'}
        </button>
      </div>


      <ResultSection title="AI Impact on Your Field" icon={<BriefcaseIcon />}>
        <p className="text-gray-300 leading-relaxed">{result.aiImpact}</p>
      </ResultSection>

      <ResultSection title="Evolution of Your Skills" icon={<HistoryIcon />}>
        <p className="text-gray-300 leading-relaxed">{result.skillHistory}</p>
      </ResultSection>

      <ResultSection title="Current AI Developments & Tools" icon={<LightBulbIcon />}>
        <p className="text-gray-300 leading-relaxed">{result.currentAiDevelopments}</p>
      </ResultSection>

      <ResultSection title="Recommended Courses" icon={<BookOpenIcon />}>
        <div className="space-y-4">
          {result.recommendedCourses.map((course: Course, index: number) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-purple-400">{course.name}</h4>
                  <p className="text-sm text-gray-400">{course.platform}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${course.isFree ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'}`}>
                  {course.isFree ? 'Free' : 'Paid'}
                </span>
              </div>
              <a href={course.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-2 text-cyan-400 hover:text-cyan-300 text-sm">
                Go to course <ExternalLinkIcon className="ml-1 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </ResultSection>

      <ResultSection title="Relevant APIs to Explore" icon={<CodeBracketIcon />}>
        <div className="space-y-4">
          {result.relevantApis.map((api: ApiResource, index: number) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400">{api.name}</h4>
              <p className="mt-1 text-gray-300">{api.description}</p>
              <a href={api.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-2 text-cyan-400 hover:text-cyan-300 text-sm">
                View API Docs <ExternalLinkIcon className="ml-1 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </ResultSection>

      <ResultSection title="Online Communities to Join" icon={<UsersIcon />}>
        <div className="space-y-4">
          {result.onlineCommunities.map((community: Community, index: number) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h4 className="font-bold text-purple-400">{community.name}</h4>
              <p className="text-sm text-gray-400">{community.platform}</p>
              <a href={community.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-2 text-cyan-400 hover:text-cyan-300 text-sm">
                Join Community <ExternalLinkIcon className="ml-1 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </ResultSection>
    </div>
  );
};