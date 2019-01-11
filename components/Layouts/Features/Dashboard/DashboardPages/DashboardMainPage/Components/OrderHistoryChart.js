import React from 'react'
import { Container, Loader } from 'semantic-ui-react'
import { Line, defaults } from 'react-chartjs-2'


class OrderHIstoryChart extends React.Component {
    constructor(props)
    {
        super(props)
        defaults.scale.gridLines.display = false; 
        this.state = {
            options : {    
                responsive: true,
                scales: {
                    xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Months'
                            }
                        }],
                    yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Orders'
                            }
                        }]
                },
                // title: {
                //     display: true,
                //     text: `Order History for the year - ${this.props.currentYear}`
                // },
                legend:{
                    // display: true,
                    labels: {
                      usePointStyle: true,
                    }
                  }
            }
        }
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

                labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: `Order History for the year ${cYear}`,
                    data: cData,
                    showLine : true,
                    lineTension : 0.3,
                    backgroundColor: 'rgba(255,255,255, 0.9)',
                    borderColor : 'rgba(197,156,112,1)',
                    borderWidth: 1.5,
                    pointRadius : 4,
                    pointStyle : 'rectRounded',
                    // borderDash : 10
                    // steppedLine : 'false'
                }],                   
            }
        )
    }

    

    render()
    {
        const {chartData, currentYear} = this.props
        const {options} = this.state
        let data = {}

        if(this.checkProps(chartData, currentYear) === true)
            data = this._chartData(chartData, currentYear)

        return(
            <React.Fragment >
                
                <Line data={data} options={options} className="user-list-header"/>
                
                {/* <pre>{JSON.stringify(this.props, " ", 2)}</pre> */}
            </React.Fragment>
        )
    }
}    

export default OrderHIstoryChart;