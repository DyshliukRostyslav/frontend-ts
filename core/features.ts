export const isFeatureEnabled = (feature: string): boolean => window.Terrasoft.Features.getIsEnabled(feature);
