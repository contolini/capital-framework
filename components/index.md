---
layout: page
title:  "About the components"
---


## Table of contents

- [About the components]({{ site.baseurl }}/components/#about-the-components)
- [The code]({{ site.baseurl }}/components/#the-code)
- [Contributing]({{ site.baseurl }}/components/#contributing)
- [Compiling a component]({{ site.baseurl }}/components/#compiling-a-component)
  - [Requirements]({{ site.baseurl }}/components/#requirements)
  - [Workflow]({{ site.baseurl }}/components/#workflow)
  - [Adding new dependencies]({{ site.baseurl }}/components/#adding-new-dependencies)
- [Using components independent of Capital Framework]({{ site.baseurl }}/components/#using-components-independent-of-capital-framework)
- [Demos and docs]({{ site.baseurl }}/components/#demos-and-docs)
- [Starting new components]({{ site.baseurl }}/components/#starting-new-components)


## About the components

{% include components-intro.md %}


## The code

{% include components-repositories.md %}

_Styleguides built with the excellent [Topdoc](https://github.com/topcoat/topdoc/)._


## Contributing

We welcome your feedback and contributions.  
[Find out about contributing]({{ site.baseurl }}/contributing/)


## Compiling a component

### Requirements

- [npm](https://npmjs.org/)
- [grunt-cli](http://gruntjs.com/getting-started)
- That's it! NPM will help you install everything else you need.

### Workflow

1. Clone a component repo and `cd` into its root
2. `npm install` – Initializes Grunt in this folder and installs dependencies.
3. `grunt vendor` – Pulls in Bower components.
4. `grunt` – Compiles LESS files and generates the docs and demo pages.

### Adding new dependencies

#### Step 1: Add to `bower.json`

{% include adding-deps-step1.md %}

#### Step 2: Wiring assets

{% include adding-deps-step2.md %}


## Using components independent of Capital Framework

If you're already using [Bower](http://bower.io/), simply add this component as a dependency
and integrate it into your build process.
It's not currently in the Bower registry, so you'll have to point to this Git repo's URL.

You can also just view the CSS in the `demo` folder and snag what you want.


## Demos and docs

Each component builds out a demo and docs page.
The demo page is a simple html page with no extra styling which is useful for
browser testing the component.
The docs page is a generated style guide documenting the component markup and CSS.

These pages are generated using the [grunt-topdoc](https://github.com/topcoat/grunt-topdoc)
task which uses templates from [cf-component-demo](https://github.com/cfpb/cf-component-demo).
Components are set up to generate these pages along with the default Grunt tasks.

Make sure that any new CSS is appropriately documented using Topdoc.
Please refer to the [Getting Started](https://github.com/cfpb/cf-component-demo/blob/master/README.md#getting-started)
section of cf-component-demo for further information.


## Starting new components

If you'd like to create a new component please review our [roadmap]({{ site.baseurl }}/roadmap/)
first to make sure we haven't already started.
We hope to have a starter repo or a scaffolding system set up for creating
new components quickly but this is still in [research](https://github.com/cfpb/capital-framework/issues/49).
In the meantime our current recommendation is to clone and edit an existing
component.

Also consider if we can leverage any existing code from CFPB web products.