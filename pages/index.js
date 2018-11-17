import Layout from "../components/Layouts/Layout"

import Slider from "react-slick"
import { Container, Header } from "semantic-ui-react";

const settings = {
    dots: true,
    infinite: true,
    speed: 750,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
}

const sliderImages = [
    {
        id: 1,
        url: "https://pixabay.com/get/e837b10628f4063ed1584d05fb0938c9bd22ffd41cb5134594f3c87fa3/food-1209007_1280.jpg",
        caption: 
        {
            title: "",
            content: "Nothing is better than going home to family and eating good food and relaxing."
        }
    },
    {
        id: 2,
        url: " https://www.publicdomainpictures.net/pictures/220000/velka/food-kitchenspices-spoon-wood.jpg",
        caption: 
        {
            title: "",
            content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        }
    },
    {
        id: 3,
        url: "https://pixabay.com/get/eb3cb90c2ff4083ed1584d05fb0938c9bd22ffd41cb5134594f4c378a6/dark-mood-food-2983709_1280.jpg",
        caption: 
        {
            title: "",
            content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        }
    },
    {
        id: 4,
        url: "https://pixabay.com/get/ec31b0062af61c22d2524518a33219c8b66ae3d01db3154090f9c27f/wine-541922_1280.jpg",
        caption: 
        {
            title: "",
            content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        }
    }
    
]


const Index = () => (
    <Layout title="Home" includeContainer={false} includeNav={true}>
        <div className="slider-container" >
            <Slider {...settings} className="de-slider">
                {sliderImages.map(image => (
                    <div key={image.id} className="de-slider-item">
                        <div key={image.key} className="slider-bg" style={{backgroundImage: `url(${image.url})`}}>
                            <div className="slider-dimmer">
                                <div className="slider-item">
                                    <Container>
                                        <div className="quotes">
                                            {/* <Header as="h1" className="fresheats-brown-color">Quotes:</Header> */}
                                            <Header as="h5">{`"${image.caption.content}"`}</Header>
                                        </div>
                                    </Container>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            <div className="static-caption">
                <Container>
                    <Header as="h1">Fresh Eats</Header>
                    <Header as="h5">Fresh eats something fresh all the time...</Header>
                </Container>
            </div>
        </div>

        <Container>
            Index
        </Container>
    </Layout>
)

export default Index