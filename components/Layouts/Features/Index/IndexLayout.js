import React from 'react'

import IndexHeader from "./IndexHeader";
import IndexSteps from "./IndexSteps";
import IndexBanner from "./IndexBanner";
import IndexFrequentlyOrdered from './IndexFrequentlyOrdered';
import IndexMenu from './IndexMenu';

class IndexLayout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <IndexHeader />
                <IndexSteps />
                <IndexMenu />
                <IndexBanner />
                {/* <IndexBottomBody /> */}
                <IndexFrequentlyOrdered />
            </React.Fragment>
        )
    }
}

export default IndexLayout;