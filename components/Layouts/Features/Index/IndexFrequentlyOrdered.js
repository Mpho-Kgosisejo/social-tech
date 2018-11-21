import React from 'react'
import { Grid, Icon, Image, Container, Card } from 'semantic-ui-react'

import Slider from "react-slick"

class IndexFrequentlyOrdered extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="frequently-ordered-section">
                    <div className="frequently-ordered-container">
                        <Grid columns={3}  reversed='mobile vertically'>
                            <Grid.Column  className="veritcal-stack">
                                <Card className="veritcal-stack">
                                    <Image src='https://demos.onepagelove.com/html/resto/img/img_square_1.jpg' />
                                    <Card.Content>
                                        <Card.Header>Laboriosam Quod Dignissimos</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>JUNE 29, 2017</span>
                                        </Card.Meta>
                                        <Card.Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto provident qui tempore natus quos quibusdam soluta at.</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            READ MORE
                                        </a>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column  className="veritcal-stack">
                                <Card  className="veritcal-stack">
                                    <Image src='https://demos.onepagelove.com/html/resto/img/img_square_2.jpg' />
                                    <Card.Content>
                                        <Card.Header>Laboriosam Quod Dignissimos</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>JUNE 29, 2017</span>
                                        </Card.Meta>
                                        <Card.Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto provident qui tempore natus quos quibusdam soluta at.</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            READ MORE
                                        </a>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column  className="veritcal-stack">
                                <Card  className="veritcal-stack">
                                    <Image src='https://demos.onepagelove.com/html/resto/img/img_square_3.jpg' />
                                    <Card.Content>
                                        <Card.Header>Laboriosam Quod Dignissimos</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>JUNE 29, 2017</span>
                                        </Card.Meta>
                                        <Card.Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto provident qui tempore natus quos quibusdam soluta at.</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                           READ MORE
                                        </a>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexFrequentlyOrdered;