import React from 'react'

import ResturantHistory from "./ResturantHistory";


class IndexLayout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <p></p>
                <ResturantHistory />
                {/* <IndexSteps />
                <IndexServiceBanner />
                <IndexService />
                <IndexTodaysSpecial />
                <IndexNewDish />
                <IndexBottomBody />
                <IndexSlider /> */}
            </React.Fragment>
        )
    }
}

export default IndexLayout;