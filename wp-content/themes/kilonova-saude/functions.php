<?php
/**
 * Kilonova Saúde — functions.php
 */

// =========================================================
// THEME SETUP
// =========================================================
function kilonova_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'gallery', 'caption']);
}
add_action('after_setup_theme', 'kilonova_setup');

// =========================================================
// ENQUEUE STYLES & SCRIPTS
// =========================================================
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

// =========================================================
// SECURITY HARDENING
// =========================================================

// --- Remove WordPress version disclosure from <head> ---
remove_action('wp_head', 'wp_generator');

// --- Remove other unnecessary <head> links that expose infrastructure ---
remove_action('wp_head', 'rsd_link');                   // Really Simple Discovery
remove_action('wp_head', 'wlwmanifest_link');           // Windows Live Writer
remove_action('wp_head', 'rest_output_link_wp_head');   // WP REST API link
remove_action('wp_head', 'wp_shortlink_wp_head');       // Shortlink
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);

// --- Strip version query strings from CSS/JS URLs ---
function kilonova_remove_version_strings($src) {
    if (strpos($src, '?ver=') !== false) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('style_loader_src',  'kilonova_remove_version_strings', 9999);
add_filter('script_loader_src', 'kilonova_remove_version_strings', 9999);

// --- Disable XML-RPC completely ---
add_filter('xmlrpc_enabled', '__return_false');

// --- Remove X-Pingback header ---
add_filter('wp_headers', function($headers) {
    unset($headers['X-Pingback']);
    return $headers;
});

// --- Add HTTP security headers ---
add_action('send_headers', function() {
    if (!headers_sent()) {
        header('X-Frame-Options: SAMEORIGIN');
        header('X-Content-Type-Options: nosniff');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
    }
});

// --- Disable file editing via WP Admin (Appearance > Editor) ---
if (!defined('DISALLOW_FILE_EDIT')) {
    define('DISALLOW_FILE_EDIT', true);
}

// --- Hide login errors (don't reveal if username or password is wrong) ---
add_filter('login_errors', function() {
    return 'Credenciais incorretas.';
});

// --- Disable user enumeration via author URL ---
add_action('template_redirect', function() {
    if (is_author()) {
        wp_redirect(home_url(), 301);
        exit;
    }
});

// --- Remove WP emoji scripts (minor performance + attack surface reduction) ---
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');
