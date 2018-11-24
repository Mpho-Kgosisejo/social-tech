import {Tab, Divider, Header, Icon, Menu, Dropdown} from "semantic-ui-react"
import Link from "next/link"
import AboutContactUs from "./AboutContactUs"
import AboutFAQ from "./AboutFAQ"
import AboutOurChefs from "./AboutOurChefs"
import AboutOurStory from "./AboutOurStory"

import api from "../../../../src/providers/APIRequest"

const tabPanes = [
    {
        tabItem: "Our Story",
        render: () => (
            <Tab.Pane>
                <AboutOurStory />
            </Tab.Pane>
        )
    },
    {
        tabItem: "Our Chefs",
        render: () => (
            <Tab.Pane>
                <AboutOurChefs />
            </Tab.Pane>
        )
    },
    {
        tabItem: "Contact Us",
        render: () => (
            <Tab.Pane>
                <AboutContactUs />
            </Tab.Pane>
        )
    },
    {
        tabItem: "FAQs",
        render: () => (
            <Tab.Pane>
                <AboutFAQ />
            </Tab.Pane>
        )
    }
]

class AboutUsLayout extends React.Component
{
    constructor(props)
    {
        super()

        this.state = {
            loading: true,
            data: {}
        }
    }

    processData = async () => {
        const data = await api.web.about()
        

        if (data.status === 200){
            this.setState({
                loading: false,
                data: data.data
            })
        }else{
            console.error("err", error)
        }
    }

    componentDidMount(){
        this.processData();
    }

    render()
    {
        return (
            <React.Fragment>
                    <Dropdown text='About'simple item>
                        <Dropdown.Menu>
                            <Link href="/about?index=story" prefetch passHref>
                                <Dropdown.Item as="a">Our Story</Dropdown.Item>
                            </Link>
                            <Divider />
                            <Link href="/about?index=chefs" prefetch passHref>
                                <Dropdown.Item as="a">Our Chefs</Dropdown.Item>
                            </Link>
                            <Divider />
                            <Link href="/about?index=contact" prefetch passHref>
                                <Dropdown.Item as="a">Contact Us</Dropdown.Item>
                            </Link>
                            <Divider />
                            <Link href="/about?index=FAQs" prefetch passHref>
                                <Dropdown.Item as="a">FAQs</Dropdown.Item>
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>
            </React.Fragment>
        )
    }
}

export default AboutUsLayout