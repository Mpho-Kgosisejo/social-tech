import React from 'react'
import { Container, Loader } from 'semantic-ui-react'
import { Line, defaults } from 'react-chartjs-2'
import ContextAPI from "../../../../../../../src/config/ContextAPI";


class OrderHIstoryChart extends React.Component {
    constructor(props)
    {
        super(props)
        defaults.scale.gridLines.display = false; 
    }

    checkProps = (cData, cYear) => {
        if (cYear !== "" && cData.length > 0)
        {
            return true
        }
        return false
    }

    _chartData = (cData, cYear) => {
        return(
            {

                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    label: `Order History for the year ${cYear}`,
                    data: cData,
                    showLine : true,
                    lineTension : 0.3,
                    backgroundColor: 'rgba(255,255,255, 0.9)',
                    // backgroundColor: 'rgba(197, 156, 112, 1)',                    
                    borderColor : 'rgba(197, 156, 112, 1)',
                    borderWidth: 2,
                }] 
            }
        )
    }

    

    render()
    {
        const {chartData, currentYear} = this.props
        let data = {}

        if(this.checkProps(chartData, currentYear) === true)
            data = this._chartData(chartData, currentYear)

        return(
            <React.Fragment>
                
                <Line data={data}/>
                
                <pre>{JSON.stringify(this.props, " ", 2)}</pre>
            </React.Fragment>
        )
    }
}    

export default OrderHIstoryChart;