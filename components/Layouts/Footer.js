import React from 'react'
import Link from 'next/link'
import {Grid, List, Icon} from 'semantic-ui-react'

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

const Footer = () => (
    <div className="footer">
        <div className="footer_wideget">
            <div className="footer_container">
                <Grid className="footer_row">
                    <Grid.Row columns={3}>
                    <Grid.Column className="footer_col_1">
                       <h3 className="footer_h3">Our address</h3>
                        <p className="footer_p"> 22 Alnahas Building, 2 AlBahr St, Tanta
                            <br />
                            Al-Gharbia Governorate, Egypt
                        </p>
                        <a className="footer_a" href="https://www.google.com/maps/place/48+Silwood+Rd,+Bramley,+Johannesburg,+2018/@-26.1279852,28.0803513,17z/data=!3m1!4b1!4m5!3m4!1s0x1e950d167db50e61:0x6b58942d39a1bc0!8m2!3d-26.12799!4d28.08254">VIEW ON MAP</a>
                    </Grid.Column>
                    <Grid.Column className="footer_col_2">
                        <h3 className="footer_h3">Stay connected</h3>
                        <input type="text" className="footer_subscriber" placeholder='Subscribe Our Newsletter' />
                        <button type="submit" className="footer_button_icon"><Icon size="small" name="long arrow alternate right"/></button>
                    </Grid.Column>
                    <Grid.Column className="footer_col_3">
                        <h3 className="footer_h3">Contact us</h3>
                        <p className="footer_p">
                            Main Email: FreshEats@mailer.com
                        <br />
                            Phone: 012 345 6789
                        </p>
                        <a className="footer_a" href="/" >SEND MESSAGE</a>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
        <div className="footer_social">
            <div className="footer_social_container">
                <Grid className="footer_social_grid" columns="equal">
                    <Grid.Row className="footer_social_row">
                        <Grid.Column className="social_media_icons">
                            <List className="display-felx" horizontal relaxed>
                                <List.Item>
                                    <Icon name="instagram" size="big"/>
                                </List.Item>
                                <List.Item>
                                    <Icon name="facebook f" size="big"/>
                                </List.Item>
                                <List.Item>
                                    <Icon name="snapchat" size="big"/>
                                </List.Item>
                                <List.Item>
                                    <Icon name="pinterest" size="big"/>
                                </List.Item>
                                <List.Item>
                                    <Icon name="twitter" size="big"/>
                                </List.Item>
                            </List>
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
                        <a className="footer_link_color" href="https://en.wikipedia.org/wiki/Fantastic_Four_(2015_film)">Fantastic 4</a>
                    </div>
                </div>
            </div>
        </div>      
    </div>
)

export default Footer