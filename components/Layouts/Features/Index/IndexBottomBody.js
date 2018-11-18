import React from 'react'
import { Header } from 'semantic-ui-react'

class IndexBottomBody extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="index-bottom-body-main-div bg-overlay bg-overlay-dark4 section-divider2 bg-parallax bg-section">
                    <div className="index-bottom-body-container">
                        <div className="index-bottom-body-row">
                            <div className="index-bottom-body-heading">
                                <div className="index-bottom-body-desc align-iterms-center">
                                    <p>Freshly packed and prepared meals</p>
                                    <Header as="h2">Frequently ordered</Header>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexBottomBody;