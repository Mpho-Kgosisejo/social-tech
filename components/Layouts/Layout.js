import Head from "next/head"
import {Container, Portal, Grid, Segment} from "semantic-ui-react"

import Nav from "./Nav";
import Footer from "./Footer";
import "../../static/css/style.css"
import ContextAPI from "../../src/config/ContextAPI";
import AlertPortal from "../utils/AlertPortal";

const Layout = ({children, title = "", includeNav = true, includeFooter = true, includeContainer = false}) => (
    <React.Fragment>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />

            {/* If you online... */}
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.0/semantic.min.css" />
            {/* <link rel="script" href="https://cdnjs.cloudflare.com/ajax/libs/instafeed.js/1.4.1/instafeed.min.js" /> */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/instafeed.js/1.4.1/instafeed.min.js"></script>
            {/* If you offline... */}
            {/* <link rel="stylesheet" href="/static/css/semantic-2.3.0.min.css" /> */}
            <link ref="stylesheet" href="/static/css/style.css" />
            
            <title>{title}</title>
        </Head>

        <ContextAPI.Consumer>
            {({state}) => (
                <div className="mainLayout">
                        {(!state.root_loading && state.alertPortal.message) && <AlertPortal />}
            
                        {includeNav && <Nav />}
            
                        <Container className="childLayout" fluid={includeContainer}>
                            {children}
                        </Container>
            
                        {includeFooter && <Footer />}
                    </div>
            )}
        </ContextAPI.Consumer>
    </React.Fragment>
)

export default Layout