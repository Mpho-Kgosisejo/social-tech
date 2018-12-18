import { Container, Icon, Button } from "semantic-ui-react";
import ReactSlick from "react-slick"
import Link from "next/link"

import ContextAPI from "../../../../src/config/ContextAPI";
import * as NavAlertEngine from "../../../../src/utils/NavAlertEngine"; 

const reactSlickSettings = {
    dots: false,
    infinite: true,
    speed: 750,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
}

const NavAlert = () => (
    <ContextAPI.Consumer>
        {({state}) => {
            const {root_loading, nav_alert, dispatch} = state

            return ((!root_loading && NavAlertEngine.isValidList(nav_alert.list) && nav_alert.show) &&
                <div className={`update-alert ${nav_alert.showAll ? "" : "no-height" }`}>
                    <Container>
                        <ReactSlick  {...reactSlickSettings}>
                            {nav_alert.list.map(alert => {
                                const {header, message, icon} = alert
                                
                                return ( !message ? null :
                                    <div key={nav_alert.list.indexOf(alert)} className="slide-child">
                                        <h5>
                                            {icon && <Icon size="small" name={icon} bordered={false} circular={false} />}
                                            {!header ? null : header.href ? <Link href={header.href}><a>{header.text}</a></Link> : header.text} <span className="message" onClick={() => NavAlertEngine.toggleShowAll({dispatch, showAll: nav_alert.showAll})}>{message}</span>
                                        </h5>
                                    </div>
                                )})
                            }
                        </ReactSlick>

                        <div onClick={() => NavAlertEngine.close(dispatch)}>
                            <Icon className="close" name="close"/>
                        </div>
                    </Container>
                </div> 
            )
        }}
    </ContextAPI.Consumer>
)

export default NavAlert