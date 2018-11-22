import Head from "next/head"
import {Container, Sidebar, Menu, Icon, Responsive, Visibility, Dimmer} from "semantic-ui-react"

import Nav from "./Nav";
import Footer from "./Footer";
import ContextAPI from "../../src/config/ContextAPI";
import AlertPortal from "../utils/AlertPortal";
import {LeftComputerNav} from "./Nav"

import "../../static/css/style.css"

const handleUpdateLayout = ({calculations, state}) => {
    const {dispatch} = state

    if (calculations.width >= 976)
        dispatch({type: "SIDEBAR", payload: false})
    dispatch({type: "MAIN_LAYOUT", payload: calculations})
}

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
            <link ref="stylesheet" href="/static/css/style.css" />
            
            <title>{title}</title>
        </Head>

        
        <ContextAPI.Consumer>
            {({state}) => (
                <>
                    {includeNav && <Nav />}
                <Sidebar.Pushable>
                    {/* <Responsive maxWidth={991} as={React.Fragment}> */}
                    <Sidebar
                        as={Menu}
                        animation='push'
                        direction='left'
                        icon='labeled'
                        vertical
                        inverted
                        visible={state.isSidebarOpen}
                        width='thin'
                        className="fresheats-green-bg push-sidebar"
                    >
                        <Menu.Item as="a" className="fresheats-brown-color"></Menu.Item>
                        <LeftComputerNav />
                    </Sidebar>
                    {/* </Responsive> */}
                    <Sidebar.Pusher>
                        <Visibility fireOnMount onUpdate={(e, {calculations}) => handleUpdateLayout({state, calculations})}>
                            <div className="mainLayout">
                                {(!state.root_loading && state.alertPortal.message) && <AlertPortal />}
                    
                                {!state.root_loading && includeNav && <Nav />}
                    
                                {includeContainer ? <Container className="childLayout" children={children} /> : children}

                                {includeFooter && <Footer />}
                            </div>
                        </Visibility>
                        <Dimmer active={state.isSidebarOpen} onClickOutside={() => state.dispatch({type: "SIDEBAR"})}  />
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </>
            )}
        </ContextAPI.Consumer>
    </React.Fragment>
)

export default Layout