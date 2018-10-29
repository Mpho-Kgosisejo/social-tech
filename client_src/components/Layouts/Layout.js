import Head from "next/head"
import {Container} from "semantic-ui-react"

import Nav from "./Nav";
import Footer from "./Footer";
import ContextProvider from "../../src/providers/ContextProvider"
import "../../static/css/style.css"

const Layout = ({children, title = ""}) => (
    <React.Fragment>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />

            {/* If you online... */}
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css" />
            {/* If you offline... */}
            {/* <link rel="stylesheet" href="/static/css/semantic-2.3.0.min.css" /> */}
            {/* <link ref="stylesheet" href="/static/css/main.css" /> */}
            
            <title>{title}</title>
        </Head>

       <div className="mainLayout">
            <ContextProvider>
                <Nav />

                <Container className="childLayout">
                    {children}
                </Container>

                <Footer />
            </ContextProvider>
       </div>
    </React.Fragment>
)

export default Layout