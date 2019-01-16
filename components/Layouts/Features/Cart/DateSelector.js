import React from "react"
import Datepicker from "react-datepicker"
import {Header, Grid, Input, Label, Icon} from "semantic-ui-react"

import "../../../../static/css/react-datepicker.css"
import {LIGHT_RED, MILKY_RED} from "../../../../src/Types/ColorsTypes"

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

    handleOnRemoveDate = (d) => {
        const {date} = this.props.cartState
        const {cartDispatch} = this.props.funcs

        cartDispatch({
            date: {
                ...date,
                dates: date.dates.filter(dd => {if (dd !== d) return (dd)})
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
                        <Header className="zero-margin-top">{`${delivery ? "Delivery" : "Collection"}`} <span>(Date/s - {date.dates.length})</span>:</Header>
                    </Grid.Column>
                    {/* <Grid.Column textAlign="right">
                        <Header className="zero-margin-top">R0.0</Header>
                    </Grid.Column> */}
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column >
                        <Datepicker
                            // onFocus={() => this.open(true)}
                            // onClickOutside={() => this.open(false)}
                            // open={open}

                            excludeDates={date.dates}
                            highlightDates={date.dates}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            placeholderText="dd/mm/yyyy - hh-MM-ss"
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
                        {date.dates.length > 0 ? (
                            <div className="date-container">
                                <Label.Group>
                                    {date.dates.map((d, i) => (
                                        <Label key={i}>
                                            {d.toLocaleDateString()} - <span>{d.toLocaleTimeString()}</span>
                                            <Icon name="close" onClick={() => this.handleOnRemoveDate(d)} />
                                        </Label>
                                    ))}
                                </Label.Group>
                            </div>
                        ) : (
                            <div className="date-container error">
                                <Label.Group size="tiny">
                                    <Label>You must at least add one (1) {delivery ? "delivery" : "collection"} date/s...</Label>
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