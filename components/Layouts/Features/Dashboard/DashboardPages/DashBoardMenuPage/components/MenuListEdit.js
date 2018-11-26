import { Table, Image } from 'semantic-ui-react'

class MenuListEdit extends React.Component {
    constructor ()
    {
        super()
    }

    render ()
    {
        const { products} = this.props
        return (
            <div> { /* ========================= */ } 
                <div className = "dashboard-menu-page-container">
                { products.map( product => (
                    <Table key={product._id} celled >
                        
                    </Table>
                ))}
                </div>
                <pre>{ JSON.stringify(products, null, 2) }</pre> 
            </div>
        )
    }
}

export default MenuListEdit