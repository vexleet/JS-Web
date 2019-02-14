import React from 'react';
import ReactDOM from 'react-dom';

// Exercise: Props
// Create a VacancySign component that has a boolean prop hasvacancy.
// The component should render a div with either the text 
// "Vacancy" or "No Vacancy" depending on the prop


let VacancySign = (props) => {
    if (props.hasvacancy) {
        return (
            <div>
                Vacancy
            </div>
        );
    }
    else {
        return (
            <div>
                No Vacancy
            </div>
        );
    }
};

ReactDOM.render(
    <VacancySign hasvacancy="true" />,
    document.getElementById('container')
);