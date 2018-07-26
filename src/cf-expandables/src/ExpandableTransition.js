// Required modules.
const Events = require( 'cf-atomic-component/src/mixins/Events.js' );
const BaseTransition = require( 'cf-atomic-component/src/utilities/transition/BaseTransition' );
const contains = require( 'cf-atomic-component/src/utilities/dom-class-list' ).contains;
const fnBind = require( 'cf-atomic-component/src/utilities/function-bind' ).bind;

// Exported constants.
const CLASSES = {
  BASE_CLASS:   'o-expandable_content__transition',
  EXPANDED:     'o-expandable_content__expanded',
  COLLAPSED:    'o-expandable_content__collapsed',
  OPEN_DEFAULT: 'o-expandable_content__onload-open'
};

/* eslint-disable max-lines-per-function */
/**
 * ExpandableTransition
 * @class
 *
 * @classdesc Initializes new ExpandableTransition behavior.
 *
 * @param {HTMLNode} element
 *   DOM element to apply move transition to.
 * @param {Object} classes
 *   An Object of custom classes to override the base classes Object
 * @returns {ExpandableTransition} An instance.
 */
function ExpandableTransition( element ) {
  const _baseTransition = new BaseTransition( element, CLASSES );
  let previousHeight;

  /**
   * @returns {ExpandableTransition} An instance.
   */
  function init() {
    _baseTransition.init();
    const _transitionCompleteBinded = fnBind( _transitionComplete, this );
    _baseTransition.addEventListener(
      BaseTransition.END_EVENT,
      _transitionCompleteBinded
    );

    if ( contains( element, CLASSES.OPEN_DEFAULT ) ) {
      this.expand();
    } else {
      this.collapse();
    }

    return this;
  }

  /* istanbul ignore next */
  /**
   * Handle the end of a transition.
   */
  function _transitionComplete() {
    if ( contains( element, CLASSES.EXPANDED ) ) {
      this.trigger( 'expandEnd', { target: this } );

      if ( element.scrollHeight > previousHeight ) {
        element.style.maxHeight = element.scrollHeight + 'px';
      }
    } else if ( contains( element, CLASSES.COLLAPSED ) ) {
      this.trigger( 'collapseEnd', { target: this } );
    }
  }

  /**
   * Toggle the expandable
   * @returns {ExpandableTransition} An instance.
   */
  function toggleExpandable() {
    if ( contains( element, CLASSES.COLLAPSED ) ) {
      this.expand();
    } else {
      this.collapse();
    }

    return this;
  }

  /**
   * Collapses the expandable content
   * @returns {ExpandableTransition} An instance.
   */
  function collapse() {
    this.trigger( 'collapseBegin', { target: this } );

    previousHeight = element.scrollHeight;
    element.style.maxHeight = '0';
    _baseTransition.applyClass( CLASSES.COLLAPSED );

    return this;
  }

  /**
   * Expands the expandable content
   * @returns {ExpandableTransition} An instance.
   */
  function expand() {
    this.trigger( 'expandBegin', { target: this } );

    if ( element.scrollHeight > previousHeight ) {
      previousHeight = element.scrollHeight;
    }
    element.style.maxHeight = previousHeight + 'px';
    _baseTransition.applyClass( CLASSES.EXPANDED );

    return this;
  }

  // Attach public events.
  this.addEventListener = Events.on;
  this.trigger = Events.trigger;
  this.removeEventListener = Events.off;

  this.animateOff = _baseTransition.animateOff;
  this.animateOn = _baseTransition.animateOn;
  this.halt = _baseTransition.halt;
  this.isAnimated = _baseTransition.isAnimated;
  this.setElement = _baseTransition.setElement;
  this.remove = _baseTransition.remove;

  this.init = init;
  this.toggleExpandable = toggleExpandable;
  this.collapse = collapse;
  this.expand = expand;

  // Public static properties.
  this.CLASSES = CLASSES;

  return this;
}
/* eslint-enable max-lines-per-function */

module.exports = ExpandableTransition;
