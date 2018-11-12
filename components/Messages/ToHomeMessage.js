import Link from "next/link"
import {Message, Icon } from "semantic-ui-react";

export default () => (
    <Message icon>
        <Icon name="world"/>
        <Message.Content>
            Go to -> <Link href="/" ><a>Home Page</a></Link>
        </Message.Content>
    </Message>
)