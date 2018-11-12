import Router from "next/router"
import Layout from "../components/Layouts/Layout"
import ContextAPI from "../src/config/ContextAPI"
import React from 'react'
import { Divider, Image, Card, Button} from 'semantic-ui-react'
import axios from 'axios';
import "../static/css/style.css";

 const API = 'https://graph.facebook.com/v3.2/114272482259035?fields=posts.limit(200){full_picture}&access_token=EAACqlwR17REBAORh8KWT7X0hE66TAnl4XYodGSDJ8byZBg1q8vT2p6CMag8BGc3mUTzWevAH8QKj3MizN1W6P75kax7c3Ig21D3JD3vjO7evXnQCaQpsiPq6s2EyfTk5NpRzM914XeOsvDut6bx7ZByYqVJkskB7O3CbMewwZDZD';


class Gallery extends React.Component {
  constructor(){
    super()

    this.state ={
      images: []
    };

    this.mainImageRef = React.createRef()
  }
  componentDidMount(){
    axios.get(API)
    .then(res => {
      const images = res.data;
      this.setState({images: images.posts.data});
      console.log(images)
    })
  }

  autoScroll = () => {
    window.scrollTo({
      top: this.mainImageRef,
      behavior: "smooth"
    })
  }
  

  onSelectImage = (url) => this.setState({mainUrl: url})

  render(){
    const {mainUrl, URLs, images} = this.state
   
    return (
      <Layout title="Gallery">
      <Card.Group itemsPerRow={1} >
        <hidden ref={this.mainImageRef} />
        <Card image={mainUrl} />
      </Card.Group>
      <Card.Group itemsPerRow={3}>
        {images.map(el => (
          <Card className="card"
            key={el.id}
            onClick={() => {
              this.onSelectImage(el.full_picture)
              this.autoScroll()
            }}
            style={{height: "250px", background: `url(${el.full_picture})`}}>          
            </Card>
        ))}
      </Card.Group>
  </Layout>
    )
  }
}
export default Gallery
