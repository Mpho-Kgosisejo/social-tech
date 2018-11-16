import Layout from "../components/Layouts/Layout"

import Slider from "react-slick"
import { Container } from "semantic-ui-react";

const settings = {
    // dots: true,
    infinite: true,
    speed: 750,
    autoplaySpeed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
}

const sliderImages = [
    {
        id: 1,
        url: "http://www.arrowstudio.com/img/foodphotography/restaurant-food-photography.jpg"
    }, {
        id: 2,
        url: "http://www.arrowstudio.com/img/foodphotography/food-photographer-florida.jpg"
    }
]

const Index = () => (
    <Layout title="Home" includeContainer={false}>
        <div className="slider-container" >
            <Slider {...settings} className="de-slider">
                {sliderImages.map(image => (
                    <div key={image.id}>
                        <div key={image.key} className="slider-bg" style={{backgroundImage: `url(${image.url})`}}>
                            <div className="slider-dimmer">
                                <div className="slider-item">

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>

        <Container>
            Index
        </Container>
    </Layout>
)

export default Index