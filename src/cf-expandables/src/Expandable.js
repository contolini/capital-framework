/* ==========================================================================
   Expandable Organism
   ========================================================================== */
// polyfill for ie9 compatibility
require( 'classlist-polyfill' );

const domClassList = require(
  'cf-atomic-component/src/utilities/dom-class-list'
);
const addClass = domClassList.addClass;
const contains = domClassList.contains;
const removeClass = domClassList.removeClass;
const closest = require(
  'cf-atomic-component/src/utilities/dom-closest'
).closest;
const ExpandableTransition = require( './ExpandableTransition' );
const Events = require( 'cf-atomic-component/src/mixins/Events.js' );
const Organism = require( 'cf-atomic-component/src/components/Organism' );

const Expandable = Organism.extend( {
  ui: {
    base:    '.o-expandable',
    target:  '.o-expandable_target',
    content: '.o-expandable_content',
    header:  '.o-expandable_header'
  },

  classes: {
    targetExpanded:  'o-expandable_target__expanded',
    targetCollapsed: 'o-expandable_target__collapsed',
    groupAccordion:  'o-expandable-group__accordion'
  },

  events: {
    'click .o-expandable_target': 'onExpandableClick',
    'click .o-expandable-group__accordion .o-expandable_target': 'onToggleAccordion'
  },

  transition:      null,
  accordionEvent:  null,
  activeAccordion: false,

  initialize:        initialize,
  accordionClose:    accordionClose,
  onExpandableClick: onExpandableClick,
  onToggleAccordion: onToggleAccordion,
  toggleTargetState: toggleTargetState
} );

/**
 * Initialize a new expandable.
 */
function initialize() {
  const transition = new ExpandableTransition(
    this.ui.content
  );
  this.transition = transition.init();

  if ( contains( this.ui.content, transition.CLASSES.EXPANDED ) ) {
    addClass( this.ui.target, this.classes.targetExpanded );
  } else {
    addClass( this.ui.target, this.classes.targetCollapsed );
  }

  const groupElement = closest(
    this.ui.target, '.' + this.classes.groupAccordion
  );
  /* istanbul ignore next */
  if ( groupElement !== null ) {
    const fn = this.accordionClose.bind( this );
    Events.on( 'CFAccordionClose', fn );
  }
}

/* istanbul ignore next */
/**
 * Event handler for when an accordion is closed.
 */
function accordionClose() {
  if ( this.activeAccordion === true ) {
    this.activeAccordion = false;
    this.transition.collapse();
  }
}

/**
 * Event handler for when an expandable is clicked.
 */
function onExpandableClick() {
  this.transition.toggleExpandable();
  this.toggleTargetState( this.ui.target );
}

/* istanbul ignore next */
/**
 * Event handler for when an expandable is clicked as part of an accordion.
 */
function onToggleAccordion() {
  Events.trigger( 'CFAccordionClose' );
  this.activeAccordion = true;
}

/**
 * Toggle an expandable to open or closed.
 * @param {HTMLNode} element - The expandable target HTML DOM element.
 */
function toggleTargetState( element ) {
  if ( contains( element, this.classes.targetExpanded ) ) {
    addClass( this.ui.target, this.classes.targetCollapsed );
    removeClass( this.ui.target, this.classes.targetExpanded );
  } else {
    addClass( this.ui.target, this.classes.targetExpanded );
    removeClass( this.ui.target, this.classes.targetCollapsed );
  }
}

module.exports = Expandable;
