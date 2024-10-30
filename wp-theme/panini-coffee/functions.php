<?php
/**
 * panini-coffee functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package panini-coffee
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function panini_coffee_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on panini-coffee, use a find and replace
		* to change 'panini-coffee' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'panini-coffee', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'panini-coffee' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'panini_coffee_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'panini_coffee_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function panini_coffee_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'panini_coffee_content_width', 640 );
}
add_action( 'after_setup_theme', 'panini_coffee_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function panini_coffee_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'panini-coffee' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'panini-coffee' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'panini_coffee_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function panini_coffee_scripts() {
	wp_enqueue_style( 'panini-coffee-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'panini-coffee-style', 'rtl', 'replace' );

	wp_enqueue_script( 'panini-coffee-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'panini_coffee_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
// require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Include the shortcodes
 */
// shortcode to retrieve products
// require_once get_template_directory() . '/shortcodes/retrieve-products.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

// Allow SVG uploads
function allow_svg_uploads($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_uploads');

// Register Primary Menu
function register_primary_menu() {
    register_nav_menu('primary', __('Primary Menu'));
}
add_action('after_setup_theme', 'register_primary_menu');

// Register custom REST API endpoint for the main logo
function register_logo_endpoint() {
    register_rest_route('custom/v1', '/logo', array(
        'methods'  => 'GET',
        'callback' => 'get_logo_url',
    ));
}
add_action('rest_api_init', 'register_logo_endpoint');

function get_logo_url() {
    $custom_logo_id = get_theme_mod('custom_logo');
    if ($custom_logo_id) {
        $logo_url = wp_get_attachment_image_url($custom_logo_id, 'full');
        return new WP_REST_Response(array('logo_url' => $logo_url), 200);
    } else {
        return new WP_REST_Response(null, 404);
    }
}

// Register a custom REST API endpoint for the footer
function panini_coffee_register_footer_endpoint() {
    register_rest_route('custom/v1', '/footer', array(
        'methods' => 'GET',
        'callback' => 'panini_coffee_get_footer_content',
    ));
}
add_action('rest_api_init', 'panini_coffee_register_footer_endpoint');

// Callback function to retrieve and return the footer content
function panini_coffee_get_footer_content() {
    ob_start();
    if (is_active_sidebar('footer')) {
        dynamic_sidebar('footer');
    }
    $footer_content = ob_get_clean();

    return array(
        'content' => $footer_content,
    );
}

// Register a custom REST API endpoint for products
function panini_coffee_register_product_endpoint() {
    register_rest_route('custom/v1', '/products', array(
        'methods' => 'GET',
        'callback' => 'panini_coffee_get_product_data',
    ));
}
add_action('rest_api_init', 'panini_coffee_register_product_endpoint');

// Callback function to retrieve and return product data
function panini_coffee_get_product_data() {
    // Query for the last 10 products
    $args = array(
        'post_type' => 'product',
        'posts_per_page' => 10,
        'orderby' => 'date',
        'order' => 'DESC',
    );
    $query = new WP_Query($args);

    // Initialize product data array
    $products = array();

    // Loop through products
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $product_id = get_the_ID();
            $title = get_the_title();
            $slug = get_post_field('post_name', $product_id);
            $short_description = get_the_excerpt();
            
            // Get the thumbnail ID
            $thumbnail_id = get_post_thumbnail_id($product_id);
            
            // Get the image URL, width, height, and alt attribute
            $image_data = wp_get_attachment_image_src($thumbnail_id, 'full');
            $image_url = $image_data[0];
            $image_width = $image_data[1];
            $image_height = $image_data[2];
            $image_alt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);

            // Append product data to array
            $products[] = array(
                'title' => $title,
                'slug' => $slug,
                'short_description' => $short_description,
                'image' => array(
                    'url' => $image_url,
                    'width' => $image_width,
                    'height' => $image_height,
                    'alt' => $image_alt,
                ),
            );
        }
        wp_reset_postdata();
    }

    return $products;
}

// remove gutemberg add blocks from the homepage
function restrict_blocks_on_homepage($allowed_blocks, $post) {
    // Check if we are on the homepage
    if ($post->ID === (int) get_option('page_on_front')) {
        // Specify the allowed blocks
        $allowed_blocks = array(
            'acf/home-hero', // Add your ACF block names here
            // Add other ACF blocks as needed
        );
    } else {
        echo 'Not the home page';
    }

    return $allowed_blocks;
}
add_filter('allowed_block_types', 'restrict_blocks_on_homepage', 10, 2);

// retrive all ACF fields groups
function register_acf_fields_to_rest_api() {
    // Check if function exists
    if (!function_exists('register_rest_field')) {
        return;
    }

    // Register a custom field for ACF field groups
    register_rest_field('page', 'acf_field_groups', array(
        'get_callback'    => 'get_acf_field_groups',
        'update_callback' => null,
        'schema'          => null,
    ));
}

// add field groups to rest API
function get_acf_field_groups($object, $field_name, $request) {
    // Get all field groups
    $field_groups = acf_get_field_groups();
    $acf_data = array();

    if ($field_groups) {
        foreach ($field_groups as $group) {
            // Get all fields in the field group
            $fields = acf_get_fields($group['key']);
            $group_fields = array();
            $has_non_null_field = false;

            if ($fields) {
                foreach ($fields as $field) {
                    $field_value = get_field($field['name'], $object['id']);
                    $group_fields[$field['name']] = $field_value;

                    if ($field_value !== null) {
                        $has_non_null_field = true;
                    }
                }
            }

            // Only add the field group if it has at least one non-null field
            if ($has_non_null_field) {
                $acf_data[] = array(
                    'field_group' => $group['title'],
                    'fields' => $group_fields,
                );
            }
        }
    }

    return $acf_data;
}

add_action('rest_api_init', 'register_acf_fields_to_rest_api');

// Add featured product data to the home page REST API response
function panini_coffee_add_featured_product_to_home( $response, $post, $request ) {
    // Check if this is the home page
    if ( $post->ID === (int) get_option( 'page_on_front' ) ) {
        // Query for the first featured product
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => 1,
            'tax_query' => array(
                array(
                    'taxonomy' => 'product_visibility',
                    'field'    => 'name',
                    'terms'    => 'featured',
                    'operator' => 'IN',
                ),
            ),
            'orderby' => 'date',
            'order' => 'DESC',
        );
        $query = new WP_Query( $args );

        // Initialize product data array
        $product_data = array();

        // Loop through products
        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                $product_id = get_the_ID();
                $title = get_the_title();
                $slug = get_post_field( 'post_name', $product_id );
                $short_description = get_the_excerpt();
                
                // Get the thumbnail ID
                $thumbnail_id = get_post_thumbnail_id( $product_id );
                
                // Get the image URL, width, height, and alt attribute
                $image_data = wp_get_attachment_image_src( $thumbnail_id, 'full' );
                $image_url = $image_data[0];
                $image_width = $image_data[1];
                $image_height = $image_data[2];
                $image_alt = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true );

                // Append product data to array
                $product_data = array(
                    'title' => $title,
                    'slug' => $slug,
                    'short_description' => $short_description,
                    'image' => array(
                        'url' => $image_url,
                        'width' => $image_width,
                        'height' => $image_height,
                        'alt' => $image_alt,
                    ),
                );
            }
            wp_reset_postdata();
        }

        // Add the featured product data to the response
        $response->data['featured_product'] = $product_data;
    }

    return $response;
}
add_filter( 'rest_prepare_page', 'panini_coffee_add_featured_product_to_home', 10, 3 );

// Register Footer Widget Area
register_sidebar(array(
	'name'          => __('Footer Widget Area', 'panini-coffee'),
	'id'            => 'footer',
	'description'   => __('Add widgets here to appear in your footer.', 'panini-coffee'),
	'before_widget' => '<div id="%1$s" class="widget %2$s">',
	'after_widget'  => '</div>',
	'before_title'  => '<h2 class="widget-title">',
	'after_title'   => '</h2>',
));

// Register a custom REST API endpoint for testimonials
function panini_coffee_register_testimonials_endpoint() {
    register_rest_route( 'custom/v1', '/testimonials', array(
        'methods' => 'GET',
        'callback' => 'panini_coffee_get_testimonials',
    ));
}
add_action( 'rest_api_init', 'panini_coffee_register_testimonials_endpoint' );

// Callback function to retrieve and return testimonials
function panini_coffee_get_testimonials() {
    // Query for testimonials
    $args = array(
        'post_type' => 'testimonial',
        'posts_per_page' => -1, // Retrieve all testimonials
    );
    $query = new WP_Query( $args );

    // Initialize testimonials data array
    $testimonials = array();

    // Loop through testimonials
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $testimonial_id = get_the_ID();
            $title = get_the_title();
            $content = get_field('content'); // ACF custom field
            $status = get_field('status'); // ACF custom field
            $thumbnail_id = get_post_thumbnail_id( $testimonial_id);

             // Get the image URL, width, height, and alt attribute
             $image_data = wp_get_attachment_image_src( $thumbnail_id, 'full' );
             $image_url = $image_data[0];
             $image_width = $image_data[1];
             $image_height = $image_data[2];
             $image_alt = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true );


            // Append testimonial data to array
            $testimonials[] = array(
                'id' => $testimonial_id,
                'title' => $title,
                'content' => $content,
                'status' => $status,
                'image' => array(
                    'url' => $image_url,
                    'width' => $image_width,
                    'height' => $image_height,
                    'alt' => $image_alt,
                ),
            );
        }
        wp_reset_postdata();
    }

    return $testimonials;
}

require_once get_template_directory() . '/class-tgm-plugin-activation.php';

add_action( 'tgmpa_register', 'panini_coffee_register_required_plugins' );

/**
 * Register the required plugins for this theme.
 *
 * In this example, we register five plugins:
 * - one included with the TGMPA library
 * - two from an external source, one from an arbitrary source, one from a GitHub repository
 * - two from the .org repo, where one demonstrates the use of the `is_callable` argument
 *
 * The variables passed to the `tgmpa()` function should be:
 * - an array of plugin arrays;
 * - optionally a configuration array.
 * If you are not changing anything in the configuration array, you can remove the array and remove the
 * variable from the function call: `tgmpa( $plugins );`.
 * In that case, the TGMPA default settings will be used.
 *
 * This function is hooked into `tgmpa_register`, which is fired on the WP `init` action on priority 10.
 */
function panini_coffee_register_required_plugins() {
	/*
	 * Array of plugin arrays. Required keys are name and slug.
	 * If the source is NOT from the .org repo, then source is also required.
	 */
	$plugins = array(

		// This is an example of how to include a plugin bundled with a theme.
		// array(
		// 	'name'               => 'TGM Example Plugin', // The plugin name.
		// 	'slug'               => 'tgm-example-plugin', // The plugin slug (typically the folder name).
		// 	'source'             => get_template_directory() . '/lib/plugins/tgm-example-plugin.zip', // The plugin source.
		// 	'required'           => true, // If false, the plugin is only 'recommended' instead of required.
		// 	'version'            => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher. If the plugin version is higher than the plugin version installed, the user will be notified to update the plugin.
		// 	'force_activation'   => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch.
		// 	'force_deactivation' => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins.
		// 	'external_url'       => '', // If set, overrides default API URL and points to an external URL.
		// 	'is_callable'        => '', // If set, this callable will be be checked for availability to determine if a plugin is active.
		// ),

		// This is an example of how to include a plugin from an arbitrary external source in your theme.
		// array(
		// 	'name'         => 'TGM New Media Plugin', // The plugin name.
		// 	'slug'         => 'tgm-new-media-plugin', // The plugin slug (typically the folder name).
		// 	'source'       => 'https://s3.amazonaws.com/tgm/tgm-new-media-plugin.zip', // The plugin source.
		// 	'required'     => true, // If false, the plugin is only 'recommended' instead of required.
		// 	'external_url' => 'https://github.com/thomasgriffin/New-Media-Image-Uploader', // If set, overrides default API URL and points to an external URL.
		// ),

		// This is an example of how to include a plugin from a GitHub repository in your theme.
		// This presumes that the plugin code is based in the root of the GitHub repository
		// and not in a subdirectory ('/src') of the repository.
		// array(
		// 	'name'      => 'Adminbar Link Comments to Pending',
		// 	'slug'      => 'adminbar-link-comments-to-pending',
		// 	'source'    => 'https://github.com/jrfnl/WP-adminbar-comments-to-pending/archive/master.zip',
		// ),

		// This is an example of how to include a plugin from the WordPress Plugin Repository.
		array(
			'name'      => 'One click demo import',
			'slug'      => 'one-click-demo-import',
			'required'  => false,
		),
		// This is an example of the use of 'is_callable' functionality. A user could - for instance -
		// have WPSEO installed *or* WPSEO Premium. The slug would in that last case be different, i.e.
		// 'wordpress-seo-premium'.
		// By setting 'is_callable' to either a function from that plugin or a class method
		// `array( 'class', 'method' )` similar to how you hook in to actions and filters, TGMPA can still
		// recognize the plugin as being installed.
		// array(
		// 	'name'        => 'WordPress SEO by Yoast',
		// 	'slug'        => 'wordpress-seo',
		// 	'is_callable' => 'wpseo_init',
		// ),

	);

	/*
	 * Array of configuration settings. Amend each line as needed.
	 *
	 * TGMPA will start providing localized text strings soon. If you already have translations of our standard
	 * strings available, please help us make TGMPA even better by giving us access to these translations or by
	 * sending in a pull-request with .po file(s) with the translations.
	 *
	 * Only uncomment the strings in the config array if you want to customize the strings.
	 */
	$config = array(
		'id'           => 'panini-coffee',                 // Unique ID for hashing notices for multiple instances of TGMPA.
		'default_path' => '',                      // Default absolute path to bundled plugins.
		'menu'         => 'tgmpa-install-plugins', // Menu slug.
		'parent_slug'  => 'themes.php',            // Parent menu slug.
		'capability'   => 'edit_theme_options',    // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
		'has_notices'  => true,                    // Show admin notices or not.
		'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
		'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
		'is_automatic' => false,                   // Automatically activate plugins after installation or not.
		'message'      => '',                      // Message to output right before the plugins table.

		/*
		'strings'      => array(
			'page_title'                      => __( 'Install Required Plugins', 'panini-coffee' ),
			'menu_title'                      => __( 'Install Plugins', 'panini-coffee' ),
			/* translators: %s: plugin name. * /
			'installing'                      => __( 'Installing Plugin: %s', 'panini-coffee' ),
			/* translators: %s: plugin name. * /
			'updating'                        => __( 'Updating Plugin: %s', 'panini-coffee' ),
			'oops'                            => __( 'Something went wrong with the plugin API.', 'panini-coffee' ),
			'notice_can_install_required'     => _n_noop(
				/* translators: 1: plugin name(s). * /
				'This theme requires the following plugin: %1$s.',
				'This theme requires the following plugins: %1$s.',
				'panini-coffee'
			),
			'notice_can_install_recommended'  => _n_noop(
				/* translators: 1: plugin name(s). * /
				'This theme recommends the following plugin: %1$s.',
				'This theme recommends the following plugins: %1$s.',
				'panini-coffee'
			),
			'notice_ask_to_update'            => _n_noop(
				/* translators: 1: plugin name(s). * /
				'The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.',
				'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.',
				'panini-coffee'
			),
			'notice_ask_to_update_maybe'      => _n_noop(
				/* translators: 1: plugin name(s). * /
				'There is an update available for: %1$s.',
				'There are updates available for the following plugins: %1$s.',
				'panini-coffee'
			),
			'notice_can_activate_required'    => _n_noop(
				/* translators: 1: plugin name(s). * /
				'The following required plugin is currently inactive: %1$s.',
				'The following required plugins are currently inactive: %1$s.',
				'panini-coffee'
			),
			'notice_can_activate_recommended' => _n_noop(
				/* translators: 1: plugin name(s). * /
				'The following recommended plugin is currently inactive: %1$s.',
				'The following recommended plugins are currently inactive: %1$s.',
				'panini-coffee'
			),
			'install_link'                    => _n_noop(
				'Begin installing plugin',
				'Begin installing plugins',
				'panini-coffee'
			),
			'update_link' 					  => _n_noop(
				'Begin updating plugin',
				'Begin updating plugins',
				'panini-coffee'
			),
			'activate_link'                   => _n_noop(
				'Begin activating plugin',
				'Begin activating plugins',
				'panini-coffee'
			),
			'return'                          => __( 'Return to Required Plugins Installer', 'panini-coffee' ),
			'plugin_activated'                => __( 'Plugin activated successfully.', 'panini-coffee' ),
			'activated_successfully'          => __( 'The following plugin was activated successfully:', 'panini-coffee' ),
			/* translators: 1: plugin name. * /
			'plugin_already_active'           => __( 'No action taken. Plugin %1$s was already active.', 'panini-coffee' ),
			/* translators: 1: plugin name. * /
			'plugin_needs_higher_version'     => __( 'Plugin not activated. A higher version of %s is needed for this theme. Please update the plugin.', 'panini-coffee' ),
			/* translators: 1: dashboard link. * /
			'complete'                        => __( 'All plugins installed and activated successfully. %1$s', 'panini-coffee' ),
			'dismiss'                         => __( 'Dismiss this notice', 'panini-coffee' ),
			'notice_cannot_install_activate'  => __( 'There are one or more required or recommended plugins to install, update or activate.', 'panini-coffee' ),
			'contact_admin'                   => __( 'Please contact the administrator of this site for help.', 'panini-coffee' ),

			'nag_type'                        => '', // Determines admin notice type - can only be one of the typical WP notice classes, such as 'updated', 'update-nag', 'notice-warning', 'notice-info' or 'error'. Some of which may not work as expected in older WP versions.
		),
		*/
	);

	tgmpa( $plugins, $config );
}

// ask user to add required plugins after the theme has been installed
function ocdi_register_plugins( $plugins ) {
    $theme_plugins = [
      [ // A WordPress.org plugin repository example.
        'name'     => 'Advanced Custom Fields', // Name of the plugin.
        'slug'     => 'advanced-custom-fields', // Plugin slug - the same as on WordPress.org plugin repository.
        'required' => true,                     // If the plugin is required or not.
      ],
      [ // A locally theme bundled plugin example.
        'name'     => 'Woocommerce',
        'slug'     => 'woocommerce',         // The slug has to match the extracted folder from the zip.
        'required' => true,
      ],
    ];
   
    return array_merge( $plugins, $theme_plugins );
  }
  add_filter( 'ocdi/register_plugins', 'ocdi_register_plugins' );

  function ocdi_import_files() {
    return [
      [
        'import_file_name'           => 'Demo Import',
       'local_import_file'            => trailingslashit( get_template_directory() ) . 'import-content/paninicoffee.content.xml',
      ],
    ];
  }
  add_filter( 'ocdi/import_files', 'ocdi_import_files' );
