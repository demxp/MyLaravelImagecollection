<!DOCTYPE html>
<!--[if IE 8 ]><html class="ie" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US"><!--<![endif]-->
<head>
    <!-- Basic Page Needs -->
    <meta charset="utf-8">
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->
    <title>Просто сайт, просто блог, просто галерея</title>

    <!-- Mobile Specific Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" type="text/css" href="/css/front.css" >

    <!-- Favicon and touch icons  -->
    <link href="/icon/apple-touch-icon-48-precomposed.png" rel="apple-touch-icon-precomposed" sizes="48x48">
    <link href="/icon/apple-touch-icon-32-precomposed.png" rel="apple-touch-icon-precomposed">
    <link href="/icon/favicon.png" rel="shortcut icon">

    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>                                 
<body class="header-sticky page-loading">
    <div id="vueapp">
    <bg-slider :image-links="['/img/slide_bg/bg_kosmos1.jpg','/img/slide_bg/bg_kosmos2.jpg','/img/slide_bg/bg_kosmos3.jpg','/img/slide_bg/bg_kosmos4.jpg','/img/slide_bg/bg_kosmos5.jpg','/img/slide_bg/bg_kosmos6.jpg','/img/slide_bg/bg_kosmos7.jpg']" :change-timeout="10000"></bg-slider>        
    <div class="loading-overlay">
    </div>
    
    <!-- Boxed -->
    <div class="boxed">
        <div id="site-header" class="header-widget">
            <header id="header" class="header">
                <div class="header-wrap">
                    <div class="container">
                        <div class="row">
                            <div id="logo" class="logo">
                                <a href="{{route('home')}}">
                                    <img src="/img/logo.png" alt="images">
                                </a>
                            </div><!-- /#logo -->

                            <div class="btn-menu">
                                <a href="#" class="btn-menu-mobi">
                                    <i class="fa fa-bars"></i>
                                </a>
                            </div><!-- //mobile menu button -->

                            <div class="nav-wrap">                                
                                <nav id="mainnav" class="mainnav">
                                    <ul class="menu"> 
                                        <li class="home">
                                            <a href="{{route('home')}}">НА ГЛАВНУЮ</a>
                                        </li>
                                        <li class="categories">
                                            <a href="{{route('categories')}}">КАТЕГОРИИ</a>
                                        </li>
                                        <li><a href="/about">ОБО МНЕ</a></li>                                        
                                    </ul><!-- /.menu -->
                                </nav><!-- /.mainnav -->  
                            </div><!-- /.nav-wrap -->
                        </div><!-- /.row -->
                    </div><!-- /.container -->
                </div><!-- /.header-wrap -->
            </header><!-- /.header -->
        </div><!-- /#site-header -->

        @yield('content')
       
        <!-- Go Top -->
        <a class="go-top">
            <i class="fa fa-chevron-up"></i>
        </a>   

    </div>
    </div>
    <!-- Javascript -->
    <script src="/js/front.js"></script>
    <script src="/js/appwebsite.js"></script>
</body>
</html>