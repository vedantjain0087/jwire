# Angular TableStickyHeader

Angular TableStickyHeader is an AngularJS directive that keeps the `thead` and `tfoot` sections of a table
always visible, while the table itself gets a scrollbar.

**Note:** This library is for AngularJS 1.x only!


## Dependencies

Angular TableStickyHeader depends on AngularJS 1.x and jQuery 3.x.


## Installation

* Via `npm`: `npm install --save angular-table-sticky-header`
* Via `git`: `git clone git@github.com:anx-astocker/angular-table-sticky-header.git`


## Examples

### Creating a table with sticky headers and footers

In the following example we have a table with hard-coded content. In real life you might use
data binding to fill the tables content.

Include the javascript and stylesheet files in your HTML:
```html
<html>
    <head>
        <link href="node_modules/angular-table-sticky-header/dist/ngtablestickyheader.min.css" rel="stylesheet">
        <script src="node_modules/angular-table-sticky-header/dist/ngtablestickyheader.min.js"></script>
    </head>

    <body>
        ...
    </body>
</html>
```

Declare dependency on Angular TableStickyHeader for your main application:
```javascript
(function() {
    var app = angular.module('app', [
        'ngTableStickyHeader'
    ])
})();
```

This is how to create the table:
````html
<table table-sticky-header>
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>First name 1</td>
            <td>Last name 1</td>
        </tr>
        <tr>
            <td>First name 2</td>
            <td>Last name 2</td>
        </tr>
        <tr>
            <td>First name 3</td>
            <td>Last name 3</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th>Name</th>
            <th>Email</th>
        </tr>
    </tfoot>
</table>
````

Additional information regarding the `table-sticky-header` directive:
* This directive keeps the `thead` and `tfoot` sections via CSS transform in the visible area.
* The positions for `thead` and `tfoot` gets recalculated on each digest as well as on scroll and resize events.


## Contributions

* Andreas Stocker <AStocker@anexia-it.com>, Main developer


## License

Angular TableStickyHeader,
Copyright 2017 Andreas Stocker,
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
