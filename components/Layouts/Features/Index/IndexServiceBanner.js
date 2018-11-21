import React from 'react'

import {Header} from 'semantic-ui-react'

class IndexServiceBanner extends React.Component
{
    render()
    {
        return (
            <React.Fragment>
                <div className="index-service-banner-main-div bg-overlay bg-overlay-dark4 section-divider2 bg-parallax bg-section">
                    <div className="index-body-container">
                        <div className="index-body-row">
                            <div className="index-body-heading">
                                <div className="index-body-desc align-iterms-center">
                                    <p>Experience something you will never forget</p>
                                    <Header as="h2">Best service ever</Header>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexServiceBanner