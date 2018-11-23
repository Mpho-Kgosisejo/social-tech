import React from 'react'
import { Grid, Header, Divider, Container } from 'semantic-ui-react'

import Slider from "react-slick"

class IndexSlider extends React.Component {

    settings = {
        dots: true,
        infinite: true,
        speed: 750,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }

    sliderImages = [
        // {
        //     id: 1,
        //     url: "https://pixabay.com/get/eb3db10d2bf7033ed1534705fb094796e475e2dd1db00c4090f4c37ca4e8b3b1d8/pizza-2802332_1920.jpg",
        //     caption: {
        //         title: "",
        //         content: "Nothing is better than going home to family and eating good food and relaxing."
        //     }
        // }, {
        //     id: 2,
        //     url: "https://pixabay.com/get/eb35b1062dfd013ecd1f4405e14e469ee776ffd41cb5134496f5c678a2/platter-2009590.jpg",
        //     caption: {
        //         title: "",
        //         content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        //     }
        // }, {
        //     id: 3,
        //     url: "https://pixabay.com/get/e034b90929f71c3e955b4502e44c4e92e26ae3d01db3144290f8c57e/dish-918613.jpg",
        //     caption: {
        //         title: "",
        //         content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        //     }
        // }, {
        //     id: 4,
        //     url: "https://pixabay.com/get/eb35b1062dfd013ecd1f4405e14e469ee776ffd41cb5134496f5c678a2/platter-2009590.jpg",
        //     caption: {
        //         title: "",
        //         content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        //     }
        // },
        {
            id: 1,
            url: "http://www.arrowstudio.com/img/foodphotography/restaurant-food-photography.jpg",
            caption: {
                title: "",
                content: "Nothing is better than going home to family and eating good food and relaxing."
            }
        }, {
            id: 2,
            url: "http://www.arrowstudio.com/img/foodphotography/food-photographer-florida.jpg",
            caption: {
                title: "",
                content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
            }
        }
    ]

    render() {
        return (
            <React.Fragment>
                <div className="index-slider-div">
                    <div className="index-slider-container">
                        <div className="index-slider-row  align-iterms-center">
                            <div className="index-slider-content">
                                <p className="header-sub">Don't miss out...</p>
                                <Header className="header-title" as="h2">Recommended & trending</Header>
                                <Divider className="header-divider" />
                                <Grid className="margin-zero">
                                    <Grid.Column width={3}>
                                        <p></p>
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <p className="header-desc">Follow our latest news updates to know about our offers, recipes and events. One cannot think well, love well, sleep well, if one has not dined well.</p>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <p></p>
                                    </Grid.Column>
                                </Grid>
                            </div>
                            <div className="index-slides-row">
                                <div className="index-content-slider-container" >
                                    <Slider {...this.settings} className="de-slider">
                                        {this.sliderImages.map(image => (
                                            <div key={image.id} className="de-slider-item">
                                                <div key={image.key} className="slider-bg" style={{ overflow: `hidden`, height: `582px`, backgroundImage: `url(${image.url})` }}>
                                                    <div className="slider-dimmer">
                                                        <div className="slider-item">
                                                            <Container>
                                                                <div className="quotes">
                                                                    {/* <Header as="h5">{`"${image.caption.content}"`}</Header> */}
                                                                </div>
                                                            </Container>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexSlider;