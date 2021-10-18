(function (root, factory) {
    'use strict';

    // if (typeof define === 'function' && define.amd) {
    //     define(['jquery'], function ($) {
    //         return (root.processingOverlay = factory($));
    //     });
    // }
    // else {
        root.processingOverlay = root.processingOverlay || factory(root.jQuery);
    // }

}(this, function ($) {
    'use strict';

    function constructDialog($dialog, settings) {
        if ($dialog) {
            $dialog.remove();
        }
        var nonceAttr = settings.nonce === null ? '' : ' nonce="' + settings.nonce + '"',
            el = $.parseHTML(
                '<div class="modal modal-darker fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;"' + nonceAttr + '>' +
                    '<div class="modal-dialog modal-m">' +
                        '<div class="modal-content">' +
                            '<div class="modal-header" style="display: none;"' + nonceAttr + '></div>' +
                            '<div class="modal-body">' +
                                '<div class="progress progress-striped active" style="margin-bottom:0;"' + nonceAttr + '>' +
                                    '<div class="progress-bar" style="width: 100%"' + nonceAttr + '></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        return $(el);
    }

    var $dialog, settings;

    return {
        /********************************
         *  Show Dialog                 *
         ********************************
         *
         *  @param message Custom message
         *  @param options Custom options
         * 
         *  options.headerText
         *      Boolean false:      hides header and set "message" in paragraph above progress bar.
         *      Non-empty string:   "message" becomes content above progress bar and headerText string will be set as H3 text.
         * 
         *   options.headerSize
         *      '1':            renders as <h1>.
         *      '2':            renders as <h2>.
         *      '3':            renders as <h3>.
         *      '4':            renders as <h4>.
         *      '5' (default):  renders as <h5>.
         *      '6':            renders as <h6>.
         * 
         *   options.headerClass
         *      Extra class(es) for header tag.
         * 
         *   options.dialogSize
         *      'sm':   renders small sized version.
         *      'm':    renders medium sized version.
         *      'lg':   renders large sized version.
         * 
         *   options.messageStyle
         *      'primary':          renders 'primary' styled header background and progress bar.
         *      'secondary':        renders 'secondary' styled header background and progress bar.
         *      'success':          renders 'success' styled header background and progress bar.
         *      'info':             renders 'info' styled header background and progress bar.
         *      'warning':          renders 'warning' styled header background and progress bar.
         *      'danger':           renders 'danger' styled header background and progress bar.
         *      'light':          renders 'success' styled header background and progress bar.
         *      'dark':          renders 'success' styled header background and progress bar.
         * 
         *   options.contentElement
         *      Determines tag of content element
         *      'p' (default):  generates a <p> tag
         * 
         *   options.contentClass
         *      Extra class(es) for content tag.
         * 
         *******************************/
        show: function (message, options) {
            // Assign defaults
            if (typeof options === 'undefined') {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Please wait';
            }
            settings = $.extend({
                headerText: 'Processing...',
                headerSize: 5,
                headerClass: 'modal-title',
                dialogSize: 'm',
                messageStyle: 'primary',
                contentElement: 'p',
                contentClass: 'content',
                onHide: null, // Callback runs after dialog is hidden
                onShow: null, // Callback runs after dialog is shown
                nonce: null // Nonce to permit inline styles
            }, options);

            var $headerTag, $contentTag;

            $dialog = constructDialog($dialog, settings);

            // Configure dialog
            $dialog.find('.modal-dialog').parent().addClass('modal-' + settings.messageStyle);
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar progress-bar-striped progress-bar-animated');
            if (settings.messageStyle) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.messageStyle);
                $dialog.find('.progress-bar').addClass('bg-' + settings.messageStyle);
            }

            // Generate header tag
            $headerTag = $('<h' + settings.headerSize + ' />');
            $headerTag.css({ 'margin': 0 });
            if (settings.headerClass) {
                $headerTag.addClass(settings.headerClass);
            }

            // Generate content tag
            $contentTag = $('<' + settings.contentElement + ' />');
            if (settings.contentClass) {
                $contentTag.addClass(settings.contentClass);
            }

            // Set headerText and message
            if (settings.headerText === false) {
                $contentTag.html(message);
                $dialog.find('.modal-body').prepend($contentTag);
            }
            else if (settings.headerText) {
                $headerTag.html(settings.headerText);
                $dialog.find('.modal-header').html($headerTag).show();

                $contentTag.html(message);
                $dialog.find('.modal-body').prepend($contentTag);
            }
            else {
                $headerTag.html(message);
                $dialog.find('.modal-header').html($headerTag).show();
            }

            // Add callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function () {
                    settings.onHide.call($dialog);
                });
            }
            if (typeof settings.onShow === 'function') {
                $dialog.off('shown.bs.modal').on('shown.bs.modal', function () {
                    settings.onShow.call($dialog);
                });
            }
            // Open dialog
            $dialog.modal();
            
            // Trace if dialog shown
            $dialog.on('shown.bs.modal', function () {
                $dialog.data('shown', true);
            });
        },

        /********************************
         *  Hide Dialog                 *
         ********************************
         * @param cb Callback after hide
         * 
         *******************************/
        hide: function (cb) {
            if (typeof $dialog !== 'undefined') {
                if ($dialog.data('shown') === true) {
                    $dialog.modal('hide');
                    if (cb) {
                        cb($dialog);
                    }
                }
                else {
                    $dialog.on('shown.bs.modal', function () {
                        $dialog.modal('hide');
                        if (cb) {
                            cb($dialog);
                        }
                    });
                }
            }
        },
        /********************************
         * Change/display dialog message
         ********************************
         * @param newMessage New message
         * 
         *******************************/
        message: function (newMessage) {
            if (typeof $dialog !== 'undefined') {
                if (typeof newMessage !== 'undefined') {
                    return $dialog.find('.modal-header>h' + settings.headerSize).html(newMessage);
                }
                else {
                    return $dialog.find('.modal-header>h' + settings.headerSize).html();
                }
            }
        }
    };

}));