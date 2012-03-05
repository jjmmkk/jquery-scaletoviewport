/*
*   jQuery Scale To Viewport plugin v1.0
*/

( function( $ ) {

    var $window = $( window );

    $.fn.scaleToViewport = function( options ) {

        var settings = $.extend( {
          'click_toggle_scaling': false,
          'css_toggle_class': 'original-size',
          'min_height': 300,
          'padding': 0
        }, options );

        return this.each( function() {

            var $this = $( this );
            var this_height;

            $window.bind( 'resize load', function( event ) {

                if ( event.type === 'load' ) {// Wait for images to load
                    this_height = $this.height();
                }

                var viewport_height = $window.height() - settings.padding;

                if ( viewport_height < this_height ) {
                    if ( viewport_height > settings.min_height ) {
                        $this.height( viewport_height );
                    } else {
                        $this.height( settings.min_height );
                    }
                } else if ( $this.height() !== this_height ) {
                    $this.height( this_height );
                }

            } );

            if ( settings.click_toggle_scaling ) {
                $this.bind( 'click', function() {
                    $this.toggleClass( settings.css_toggle_class );
                } );
            }

        } );

    };

} )( jQuery );
