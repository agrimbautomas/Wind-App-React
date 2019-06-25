import React from 'react'
import ReactDOM from 'react-dom';
import './index.scss';

import WindLogsList from './components/windLogsList/WindLogsList';
// import Header from './components/header/Header';


class MainGrid extends React.Component {
    render() {
        return (
            <div className="grid">
                <WindLogsList/>
            </div>
        )
    }
}

ReactDOM.render(
    <MainGrid/>,
    document.getElementById('root')
)

