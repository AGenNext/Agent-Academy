export interface OpenBadgeProfile {
  id: string;
  type: "Profile" | string;
  name: string;
  url?: string;
  email?: string;
  description?: string;
}

export interface OpenBadgeAchievement {
  id: string;
  type: "Achievement" | string;
  name: string;
  description: string;
  criteria?: {
    narrative?: string;
    id?: string;
  };
  image?: string | { id: string; type?: string; caption?: string };
  tags?: string[];
  alignment?: Array<{
    type?: "Alignment" | string;
    targetName: string;
    targetUrl?: string;
    targetDescription?: string;
    targetCode?: string;
    targetFramework?: string;
  }>;
}

export interface OpenBadgeCredentialSubject {
  id: string;
  type?: string | string[];
  achievement: OpenBadgeAchievement;
  activityStartDate?: string;
  activityEndDate?: string;
  result?: Array<{
    type?: string;
    value?: string;
    status?: string;
  }>;
}

export interface OpenBadgeClass {
  id: string;
  type: "BadgeClass" | "Achievement" | string;
  name: string;
  description: string;
  issuer: OpenBadgeProfile | string;
  criteria?: {
    narrative?: string;
    id?: string;
  };
  image?: string;
  tags?: string[];
}

export interface OpenBadgeAssertion {
  id: string;
  type: "Assertion" | "OpenBadgeCredential" | string;
  recipient: string;
  badge: string | OpenBadgeClass;
  issuedOn: string;
  evidence?: string | string[];
  verification?: Record<string, unknown>;
}
