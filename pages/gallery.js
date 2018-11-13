import Router from "next/router"
import Layout from "../components/Layouts/Layout"
import ContextAPI from "../src/config/ContextAPI"
import React from 'react'
import { Divider, Image, Card, Button, Icon } from 'semantic-ui-react'
import axios from 'axios';
import "../static/css/gallery.css";

const API = 'https://graph.facebook.com/v3.2/114272482259035?fields=posts.limit(200){full_picture}&access_token=EAACqlwR17REBAORh8KWT7X0hE66TAnl4XYodGSDJ8byZBg1q8vT2p6CMag8BGc3mUTzWevAH8QKj3MizN1W6P75kax7c3Ig21D3JD3vjO7evXnQCaQpsiPq6s2EyfTk5NpRzM914XeOsvDut6bx7ZByYqVJkskB7O3CbMewwZDZD';


class Gallery extends React.Component {
  constructor() {
    super()

    this.state = {
      images: [],
      imageIndex: 0,
      mainUrl: ""
    };

    this.mainImageRef = React.createRef()
  }
  componentDidMount() {
    axios.get(API)
      .then(res => {
        const images = res.data;
        this.setState({ images: images.posts.data, mainUrl: images.posts.data[0].full_picture });
      })
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
    const { mainUrl, URLs, images, imageIndex } = this.state
    return (
      <Layout title="Gallery">
        <Card.Group itemsPerRow={1} >
          <hidden ref={this.mainImageRef} />
          <div className="ui container">
            {imageIndex > 0 && <i className="big angle arrow left icon" onClick={() => { this.prevImage() }} />}
            {imageIndex < images.length - 1 && <i className="big angle arrow right icon" onClick={() => { this.nextImage() }} />}
            <div className="ui text container slides">
              <div className="card img_height" style={{background: `url(${(images.length > 0) ? images[imageIndex].full_picture : ""})` }}>
              </div>
            </div>
          </div>
        </Card.Group>
        <Card.Group itemsPerRow={3}>
          {images.map(el => {
            return (
              <Card className="card"
                key={el.id}
                onClick={() => {
                  this.onSelectImage(el.full_picture, images.indexOf(el))
                  this.autoScroll()
                }}
                style={{ height: "250px", background: `url(${el.full_picture})` }}>
              </Card>
            )
          })}
        </Card.Group>
      </Layout>
    )
  }
}
export default Gallery
