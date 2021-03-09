import React from 'react';
import './TestLetter.css';

const TestLetter = ({ individualLetterInfo }) => {
    
    const { status } = individualLetterInfo;    {/*or  const status = individualLetterInfo.status ;*/}
    let statusClass;

    const statusClassName = {
        correct: "test-letter-correct",
        incorrect: "test-letter-incorrect",
        notAttempted: "test-letter-not-attempted"
    }[status]

    // or

    // if (status === 'correct') {
    //     statusClass = 'test-letter-correct';
    // } else if (status === 'incorrect') {
    //     statusClass = 'test-letter-incorrect';
    // } else {
    //     statusClass = 'test-letter-not-attempted';
    // }
    
    return (
        <span className={`test-letter ${statusClassName}`}>
            { individualLetterInfo.testLetter }
        </span>
    );

}
 
export default TestLetter;