import React, { useState } from "react";

function StatisticLine(props) {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    );
}

function Statistics(props) {
    const { good, bad, neutral } = props;

    const count = good + bad + neutral;

    const average = (good - bad) / (good + neutral + bad);

    const percenteage = (good / (good + neutral + bad)) * 100;

    if (count > 0) {
        return (
            <>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    
                    <StatisticLine text="Good" value={good} />
                    <StatisticLine text="Neutral" value={neutral} />
                    <StatisticLine text="Bad" value={bad} />
                    <StatisticLine text="All" value={good + neutral + bad} />
                    <StatisticLine text="Average" value={average} />
                    <StatisticLine
                        text="Percenteage"
                        value={percenteage + " %"}
                    />
                </tbody>
            </table>
            </>
        );
    } else {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        );
    }
}

function Button(props) {
    const giveFeedback = () => {
        props.setFeedback((prev) => {
            return prev + 1;
        });
    };

    return (
        <>
            <button onClick={giveFeedback}>{props.name}</button>
        </>
    );
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>Give feedback</h1>
            <Button setFeedback={setGood} name="Good" />
            <Button setFeedback={setNeutral} name="Neutral" />
            <Button setFeedback={setBad} name="Bad" />

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
