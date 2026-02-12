<?php
/**
 * Plugin Name: Image Gallery Plugin
 * Description: A simple image gallery plugin to display images in a grid.
 * Version: 1.2
 * Author: Your Name
 */

// Register a custom page for the gallery
function igp_register_gallery_page() {
    add_menu_page(
        'Image Gallery',
        'Image Gallery',
        'manage_options',
        'image-gallery',
        'igp_display_gallery',
        'dashicons-format-gallery',
        6
    );
}
add_action('admin_menu', 'igp_register_gallery_page');

// Display the gallery page
function igp_display_gallery() {
    ?>
   

<script>
    const images = [
        'https://paft.eg/wp-content/uploads/2025/10/download__5_-removebg-preview-1.png',
        'https://paft.eg/wp-content/uploads/2025/10/Juhayna_Food_Industries_Logo-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/10/download__8_-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/images__1_-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/regina-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/sidor-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/10/download__6_-removebg-preview.png',
       
        'https://paft.eg/wp-content/uploads/2025/06/interpack-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/givudan-removebg-preview-3.png',
        'https://paft.eg/wp-content/uploads/2025/06/chain.lait-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/beyti-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/حلوالشام-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/safola-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/rayhan-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/orion-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/OIP-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/lamar-removebg-preview-1.png',
        'https://paft.eg/wp-content/uploads/2025/06/lactalis-removebg-preview-1-1.png',
        'https://paft.eg/wp-content/uploads/2025/06/indevco-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/judi-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/ifff-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/faragello-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/Evafarma-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/download-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/danone-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/07/download__7_-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/daherFoods-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/farm-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/kondarina-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/farom-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/se_ilo-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/akzono_jpg-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/kellogg_s_-removebg-preview-1.png',
        'https://paft.eg/wp-content/uploads/2025/06/suger-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/afea-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/magrabl-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/ropak-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/otsuka-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/kanadia-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/biscomisr-removebg-preview.png',
        'https://paft.eg/wp-content/uploads/2025/06/nabA-removebg-preview-1.png',
        'https://paft.eg/wp-content/uploads/2025/06/Amrekana-removebg-preview.png',
    ];
</script>


        const gallery = document.getElementById('gallery-grid');
        gallery.innerHTML = '';
        images.forEach((url, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <div class="">
                    <img src="${url}" alt="Logo ${index + 1}" class="gallery-logo">
                </div>
            `;
            gallery.appendChild(item);
        });
    </script>
    <?php
}
// Register the Shortcode for displaying gallery
function igp_gallery_shortcode() {
    ob_start();
?>
<style>
.gallery-header {
    text-align: center;
    margin: 40px auto 30px auto;
    max-width: 1170px;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    background-image: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px);
    background-size: 30px 30px;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.title-container {
    position: relative;
    margin-bottom: 20px;
}

.gallery-title {
    color: #222;
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 15px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.2;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.title-main {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    color: #666;
    font-weight: 400;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.title-highlight {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 800;
    margin-bottom: 5px;
}

.title-sub {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    color: #888;
    font-weight: 300;
    font-style: italic;
}

.title-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    gap: 15px;
}

.decoration-line {
    height: 2px;
    width: clamp(40px, 10vw, 60px);
    background: linear-gradient(90deg, transparent, #667eea, transparent);
    animation: pulse 2s ease-in-out infinite;
}

.decoration-icon {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    color: #667eea;
}

@keyframes pulse {
    0%, 100% { opacity: 0.6; transform: scaleX(1); }
    50% { opacity: 1; transform: scaleX(1.2); }
}

.gallery-desc {
    color: #666;
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    line-height: 1.6;
    background: #fff;
    display: block;
}

/* Main Gallery Grid - Fixed Responsive */
#gallery-grid {
    display: grid;
    gap: 15px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    border-radius: 15px;
}

/* Gallery Items - Responsive dimensions */
.gallery-item {
    border-radius: 20px;
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6);
    border: 1px solid rgba(255,255,255,0.3);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1; /* يحافظ على النسبة المربعة */
    transition: box-shadow 0.3s, transform 0.3s;
}

.gallery-item:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
}

.gallery-item img {
    width: 85%;
    height: 85%;
    object-fit: contain;
    filter: none;
    transition: transform 0.3s, opacity 0.3s;
    border-radius: 8px;
}

.gallery-item:hover img {
    transform: scale(1.05);
    opacity: 0.9;
}

/* Responsive Grid Layouts */
/* Extra Large screens */
@media (min-width: 1400px) {
    #gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 20px;
    }
}

/* Large screens */
@media (min-width: 1200px) and (max-width: 1399px) {
    #gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 18px;
    }
}

/* Medium-Large screens */
@media (min-width: 992px) and (max-width: 1199px) {
    #gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 16px;
        padding: 18px;
    }
}

/* Medium screens */
@media (min-width: 768px) and (max-width: 991px) {
    #gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 14px;
        padding: 16px;
    }
    
    .gallery-header {
        padding: 16px;
        margin: 30px auto 20px auto;
    }
}

/* Small screens */
@media (min-width: 576px) and (max-width: 767px) {
    #gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 12px;
        padding: 15px;
    }
    
    .gallery-header {
        padding: 14px;
        margin: 20px auto 15px auto;
        border-radius: 15px;
    }
}

/* Extra Small screens */
@media (max-width: 575px) {
    #gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 10px;
        padding: 12px;
    }
    
    .gallery-header {
        padding: 12px;
        margin: 15px auto 10px auto;
        border-radius: 12px;
    }
    
    .title-decoration {
        margin: 15px 0;
        gap: 10px;
    }
}

/* Very Small screens */
@media (max-width: 400px) {
    #gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
        gap: 8px;
        padding: 10px;
    }
    
    .gallery-header {
        padding: 10px;
        margin: 10px auto 8px auto;
        border-radius: 10px;
    }
}

/* Container wrapper to ensure proper centering */
.gallery-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .gallery-container {
        padding: 0 15px;
    }
}

@media (max-width: 480px) {
    .gallery-container {
        padding: 0 10px;
    }
}

/* Fix for potential overflow issues */
* {
    box-sizing: border-box;
}

body {
    overflow-x: hidden;
}

</style>



<div id="gallery-grid">
    <?php
  
$images = [
    'https://paft.eg/wp-content/uploads/2025/10/download__5_-removebg-preview-1.png',
    'https://paft.eg/wp-content/uploads/2025/10/Juhayna_Food_Industries_Logo-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/10/download__8_-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/images__1_-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/regina-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/sidor-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/10/download__6_-removebg-preview.png',

    'https://paft.eg/wp-content/uploads/2025/06/interpack-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/givudan-removebg-preview-3.png',
    'https://paft.eg/wp-content/uploads/2025/06/chain.lait-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/beyti-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/حلوالشام-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/safola-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/rayhan-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/orion-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/OIP-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/lamar-removebg-preview-1.png',
    'https://paft.eg/wp-content/uploads/2025/06/lactalis-removebg-preview-1-1.png',
    'https://paft.eg/wp-content/uploads/2025/06/indevco-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/judi-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/ifff-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/faragello-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/Evafarma-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/download-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/danone-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/07/download__7_-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/daherFoods-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/farm-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/kondarina-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/farom-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/se_ilo-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/akzono_jpg-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/kellogg_s_-removebg-preview-1.png',
    'https://paft.eg/wp-content/uploads/2025/06/suger-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/afea-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/magrabl-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/ropak-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/otsuka-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/kanadia-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/biscomisr-removebg-preview.png',
    'https://paft.eg/wp-content/uploads/2025/06/nabA-removebg-preview-1.png',
    'https://paft.eg/wp-content/uploads/2025/06/Amrekana-removebg-preview.png',
];



    foreach ($images as $index => $url) {
        echo '<div class="gallery-item">';
        echo '<img src="' . $url . '" alt="Client Logo ' . ($index + 1) . '">';
        echo '</div>';
    }
    ?>
</div>
<?php
    return ob_get_clean();
}
add_shortcode('image_gallery', 'igp_gallery_shortcode');
?>