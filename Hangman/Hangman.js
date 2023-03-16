import React, {Component } from 'react';
import './Hangman.css';
import { randomWord } from './randomWords.js';

import one from "./hangmanpics/first.jpg"
import two from "./hangmanpics/second.jpg"
import three from "./hangmanpics/third.jpg"
import four from "./hangmanpics/fourth.jpg"
import five from "./hangmanpics/fifth.jpg"
import six from "./hangmanpics/sixth.jpg"
import seven from "./hangmanpics/seventh.jpg"


class Hangman extends Component{
    static defaultProps = {
        wrongGuess: 6,
        hangmanpics: [one, two, three, four, five, six, seven]
    }
    constructor(prop){
        super(prop);
        this.state = {
        mistake: 0,
        guess: new Set(),
        answer: randomWord()
        }
    }

    guessHandler= h =>{
        let letter = h.target.value;
        this.setState(st => ({
            guess: st.guess.add(letter),
            mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
        }));
    }

    guessedWord() {
        return this.state.answer.split("").map(letter => (this.state.guess.has(letter) ? letter : " _ "));
    }
    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button
            class='btn btn-lg btn-primary m-2'
            key={letter}
            value={letter}
            onClick={this.guessHandler}
            disabled={this.state.guess.has(letter)}
            >
                {letter}
            </button>
        ));
    }

    resetButton = () => {
        this.setState({
            mistake:0,
            guess: new Set([]),
            answer: randomWord()
        })
    }

    render(){
        const gameOver = this.state.mistake >= this.props.wrongGuess;
        const isWinner = this.guessedWord().join("") === this.state.answer;
        let stat = this.generateButtons();

        if(isWinner){
            stat="You got it! Nice job!"
        }
        if(gameOver){
            stat="You lost! Try again!"
        }
        return (
            <div className='container'>
                <h1 className='text-center'>Hangman</h1>
            <div className='float-right'>Attempts: {this.state.mistake} of {this.props.wrongGuess}</div>
            <div className='text-center'>
                <img src={this.props.hangmanpics[this.state.mistake]} alt=""/>
            </div>
            <div className='text-center'>
                <p>Guess the language?</p>
                <p>
                    {!gameOver ? this.guessedWord() : this.state.answer}
                </p>
                <p>{stat}</p>
                <button className='btn btn-info' onClick={this.resetButton}>Reset</button>
            </div>
            </div>
        )
    }
}
export default Hangman;

