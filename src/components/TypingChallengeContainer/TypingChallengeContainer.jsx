import React from 'react';
import './TypingChallengeContainer.css';
import ChallengeDetailsCard from '../ChallengeDetailsCard/ChallengeDetailsCard';
import TypingChallenge from '../TypingChallenge/TypingChallenge';


const TypingChallengeContainer = ({
    selectedParagraph,
    words,
    characters,
    wpm,
    timeRemaining,
    timerStarted,
    testInfo,
    onInputChange
}) => {
    return (
        <div className="typing-challenge-container">
            {/* Details Section */}
            <div className="details-container">
                {/* Words Typed */}
                <ChallengeDetailsCard cardName="Words" cardValue={words}/>
                {/* Characters Types */}
                <ChallengeDetailsCard cardName="Characters" cardValue={characters}/>
                {/* Speed */}
                <ChallengeDetailsCard cardName="Speed" cardValue={wpm}/>
            </div>
            {/* The Real Challenge */}
            <div className="typewriter-container">
                <TypingChallenge
                    testInfo={testInfo} 
                    timeRemaining={timeRemaining}
                    timerStarted={timerStarted}
                    selectedParagraph={selectedParagraph}
                    onInputChange={onInputChange}
                />
            </div>
        </div>    );
}
 
export default TypingChallengeContainer;