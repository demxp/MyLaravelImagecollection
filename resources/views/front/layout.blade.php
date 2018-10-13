<!DOCTYPE html>
<!--[if IE 8 ]><html class="ie" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US"><!--<![endif]-->
<head>
    <!-- Basic Page Needs -->
    <meta charset="utf-8">
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->
    <title>iDsgn - Minimal Portfolio Template for Creative People</title>

    <meta name="author" content="themesflat.com">

    <!-- Mobile Specific Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" type="text/css" href="/css/front.css?sdfsd" >

    <!-- Favicon and touch icons  -->
    <link href="/icon/apple-touch-icon-48-precomposed.png" rel="apple-touch-icon-precomposed" sizes="48x48">
    <link href="/icon/apple-touch-icon-32-precomposed.png" rel="apple-touch-icon-precomposed">
    <link href="/icon/favicon.png" rel="shortcut icon">

<style>
    p.image-title {
        text-align: center;
        font-size: 18px;
        font-style: italic;
        font-weight: bold;
    }

    div.loginerror{
        color: red;
        margin: 5px auto;
        text-align: center;
    } 

    span.post-title {
        color: white !important;
        margin: 5px;
    }    

    div.link-inner {
        background-color: black;
        border-radius: 5px;
        color: white !important;
        border: 1px solid tomato;
        width: 150px;
        text-align: center;
    }
</style>
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>                                 
<body class="header-sticky page-loading">
    <div id="slideBgShower" class="slide-bg"></div>   
    <script type="text/javascript" src="/js/sliderBackground.js?sdfsd"></script>
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
<!--                                             <ul class="submenu"> 
                                                <li><a href="index.html">Home 01</a></li>
                                                <li><a href="index-02.html">Home 02</a></li>
                                                <li><a href="index-03.html">Home 03</a></li>
                                                <li><a href="index-04.html">Home 04</a></li>
                                                <li><a href="index-05.html">Home 05</a></li>
                                                <li><a href="index-06.html">Home 06</a></li>
                                            </ul> -->
                                        </li>
                                        <li><a href="about.html">ОБО МНЕ</a></li>                                        
                                        <li><a href="contact.html">КОНТАКТЫ</a></li>                                        
                                        <li><a href="/register">РЕГИСТРАЦИЯ</a></li>                                                                                
                                        <li><a href="/login">ЛОГИН</a></li>
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
    
    <!-- Javascript -->
    <script type="text/javascript" src="/js/front.js?sdgfsd"></script>
</body>
</html>