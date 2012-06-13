//
// jQuery Scale To Viewport plugin v1.3
//

( function( $ ) {

    $.fn.scaleToViewport = function( options ) {

        var settings = $.extend( {
            'click_toggle_anchor': false,
            'click_toggle_scaling': true,
            'css_scaled_class': 'stv-scaled',
            'css_toggle_class': 'stv-original',
            'min_height': 300,
            'padding': 0
        }, options );

        return this.each( function() {

            var $viewport = $( window );
            var viewport_padding = settings.padding;

            var _elem = this;
            var $elem = $( _elem );
            var elem_offset_height; // Is set on load, to ensure elements have their actual height
            var elem_client_height; // Is set on load, to ensure elements have their actual height
            var elem_min_height = settings.min_height; // To add possible padding and border, this is modified on load
            var has_scaled_class = false;
            var scaled_class = [ ' ', settings.css_scaled_class ].join( '' );

            // Scale function
            var scaleElemHeight = function( viewport_height ) {
                viewport_height -= viewport_padding;
                if ( viewport_height < elem_offset_height ) {
                    _elem.style.height = [ ( viewport_height > elem_min_height ? viewport_height : elem_min_height ), 'px' ].join( '' );
                    if ( !has_scaled_class ) {
                        has_scaled_class = true;
                        _elem.className += scaled_class;
                    }
                } else if ( _elem.offsetHeight !== elem_offset_height ) {
                    _elem.style.height = [ elem_client_height, 'px' ].join( '' );
                    if ( has_scaled_class ) {
                        has_scaled_class = false;
                        _elem.className = _elem.className.replace( scaled_class, '' );
                    }
                }
            };

            // Events
            $viewport.bind( 'load', function() {
                elem_offset_height = _elem.offsetHeight;
                elem_client_height = _elem.clientHeight;
                elem_min_height += ( elem_offset_height - elem_client_height );
                scaleElemHeight( $viewport.height() );
            } ).bind( 'resize', function() {
                scaleElemHeight( $viewport.height() );
            } );

            // Scale toggle
            if ( settings.click_toggle_scaling ) {
                ( settings.click_toggle_anchor || $elem ).bind( 'click', function() {
                    $elem.toggleClass( settings.css_toggle_class );
                } );
            }

        } );

    };

} )( jQuery );
