jQuery(document).ready(function($) {
    $(document).on('click', '.notice-dismiss', function() {
        var notice = $(this).closest('.notice');
        if (notice.data('notice') === 'woocommerce-dependency') {
            $.ajax({
                url: vcg_admin_notice.ajax_url,
                type: 'POST',
                data: {
                    action: 'vcg_dismiss_woocommerce_notice',
                    nonce: vcg_admin_notice.nonce
                }
            });
        }
    });
});
