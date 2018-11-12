class menu_tab extends React.Component
{
    render()
    {
        return(
            <Tab menu={{ secondary: true }} panes={this.props.panes} />
        )
    }
}

export default menu_tab