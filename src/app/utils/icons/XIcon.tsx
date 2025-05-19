type SearchIconProps = {
    onClick?: () => void;
};

export default function XIcon({ onClick }: SearchIconProps)  {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="70" 
            viewBox="0 0 105 105" 
            fill="none"
            onClick={onClick}
        >
            <path d="M97.4369 4.04095L100.972 7.57611L56.0356 52.4999L100.972 97.4238L99.2045 99.1913L97.4369 100.96L52.4994 56.0351L7.5629 
            100.96L5.79532 99.1913L4.02774 97.4238L48.9633 52.4999L4.02774 7.57611L7.5629 4.04095L52.4994 48.9648L97.4369 4.04095Z" 
            stroke="#3a3a3a" strokeWidth="5" strokeLinecap="round" />
        </svg>
    )
}