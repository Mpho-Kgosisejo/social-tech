import React from 'react'
import Link from 'next/link'
import {Grid, Image} from 'semantic-ui-react'

const Footer = () => (
    <div className="footer">
        <div className="footer_wideget">
            <div className="footer_container">
                <Grid className="footer_row">
                    <Grid.Row columns={3}>
                    <Grid.Column className="footer_col_1">
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column className="footer_col_2">
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column className="footer_col_3">
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
        <div className="footer_social">
            <div className="footer_social_container">
                <Grid className="footer_social_grid" columns="equal">
                    <Grid.Row footer_social_row>
                        <Grid.Column className="social_media_icons">

                        </Grid.Column>
                        <Grid.Column className="subscribe_to_newsletter">

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
        <div className="footer_copywrite">
            <div className="footer_copywriter_container">
                <div className="footer_copywriter_row">
                    <div className="copywriter_info">
                        <span>© 2019 Fresh Eats, With Love by the </span>
                        <a className="fantastics" href="\">Fantastic 4</a>
                    </div>
                </div>
            </div>
        </div>      
    </div>
)

export default Footer