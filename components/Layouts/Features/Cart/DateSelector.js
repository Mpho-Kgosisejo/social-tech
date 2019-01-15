import React from "react"
import Datepicker from "react-datepicker"
import {Header, Grid, Input, Label, Icon} from "semantic-ui-react"

import "../../../../static/css/react-datepicker.css"

class DateSelector extends React.Component {
    state = {
        open: false
    }

    handleOnChange = (d) => {
        const {cartDispatch} = this.props.funcs
        const {date} = this.props.cartState

        cartDispatch({
            date: {
                ...date,
                inputValue: new Date(d)
            }
        })
    }

    handleOnAddDate = () => {
        const {date} = this.props.cartState
        const {cartDispatch} = this.props.funcs

        if (date.inputValue){
            date.dates.push(date.inputValue)
            this.open(false)

            cartDispatch({
                date: {
                    ...date,
                    inputValue: null
                }
            })
        }
    }

    open = (open) => this.setState({open})

    render(){
        const {date, delivery} = this.props.cartState
        const {open} = this.state

        return (
            <>
                <Grid.Row>
                    <Grid.Column>
                        <Header className="zero-margin-top">{`${delivery ? "Delivery" : "Collection"} Date/s`} <span>({date.dates.length})</span>:</Header>
                        <Datepicker
                            onFocus={() => this.open(true)}
                            onClickOutside={() => this.open(false)}
                            open={open}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            customInput={
                                <Input
                                    fluid
                                    labelPosition="right"
                                    label={
                                        <Label
                                            onClick={this.handleOnAddDate}
                                            style={{cursor: "pointer"}}
                                        >
                                            {/* <Icon name="add"/> */}
                                            Add
                                        </Label>
                                    }
                                />
                            }
                            minDate={new Date()}
                            onChange={this.handleOnChange}
                            value={date.inputValue && (`${date.inputValue.toLocaleDateString()} - ${date.inputValue.toLocaleTimeString()}`)}
                        />
                        {date.dates.length > 0 && (
                            <div className="date-container">
                                <Label.Group>
                                    {date.dates.map((d, i) => (
                                        <Label key={i}>{d.toLocaleDateString()} - <span>{d.toLocaleTimeString()}</span></Label>
                                    ))}
                                </Label.Group>
                            </div>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </>
        )
    }
}

export default DateSelector