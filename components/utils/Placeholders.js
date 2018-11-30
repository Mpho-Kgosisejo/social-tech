import { Placeholder, Grid, Segment, Card, Table } from "semantic-ui-react"
import { Container } from "next/dist/lib/app";

import { Divider } from 'semantic-ui-react'

export const PlaceholderSmallParagraph = ({ withImage = false }) => (
    <Placeholder fluid>
        {withImage ?
            (
                <React.Fragment>
                    <Placeholder.Header image >
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </React.Fragment>
            ) :
            (
                <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Paragraph>
            )

        }
    </Placeholder>
)

export const PlaceholderMediumParagraph = ({ withImage = false }) => (
    <React.Fragment>
        <PlaceholderSmallParagraph withImage={withImage} />
        <PlaceholderSmallParagraph />
    </React.Fragment>
)

export const PlaceholderSmallParagraphImage = () => (
    <PlaceholderSmallParagraph withImage={true} />
)


export const PlaceHolderMenu = () => (
    <Grid columns={3} stackable>
        <Grid.Column>
            <Segment raised>
                <Placeholder fluid={true} >
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='medium' />
                        <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Segment>
        </Grid.Column>

        <Grid.Column>
            <Segment raised>
                <Placeholder fluid={true}>
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='medium' />
                        <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Segment>
        </Grid.Column>

        <Grid.Column>
            <Segment raised>
                <Placeholder fluid={true}>
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='medium' />
                        <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Segment>
        </Grid.Column>
    </Grid>
)

export const PlaceHolderGallery = () => (
    <Placeholder fluid className="img_height">
        <Placeholder.Image />
    </Placeholder>
)

export const PlaceHolderGallerySub = () => (
    <Card.Group itemsPerRow={3}>
        <Card className="border-card">
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card>
        <Card className="border-card">
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card>
        <Card className="border-card">
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card>
    </Card.Group>
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

export const AccountHeaderPlaceholder = () =>
    (
        <Container>
            <Placeholder fluid className="account-placeholder">
                <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Paragraph>
            </Placeholder>
        </Container>
    )

export const AccountTabsPlaceholder = () =>
    (
        <Container>
            <Grid columns={2}>
                <Grid.Column width={4} className="account-img-col">
                    <Placeholder style={{ height: 150, width: 150 }}>
                        <Placeholder.Image />
                    </Placeholder>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Placeholder fluid>   
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder>
                </Grid.Column>
            </Grid>
        </Container>
    )