import React from 'react';
import ReactDOM from 'react-dom';
import data from './contacts.json';
import './style/index.css';
import './style/app.css';

function onClick(contact) {
    let element =
        <div>
            <div className="info">
                <div className="col">
                    <span className="avatar">&#9787;</span>
                </div>
                <div className="col">
                    <span className="name">{contact.firstName}</span>
                    <span className="name">{contact.lastName}</span>
                </div>
            </div>            <div className="info">
                <span className="info-line">&phone; {contact.phone}</span>
                <span className="info-line">&#9993; {contact.email}</span>
            </div>
        </div>

    ReactDOM.render(element, document.getElementsByClassName('content')[1]);
}

function Contacts() {
    const element = data.map((contact, id) => {
        return (
            <div className="contact" data-id={id} key={id} onClick={() => onClick(data[id])}>
                <span className="avatar small">&#9787;</span>
                <span className="title">{contact.firstName} {contact.lastName}</span>
            </div>
        )
    });

    return element;
}

ReactDOM.render(<Contacts />, document.getElementsByClassName('content')[0]);