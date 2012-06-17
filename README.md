# jQuery Scale To Viewport plugin

## Abstract

Scales elements to keep their height less than that of the viewport.


## Usage

Include the script and use ``scaleToViewport()`` with a jQuery selector.

    $('img').scaleToViewport();

### Options

    $('img').scaleToViewport( {
        'click_toggle_anchor': boolean || false,
        'click_toggle_scaling': boolean || true,
        'css_scaled_class': string || 'stv-scaled',
        'css_toggle_class': string || 'stv-original',
        'min_height': number || 300,
        'padding': number || 0,
        'throttle': number || 0
    } );

## Todo

* Browser compatibility testing
* Add support for elements that
    * Were hidden on load
    * Change their actual height after load
