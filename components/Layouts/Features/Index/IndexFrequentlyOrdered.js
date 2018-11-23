import React from 'react'
import { Grid, Icon, Image, Container, Card } from 'semantic-ui-react'

import Slider from "react-slick"
import IndexBannerHeader from './IndexBannerHeader';

class IndexFrequentlyOrdered extends React.Component {

    render() {
        return (
            <React.Fragment>

                <IndexBannerHeader desc="From the top sold dishes that our users prefer" header="Frequently ordered meals" image="http://themearth.com/demo/html/restaura/view/assets/img/menu/menu2.jpg" />
                <div className="index-frequently-ordered">
                <Card.Group itemsPerRow={3}>
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
                    <Card className="veritcal-stack">
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
                    <Card className="veritcal-stack">
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
                    <Card className="veritcal-stack">
                        <Image src='https://demos.onepagelove.com/html/resto/img/img_square_4.jpg' />
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
                    <Card className="veritcal-stack">
                        <Image src='https://demos.onepagelove.com/html/resto/img/img_square_5.jpg' />
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
                </Card.Group>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexFrequentlyOrdered;