import Router from "next/router"
import Layout from "../components/Layouts/Layout"
import ContextAPI from "../src/config/ContextAPI"
import React from 'react'
import { Divider, Image, Card, Button, Icon, Header } from 'semantic-ui-react'
import axios from 'axios';
import "../static/css/gallery.css";
import api from '../src/providers/APIRequest';
import { isEmptyObj } from "../src/utils/Objs";

//const API = 'https://graph.facebook.com/v3.2/114272482259035?fields=posts.limit(200){full_picture}&access_token=EAACqlwR17REBAORh8KWT7X0hE66TAnl4XYodGSDJ8byZBg1q8vT2p6CMag8BGc3mUTzWevAH8QKj3MizN1W6P75kax7c3Ig21D3JD3vjO7evXnQCaQpsiPq6s2EyfTk5NpRzM914XeOsvDut6bx7ZByYqVJkskB7O3CbMewwZDZD';
//const API = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=4568877052.1677ed0.a60877d3a14849cbaf47fb1acb2a88ad';

class Gallery extends React.Component {
  constructor() {
    super()

    this.state = {
      data: [],
      mainUrl: "",
      imageIndex: 0
    }
    this.mainImageRef = React.createRef()
  }

  getData = async () => {
    const res = await api.gallery.getInstaImgs()

    if (res.status === 200) {
      const { data } = res.data
      this.setState({ data, mainUrl: data[0].images.low_resolution.url });
    } else {
      res.status(404).send('Bad Request')
    }
  }

  componentDidMount() {
    this.getData()
  }

  myIncludes = (str) => {
    return (str.includes(".jpg") || str.includes(".JPG") || str.includes(".PNG") || str.includes(".png"))
  }

  autoScroll = () => {
    window.scrollTo({
      top: this.mainImageRef,
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

  onSelectImage = (url, indx) => this.setState({ mainUrl: url, imageIndex: indx })


  render() {
    const { data, imageIndex, mainUrl } = this.state

    return (
      <>
        <div style={{ marginTop: "75px" }}>
          <Header as='h2' icon textAlign='center'>
            <Icon name='camera' circular />
            <Header.Content className="font_header" >Our Gallery</Header.Content>
          </Header>
        </div>
        {!isEmptyObj(data) ?
          <div className="image_height">
            <div className="ui container slides">
            {imageIndex > 0 && <i className="big angle arrow left icon arrow-left" onClick={() => { this.prevImage() }} />}
            {imageIndex < data.length - 1 && <i className="big angle arrow right icon arrow_right" onClick={() => { this.nextImage() }} />}
              <div className="gallery-card img_height" style={{ background: `url(${data[imageIndex].images.standard_resolution.url})` }}>
                <hidden ref={this.mainImageRef} />
              </div>
            </div>
          </div>
          : ""}
        <Layout title="Gallery">
          {!isEmptyObj(data) ? <>
            <Card.Group  doubling itemsPerRow={3} stackable>
              {data.map(el => {
                return (
                  <Card
                    onClick={() => {
                      this.onSelectImage(el.images.low_resolution.url, data.indexOf(el))
                      this.autoScroll()
                    }}>
                    <div className="gallery-card gallery-height" style={{background: `url(${el.images.low_resolution.url})` }}></div>
                    <Button className="insta-butt" onClick={() =>{window.open(data[imageIndex].link)}}>
                    <i>Instagram</i>
                    </Button>
                  </Card>
                )
              })}
            </Card.Group>
          </> : ""}
        </Layout>
      </>
    )
  }
}
export default Gallery