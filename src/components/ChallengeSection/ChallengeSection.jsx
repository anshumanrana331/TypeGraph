import React from 'react';
import './ChallengeSection.css';
import TestContainer from '../TestContainer/TestContainer';

const ChallengeSection = ({
    selectedParagraph,
    words,
    characters,
    wpm,
    timeRemaining,
    timerStarted,
    testInfo,
    onInputChange,
    startAgain
}) => {
    return ( 
        <div className="challenge-section-container">
            <h1 data-aos="fade-down" className="challenge-section-header">
                Take a speed test now !!
            </h1>
            {/* Test Container */}
            <TestContainer
                words={words}
                characters={characters}
                wpm={wpm}
                timeRemaining={timeRemaining}
                timerStarted={timerStarted}
                selectedParagraph={selectedParagraph}
                testInfo={testInfo}
                onInputChange={onInputChange}
                startAgain={startAgain}
            />
        </div>
    );
}
 
export default ChallengeSection;