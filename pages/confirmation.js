import Layout from "../components/Layouts/Layout"

class Confirmation extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("props", this.props)
    }

    render(){return (
        <Layout includeNav={false} includeFooter={false}>
            <pre>{JSON.stringify(this.props.router.query, "", 2)}</pre>
            Confirmation
        </Layout>
    )}
}

export default Confirmation