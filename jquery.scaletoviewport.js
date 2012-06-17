//
// jQuery Scale To Viewport plugin v1.4
//

( function ( $ ) {

    // Throttle
    function throttle ( fn, delay ) {
        var timer = null;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout( timer );
            timer = setTimeout( function () {
                fn.apply( context, args );
            }, delay );
        };
    }

    // Cache viewport
    var $viewport = $( window );

    // Methods
    var methods = {

        init: function ( options ) {
            var settings = $.extend( {
                'click_toggle_anchor': false,
                'click_toggle_scaling': true,
                'css_scaled_class': 'stv-scaled',
                'css_toggle_class': 'stv-original',
                'min_height': 300,
                'padding': 0,
                'throttle': 0
            }, options );
            console.log(settings.throttle);

            return this.each( function () {

                var viewport_padding = settings.padding;

                var elem = this;
                var $elem = $( elem );
                var elem_offset_height;// To ensure elements have their actual height, this is set on load
                var elem_client_height;// To ensure elements have their actual height, this is set on load
                var elem_min_height = settings.min_height;// To add possible padding and border, this is modified on load
                var has_scaled_class = false;
                var scaled_class = [ ' ', settings.css_scaled_class ].join( '' );

                // Scale function
                var scaleElemHeight = function ( viewport_height ) {
                    viewport_height -= viewport_padding;
                    if ( viewport_height < elem_offset_height ) {
                        elem.style.height = [ ( viewport_height > elem_min_height ? viewport_height : elem_min_height ), 'px' ].join( '' );
                        if ( !has_scaled_class ) {
                            has_scaled_class = true;
                            elem.className += scaled_class;
                        }
                    } else if ( elem.offsetHeight !== elem_offset_height ) {
                        elem.style.height = [ elem_client_height, 'px' ].join( '' );
                        if ( has_scaled_class ) {
                            has_scaled_class = false;
                            elem.className = elem.className.replace( scaled_class, '' );
                        }
                    }
                };

                // Events
                $viewport.on( 'load.scaleToViewport', function () {
                    elem_offset_height = elem.offsetHeight;
                    elem_client_height = elem.clientHeight;
                    elem_min_height += ( elem_offset_height - elem_client_height );
                    scaleElemHeight( $viewport.height() );
                } ).on( 'resize.scaleToViewport',
                    (
                        ( settings.throttle > 0 ) ?
                        throttle( function () {
                            scaleElemHeight( $viewport.height() );
                        }, settings.throttle )
                        :
                        function () {
                            scaleElemHeight( $viewport.height() );
                        }
                    )
                );

                // Scale toggle
                if ( settings.click_toggle_scaling ) {
                    ( settings.click_toggle_anchor || $elem ).bind( 'click', function () {
                        $elem.toggleClass( settings.css_toggle_class );
                    } );
                }

            } );
        },

        destroy: function () {
            $viewport.off( '.scaleToViewport' );
            return this;
        }

    };

    // Add to jQuery
    $.fn.scaleToViewport = function ( method ) {

        // Method exists
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
        }
        // Initialize
        else if ( typeof method === 'object' || !method ) {
            return methods.init.apply( this, arguments );
        }
        // Error
        else {
            throw 'scaleToViewport() does not have the method "' + method + '"';
        }

    };

} )( jQuery );
