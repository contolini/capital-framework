// Required modules.
const Events = require( '../../mixins/Events.js' );
const BaseTransition = require( '../../utilities/transition/BaseTransition' );
const contains = require( '../../utilities/dom-class-list' ).contains;
const fnBind = require( '../../utilities/function-bind' ).bind;

// Exported constants.
const CLASSES = {
  BASE_CLASS:   'u-expandable-transition',
  EXPANDED:     'u-expandable-expanded',
  COLLAPSED:    'u-expandable-collapsed',
  OPEN_DEFAULT: 'u-expandable-content__onload-open'
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
function ExpandableTransition( element, classes ) {
  const classObject = classes || CLASSES;
  const _baseTransition = new BaseTransition( element, classObject );
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

    if ( contains( element, classObject.OPEN_DEFAULT ) ) {
      expand();
    } else {
      collapse();
    }

    return this;
  }

  /**
   * Handle the end of a transition.
   */
  function _transitionComplete() {
    this.trigger( BaseTransition.END_EVENT, { target: this } );

    if ( contains( element, classObject.EXPANDED ) ) {
      this.trigger( 'expandEnd', { target: this } );
    } else if ( contains( element, classObject.COLLAPSED ) ) {
      this.trigger( 'collapseEnd', { target: this } );
    }

    if ( contains( element, classObject.EXPANDED ) &&
         element.scrollHeight > previousHeight ) {
      element.style.maxHeight = element.scrollHeight + 'px';
    }
  }

  /**
   * Toggle the expandable
   * @returns {ExpandableTransition} An instance.
   */
  function toggleExpandable() {
    this.trigger( BaseTransition.BEGIN_EVENT, { target: this } );

    if ( contains( element, classObject.COLLAPSED ) ) {
      this.trigger( 'expandBegin', { target: this } );
      expand();
    } else {
      this.trigger( 'collapseBegin', { target: this } );
      collapse();
    }

    return this;
  }

  /**
   * Collapses the expandable content
   * @returns {ExpandableTransition} An instance.
   */
  function collapse() {
    previousHeight = element.scrollHeight;
    element.style.maxHeight = '0';
    _baseTransition.applyClass( classObject.COLLAPSED );

    return this;
  }

  /**
   * Expands the expandable content
   * @returns {ExpandableTransition} An instance.
   */
  function expand() {
    if ( element.scrollHeight > previousHeight ) {
      previousHeight = element.scrollHeight;
    }
    element.style.maxHeight = previousHeight + 'px';
    _baseTransition.applyClass( classObject.EXPANDED );

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

  return this;
}
/* eslint-enable max-lines-per-function */

// Public static properties.
ExpandableTransition.CLASSES = CLASSES;

module.exports = ExpandableTransition;
