(function (root, factory) {
    var resolved = [],
        required = ["require","exports","module","angular"],
        i, len = required.length;

    if (typeof define === "function" && define.amd) {
        define("ngtablestickyheader",["require","exports","module","angular"], factory);
    } else if (typeof exports === "object") {
        for (i = 0; i < len; i += 1) {
            resolved.push(require(required[i]));
        }

        module.exports = factory.apply({}, resolved);
    } else {
        for (i = 0; i < len; i += 1) {
            resolved.push(root[required[i]]);
        }

        root["ngtablestickyheader"] = factory.apply({}, resolved);
    }
}(this, function (require,exports,module,angular) {
    
    /**
 * Angular TableStickyHeader
 * Copyright 2017 Andreas Stocker
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


(function () {
    'use strict';

    var
        app = angular.module('ngTableStickyHeader', [ ]);

})();

/**
 * Angular TableStickyHeader
 * Copyright 2017 Andreas Stocker
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


(function ($) {
    'use strict';

    var
        module = angular.module('ngTableStickyHeader');

    /**
     * Directive for sticky table headers and footers.
     *
     * @name tableStickyHeader
     * @ngdoc directive
     */
    module.directive('tableStickyHeader',
        function () {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    var
                        $tableElement = $(element).wrap('<div class="table-sticky-header-wrapper"></div>'),
                        $tableWrapperElement = $tableElement.parent(),
                        $windowElement = $(window),
                        $tableHeaderElement = $('> thead', $tableElement),
                        $tableFooterElement = $('> tfoot', $tableElement);

                    /**
                     * Listen on scroll events on the table. On each scroll event we need to
                     * reposition the header and footer rows according to the scroll positions.
                     */
                    $tableWrapperElement.on('scroll', function () {
                        var
                            scrollHeight = $tableWrapperElement[0].scrollHeight,
                            visibleHeight = $tableWrapperElement[0].clientHeight,
                            scrollTop = $tableWrapperElement[0].scrollTop,
                            scrollBottom = scrollHeight - (visibleHeight + scrollTop);

                        /*
                         * We use CSS transform for repositioning the headers and footers. This keeps
                         * the table layout intact.
                         */
                        $tableHeaderElement.css('transform', 'translateY(' + scrollTop + 'px)');
                        $tableFooterElement.css('transform', 'translateY(-' + scrollBottom + 'px)');
                    });

                    /**
                     * When the window gets resized, we trigger a scroll event on the table. This will
                     * recalculate the header and footer positions.
                     */
                    $windowElement.on('resize', function () {
                        $tableWrapperElement.scroll();
                    });

                    /**
                     * On each scope digest, we trigger a scroll event on the table. This will
                     * recalculate the header and footer positions.
                     */
                    scope.$watch(function () {
                        $tableWrapperElement.scroll();

                        /*
                         * We also need to recalculate the header and footer positions after the current
                         * digest. But this should not trigger a new one - so we set a regular timeout and trigger
                         * the scroll event.
                         */
                        window.setTimeout(function () {
                            $tableWrapperElement.scroll();
                        });
                    });
                }
            };
        }
    );
})(jQuery);

    return angular.module("ngTableStickyHeader");
    
}));