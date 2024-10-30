<?php
// Shortcode to display product data
function panini_coffee_product_shortcode() {
    // Query for all products
    $args = array(
        'post_type' => 'product',
        'posts_per_page' => -1,
    );
    $query = new WP_Query($args);

    // Initialize output
    $output = '<div class="products">';

    // Loop through products
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $product_id = get_the_ID();
            $title = get_the_title();
            $slug = get_post_field('post_name', $product_id);
            $short_description = get_the_excerpt();
            $image = get_the_post_thumbnail_url($product_id, 'full');

            // Append product data to output
            $output .= '<div class="product">';
            $output .= '<h2>' . esc_html($title) . '</h2>';
            if ($image) {
                $output .= '<img src="' . esc_url($image) . '" alt="' . esc_attr($title) . '">';
            }
            $output .= '<p>' . esc_html($short_description) . '</p>';
            $output .= '<a href="' . esc_url(get_permalink($product_id)) . '">' . esc_html($slug) . '</a>';
            $output .= '</div>';
        }
        wp_reset_postdata();
    } else {
        $output .= '<p>No products found.</p>';
    }

    $output .= '</div>';

    return $output;
}
add_shortcode('product_list', 'panini_coffee_product_shortcode');