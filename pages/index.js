import Layout from "../components/Layouts/Layout"
import ContextAPI from "../src/config/ContextAPI";

const Index = () => (
    <Layout title="Home">
        Index

        <ContextAPI.Consumer>
            {({state}) => (
                <pre>{JSON.stringify(state, "", 2)}</pre>
            )}
        </ContextAPI.Consumer>
    </Layout>
)

export default Index