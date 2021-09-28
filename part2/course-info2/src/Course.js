import React from 'react'


const Header = ({ name }) => {
    return <h1>{name}</h1>;
};

const Total = ({ parts }) => {
    const sum = parts.reduce((prev, current) => {
        return prev + current.exercises;
    }, 0);

    return <b>Number of exercises {sum}</b>;
};

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
};

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part) => {
                return <Part part={part} key={part.id} />;
            })}
        </div>
    );
};

function Course(props) {
    const { course } = props;

    return (
        <div>
            <Header name={course.name} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    );
}

export default Course;