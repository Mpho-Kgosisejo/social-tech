import React from 'react'
import { Form, Label, Input, Button, Checkbox } from 'semantic-ui-react'
import ContextAPI from '../../../../../src/config/ContextAPI';
import api from "../../../../../src/providers/APIRequest"

class DashboardMenuPage extends React.Component{

  constructor(props)
    {
        super(props)
    }

    getMenu = async () => {
        const data = await api.menu.menu_items()

        if (data.status === 200) {
          console.log(data)
        } else {
          console.log(data)
        }
    }

    componentDidMount(){
        this.getMenu()
    }

  render(){
    return(
      <div>
        <div className="menu-upload-container">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
            consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
            vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
            enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla
            ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
            Curabitur ullamcorper ultricies nisi.
          </p>

          <ContextAPI.Consumer>
            {({state}) => 
                <pre>{JSON.stringify(state, "", 1)}</pre>
            }
          </ContextAPI.Consumer>
        </div>
      </div>
    )
  }
}

export default DashboardMenuPage