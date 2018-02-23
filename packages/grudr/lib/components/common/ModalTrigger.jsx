import { replaceComponent } from 'meteor/vulcan:lib';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

class ModalTrigger extends PureComponent {

  // static propTypes = propTypes;
  // static defaultProps = defaultProps;

  state = {
    modalIsOpen: false
  };

  toggle = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  };

  renderHeader() {
    return (
      <ModalHeader>
        {this.props.title}
      </ModalHeader>
    )
  }

  render() {
    const triggerComponent = this.props.component ?
      React.cloneElement(this.props.component, { onClick: this.toggle }) :
        <a href="#" onClick={this.toggle}>{this.props.label}</a>;

    const childrenComponent = React.cloneElement(this.props.children, { closeModal: this.toggle });
    return (
      <div className="modal-trigger">
        {triggerComponent}
        <Modal
          className={this.props.className}
          size={this.props.size}
          isOpen={this.state.modalIsOpen}
          toggle={this.toggle}
        >
          {this.props.title ? this.renderHeader() : null}
          <ModalBody>
            {childrenComponent}
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  component: PropTypes.object,
  size: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

const defaultProps = {
  size: 'lg'
};

replaceComponent('ModalTrigger', ModalTrigger);
