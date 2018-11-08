import Router from "next/router"
import Layout from "../components/Layouts/Layout"
import ContextAPI from "../src/config/ContextAPI"
import React from 'react'
import { Divider, Image, Card } from 'semantic-ui-react'


class Gallery extends React.Component {
  constructor(){
    super()

    this.state = {
      mainUrl: "",
      URLs: [
        {url: "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg"},
        {url: "https://preview.ibb.co/iZ3Lww/img2.jpg"},
        {url: "https://preview.ibb.co/iQsPOb/img3.jpg"},
        {url: "https://preview.ibb.co/gFFdib/img4.jpg"},
        {url: "https://preview.ibb.co/hS5ppG/img5.jpg"},
        {url: "https://preview.ibb.co/goKtGw/img6.jpg"},
        {url: "https://preview.ibb.co/bSWjOb/img7.jpg"},
        {url: "https://preview.ibb.co/i2o9pG/img8.jpg"},
        {url: "https://preview.ibb.co/bSWjOb/img7.jpg"},
        {url: "https://preview.ibb.co/bSWjOb/img7.jpg"},
        {url: "https://preview.ibb.co/bSWjOb/img7.jpg"},
        {url: "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg"},
        {url: "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg"},
        {url: "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg"}
      ]
    }
  }

  onSelectImage = (url) => this.setState({mainUrl: url})

  render(){
    const {mainUrl, URLs} = this.state
    const src = "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg"

    return (
      <Layout title="Gallery">
      <Card.Group itemsPerRow={1}>
        <Card image={mainUrl} />
      </Card.Group>

      <Card.Group itemsPerRow={3}>
        {URLs.map(el => (
          <Card image={el.url} onClick={() => this.onSelectImage(el.url)} />
        ))}
      </Card.Group>
  </Layout>
    )
  }
}
export default Gallery
