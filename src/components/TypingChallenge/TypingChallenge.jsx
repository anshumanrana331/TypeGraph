import React from 'react';
import TestLetter from '../TestLetter/TestLetter';
import './TypingChallenge.css';

const TypingChallenge = ({
    // selectedParagraph,
    timeRemaining,
    timerStarted,
    testInfo,
    onInputChange
}) => {
    return (
        <div className="typing-challenge">
            <div className="timer-container">
                <p className="timer">
                    00:{timeRemaining >= 10 ? timeRemaining : `0${timeRemaining}` }     
                    {/* for keeping two digits when time is less than 10 seconds */}
                </p>
                <p className="timer-info">
                    { !timerStarted ? 'Start typing to start the test.' : undefined }
                                    {/* or
                    { !timerStarted && 'Start typing to start the test.' } */}
                </p>
            </div>

            <div className="textarea-container">
                <div className="textarea-left">
                    <div className="textarea test-paragraph">
                        {/* {selectedParagraph} */}
                        {
                            testInfo.map( (individualLetterInfo, index) => {
                                return(
                                    <TestLetter 
                                        key = {index}
                                        individualLetterInfo={individualLetterInfo} 
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="textarea-right">
                    <textarea
                        onChange = { (e) => onInputChange(e.target.value) }
                        className='textarea'
                        placeholder='Start typing here !' 
                    ></textarea>
                </div>
            </div>
            
        </div>
    );
}
 
export default TypingChallenge;