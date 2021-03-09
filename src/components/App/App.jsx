import React from 'react';
import ChallengeSection from '../ChallengeSection/ChallengeSection';
import Footer from '../Footer/Footer';
import Landing from '../Landing/Landing';
import Nav from '../Nav/Nav';
import { SAMPLE_PARAGRAPHS } from './../../data/sampleParagraphs';
import './App.css';

const TotalTime = 2;
const ServiceURL = 'http://metaphorpsum.com/paragraphs/1/9';

const defaultState = {
    selectedParagraph: "",
    timerStarted: false,
    timeRemaining: TotalTime,
    words: 0,
    characters: 0,
    wpm: 0,
    testInfo: []
};

class App extends React.Component {

    state = defaultState;

    fetchNewParagraphFallback = () => {         //Fetching data from Sample Paragraph if data fails to come from API due to http call (not https).
        const data = SAMPLE_PARAGRAPHS[
            Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)
        ];
        const selectedParagraphArray = data.split("");
        // console.log(selectedParagraphArray);
        const testInfo = selectedParagraphArray.map(selectedLetter => {
            return{
                testLetter: selectedLetter,
                status: "notAttempted",
            };
        });

        this.setState({ ...defaultState, testInfo, selectedParagraph: data });      //...defaultstate to reset everything when user clicks retry button and fetches another paragraph
    }

    fetchNewParagraph = () => {
        fetch(ServiceURL)
            .then(response => response.text())
            .then((data)=> {
                // console.log(data);
                // this.setState({ selectedParagraph: data });      state updated below
                const selectedParagraphArray = data.split("");
                // console.log(selectedParagraphArray);
                const testInfo = selectedParagraphArray.map(selectedLetter => {
                return{
                    testLetter: selectedLetter,
                    status: "notAttempted",
                };
            });

            this.setState({ ...defaultState, testInfo, selectedParagraph: data });      //...defaultstate to reset everything when user clicks retry button and fetches another paragraph

        });
    }

    componentDidMount() {
        this.fetchNewParagraph();
    }

    startTimer = () => {
        this.setState({ timerStarted: true });
        const timer = setInterval( () => {
            if (this.state.timeRemaining > 0) {
                //Change WPM as well
                const timeSpent = TotalTime - this.state.timeRemaining;
                const wpm = timeSpent > 0 
                    ? (this.state.words / timeSpent) * TotalTime 
                    : 0 ;

                this.setState({ 
                    timeRemaining : this.state.timeRemaining - 1,
                    wpm: parseInt(wpm),
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

    startAgain = () => this.fetchNewParagraph() ;     //when user clicks retry button
    
    handleUserInput = (inputValue) => {
        if( !this.state.timerStarted ){     //Start timer as soon as user starts typing
            this.startTimer();
        }
        
        // ALGORITHM:
        // 1. Handle 'Underflow' case - all characters should be shown as not-attempted
        // 2. Handle 'Overflow' case - early exit
        // 3. Handle the backspace :
        //          - Mark the [index+1] element as not-attempted (irrespective of whether the index is zero)
        //          - But, dont forget to check 'Overflow' case here
        //              (index + 1 -> out of bound, when index === length - 1)
        // 4. Update the status in the 'testInfo'
        //      - Find out last character in the inputValue and its index. ( O(1) efficient )
        //      - Check if the character at same index in testInfo (state) matches ;
        //      - Yes -> "correct"
        //      - No -> "incorrect"
        // 5. Irrespected of the case, characters, words and speed (wpm) can be updated.
        
        const characters = inputValue.length;
        const words = inputValue.split(" ").length;
        const index = characters - 1;
        
        // UnderFlow Case
        if ( index < 0 ) {
            this.setState({
                testInfo : [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: "notAttempted"
                    },
                    ...this.state.testInfo.slice(1),
                ],
                characters,
                words,
            });
            return;
        }

        //OverFlow Case
        if ( index >= this.state.selectedParagraph.length ) {
            this.setState({ characters, words });
            return;
        }

        //Handle BackSpace
        const testInfo = this.state.testInfo; //make a copy of testInfo
        if ( ! ( index === this.state.selectedParagraph.length - 1 ) ) {
            testInfo[ index + 1 ].status = 'notAttempted';
        }

        //Check for Correct typed letter
        const isCorrect = inputValue[index] === testInfo[index].testLetter ;

        //Update the TestInfo
        testInfo[index].status = isCorrect ? "correct" : "incorrect" ;

        //Update the State
        this.setState({
            testInfo,
            words,
            characters
        });
    
    };
    
    render() {
        return (
            <div className='app'>
                {/* Nav Bar */}
                <Nav />

                {/* Landing Page */}
                <Landing />

                {/* Challenge Section */}
                <ChallengeSection 
                    selectedParagraph={this.state.selectedParagraph}
                    words={this.state.words}
                    characters={this.state.characters}
                    wpm={this.state.wpm}
                    timeRemaining={this.state.timeRemaining}
                    timerStarted={this.state.timerStarted}
                    testInfo={this.state.testInfo}
                    onInputChange={this.handleUserInput}
                    startAgain={this.startAgain}
                />

                {/*Footer Section */}
                <Footer />

            </div>
        )
    }
}

export default App;