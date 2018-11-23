import React from 'react'
import { Header } from 'semantic-ui-react';


const IndexBannerHeader = ({ image, header, desc }) => (
    <React.Fragment>
        <div style={{ backgroundImage: `url(${image})` }} className="index-background-img-div bg-overlay bg-overlay-dark4 section-divider2 bg-parallax bg-section">
            <div className="index-body-container">
                <div className="index-body-row">
                    <div className="index-body-heading">
                        <div className="index-body-desc align-iterms-center">
                            <Header as="h2">{header}</Header>
                            <p>{desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
)

export default IndexBannerHeader