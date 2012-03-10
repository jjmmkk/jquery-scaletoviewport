/*
*   jQuery Scale To Viewport plugin v1.1
*/

( function( $ ) {

    $.fn.scaleToViewport = function( options ) {

        var settings = $.extend( {
            'click_toggle_anchor': false,
            'click_toggle_scaling': true,
            'css_toggle_class': 'original-size',
            'min_height': 300,
            'padding': 0
        }, options );

        return this.each( function() {

            var $window = $( window );
            var $this = $( this );
            var this_height;
            var viewport_padding = settings.padding;
            var this_min_height = settings.min_height;

            $window.bind( 'load', function() {

                this_height = $this.height();

            } ).bind( 'resize load', function() {

                var viewport_height = $window.height() - viewport_padding;

                if ( viewport_height < this_height ) {
                    $this.height( ( viewport_height > this_min_height ? viewport_height : this_min_height ) );
                } else if ( $this.height() !== this_height ) {
                    $this.height( this_height );
                }

            } );

            if ( settings.click_toggle_scaling ) {
                ( settings.click_toggle_anchor || $this ).bind( 'click', function() {
                    $this.toggleClass( settings.css_toggle_class );
                } );
            }

        } );

    };

} )( jQuery );
