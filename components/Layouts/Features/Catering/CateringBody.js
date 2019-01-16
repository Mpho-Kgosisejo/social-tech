import { Accordion, Icon, Header } from "semantic-ui-react";
import ContextAPI from "../../../../src/config/ContextAPI";


class CateringBody extends React.Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 0,
        }
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state
        return (
            <ContextAPI.Consumer>
                {({ state }) => (
                    <React.Fragment>
                        <div className="catering-accordion">
                            <Header className="text-align center" as="h2">{state.catering.plans_title}</Header>

                            <Accordion fluid styled>
                                {state.catering.accordion_data.map(item =>
                                    <React.Fragment key={item.index}>
                                        <Accordion.Title active={activeIndex === item.index} index={item.index} onClick={this.handleClick}>
                                            <Icon name='dropdown' />
                                            {item.title}
                                    </Accordion.Title>
                                        <Accordion.Content active={activeIndex === item.index}>
                                            <Header as='h4' color='grey' >{item.subtitle}</Header>
                                            <p>
                                                {item.catering_days}
                                            </p>
                                            <p>
                                                {item.catering_price}
                                            </p>
                                            <p>
                                                {item.catering_TCS}
                                            </p>
                                        </Accordion.Content>
                                    </React.Fragment>
                                )}
                            </Accordion>
                        </div>
                    </React.Fragment>
                )}
            </ContextAPI.Consumer>
        )
    }
}

export default CateringBody