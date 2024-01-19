<?php
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
    @header( 'Access-Control-Allow-Origin: *' );

    add_theme_support('post-thumbnails');

    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title'      => __('Options'),
            'menu_title'      => __('Options'),
            'menu_slug'       => 'options',
            'capability'      => 'edit_posts',
            'show_in_graphql' => true,
        ]);
    }

    register_nav_menus(array(
        'primary_menu' => __('Primary Menu', 'text_domain'),
    ));
    
    // add a box the location just created
    function read_only_content_box()
    {
        add_meta_box(
            'read_only_content_box',
            __('Submission Content'),
            'read_only_cb',
            'post',
            'read_only_content',
            'low'
        );
    }

    function read_only_cb($post)
    {
        echo apply_filters('the_content', $post->post_content);
    }

    add_action('add_meta_boxes', 'read_only_content_box');
    function excerpt_more($more){
        return ' ...';
    }
    add_filter('excerpt_more', 'excerpt_more');
    
    function wpdocs_custom_excerpt_length($length){
        return 20;
    }
    add_filter('excerpt_length', 'wpdocs_custom_excerpt_length', 999);

    function custom_login_logo() { ?>
        <style type="text/css">
            #login h1 a, .login h1 a {
                width:222px;
                height:80px;
                background-image: url('https://arcadia.yourcreative.com.au/wp-content/themes/yc/login-logo.png');
                background-size: contain;
                background-repeat: no-repeat;
            }
        </style>
    <?php }
    add_action( 'login_enqueue_scripts', 'custom_login_logo' );

    add_filter('mime_types', 'allow_custom_mime_types', 1, 1);
    function allow_custom_mime_types($mime_types) {
        $mime_types['ai'] = 'application/postscript';
        $mime_types['eps'] = 'application/postscript';
        $mime_types['svg'] = 'image/svg+xml';
        $mime_types['woff'] = 'application/x-font-woff';
        $mime_types['json'] = 'application/json'; 

        return $mime_types;
    }

    function my_acf_render_field( $field ) {
        if ($field['value']) {
            echo "
            <br />
            Preview:<br />
            <lottie-player
                autoplay
                controls
                loop
                mode='normal'
                src=" . wp_get_attachment_url($field['value']) . "'
                style='width: 280px'
            >
            </lottie-player>";
        } else {
            echo '<br />Upload a Lottie JSON file, update the page and you will see a preview of the Lottie animation.';
        }
    }

    add_action('acf/render_field/name=lottie_animation', 'my_acf_render_field');

    add_action('admin_head', 'lottie_js');

    function lottie_js() {
        echo '<script src="https://unpkg.com/@lottiefiles/lottie-player@0.4.0/dist/lottie-player.js"></script>';
    }
