<?php
/**
 * Kilonova Saúde — functions.php
 */

function kilonova_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'gallery', 'caption']);
}
add_action('after_setup_theme', 'kilonova_setup');

function kilonova_enqueue() {
    $theme_uri = get_template_directory_uri();
    $v = '1.0';

    wp_enqueue_style('google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap',
        [], null
    );
    wp_enqueue_style('kilonova-css',
        $theme_uri . '/css/kilonova.css',
        ['google-fonts'], $v
    );
    wp_enqueue_script('kilonova-translations',
        $theme_uri . '/js/translations.js',
        [], $v, true
    );
    wp_enqueue_script('kilonova-main',
        $theme_uri . '/js/main.js',
        ['kilonova-translations'], $v, true
    );
    wp_localize_script('kilonova-main', 'kilonovaTheme', [
        'themeUrl' => $theme_uri,
    ]);
}
add_action('wp_enqueue_scripts', 'kilonova_enqueue');
