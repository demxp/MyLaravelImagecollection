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
                                                    <div class="entry-header-content">
                                                        <h2 class="entry-title">
                                                            {{$page->title}}
                                                        </h2>
                                                    </div><!-- /.entry-header-content -->
                                                </div><!-- /.entry-header -->
                                                <div class="entry-content">
                                                    {!! $page->content !!}
                                                </div><!-- /.entry-content -->
                                            </div><!-- /.entry-wrapper -->
                                        </article><!-- /.blog-post -->
                                    </div><!-- /.content-inner -->
                                </div><!-- /.main-content-wrap -->
                            </div><!-- /.main-content -->
                        </div><!-- /.content-wrap  -->
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.blog -->
        </div><!-- /#site-content -->
@endsection