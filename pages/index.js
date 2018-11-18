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
class Index extends React.Component{
    constructor(props){
        super(props)

        this.props.dispatch({type: "SIDEBAR", payload: false})
    }

    render(){
        return (
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
                            <Header as="h5">Fresh eats sub-title, and more...</Header>
                        </Container>
                    </div>
                </div>

                <Container>
                    Index
                </Container>
            </Layout>
        )
    }
}

export default Index