<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package panini-coffee
 */

?>

	<footer id="colophon" class="site-footer">
	<?php
        // Display the footer sidebar
        if (is_active_sidebar('footer')) {
            dynamic_sidebar('footer');
        }
        ?>
	</footer>
</div>

<?php wp_footer(); ?>

</body>
</html>
