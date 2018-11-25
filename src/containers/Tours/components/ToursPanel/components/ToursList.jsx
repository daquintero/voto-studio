import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Badge, Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToursProps } from '../../../../../shared/prop-types/ReducerProps';

class ToursList extends Component {
  static propTypes = {
    tours: ToursProps.isRequired,
    openTour: PropTypes.func.isRequired,
    toggleCreateTourForm: PropTypes.func.isRequired,
    createTourForm: PropTypes.bool.isRequired,
    createTour: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }
  onChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Col md={12} lg={12} xl={6}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Your Tours</h5>
              <h5 className="subhead">
                Here are the tours you have created, press the edit button to edit a tour in the Map Studio
              </h5>
            </div>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>No. Steps</th>
                  <th>Username</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.tours.tours.map((tour, index) => (
                  <tr key={tour.id}>
                    <td>{this.props.tours.idCode}{tour.id}</td>
                    <td>{tour.name}</td>
                    <td>{tour.step_count}</td>
                    <td>@dragon</td>
                    <td><Badge color="success">Live</Badge></td>
                    <td>
                      <i
                        className="fal fa-pen tours-panel__edit"
                        role="presentation"
                        onClick={() => this.props.openTour(tour.id, index)}
                      />
                    </td>
                  </tr>
              ))}
              </tbody>
            </Table>
            {!this.props.createTourForm ? (
              <span
                className="tours-panel__new"
                role="presentation"
                onClick={this.props.toggleCreateTourForm}
              >
                <i className="fal fa-plus mr-2" />
                Add new tour
              </span>
            ) : (
              <Form>
                <FormGroup>
                  <Label for="newTourName">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="newTourName"
                    placeholder="My new tour"
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="newTourDescription">Description (Optional)</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="newTourDescription"
                    placeholder="This tour is about..."
                    onChange={this.onChange}
                    value={this.state.description}
                  />
                </FormGroup>
                <Button color="primary" onClick={() => this.props.createTour(this.state)}>Create</Button>
                <Button onClick={this.props.toggleCreateTourForm}>Cancel</Button>
              </Form>
            )}
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ToursList;
