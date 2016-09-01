import React from 'react';
import ReactDOM from 'react-dom';

class Form extends React.Component {
    render() {
        return (
            <form>
                I am your form
            </form>
        );
    }
}

ReactDOM.render(<Form />, document.getElementById('main'));
