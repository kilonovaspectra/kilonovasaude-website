<?php get_header(); ?>
<main style="padding-top:100px;">
  <div class="container" style="padding:80px 24px; max-width:780px; margin:0 auto;">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <h1><?php the_title(); ?></h1>
      <?php the_content(); ?>
    <?php endwhile; endif; ?>
  </div>
</main>
<?php get_footer(); ?>
