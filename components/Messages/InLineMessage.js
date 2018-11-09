import {Label} from "semantic-ui-react"

import {LIGHT_RED, LIGHT_ORANGE} from "../../src/Types/ColorsTypes"

export const InLineError = ({message}) => (
    <Label basic style={{color: LIGHT_RED, borderColor: LIGHT_RED}} size="tiny" pointing>
        {message}
    </Label>
// <span style={{color: "#ae5856"}}>{message}</span>
)

export const InLineWarning = ({message}) => (
    <Label basic style={{color: LIGHT_ORANGE, borderColor: LIGHT_ORANGE}} size="tiny" pointing>
        {message}
    </Label>
// <span style={{color: "#ae5856"}}>{message}</span>
)