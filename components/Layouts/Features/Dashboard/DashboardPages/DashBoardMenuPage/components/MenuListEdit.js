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
                    <Table key={product._id} basic='very' celled>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell className="dash-table-cell">
                                    <Image size='small' src={product.image}/>
                                </Table.Cell>
                                <Table.Cell className="dash-table-cell">
                                    {product.name}
                                </Table.Cell>
                                <Table.Cell className="dash-table-cell">
                                    {product.price}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                ))}
                </div>
                <pre>{ JSON.stringify(products, null, 2) }</pre> 
            </div>
        )
    }
}

export default MenuListEdit