import {Image} from "semantic-ui-react"
import Config from "react-global-configuration"
import jwt from "jsonwebtoken"

import * as Random from "../../src/utils/Random";
import { FRESHEATS_BROWN } from "../../src/Types/ColorsTypes";

const mini = 35
const small = 150

const randNum = () => Random.number({min: 68, max: 97})

const getColor = () => {
    let color = FRESHEATS_BROWN

    if(process.browser){
        try {
            const stored_jwt_color = localStorage.getItem(Config.get("jwt.avatorBG"))

            if (!stored_jwt_color){
                color = `rgb(${randNum()}, ${randNum()}, ${randNum()})`
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

const getDivSizePX = (size) => `${size === "mini" ? mini : small}px`

const Avator = ({url, size, circular = false, avator = false, style = {}}) => (
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
                width: getDivSizePX(size),
                height: getDivSizePX(size),
                lineHeight: getDivSizePX(size),
                background: getColor()
            }}
            className={`avator-initls ${size}`}
            onSelect={null}
            onSelectCapture={null}
        >
            XM
        </div>
    )
)

export default Avator