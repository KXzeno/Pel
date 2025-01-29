"use client"

import type React from "react"

interface IconProps {
  size?: number
  color?: string
  secondaryColor?: string
}

export const Alteration: React.FC<IconProps> = ({ size = 24, color = "#64B5F6", secondaryColor = "#1976D2" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Geometric transformation showing matter manipulation */}
    <path d="M6 4L18 4L12 10L6 4Z" fill={color} stroke={secondaryColor} strokeWidth="1.5" />
    <path d="M18 20L6 20L12 14L18 20Z" fill={secondaryColor} stroke={secondaryColor} strokeWidth="1.5" />
    <path d="M4 6L4 18L10 12L4 6Z" fill={color} stroke={secondaryColor} strokeWidth="1.5" />
    <path d="M20 18L20 6L14 12L20 18Z" fill={secondaryColor} stroke={secondaryColor} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill={color} stroke={secondaryColor} strokeWidth="1.5" />
  </svg>
)

export const Conjuration: React.FC<IconProps> = ({ size = 24, color = "#B388FF", secondaryColor = "#651FFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer summoning circle */}
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeDasharray="1 3" />

    {/* Inner portal */}
    <path
      d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z"
      fill={color}
      fillOpacity="0.2"
    />

    {/* Mystical runes */}
    <path d="M12 6L14 8L12 10L10 8L12 6Z" fill={secondaryColor} />
    <path d="M12 14L14 16L12 18L10 16L12 14Z" fill={secondaryColor} />
    <path d="M6 12L8 14L6 16L4 14L6 12Z" fill={secondaryColor} />
    <path d="M18 12L20 14L18 16L16 14L18 12Z" fill={secondaryColor} />

    {/* Energy beams */}
    <path d="M12 7V17M7 12H17" stroke={secondaryColor} strokeWidth="0.75" strokeLinecap="round" />

    {/* Central vortex */}
    <circle cx="12" cy="12" r="3" fill={secondaryColor} />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
)

export const Destruction: React.FC<IconProps> = ({ size = 24, color = "#FF5252", secondaryColor = "#D32F2F" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main flame */}
    <path d="M12 2C12 2 16 7 16 12C16 16 12 18 12 18C12 18 8 16 8 12C8 7 12 2 12 2Z" fill={color} />

    {/* Secondary flames */}
    <path d="M8 8C8 8 10 11 10 13C10 15 8 16 8 16C8 16 6 15 6 13C6 11 8 8 8 8Z" fill={secondaryColor} />
    <path d="M16 8C16 8 18 11 18 13C18 15 16 16 16 16C16 16 14 15 14 13C14 11 16 8 16 8Z" fill={secondaryColor} />

    {/* Ember particles */}
    <circle cx="10" cy="7" r="1" fill="#FFA726" />
    <circle cx="14" cy="9" r="1" fill="#FFA726" />
    <circle cx="12" cy="5" r="1" fill="#FFA726" />

    {/* Fire core */}
    <path d="M12 8C12 8 14 10 14 12C14 14 12 15 12 15C12 15 10 14 10 12C10 10 12 8 12 8Z" fill="#FFEB3B" />

    {/* Heat waves */}
    <path d="M7 18C7 18 12 17 17 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 2" />
    <path d="M8 20C8 20 12 19 16 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 2" />
  </svg>
)

export const Illusion: React.FC<IconProps> = ({ size = 24, color = "#FF80AB", secondaryColor = "#C51162" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 7C6 7 3 12 3 12C3 12 6 17 12 17C18 17 21 12 21 12C21 12 18 7 12 7Z"
      fill={color}
      stroke={secondaryColor}
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="3" fill={secondaryColor} />
    <path d="M2 12C2 12 4 8 12 8C20 8 22 12 22 12" stroke={secondaryColor} strokeWidth="0.5" strokeDasharray="2 2" />
  </svg>
)

export const Restoration: React.FC<IconProps> = ({ size = 24, color = "#81C784", secondaryColor = "#388E3C" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Divine light rays */}
    <path d="M12 2L13 6M12 2L11 6M12 2V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 22L13 18M12 22L11 18M12 22V17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 12L6 13M2 12L6 11M2 12H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 12L18 13M22 12L18 11M22 12H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

    {/* Healing aura */}
    <circle cx="12" cy="12" r="6" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />

    {/* Central healing cross */}
    <path d="M12 8V16M8 12H16" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />

    {/* Protective circle */}
    <circle cx="12" cy="12" r="4" fill={color} stroke={secondaryColor} strokeWidth="1.5" />

    {/* Healing sparkles */}
    <path d="M9 9L8 8M15 9L16 8M15 15L16 16M9 15L8 16" stroke={secondaryColor} strokeWidth="1" strokeLinecap="round" />
  </svg>
)

export const Enchanting: React.FC<IconProps> = ({ size = 24, color = "#CE93D8", secondaryColor = "#7B1FA2" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Soul gem with intricate magical runes */}
    <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill={color} stroke={secondaryColor} strokeWidth="1.5" />
    <path d="M12 6L16 8.5V13.5L12 16L8 13.5V8.5L12 6Z" stroke={secondaryColor} strokeWidth="1.5" />
    <circle cx="12" cy="11" r="2" fill={secondaryColor} />
    <path d="M8 8L16 14M16 8L8 14" stroke={secondaryColor} strokeWidth="0.75" strokeLinecap="round" />
    <path
      d="M12 2V6M4 7L8 8.5M20 7L16 8.5M12 16V22M4 17L8 13.5M20 17L16 13.5"
      stroke={secondaryColor}
      strokeWidth="0.75"
      strokeLinecap="round"
    />
  </svg>
)
