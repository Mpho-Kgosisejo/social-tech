import Head from "next/head"
import {Container, Portal, Grid, Segment} from "semantic-ui-react"

import Nav from "./Nav";
import Footer from "./Footer";
import "../../static/css/style.css"
import ContextAPI from "../../src/config/ContextAPI";
import AlertPortal from "../utils/AlertPortal";

const Layout = ({children, title = "", includeNav = true, includeFooter = true, includeContainer = true}) => (
    <React.Fragment>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />

            {/* If you online... */}
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.0/semantic.min.css" />
            <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

            {/* If you offline... */}
            {/* <link rel="stylesheet" href="/static/css/semantic-2.3.0.min.css" /> */}
            <link ref="stylesheet" href="/static/css/sstyle.css" />
            
            <title>{title}</title>
        </Head>

        <ContextAPI.Consumer>
            {({state}) => (
                <div className="mainLayout">
                        {(!state.root_loading && state.alertPortal.message) && <AlertPortal />}
            
                        {includeNav && <Nav />}
            
                        {includeContainer ? <Container children={children} /> : children}
            
                        {includeFooter && <Footer />}
                    </div>
            )}
        </ContextAPI.Consumer>
    </React.Fragment>
)

export default Layout