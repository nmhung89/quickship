var React = require("react");
var ReactDOM = require("react-dom");
var Button = require("react-bootstrap/lib/Button");
var Input = require("react-bootstrap/lib/Input");
var Row = require("react-bootstrap/lib/Row");
var Col = require("react-bootstrap/lib/Col");
var Label = require("react-bootstrap/lib/Label");
var Form = require("react-bootstrap-validation/lib/Form");
var ValidatedInput = require("react-bootstrap-validation/lib/ValidatedInput");
var Nav = require("react-bootstrap/lib/Nav");
var Navbar = require("react-bootstrap/lib/Navbar");
var NavItem = require("react-bootstrap/lib/NavItem");


var GoogleMap = React.createClass({
    createMap: function(node) {
        if (node) {
            var directionOptions = {
                origin: this.props.from,
                destination: this.props.to,
                provideRouteAlternatives: false,
                travelMode: google.maps.TravelMode.DRIVING
            };
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            var map = new google.maps.Map(node, {
                center: {lat: -27.4062696, lng: 152.4423634},
                zoom: 7
            });
            directionsDisplay.setMap(map);
            directionsService.route(directionOptions, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
            });
        }
    },
    render: function() {
        return (
            <div className="map" ref={this.createMap}>
            </div>
        );
    }
});

var ShippingList = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadData: function() {
        $.ajax({
            url: '/api/list-shipping-request/',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }.bind(this)
        });
    },
    handleShipRemove: function(shipId) {
        $.ajax({
            url: '/api/remove-shipping-request/',
            type: 'delete',
            data: {'shipId': shipId},
            dataType: 'json',
            cache: false
        });
        var shippings = this.state.data;
        for (var idx=0; idx < shippings.length; idx++) {
            var shipInfo = shippings[idx];
            if (shipInfo.id === shipId) {
                shippings.splice(idx, 1);
                break;
            }
        }
        this.setState({data: shippings});
    },
    componentDidMount: function() {
        this.loadData();
        var socket = io();
        var _this = this;
        socket.on('NewShipping', function(message) {
            _this.setState({data: [message].concat(_this.state.data)});
        });
    },
    render: function() {
        var _this = this;
        var shippingNodes = this.state.data.map(function(shipping, index) {
            var postedDate = new Date(shipping.timestamp);
            return (
                <ShippingItem key={shipping.id} id={shipping.id}
                              title={shipping.title}
                              from={shipping.from} to={shipping.to}
                              budget={shipping.budget} phone={shipping.phone}
                              postedDate={postedDate.toLocaleString()}
                              onShipRemove={_this.handleShipRemove}
                />
            );
        });
        return (
            <div className="shipping-list" key="shipping-list">
                {shippingNodes}
            </div>
        );
    }
});

var ShippingItem = React.createClass({
    handleShipRemove: function(e) {
        e.preventDefault();
        this.props.onShipRemove(this.props.id);
    },
    render: function() {
        return (
            <div className="shipping-item">
                <Row>
                    <Row>
                        <ShippingItemLine title="Posted Date">{this.props.postedDate}</ShippingItemLine>
                        <ShippingItemLine title="Title">{this.props.title}</ShippingItemLine>
                        <ShippingItemLine title="From">{this.props.from}</ShippingItemLine>
                        <ShippingItemLine title="To">{this.props.to}</ShippingItemLine>
                        <ShippingItemLine title="Budget">{this.props.budget}</ShippingItemLine>
                        <ShippingItemLine title="Phone">{this.props.phone}</ShippingItemLine>
                    </Row>
                    <Row className="map-wrap">
                        <GoogleMap from={this.props.from} to={this.props.to}/>
                    </Row>

                    <Button type="button" onClick={this.handleShipRemove} bsStyle="success" className="pull-right">
                        I will ship it
                    </Button>

                </Row>
            </div>
        );
    }
});

var ShippingItemLine = React.createClass({
    render: function() {
        return (
            <Row>
                <Col sm={3} className="title">
                    {this.props.title}:
                </Col>
                <Col sm={9}>
                    {this.props.children}
                </Col>
            </Row>
        );
    }
});

var ShippingForm = React.createClass({
    getInitialState: function() {
        return {posted: false};
    },
    submitForm: function(e) {
        var _this = this;
        $.ajax({
            type: 'post',
            url: '/api/post-shipping-request/',
            data: e,
            success: function(res) {
                _this.setState({posted: true});
                var socket = io();
                socket.emit('PostNewShipping', res);
            },
            error: function(data) {

            }
        });
    },
    handleBackButton: function(e) {
        this.setState({posted:false});
    },
    render: function() {
        if (this.state.posted) {
            return (
                <div className="thank-you">
                    <h3>Thank you!</h3>
                    <Button type="button" bsStyle="success" onClick={this.handleBackButton}>
                        <span className="glyphicon glyphicon-arrow-left"/> Back
                    </Button>
                </div>
            );
        } else {
            return (
                <Form className="shipping-form" method="post"
                      onValidSubmit={this.submitForm}
                      enctype="multipart/form-data">
                    <ValidatedInput type="text" label="Title" name="title"
                                    placeholder="Enter your item's info"
                                    validate="required"/>
                    <ValidatedInput type="text" label="Ship From" name="from"
                                    placeholder="Pick up address"
                                    validate="required"/>
                    <ValidatedInput type="text" label="Ship To" name="to"
                                    validate="required"
                                    placeholder="Destination address"/>
                    <ValidatedInput type="text" label="Budget" name="budget"
                                    validate="required"
                                    placeholder="Your budget to ship this item"/>
                    <ValidatedInput type="text" label="Phone Number"
                                    name="phone"
                                    validate="required"
                                    placeholder="Your phone number"/>
                    <Row>
                        <Button type="submit" bsStyle="primary" className="pull-right">Submit</Button>
                    </Row>
                </Form>
            );
        }
    }
});

ReactDOM.render(
    <div>
        <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Quick Ship</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem active eventKey={1} href="/">
                    <span className="glyphicon glyphicon-home"/> Home
                </NavItem>
            </Nav>
        </Navbar>
        <div className="container">
            <Row>
                <Col md={6}>
                    <h2>Enter your shipping information</h2>
                    <ShippingForm/>
                </Col>
                <Col md={6}>
                    <h2>Help people ship their items</h2>
                    <ShippingList/>
                </Col>
            </Row>
        </div>
    </div>,
    document.getElementById("main")
);