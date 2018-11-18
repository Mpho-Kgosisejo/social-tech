import React from 'react'
import { Header } from 'semantic-ui-react';

class IndexBody extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="index-body-main-div bg-overlay bg-overlay-dark4 section-divider2 bg-parallax bg-section">
                    <div className="index-body-container">
                        <div className="index-body-row">
                            <div className="index-body-heading">
                                <div className="index-body-desc align-iterms-center">
                                    <p>Discover the taste</p>
                                    <Header as="h2">Explore our menu</Header>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexBody