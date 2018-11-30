import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete"
import { Input } from "semantic-ui-react";
import React from "react"

class PlaceSearch extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            address: ''
        };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => {
                if (results.length > 0){
                    this.setState({address: results[0].formatted_address})
                }
                
                return(getLatLng(results[0]))
            })
            .then(latLng => {
                console.log('Success', latLng)
            })
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <Input fluid loading={loading}
                                {...getInputProps({
                                    placeholder: 'Search for address...',
                                    className: 'location-search-input',
                                })}
                            />
                            
                            <div className="autocomplete-dropdown-container">
                                {loading && <div className="suggestion-item loading">Loading...</div>}

                                {suggestions.map(suggestion => {
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className: `${suggestion.active ? 'suggestion-item-active' : 'suggestion-item'}`
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCrU9Rw7a253dKb-SMfEeCsGYgFVw9GehQ"}&libraries=places`}></script> 
            </>
        );
    }
}

export default PlaceSearch