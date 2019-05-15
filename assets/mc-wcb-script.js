// Ajax Filtering
jQuery(function ($) {
    $(document).ready(function () {

        $('#mc-wcb-dates').click(function () {
            $('.mc-wcb-date-picker').toggleClass('visible');
        });

        $('input#mc-wcb-fetch').click(function (e) {
            e.preventDefault();
            var product_id = $('#mc-wcb-product-select').val();

            data_search = {};

            if ('' !== product_id) {
                data_search.product_id = product_id
            }

            if ($('#mc-wcb-dates').is(':checked')) {
                var date_start = $('#mc_wcv_start_date').val();
                var date_end = $('#mc_wcv_end_date').val();
                if ('' !== date_start) {
                    data_search.date_start = date_start
                }
                if ('' !== date_end) {
                    data_search.date_end = date_end
                }
            }

            get_bookings_number(data_search);
        });

        $('input#mc-wcb-export-all').click(function (e) {
            e.preventDefault();

            data_search = {};

            if ($('#mc-wcb-dates').is(':checked')) {
                var date_start = $('#mc_wcv_start_date').val();
                var date_end = $('#mc_wcv_end_date').val();
                if ('' !== date_start) {
                    data_search.date_start = date_start
                }
                if ('' !== date_end) {
                    data_search.date_end = date_end
                }
            }

            export_bookings_all(data_search);
        });

        function get_bookings_number(data_search) {

            var data = {
                action: 'mc_wcb_find_booking',
                selected_product_id: data_search.product_id,
                date_start: data_search.date_start,
                date_end: data_search.date_end,
                security: mc_wcb_params.security,
            };

            $.get({
                type: 'get',
                url: mc_wcb_params.ajax_url,
                dataType: 'json',
                data: data,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('select#mc-wcb-product-select').prop('disabled', 'disabled');
                    $('.mc-wcb-loader').fadeIn('slow');
                    $('.mc-wcb-export').fadeOut('slow');
                    $('.mc-wcb-result').fadeOut('slow');
                    $('.mc-wcb-download').fadeOut('slow');

                },
                success: function (response) {
                    $('select#mc-wcb-product-select').prop('disabled', false);
                    $('.mc-wcb-loader').fadeOut('slow');
                    $('.mc-wcb-result').hide().html('<span>' + response.data.message + '</span>').fadeIn('slow');
                    if (true === response.success) {
                        $('.mc-wcb-export').fadeIn('slow');
                    }
                },
                error: function (response) {
                    $('.mc-wcb-loader').fadeOut('slow');
                    $('.mc-wcb-result').hide().html('<span>' + response.message + '</span>').fadeIn('slow');
                }
            });
        }

        $('#mc-wcb-submit').click(function (e) {
            e.preventDefault();
            var product_id = $('#mc-wcb-product-select').val();

            data_search = {};

            if ('' !== product_id) {
                data_search.product_id = product_id
            }

            if ($('#mc-wcb-dates').is(':checked')) {
                var date_start = $('#mc_wcv_start_date').val();
                var date_end = $('#mc_wcv_end_date').val();
                if ('' !== date_start) {
                    data_search.date_start = date_start
                }
                if ('' !== date_end) {
                    data_search.date_end = date_end
                }
            }
            if (data_search.product_id != null && data_search.product_id != 0) {
                export_bookings(data_search);
            }
        });

        function export_bookings(data_search) {

            var data = {
                action: 'mc_wcb_export',
                selected_product_id: data_search.product_id,
                date_start: data_search.date_start,
                date_end: data_search.date_end,
                security: mc_wcb_params.security,
            };

            $.get({
                type: 'get',
                url: mc_wcb_params.ajax_url,
                dataType: 'json',
                data: data,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('select#mc-wcb-product-select').prop('disabled', 'disabled');
                    $('.mc-wcb-export-box:not(.export-all) .mc-wcb-loader').fadeIn('slow');
                    $('.mc-wcb-export-box:not(.export-all) .mc-wcb-export').fadeOut('slow');
                    $('.mc-wcb-export-box:not(.export-all) .mc-wcb-result').fadeOut('slow');
                    $('.mc-wcb-export-box:not(.export-all) .mc-wcb-export-result').fadeIn('slow');

                },
                success: function (response) {

                    $('select#mc-wcb-product-select').prop('disabled', false);
                    $('.mc-wcb-export-box:not(.export-all) .mc-wcb-loader').fadeOut('slow');
                    $('.mc-wcb-export-box:not(.export-all) .mc-wcb-export-result').fadeOut('slow');

                    if (true === response.success) {
                        $('.mc-wcb-export-box:not(.export-all) .mc-wcb-link').attr('href', response.data.file_url);
                        $('.mc-wcb-export-box:not(.export-all) .mc-wcb-download').fadeIn('slow');
                    }
                },
                error: function (response) {

                    $('.mc-wcb-export-box:not(.export-all) .mc-wcb-loader').fadeOut('slow');
                    //$( '.mc-wcb-result' ).hide().html( '<span>' + response.message + '</span>' ).fadeIn( 'slow' );
                }
            });
        }

        function export_bookings_all(data_search) {

            var data = {
                action: 'mc_wcb_export_all',
                date_start: data_search.date_start,
                date_end: data_search.date_end,
                security: mc_wcb_params.security,
            };

            $.get({
                type: 'get',
                url: mc_wcb_params.ajax_url,
                dataType: 'json',
                data: data,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('.export-all .mc-wcb-loader').fadeIn('slow');
                    $('.export-all .mc-wcb-export').fadeOut('slow');
                    $('.export-all .mc-wcb-result').fadeOut('slow');
                    $('.export-all .mc-wcb-export-result').fadeIn('slow');

                },
                success: function (response) {
                    $('.export-all .mc-wcb-loader').fadeOut('slow');
                    $('.export-all .mc-wcb-export-result').fadeOut('slow');
                    
                    if (true === response.success) {
                        $('.export-all .mc-wcb-link').attr('href', response.data.file_url);
                        $('.export-all .mc-wcb-download').fadeIn('slow');
                    }
                },
                error: function (response) {
                    $('.export-all mc-wcb-loader').fadeOut('slow');
                    //$( '.mc-wcb-result' ).hide().html( '<span>' + response.message + '</span>' ).fadeIn( 'slow' );
                }
            });
        }
    });
});
