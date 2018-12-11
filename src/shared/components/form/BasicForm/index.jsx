import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import HorizontalForm from './components/HorizontalForm';
import VerticalForm from './components/VerticalForm';

const BasicForm = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Hello</h3>
        <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
              information
        </h3>
      </Col>
    </Row>
    <Row>
      <HorizontalForm />
    </Row>
  </Container>
);

export default BasicForm;
