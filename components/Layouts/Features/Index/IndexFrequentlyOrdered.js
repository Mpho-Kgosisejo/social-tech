import React from 'react'
import { Grid, Icon, Image, Container, Card } from 'semantic-ui-react'

import Slider from "react-slick"
import IndexBannerHeader from './IndexBannerHeader';
import ContextAPI from '../../../../src/config/ContextAPI';

class IndexFrequentlyOrdered extends React.Component {
    
    constructor(props)
    {
        super(props)
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <ContextAPI.Consumer>
                {({state}) => 
                <React.Fragment>
                    <IndexBannerHeader desc={state.index.freq_ordered_banner_desc} header={state.index.freq_ordered_banner_header} image={state.index.freq_ordered_banner_img} />
                    <div className="index-frequently-ordered">
                    {state.root_loading ? "" : <Card.Group itemsPerRow={3}>
                        {/* {state.index.freq_ordered_meals.meals.map(item =>                
                            <Card key={item.date_created} className="veritcal-stack">
                                <Image src={item.image} />
                                <Card.Content>
                                    <Card.Header>{item.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{item.date_created}</span>
                                    </Card.Meta>
                                    <Card.Description>{item.desc}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>{item.category}</a>
                                </Card.Content>
                            </Card>
                        )} */}
                    </Card.Group>
                    
                    }
                </div>

                </React.Fragment>
                }                
            </ContextAPI.Consumer>
            )
    }
}

export default IndexFrequentlyOrdered;