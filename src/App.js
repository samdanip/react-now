import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            disabled: true,
            timer: 5,
            score: 0,
        };
        this.handleClick = this.handleClick.bind(this);
        this.prepareComponents = this.prepareComponents.bind(this);
        this.resetData = this.resetData.bind(this);
        this.calculateScore = this.calculateScore.bind(this);
    }
    
    handleClick() {
        if(this.state.timer !== 0) {
            this.intervalId = setInterval(() => {
                this.setState(prevState => {
                    return {
                        timer: prevState.timer - 1
                    }
                })
                if(this.state.timer === 0) {
                    clearInterval(this.intervalId);
                    this.prepareComponents()
                }
            }, 1000)
        }
    }

    prepareComponents() {
        this.setState((prevState) => {
            return {
                disabled: !prevState.disabled,
            };
        });
        this.startTime = Date.now();
    }

    calculateScore() {
        this.endTime = Date.now();
        let difference = this.endTime - this.startTime;
        difference /= 1000
        this.setState(() => {
            return {
                disabled: true,
                score: difference
            }
        })
    }

    resetData() {
        clearInterval(this.intervalId);
        this.setState(() => {
            return {
                disabled: true,
                timer: 5,
                score: 0,
            }
        })
    }

    render() {
        return (
            <div className="container">
                <h1>React</h1>
                <div>
                    <small>
                        This game will allow you to test your reaction time. The
                        faster is better. Play with your friends and beat
                        their score.
                    </small>
                </div>
                <div>
                    <small>
                        Press the <code>Let's Play</code> button. After the
                        counter reaches 0, press the <code>React</code> button
                        as quick as you can.
                    </small>
                </div>
                <button
                    type="button"
                    name="play"
                    className="btn btn-primary"
                    onClick={this.handleClick}
                >
                    Let's Play
                </button>
                <h2 name="timer">{this.state.timer}</h2>
                <button
                    type="button"
                    name="react"
                    className="btn btn-outline-primary"
                    onClick={this.calculateScore}
                    disabled={this.state.disabled}
                >
                    React
                </button>
                <button
                    type="button"
                    name="react"
                    className="btn btn-outline-success retry"
                    onClick={this.resetData}
                >
                    Retry
                </button>
                <p name="score">
                    <strong>Your reaction time is:</strong> {this.state.score} Seconds.
                </p>
            </div>
        );
    }
}

export default App;
