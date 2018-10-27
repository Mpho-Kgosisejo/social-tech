import {Menu, Button} from "semantic-ui-react"

const AuthLayout = () => (
    <React.Fragment>
         <Menu.Item>
            <Button.Group>
                <Button basic color="grey">Sign In</Button>
                <Button basic color="grey">Sign Up</Button>
            </Button.Group>
        </Menu.Item>
    </React.Fragment>
)

export default AuthLayout