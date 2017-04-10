import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

/**
 * Helper component to work with the various of readyStates of a Primus
 * connection. The `loading` component will only display it's contents when
 * Primus is still opening the connection.
 *
 * @constructor
 * @public
 */
export class Loading extends Component {
  render() {
    if (this.ctx.primus.readyState === Primus.OPEN) return null;

    return Children.only(this.props.children);
  }
}

/**
 * Helper component to work with the various of readyStates of a Primus
 * connection. The `loaded` component will only display it's contents when
 * Primus is the connection is open.
 *
 * @constructor
 * @public
 */
export class Loaded extends Component {
  render() {
    if (this.ctx.primus.readyState !== Primus.OPEN) return null;

    return Children.only(this.props.children);
  }
}

/**
 * React based wrapper to share a single Primus connection between all child
 * components. The only assumption this component makes is that there is
 * a Primus global available once the component is mounted.
 *
 * @constructor
 * @public
 */
export default class Ironhide extends Component {
  constructor() {
    super(...arguments);

    this.primus = null;             // Reference to the internal Primus instance.
  }

  /**
   * Open a new Primus connection.
   *
   * @private
   */
  open() {
    const { url, config } = this.props;

    //
    // Prevent multiple connections from being opened at the same time.
    //
    if (this.primus) this.close();

    this.primus = new Primus(url, {
      ...config,

      //
      // The following options are forced to ensure that we establish
      // a connection that we can work with.
      //
      manual: false       // Prevent manual opening of the connection.
    });
  }

  /**
   * Close and cleanup existing connections.
   *
   * @private
   */
  close() {
    try { this.primus.destroy(); }
    catch (e) {}

    this.primus = null;
  }

  /**
   * Open the connection once the component is mounted.
   *
   * @private
   */
  componentDidMount() {
    this.open();
  }

  /**
   * Close the connection once we're about to unmount the application.
   *
   * @private
   */
  componentWillUnmount() {
    this.close();
  }

  /**
   * This is where the actual magic happens, we provide React with an object of
   * "immutable" data or methods which is passed to the child components using
   * `the this.ctx` object.
   *
   * @private
   */
  getChildContext() {
    return {
      primus: this.primus
    };
  }

  /**
   * Render only the passed in children so we can work as an active wrapper.
   *
   * @returns {Component}
   * @private
   */
  render() {
    return this.props.children;
  }
}

/**
 * Validation for the shared context object.
 *
 * @type {Object} Identical structure to what is returned by `getChildContext`.
 * @private
 */
Ironhide.context = {
  primus: PropTypes.object
};

/**
 * Properties that are accepted by this component.
 *
 * @private
 */
Ironhide.propTypes = {
  children: PropTypes.element.isRequired,
  url: PropTypes.string.isRequired,
  config: PropTypes.object
};
