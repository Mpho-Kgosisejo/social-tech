import {Message, Icon } from "semantic-ui-react";

const IconMessage = (iconName, header, message) => (
    <Message icon={iconName} header={header} content={message}/>
)

export default IconMessage