import React from 'react'
import ReactDOM from 'react-dom';
import './index.scss';

import MainStatsContainer from './components/mainStatsContainer/MainStatsContainer';


class MainGrid extends React.Component {
    render() {
        return (
            <div className="grid">
                <MainStatsContainer/>
            </div>
        )
    }
}

ReactDOM.render(
    <MainGrid/>,
    document.getElementById('root')
)

