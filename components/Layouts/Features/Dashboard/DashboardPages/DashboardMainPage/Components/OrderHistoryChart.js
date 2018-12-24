import React from 'react'
import { Container } from 'semantic-ui-react'
import { Line, defaults } from 'react-chartjs-2'

class OrderHIstoryChart extends React.Component {
    constructor()
    {
        super()
        defaults.scale.gridLines.display = false;        
        this.state = {
            chartData : {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    label: 'Orders History',
                    data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                    showLine : true,
                    lineTension : 0.3,
                    backgroundColor: 'rgba(255,255,255, 0.9)',
                    borderColor : 'rgba(255,99,132,1)',
                    borderWidth: 2,
                }] 
            }
        }
    }

    render()
    {

        return(
            <div>
                <h1>I AM THE order history chart component</h1>
                <Line data={this.state.chartData}/>
            </div>
        )
    }
}    

export default OrderHIstoryChart;