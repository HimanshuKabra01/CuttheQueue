function ChatBotLogo({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        {/* Robot Head */}
        <path
          d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
          className="fill-current"
          opacity="0.9"
        />
        
        {/* Circuit Pattern */}
        <path
          d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z"
          fill="#60A5FA"
          className="animate-pulse"
        />
        <path
          d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
          fill="#60A5FA"
          className="animate-pulse"
        />
        
        {/* Digital Eyes */}
        <path
          d="M9 10H7V14H9V10Z"
          fill="#60A5FA"
          className="animate-pulse"
        />
        <path
          d="M17 10H15V14H17V10Z"
          fill="#60A5FA"
          className="animate-pulse"
        />
        
        {/* Smile */}
        <path
          d="M14.5 15.5C14.5 15.5 13.5 16.5 12 16.5C10.5 16.5 9.5 15.5 9.5 15.5"
          stroke="#60A5FA"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="animate-pulse"
        />
        
        {/* Circuit Lines */}
        <path
          d="M6 8L8 6M18 8L16 6M6 16L8 18M18 16L16 18"
          stroke="#60A5FA"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
      
      {/* Glowing Effect */}
      <circle
        cx="12"
        cy="12"
        r="11"
        stroke="#60A5FA"
        strokeWidth="0.5"
        className="animate-pulse"
        opacity="0.3"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="#60A5FA"
        strokeWidth="0.5"
        className="animate-pulse"
        opacity="0.2"
      />
    </svg>
  );
}

export default ChatBotLogo;  