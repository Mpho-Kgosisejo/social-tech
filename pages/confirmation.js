import Layout from "../components/Layouts/Layout"

const Confirmation = ({url}) => (
    <Layout includeNav={false}>
        <pre>{JSON.stringify(url)}</pre>
        Confirmation
    </Layout>
)

Confirmation.getInitialProps = async (props) => {
    console.log("props:", props)
    return ({test: "ok"})
}

export default Confirmation