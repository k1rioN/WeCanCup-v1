export default function Logo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="WECAN CUP logo">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#FFB6C1" />
          <stop offset="1" stopColor="#98FF98" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#g1)" opacity="0.2" />
      <path d="M10 26h12l4 12 6-24 6 24 4-12h12"
            fill="none" stroke="url(#g1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
