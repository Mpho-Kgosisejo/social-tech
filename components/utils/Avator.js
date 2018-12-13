import {Image, Placeholder} from "semantic-ui-react"
import Config from "react-global-configuration"
import jwt from "jsonwebtoken"

import ContextAPI from "../../src/config/ContextAPI"
import * as Random from "../../src/utils/Random";
import { FRESHEATS_BROWN } from "../../src/Types/ColorsTypes";

const mini = 35
const small = 150

const randNum = () => Random.number({min: 68, max: 97})

const randColor = () => `rgb(${randNum()}, ${randNum()}, ${randNum()})`

const getColor = () => {
    let color = FRESHEATS_BROWN

    if(process.browser){
        try {
            const stored_jwt_color = localStorage.getItem(Config.get("jwt.avatorBG"))

            if (!stored_jwt_color){
                color = randColor()
                const jwtColor = jwt.sign({color}, Config.get("jwt.secret"))
                localStorage.setItem(Config.get("jwt.avatorBG"), jwtColor)
            }else{
                const decoded_color = jwt.verify(stored_jwt_color, Config.get("jwt.secret"))
                color = decoded_color.color
            }
        } catch (error) {}
    }
    
    return (color)
}

const getInitials = ({state}) => {
    let initials = "FE"
    const {login, account} = state
    
    if (Object.keys(login).length > 0){
        if (account && account.personal_details && (account.personal_details.firstname && account.personal_details.lastname)){
            let {firstname, lastname} = account.personal_details

            firstname = firstname.toUpperCase()
            lastname = lastname.toUpperCase()

            initials = firstname.charAt(0)
            initials += lastname.charAt(0)
        }else{
            let {username} = login

            username = username.toUpperCase()
            initials = username.charAt(0)
        }
    }
    return (initials)
}

const getDivSizePX = (size) => `${size === "mini" ? mini : small}px`

const Avator = ({url, size, circular = false, avator = false, style = {}}) => 
{
    style = {
        ...style,
        width: getDivSizePX(size),
        height: getDivSizePX(size)
    }

    return(
        <ContextAPI.Consumer>
            {({state}) => (
                state.root_loading ?
                    <Placeholder style={{ ...style, borderRadius: "50%" }}>
                        <Placeholder.Image />
                    </Placeholder> :
                    (url ?
                        <Image
                            alt="Image not Found"
                            src={url}
                            size={size}
                            circular={circular}
                            avatar={avator}
                            style={style}
                        />
                        :
                        <div
                            style={{
                                ...style,
                                lineHeight: getDivSizePX(size),
                                background: getColor()
                            }}
                            className={`avator-initls ${size}`}
                            onSelect={null}
                            onSelectCapture={null}
                        >
                            {getInitials({state})}
                        </div>
                    )
            )}
        </ContextAPI.Consumer>
    )
}

export default Avator