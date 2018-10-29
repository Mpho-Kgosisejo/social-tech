import ContextAPI from "../config/ContextAPI"

class ContextProvider extends React.Component{
    constructor(){
        super()
        
        this.state = {}
    }

    render(){
        return (
            <ContextAPI.Provider value={{state: this.state}}>
                {this.props.children}
            </ContextAPI.Provider>
        )
    }
}

export default ContextProvider