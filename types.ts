
export interface Course {
  name: string;
  url: string;
  platform: string;
  isFree: boolean;
}

export interface ApiResource {
  name: string;
  url:string;
  description: string;
}

export interface Community {
  name: string;
  url: string;
  platform: string;
}

export interface AnalysisResult {
  jobTitle: string;
  aiImpact: string;
  skillHistory: string;
  currentAiDevelopments: string;
  recommendedCourses: Course[];
  relevantApis: ApiResource[];
  onlineCommunities: Community[];
}
