/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Header, Button, Modal, Icon,
} from 'semantic-ui-react';

class ErrorModal extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <Modal
        // trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={this.props.isOpen}
        onClose={this.props.closeModal}
        basic
        size="small"
      >
        <Header icon="browser" content="ERROR" />
        <Modal.Content>
          <h3>{this.props.modalText}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.props.closeModal} inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ErrorModal;
