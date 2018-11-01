import Router from "next/router"

import Layout from "../components/Layouts/Layout"
import ContextAPI from "../src/config/ContextAPI"

const About = () => (
    <Layout>
        About
        <ContextAPI.Consumer>
            {(context) => (
                <pre>{JSON.stringify(context, "", 2)}</pre>
            )}
        </ContextAPI.Consumer>
    </Layout>
)

export default About