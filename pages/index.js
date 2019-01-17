import "../static/css/index.css"
import "../static/css/style.css"
import Layout from "../components/Layouts/Layout"

import Slider  from "react-slick"
import { Container, Header, Image } from "semantic-ui-react";
import IndexLayout from "../components/Layouts/Features/Index/IndexLayout";
import api from "../src/providers/APIRequest"
import ContextAPI from "../src/config/ContextAPI"

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
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.getData()
        setTimeout(() => {
            this.props.dispatch({ type: "SIDEBAR", payload: false })
            this.props.dispatch({ type: "PAGE", payload: "index" })

            window.scrollTo({
                top: 1,
                behavior: "smooth"
            })
            setTimeout(() => {
                this.getData()
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }, 50)
        }, 50)
    }

    getData = async () => {
        const data = await api.web.index()

        if (data.status == 200) {
            this.props.dispatch({ type: "INDEX", payload: { ...data.data } })
            this.setState({ loading: false })
        } else {
            this.setState({ loading: false })
        }
    }

    render() {
        return (
            <Layout includeContainer={false} includeNav={true}>
                <ContextAPI.Consumer>
                    {({ state }) => (
                        <React.Fragment>
                            <div className="slider-container" >
                                <Slider {...settings} className="de-slider">
                                    {sliderImages.map(image => (
                                        <div key={image.id} className="de-slider-item">
                                            <div key={image.key} className="slider-bg" style={{ background: `url(${image.url})` }}>
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
                                        <Header as="h1">{state.index.slide_title}</Header>
                                        <Header as="h5">{state.index.slide_subtitle}</Header>
                                    </Container>
                                </div>
                            </div>
                            <Container>
                                {(!state.root_loading && !this.state.loading) && <IndexLayout />}
                            </Container>
                        </React.Fragment>
                    )}

                </ContextAPI.Consumer>
            </Layout>
        )
    }
}
export default Index