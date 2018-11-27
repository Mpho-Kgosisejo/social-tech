import {GoogleApiWrapper, Map, Marker} from "google-maps-react"

const LoadingContainer = () => (
    <div>Loading Google Map...</div>
)

export class GoogleMaps extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            company: {
                title: "Wethinkcode_ (JHB Campus)",
                position: {
                    lat: -26.2049385,
                    lng: 28.040159000000017
                }
            },
            destination: {
                title: "23-68 Steve Biko Rd",
                position: {
                    lat: -25.751616,
                    lng: 28.203509
                }
            }
        }

        this.map = null
    }

    handleDistanceCompute = ({}) => {
        const {Map, DistanceMatrixService, LatLng, DirectionsService, DirectionsRenderer} = this.props.google.maps
        const origin = new LatLng(this.state.company.position.lat, this.state.company.position.lng)
        const destination = new LatLng(this.state.destination.position.lat, this.state.destination.position.lng)

        const directionsRenderer = new DirectionsRenderer()
        const directionsService = new DirectionsService()

        new DistanceMatrixService().getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
            avoidHighways: false,
            avoidTolls: false,
        }, ((response, status) => {
            const {
                destinationAddresses,
                originAddresses,
                rows
            } = response

            if (status === "OK" && rows.length > 0 && rows[0].elements.length > 0){
                const {distance, duration, status} = rows[0].elements[0]

                if (status === "OK"){
                    console.log("distance", distance)
                    console.log("duration", duration)
                    var request = {
                        origin,
                        destination,
                        travelMode: 'DRIVING'
                      };

                    directionsRenderer.setMap(this.map)
                    console.log("-_-", this.map)
                    directionsService.route(request, (result, status) => {
                        if (status === "OK"){
                            console.log("Directions OK")
                            directionsRenderer.setDirections(result)
                        }
                    })

                    return
                }
            }

            console.log("Error")
        }))
    }

    readyMap = (mapProps, map) => {
        this.map = map
        console.log(">", this.map)
        this.handleDistanceCompute({})  
    }

    render(){
        return(
            <Map
                google={this.props.google}
                zoom={15}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                initialCenter={this.state.company.position}
                fullscreenControl={false}
                mapTypeControl={false}
                streetViewControl={false}
                // draggable={false}

                bounds={this.MapBounds}

                onReady={this.readyMap}
            >
                <Marker {...this.state.company} />
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCrU9Rw7a253dKb-SMfEeCsGYgFVw9GehQ",
    LoadingContainer
})(GoogleMaps)