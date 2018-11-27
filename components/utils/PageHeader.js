import {Container} from "semantic-ui-react"
import { FRESHEATS_BROWN } from "../../src/Types/ColorsTypes";

const PageHeader =
({
    title = "",
    subtitle = "",
    paddingTop = true,
    center = false,
    color = FRESHEATS_BROWN,
    gradient = false,
    image = "http://7oroof.com/tfdemos/wp-granny/wp-content/uploads/2017/06/granny-bg-parallax9.jpg"
}) => (
    <div className="parent-page-header" style={{background: `url(${image})`}}>
        <div className={`${gradient && "gradient"}`}>
            <div className={`page-header ${paddingTop && "padding-top"}`}>
                <Container className={`${center && "center"}`}>
                        <h1 style={{color: `${color}`}}>{title}</h1>
                        <h3 style={{color: `${color}`}}>{subtitle}</h3>
                </Container>
            </div>
        </div>
    </div>
)

export default PageHeader