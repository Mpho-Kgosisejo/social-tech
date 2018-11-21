import React from 'react'
import { Header } from 'semantic-ui-react';
// import IndexTodaysSpecial from './IndexTodaysSpecial';

class IndexTodaysSpecial extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="index-body-main-div bg-overlay bg-overlay-dark4 section-divider2 bg-parallax bg-section">
                    <div className="index-body-container">
                        <div className="index-body-row">
                            <div className="index-body-heading">
                                <div className="index-todays-special-desc align-iterms-center">
                                    <Header as="h2">Today's speciality</Header>
                                    <p>What's trending 👅 </p>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexTodaysSpecial;