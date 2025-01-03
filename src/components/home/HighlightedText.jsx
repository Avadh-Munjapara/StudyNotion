import React from 'react';

const HighlightedText = ({text}) => {
    return (
        <span className={`font-bold bg-gradient-to-r text-transparent bg-clip-text from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-4xl`}>{text}</span>
    );
}

export default HighlightedText;
