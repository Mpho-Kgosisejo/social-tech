import {Placeholder, Table} from "semantic-ui-react"

export const PlaceholderSmallParagraph = ({withImage = false}) => (
    <Placeholder fluid>
        {withImage ? 
            (
                <React.Fragment>
                    <Placeholder.Header image >
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </React.Fragment>
            ) :
            (
                <Placeholder.Paragraph>
                    <Placeholder.Line/>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Paragraph>
            )    
        }
    </Placeholder>
)

export const PlaceholderMediumParagraph = ({withImage = false}) => (
    <React.Fragment>
        <PlaceholderSmallParagraph withImage={withImage}/>
        <PlaceholderSmallParagraph />
    </React.Fragment>
)

export const PlaceholderSmallParagraphImage = () => (
    <PlaceholderSmallParagraph withImage={true} />
)

export const CartTablePlaceholder = () => (
    <Table.Body className="items">
        <Table.Row>
            <Table.Cell width={2}>
                <Placeholder>
                    <Placeholder.Image square />
                </Placeholder>
            </Table.Cell>
            <Table.Cell width={8}>
                <PlaceholderSmallParagraph />
            </Table.Cell>
            <Table.Cell width={2}>
                <PlaceholderSmallParagraph />
            </Table.Cell>
            <Table.Cell width={2}>
                <PlaceholderSmallParagraph />
            </Table.Cell>
            <Table.Cell width={2}>
                <PlaceholderSmallParagraph />
            </Table.Cell>
        </Table.Row>
    </Table.Body>
)