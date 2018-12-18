import "../static/css/index.css"
import "../static/css/style.css"
import Layout from "../components/Layouts/Layout"

import ReactSlick from "react-slick"
import { Container, Header, Image } from "semantic-ui-react";
import IndexLayout from "../components/Layouts/Features/Index/IndexLayout";


const reactSlickSettings = {
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
        url: "http://7oroof.com/tfdemos/wp-granny/wp-content/uploads/2017/06/granny-bg-parallax9.jpg",
        caption:
        {
            title: "",
            content: "Nothing is better than going home to family and eating good food and relaxing."
        }
    },
    {
        id: 2,
        url: "https://www.bistrotheque.com/files/_mediumImage/bistrotheque_menus_1.jpg",
        caption:
        {
            title: "",
            content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        }
    },
    {
        id: 3,
        url: "http://braesideeatery.com/wp-content/uploads/2015/05/stacks_image_2681.jpg",
        caption:
        {
            title: "",
            content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        }
    },
    {
        id: 4,
        url: "http://theemptyglasslimerick.com/wp-content/uploads/2017/02/Stocksy_txpcd1dc0eemKP100_Medium_1292869.jpg",
        caption:
        {
            title: "",
            content: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."
        }
    }
]

class Index extends React.Component {
    constructor(props)
    {
        super(props)
    }
    componentDidMount(){
        setTimeout(() => {
            this.props.dispatch({type: "SIDEBAR", payload: false})
            this.props.dispatch({type: "PAGE", payload: "index"})
            window.scrollTo({
                top: 1,
                behavior: "smooth"
            })
            setTimeout(() =>{
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }, 50)
        }, 50) 
    }

    render() {
        return (
            <Layout includeContainer={false} includeNav={true}>
                <div className="slider-container" >
                    <ReactSlick {...reactSlickSettings} className="de-slider">
                        {sliderImages.map(image => (
                            <div key={image.id} className="de-slider-item">
                                <div key={image.key} className="slider-bg" style={{ background : `url(${image.url})` }}>
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
                    </ReactSlick>
                <div className="static-caption">
                        <Container>
                            <Header as="h1">fresh eats.</Header>
                            <Header as="h5">Something fresh all the time...</Header>
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