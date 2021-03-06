const srcPath = require( '../src-path' );
const bind = require( srcPath + '/utilities/function-bind' ).bind;

describe( 'function-bind', () => {
  it( 'should bind the proper context', () => {
    const context = { testing: true };
    function mockFunction() { return this; }
    const boundFunction = bind( mockFunction, context );
    expect( boundFunction() === context ).toBe( true );
  } );
} );
