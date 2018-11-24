import React from 'react'
import { Card, Button, Header, Divider, Container } from 'semantic-ui-react'

import {PlaceholderMediumParagraph} from "../components/utils/Placeholders"
import Layout from "../components/Layouts/Layout"
import api from '../src/providers/APIRequest';
import { isEmptyObj } from "../src/utils/Objs";

//const API = 'https://graph.facebook.com/v3.2/114272482259035?fields=posts.limit(200){full_picture}&access_token=EAACqlwR17REBAORh8KWT7X0hE66TAnl4XYodGSDJ8byZBg1q8vT2p6CMag8BGc3mUTzWevAH8QKj3MizN1W6P75kax7c3Ig21D3JD3vjO7evXnQCaQpsiPq6s2EyfTk5NpRzM914XeOsvDut6bx7ZByYqVJkskB7O3CbMewwZDZD';
//const API = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=4568877052.1677ed0.a60877d3a14849cbaf47fb1acb2a88ad';

class Gallery extends React.Component {
    constructor() {
        super()

        this.state = {
            data: [],
            imageIndex: 0,
            size: {}
        }
        this.mainImageRef = React.createRef()
    }

    s = (el) => {
        if (el){
            this.setState({size: el.getBoundingClientRect()})
        }
    }

    getData = async () => {
        const res = await api.gallery.getInstaImgs()

        if (res.status === 200) {
            const { data } = res.data
            this.setState({ data });
        } else {
            res.status(404).send('Bad Request')
        }
    }

    componentDidMount() {
        this.getData()

        this.props.dispatch({type: "SIDEBAR", payload: false})
    }

    myIncludes = (str) => {
        return (str.includes(".jpg") || str.includes(".JPG") || str.includes(".PNG") || str.includes(".png"))
    }

    autoScroll = () => {
        window.scrollTo({
            top: this.state.size.top,
            behavior: "smooth"
        })
    }

    nextImage = () => {
        this.setState({
            imageIndex: this.state.imageIndex + 1
        })
    }
    prevImage = () => {
        this.setState({
            imageIndex: this.state.imageIndex - 1
        })
    }

    onSelectImage = (indx) => this.setState({ imageIndex: indx })


    render() {
        const { data, imageIndex } = this.state

        return (
                <>
                <Layout title="Gallery">
                    <Header as='h2' textAlign='center'>
                        Our Gallery
                    </Header>

                    <i ref={this.s} />
                    <Divider />
                    
                    {!isEmptyObj(data) ?
                        <>
                            <div className="image_height">
                                <div className="ui slides">
                                    {imageIndex > 0 && <div className="icon-container left"><i className="big angle arrow left icon arrow-left" onClick={() => { this.prevImage() }} /></div>}

                                    <div className="gallery-card img_height" style={{ backgroundImage: `url(${data[imageIndex].images.standard_resolution.url})` }}>
                                    </div>

                                    {imageIndex < data.length - 1 && <div className="icon-container right"><i className="big angle arrow right icon arrow_right" onClick={() => { this.nextImage() }} /></div>}
                                </div>
                            </div>
                            <Divider hidden />
                            <Card.Group doubling itemsPerRow={3} stackable>
                                {data.map(el => {
                                    return (
                                        <Card key={el.id}
                                            onClick={() => {
                                                this.onSelectImage(data.indexOf(el))
                                                this.autoScroll()
                                            }}>
                                            <div className="gallery-card gallery-height" style={{ background: `url(${el.images.low_resolution.url})` }}></div>
                                            <Button className="insta-butt" onClick={() => { window.open(data[imageIndex].link) }}>
                                                <i>Instagram</i>
                                            </Button>
                                        </Card>
                                    )
                                })}
                            </Card.Group>
                        </>: <PlaceholderMediumParagraph />
                    }
                </Layout>
            </>
        )
    }
}
export default Gallery