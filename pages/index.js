import Layout from "../components/Layouts/Layout"

import Slider from "react-slick"
import { Container, Header } from "semantic-ui-react";
import IndexLayout from "../components/Layouts/Features/Index/IndexLayout";


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
        url: "https://static1.squarespace.com/static/558acad1e4b0f9e7d30bd14e/59638592ff7c50bac09c1579/5b2794212b6a288644565104/1529320490905/IMG_1057-2.jpg?format=500w",
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
        url: "https://static1.squarespace.com/static/558acad1e4b0f9e7d30bd14e/59638592ff7c50bac09c1579/596cd3bcdb29d6afc4c3c266/1500304324793/Mondiall-8.jpg?format=750w",
        caption:
        {
            title: "",
            content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        }
    },
    {
        id: 4,
        url: "https://static1.squarespace.com/static/558acad1e4b0f9e7d30bd14e/59638592ff7c50bac09c1579/596cf150a803bb43a3bb9b43/1500311893106/IMG_0540.jpg?format=500w",
        caption:
        {
            title: "",
            content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        }
    }
]

class Index extends React.Component {
    componentDidMount() {
        this.props.dispatch({ type: "SIDEBAR", payload: false })
    }

    render() {
        return (
            <Layout title="Home" includeContainer={false} includeNav={true}>
                <div className="slider-container" >
                    <Slider {...settings} className="de-slider">
                        {sliderImages.map(image => (
                            <div key={image.id} className="de-slider-item">
                                <div key={image.key} className="slider-bg" style={{ backgroundImage: `url(${image.url})` }}>
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
                    <IndexLayout />
                </Container>
            </Layout>
        )
    }
}
export default Index