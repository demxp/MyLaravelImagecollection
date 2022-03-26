@extends('front.layout')

@section('content')        

        <div class="site-content">
            <div class="single-post no-sidebar">
                <div class="container">
                    <div class="row">
                        <div class="content-wrap">
                            <div class="main-content">
                                <div class="main-content-wrap">
                                    <div class="content-inner">
                                        <article class="blog-post hentry">
                                            <div class="entry-wrapper">
                                                <div class="entry-header">                                                
                                                    <div class="entry-header-content" style="text-align: center">
                                                        <h2 class="entry-title">
                                                            УПС...
                                                        </h2>
                                                    </div><!-- /.entry-header-content -->
                                                </div><!-- /.entry-header -->
                                                <div class="entry-content" style="text-align: center">
                                                    <h3>К сожалению, запрошенная страница отсутствует.</h3>
                                                    <h4>Возможно, она не опубликована, или удалена.</h4>
                                                    <h4>Сочувствую вам.</h4>
                                                </div><!-- /.entry-content -->
                                            </div><!-- /.entry-wrapper -->
                                        </article><!-- /.blog-post -->
                                    </div><!-- /.content-inner -->

                                    <div class="navigation post-navigation">
                                        <ul class="nav-links">
                                            <li class="prev-post">
                                            </li>
                                            <li class="go-back">
                                                <a href="{{route('posts')}}">
                                                    <div class="icon">
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="next-post">
                                            </li>
                                        </ul>       
                                    </div><!-- /.nagivation -->
                                </div><!-- /.main-content-wrap -->
                            </div><!-- /.main-content -->
                        </div><!-- /.content-wrap  -->
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.blog -->
        </div><!-- /#site-content -->
@endsection        