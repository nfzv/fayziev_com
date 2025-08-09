// Feature flags configuration
export const featureFlags = {
  viewCounter: process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTER === 'true',
} as const

export type FeatureFlag = keyof typeof featureFlags
