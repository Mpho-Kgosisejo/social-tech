import React from 'react'

import IndexHeader from "./IndexHeader";
import IndexBody from "./IndexBody";
import IndexSteps from "./IndexSteps";
import IndexBanner from "./IndexBanner";
import IndexBottomBody from "./IndexBottomBody";
import IndexFrequentlyOrdered from './IndexFrequentlyOrdered';
import IndexTodaysSpecial from './IndexTodaysSpecial';
import ResturantHistory from './IndexMenu';
import IndexHowToUse from './IndexHowToUse';
import IndexMenu from './IndexMenu';

class IndexLayout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <IndexHeader />
                <IndexHowToUse />
                <IndexSteps />
                <IndexTodaysSpecial />
                <IndexMenu />
                <IndexBody />
                <IndexBanner />
                <IndexBottomBody />
                <IndexFrequentlyOrdered />
            </React.Fragment>
        )
    }
}

export default IndexLayout;