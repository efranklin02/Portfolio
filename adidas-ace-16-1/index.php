	<?php
	/* For mobile device detection. */
	include('detect_mobile.php');

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <!-- build:remove -->
        <meta name="document-base" content="/adidas-ace-16-1/" />
        <base href="/adidas-ace-16-1/" />
        <link rel="canonical" href="http://www.soccer.com/adidas-ace-16-1"/>
        <!-- /build -->
        <!-- build:template
        <meta name="document-base" content="/_build/adidas-ace-16-1/" />
        <base href="/_build/adidas-ace-16-1/" />
        /build -->

        <title>adidas Ace 16.1 | SOCCER.COM</title>
        <meta name="description" content="Whether you favor revolutionary laceless technology, unrivaled Primeknit, a lightweight synthetic or the unmatched touch of leather, the adidas ACE comes in your speed and your size to boss the game.">
        <meta name="keywords" content="adidas, Ace 16.1">

        <meta name="viewport" content="width=960">

        <meta property="og:title" content="adidas Ace 16.1">
        <meta property="og:type" content="website">
        <meta property="og:url" content="http://www.soccer.com/adidas-ace-16-1">

        <meta property="og:site_name" content="SOCCER.COM">
        <meta property="og:description" content="adidas Ace 16.1">
        <meta property="og:image" content="http://www.soccer.com/Images/Catalog/ProductImages/300/82372.jpg">
        <meta property="fb:admins" content="508514852">

        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@soccerdotcom">
        <meta name="twitter:creator" content="@soccerdotcom">
        <meta name="twitter:title" content="adidas Ace 16.1">
        <meta name="twitter:description" content="adidas Ace 16.1">
        <meta name="twitter:image" content="http://www.soccer.com/Images/Catalog/ProductImages/300/82372.jpg">

        <!-- build:css static/css/main.min.css -->
        <link rel="stylesheet" href="static/css/main.css">
        <!-- /build -->


        <script> 
            var Settings = {};
            Settings.baseURL = '/adidas-ace-16-1/';
        </script>

    </head>

        <body style="margin:0; padding:0;">
				<div id="fixedBar"><a href="/"><img src="//soccer.com/images/soccer/elements/logo_header.png"></a></div>
        <div id="ace16-application" class="ace16-application"></div>

        <script type="text/template" id="application">

            <div class="main">  

                <div class="main-scroll">    

                    <div class="product product--primeknit">

                        <section class="section section--hero" data-snap>
                                <figure class="figure hero-background hero-background--primeknit"></figure>
                                <figure class="figure hero-visual hero-visual--l"></figure>
                                <figure class="figure hero-visual hero-visual--r"></figure>

                                <div class="hero-logo">
                                    <i class="icon-ace-arrow hero-logo__icon"></i>
                                    <h2 class="h2 hero-logo__name"><%= global.product_name_long.primeknit %> <b>synthetic/K-leather</b> </h2>
                                    <span class="hero-logo__tagline"><%=global.hashtag%></span>
                                </div>
                            
                                <div class="hero-content hero-content--bottom">
                                    <h1 class="h1 hero-content__title"><%=primeknit.hero.title%></h1> 
                                      
                                    <a class="button button-regular hero-content__button" href="<%= links.primeknit.product_detail.shop_button_href %>"  target="_blank">
                                        <span class="button-regular__background"></span>
                                        <span class="button-regular__text"><strong><%= global.shop_button_prefix %></strong> <%= global.product_name_long.primeknit %></strong></span>         
                                    </a>

                                    <a class="button button-regular button-regular--inverted hero-content__button" href="<%=links.primeknit.hero.shop_ace_collection_button_href%>"  target="_blank">
                                        <span class="button-regular__background"></span>
                                        <span class="button-regular__text"><strong><%=primeknit.hero.shop_ace_collection_button_label%></strong></span>          
                                    </a> 

                                </div>

                                <div class="hero-indicator"><i class="icon-arrow-down hero-indicator__icon"></i><i class="icon-arrow-down hero-indicator__icon"></i></div>
                        </section>

                        <section class="section section--intro" data-snap>

                            <figure class="intro-background"></figure>

                            <div class="intro-content">
                                <p class="p intro-content__body"><%=primeknit.intro.body[0]%></p>
                                <p class="p intro-content__body"><%=primeknit.intro.body[1]%></p>
                                <p class="p intro-content__body"><%=primeknit.intro.body[2]%></p>
                                <p class="p intro-content__body"><%=primeknit.intro.body[3]%></p>
                                <p class="p intro-content__body"><%=primeknit.intro.body[4]%></p>
                                <p class="p intro-content__body"><%=primeknit.intro.body[5]%></p>
                                <p class="p intro-content__body"><%=primeknit.intro.body[6]%></p>
                                <p class="p intro-content__body"><%=primeknit.intro.body[7]%></p>

                                <h2 class="h2 h2--medium intro-content__title">
                                    <%=primeknit.intro.title%>
                                </h2>

                                <span class="subtitle intro-content__subtitle"><%=primeknit.intro.subtitle_prefix%> <%=global.product_name_long.primeknit%></span>
                            </div>

                        </section>


                       <section class="section section--video video-background--pattern" data-snap>
                            <div class="video-wrapper">
                                <video class="video-wrapper__video video" controls width="1280" height="720" data-video-name="primeknit">
                                        <source src="static/video/lowers_Primeknit_beauty.mp4" type="video/mp4">
                                        <source src="static/video/lowers_Primeknit_beauty.ogg" type="video/ogg">
                                </video>
                                <!-- <button class="video-wrapper__button button button-video button-video~~play js-needed ir">play</button> -->
                                <img class="video-wrapper__poster" src="static/img/misc/syn_leath_final.png" width="1280" height="720" >
                            </div>  
                        </section>


                        <section class="section section--details">

                            <a class="button button-regular section-details__button" href="<%= links.primeknit.product_detail.shop_button_href %>"  target="_blank">
                                <span class="button-regular__background"></span>
                                <span class="button-regular__text"><strong><%= global.shop_button_prefix %></strong> <%=global.product_name_long.primeknit%></span>
                            </a>   

                            <figure class="figure pattern-background paralax-background js-needed"></figure>

                            <ul class="list details-list">

                                <li class="list-item details-list__item details-list--primeknit" data-snap>
                                    <div class="details-list-inner">
                                    
                                        <div class="details-list-content details-list-content--bottom">
                                            <h3 class="h3 details-list-content__title"><%=primeknit.product_detail.primeknit.title%></h3>
                                            <p class="p details-list-content__body"><%=primeknit.product_detail.primeknit.body%></p>
                                            <p class="p details-list-content__subtitle"><%=primeknit.product_detail.primeknit.subtitle%></p>
                                        </div>

                                        <img class="details-list__image" src="static/img/primeknit/detail-section/Image-for-control-web.png" width="1195" height="590">    
                                        
                                        <button class="button button-play--small details-list__button ir" data-inactive="true">
                                             <canvas class="button-play__canvas" width="80" height="80"></canvas>   
                                        </button>

                                    </div>
                                </li>

                                <li class="list-item details-list__item details-list--groundctrl" data-snap>
                                    <div class="details-list-inner">
                                    
                                        <div class="details-list-content details-list-content--right">
                                            <h3 class="h3 details-list-content__title">TPU Stripes</h3>
                                            <p class="p details-list-content__body">The stripes on both the lateral and medial sides of the foot are made from TPU and wrap around the foot. This keeps you locked in place during every cut, every sprint and every strike.</p>
                                        </div>

                                        <img class="details-list__image" src="static/img/primeknit/detail-section/Image-for-control-web.png" width="1195" height="590">    
                                        
                                        <button class="button button-play--small details-list__button ir" data-inactive="true">
                                             <canvas class="button-play__canvas" width="80" height="80"></canvas>   
                                        </button>

                                    </div>
                                </li>
                                
                               <li class="list-item details-list__item details-list--primecut" data-snap>
                                    <div class="details-list-inner">
                                    
                                        <div class="details-list-content details-list-content--left">
                                            <h3 class="h3 details-list-content__title">GroundCTRL 2.0</h3>
                                            <p class="p details-list-content__body">A brand new outsole has been combined with the SprintFrame of old. Reusing the SprintFrame from their F50 adiZero range to reduce weight, the GroundCTRL 2.0 is a complete upgrade from the previous sole plate.</p>
                                            <p class="p details-list-content__body">Still able to be used on both artificial grass and firm ground, the GroundCTRL 2.0 is the perfect outsole for anyone looking to Boss the Game.</p>
                                        </div>

                                        <img class="details-list__image" src="static/img/primeknit/detail-section/Image-for-control-web.png" width="1394" height="685">    
                                        
                                        <button class="button button-play--small details-list__button ir" data-inactive="true">
                                             <canvas class="button-play__canvas" width="80" height="80"></canvas>   
                                        </button>

                                    </div>
                                </li>
                                
                                <li class="list-item details-list__item  details-list--techfit" data-snap>
                                    <div class="details-list-inner">
                                    
                                        <div class="details-list-content details-list-content--left ">
                                            <h3 class="h3 details-list-content__title">Leather</h3>
                                            <p class="p details-list-content__body">Super soft kangaroo leather always provides the softest touch in any game, and that's exactly what adidas has gone with for their ACE 16.1 Leather.</p>
                                            <p class="p details-list-content__body">A new stitch pattern helps the leather keep its shape longer.</p>
                                        </div>

                                        <figure class="figure details-list__image-shadow"></figure>
                                        <img class="details-list__image" src="static/img/primeknit/detail-section/image-for-leather.png" width="717" height="352">
                                        
                                        <button class="button button-play--small details-list__button ir" data-inactive="true">
                                             <canvas class="button-play__canvas" width="80" height="80"></canvas>   
                                        </button>

                                    </div>
                                </li>

                                <li class="list-item details-list__item details-list--primecut" data-snap>
                                    <div class="details-list-inner">
                                    
                                        <div class="details-list-content details-list-content--left">
                                            <h3 class="h3 details-list-content__title"><%=primeknit.product_detail.primecut.title%></h3>
                                            <p class="p details-list-content__body"><%=primeknit.product_detail.primecut.body[0]%></p>
                                            <p class="p details-list-content__body"><%=primeknit.product_detail.primecut.body[1]%></p>
                                            <p class="p details-list-content__subtitle"><%=primeknit.product_detail.primecut.subtitle%></p>
                                        </div>

                                        <img class="details-list__image" src="static/img/primeknit/detail-section/image-for-leather.png" width="1394" height="685">    
                                        
                                        <button class="button button-play--small details-list__button ir" data-inactive="true">
                                             <canvas class="button-play__canvas" width="80" height="80"></canvas>   
                                        </button>

                                    </div>
                                </li>

                                <li class="list-item details-list__item  details-list--techfit" data-snap>
                                    <div class="details-list-inner">
                                    
                                        <div class="details-list-content details-list-content--left ">
                                            <h3 class="h3 details-list-content__title">GroundCTRL 2.0</h3>
                                            <p class="p details-list-content__body">A brand new outsole has been combined with the SprintFrame of old. Reusing the SprintFrame from their F50 adiZero range to reduce weight, the GroundCTRL 2.0 is a complete upgrade from the previous sole plate.</p>
                                            <p class="p details-list-content__body">Still able to be used on both artificial grass and firm ground, the GroundCTRL 2.0 is the perfect outsole for anyone looking to Boss the Game.</p>
                                        </div>

                                        <figure class="figure details-list__image-shadow"></figure>
                                        <img class="details-list__image" src="static/img/primeknit/detail-section/image-for-leather.png" width="717" height="352">
                                        
                                        <button class="button button-play--small details-list__button ir" data-inactive="true">
                                             <canvas class="button-play__canvas" width="80" height="80"></canvas>   
                                        </button>

                                    </div>
                                </li>

                            </ul>
                        </section>

                        <section class="section section--collection" data-tracking-category="PRIMEKNIT" data-snap>
                            
                            <div class="collection-content">
                                <h2 class="h2 collection-content__title">
                                    <%=global.collection.title[0]%> 
                                    <%=global.collection.title[1]%>
                                </h2>

                                 <a href="<%=links.primeknit.collection.shop_collection_button_href%>" class="button button-regular collection-content__button button-regular--bold" target="_blank"> 
                                    <span class="button-regular__background"></span>
                                    <span class="button-regular__text"><%=global.shop_collection_button_label%></span> 
                                </a>
                            </div>

                            <div class="collection-visual collection-visual--primeknit">
                                <figure class="figure collection-visual--background"></figure>
                                <figure class="figure collection-visual--player-primeknit"></figure>
                                <figure class="figure collection-visual--overlay"></figure>    
                            </div>

                            <figure class="collection-background collection-background--primeknit"></figure>

                        </section>
                        
                    </div>


                    <section class="section section--end" data-snap="false">
                        <div class="end-content"> 
                            <h2 class="h2 end-content__title"><%= global.footer.title[0] %> <br/> <%= global.footer.title[1] %> </h2>
                            
                            <a class="button button-regular end-content__button button-regular--bold" href="<%= links.global.footer.shop_all_boots_button_href %>"  target="_blank"><%= global.footer.shop_all_boots_button_label %></a> 
                            <a class="button button-regular end-content__button button-regular--bold" href="<%= links.global.footer.shop_all_collections_href %>"  target="_blank"><%= global.footer.shop_all_collections_label %></a>   
                        </div>
                    </section>

                </div>

                <ul class="list details-navigation-list details-navigation-list--primeknit">
                    <li class="list-item details-navigation-list__item">
                        <a href="#" class="details-navigation-list__button details-navigation-list__button--active" data-id="0">
                            <figure class="figure details-navigation-list__button-dot"></figure>
                        </a>
                        <span class="label details-navigation-list__label"><%=primeknit.product_detail.primeknit.title%></span>
                    </li>
                    <li class="list-item details-navigation-list__item">
                        <a href="#" class="details-navigation-list__button" data-id="1">
                            <figure class="figure details-navigation-list__button-dot"></figure>
                        </a>
                        <span class="label details-navigation-list__label"><%=primeknit.product_detail.primecut.title%></span>
                    </li>
                    <li class="list-item details-navigation-list__item">
                        <a href="#" class="details-navigation-list__button" data-id="2">
                            <figure class="figure details-navigation-list__button-dot"></figure>
                        </a>
                        <span class="label details-navigation-list__label"><%=primeknit.product_detail.ground_control.title%></span>
                    </li>
                     <li class="list-item details-navigation-list__item">
                        <a href="#" class="details-navigation-list__button" data-id="3">
                            <figure class="figure details-navigation-list__button-dot"></figure>
                        </a>
                        <span class="label details-navigation-list__label"><%=primeknit.product_detail.ground_ctrl.title%></span>
                    </li>
                    <li class="list-item details-navigation-list__item">
                        <a href="#" class="details-navigation-list__button" data-id="4">
                            <figure class="figure details-navigation-list__button-dot"></figure>
                        </a>
                        <span class="label details-navigation-list__label"><%=primeknit.product_detail.primecut.title%></span>
                    </li>
                     <li class="list-item details-navigation-list__item">
                        <a href="#" class="details-navigation-list__button" data-id="5">
                            <figure class="figure details-navigation-list__button-dot"></figure>
                        </a>
                        <span class="label details-navigation-list__label"><%=primeknit.product_detail.ground_control.title%></span>
                    </li>
                </ul>

                
                </div>

            </div>


        </script>


        <!-- build:js static/js/app.min.js -->
        <script data-main="static/js/boot" src="static/js/vendor/require-2.1.16.js"></script>
        <!-- /build -->
		
		<?php include('../channels/footer.php'); ?>
		
    </body>
</html>