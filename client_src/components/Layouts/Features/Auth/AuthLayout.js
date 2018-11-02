import {Menu, Button, Modal, Tab} from "semantic-ui-react"

import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm";

const tabPanes = [
    {
        menuItem: "Sign In",
        render: () => (
            <Tab.Pane>
                <SignInForm />
            </Tab.Pane>
        )
    }, {
        menuItem: "Sign Up",
        render: () => (
            <Tab.Pane>
                <SignUpForm />
            </Tab.Pane>
        )
    }
]

class AuthLayout extends React.Component {
    constructor(){
        super()

        this.state = {
            openModal: false,
            activeTabIndex: 1
        }
    }

    openModal = (index) => {
        this.setState({
            openModal: true,
            activeTabIndex: index
        })
    }

    closeModal = () => this.setState({openModal: false})

    taggleTab = () => {
        const currentIndex = this.state.activeTabIndex

        if (currentIndex == 1){
            this.setState({activeTabIndex: 0})
        }else{
            this.setState({activeTabIndex: 1})
        }
    }

    render(){
        const {openModal, activeTabIndex} = this.state

        return (
            <React.Fragment>
                <Modal open={openModal} onClose={this.closeModal}>
                    <Modal.Header>Auth</Modal.Header>
                    <Modal.Content scrolling>
                        <Tab menu={{secondary: true, pointing: true}} panes={tabPanes} activeIndex={activeTabIndex} onTabChange={this.taggleTab} />
                    </Modal.Content>
                </Modal>

                <Menu.Item>
                    <Button.Group size="tiny">
                        <Button basic color="grey" onClick={() => this.openModal(0)}>Sign In</Button>
                        <Button basic color="grey" onClick={() => this.openModal(1)}>Sign Up</Button>
                    </Button.Group>
                </Menu.Item>
            </React.Fragment>
        )
    }
}

export default AuthLayout