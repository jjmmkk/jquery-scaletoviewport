/*
*   jQuery Scale To Viewport plugin v1.2
*/

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

            var _this = this;
            var $this = $( _this );
            var this_offset_height; // Is set on load, to ensure elements have their actual height
            var this_client_height; // Is set on load, to ensure elements have their actual height
            var this_min_height = settings.min_height; // To add possible padding and border, this is modified on load
            var has_scaled_class = false;
            var scaled_class = [ ' ', settings.css_scaled_class ].join( '' );

            var scaleThisHeight = function( viewport_height ) {
                viewport_height -= viewport_padding;
                if ( viewport_height < this_offset_height ) {
                    _this.style.height = [ ( viewport_height > this_min_height ? viewport_height : this_min_height ), 'px' ].join( '' );
                    if ( !has_scaled_class ) {
                        has_scaled_class = true;
                        _this.className += scaled_class;
                    }
                } else if ( _this.offsetHeight !== this_offset_height ) {
                    _this.style.height = [ this_client_height, 'px' ].join( '' );
                    if ( has_scaled_class ) {
                        has_scaled_class = false;
                        _this.className = _this.className.replace( scaled_class, '' );
                    }
                }
            };

            // Events
            $viewport.bind( 'load', function() {
                this_offset_height = _this.offsetHeight;
                this_client_height = _this.clientHeight;
                this_min_height += ( this_offset_height - this_client_height );
                scaleThisHeight( $viewport.height() );
            } ).bind( 'resize', function() {
                scaleThisHeight( $viewport.height() );
            } );

            // Scale toggle
            if ( settings.click_toggle_scaling ) {
                ( settings.click_toggle_anchor || $this ).bind( 'click', function() {
                    $this.toggleClass( settings.css_toggle_class );
                } );
            }

        } );

    };

} )( jQuery );
