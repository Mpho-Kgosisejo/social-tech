import React from 'react'

import IndexHeader from "./IndexHeader";
import IndexBody from "./IndexBody";
import IndexSteps from "./IndexSteps";
import IndexBanner from "./IndexBanner";
import IndexBottomBody from "./IndexBottomBody";
import IndexSlider from './IndexSlider';

class IndexLayout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <p></p>
                <IndexHeader />
                <IndexSteps />
                <IndexBody />
                <IndexBanner />
                <IndexBottomBody />
                <IndexSlider />
            </React.Fragment>
        )
    }
}

export default IndexLayout;