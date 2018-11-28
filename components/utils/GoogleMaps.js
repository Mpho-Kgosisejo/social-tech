import {GoogleApiWrapper, Map, Marker} from "google-maps-react"
import { Input, Form, Divider, Segment, Header, Icon } from "semantic-ui-react";

const LoadingContainer = () => (
    <Segment placeholder className="googlemaps-loading">
        <Header icon>
        <Icon name='map outline' />
            Google Maps loading...
        </Header>
  </Segment>
)

export class GoogleMaps extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loadingAutoComplete: false
        }

        this.map = null
        this.marker = null
    }

    componentDidMount(){
    }

    findCoords = ({address = ""}) => {
        const {Geocoder, Marker} = this.props.google.maps
        const geocoder = new Geocoder()
        
        this.setState({loadingAutoComplete: true})
        geocoder.geocode({address}, (result, status) => {
            if (status === "OK"){
                const location = result[0].geometry.location
                this.marker = new Marker({
                    map: this.map,
                    position: location
                })
                
                this.map.setCenter(location)
            }else{
                console.log("error findCoords()")
            }
            this.setState({loadingAutoComplete: false})
        })
    }

    handleDistanceCompute = ({destination = ""}) => {
        const {Map, DistanceMatrixService, LatLng, DirectionsService, DirectionsRenderer} = this.props.google.maps
        const origin = this.props.initialAddress

        const directionsRenderer = new DirectionsRenderer()
        const directionsService = new DirectionsService()

        this.marker.setMap(null)

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
                    var request = {
                        origin,
                        destination,
                        travelMode: 'DRIVING'
                      };

                    directionsRenderer.setMap(this.map)
                    directionsService.route(request, (result, status) => {
                        if (status === "OK"){
                            console.log("Directions success")
                            directionsRenderer.setDirections(result)
                        }
                    })

                    return
                }
            }

            console.log("Error")
        }))
    }

    initMap = (mapProps, map) => {
        this.map = map
        
        this.findCoords({address: this.props.initialAddress})
        if (this.props.destination){
            this.handleDistanceCompute({destination: this.props.destination})
        }
        this.initAutoComplete()
    }

    initAutoComplete = () => {
        const {google} = this.props

        if (!google || !this.map) return

        const autocomplete = new google.maps.places.Autocomplete(this.autocomplete)
        autocomplete.bindTo("bounds", this.map)
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace()
            
            if (!place.formatted_address) {
                console.log("No address found!")
                return
            }

            this.handleDistanceCompute({destination: place.formatted_address})
        })
    }

    render(){
        return(
            <div className="map">
                <Map
                    google={this.props.google}
                    zoom={17.5}
                    style={{
                        width: "100%",
                        height: "280px"
                    }}
                    
                    // initialCenter={this.state.company.position}
                    
                    fullscreenControl={false}
                    mapTypeControl={false}
                    streetViewControl={false}
                    draggable={false}
                    zoomControl={false}

                    bounds={this.MapBounds}

                    onReady={this.initMap}
                />

                <Form loading={this.state.loadingAutoComplete}>
                    <Form.Field>
                        <input ref={ref => (this.autocomplete = ref)} />
                    </Form.Field>
                </Form>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCrU9Rw7a253dKb-SMfEeCsGYgFVw9GehQ",
    LoadingContainer
})(GoogleMaps)