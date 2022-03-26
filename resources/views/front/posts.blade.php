@extends('front.layout')

@section('content')        

<div class="site-content">
            <div class="blog no-sidebar">
                <div class="container">
                    <div class="row">
                        <div class="content-wrap">
                            <div class="main-content">
                                <div class="main-content-wrap">
                                    <div class="content-inner">
                                        @foreach($posts as $post)
                                        <article class="blog-post hentry">
                                            <div class="entry-wrapper">
                                                <div class="entry-header">                                                
                                                    <div class="entry-header-content">
                                                        <h2 class="entry-title">
                                                            <a href="{{route('showpost', $post->slug)}}">{{$post->title}}</a>
                                                        </h2>
                                                        <div class="entry-meta">
                                                            <span>By</span>
                                                            <span class="entry-author"><span class="entry-author-name">{{$post->author->name}}</span></span>
                                                            <span class="entry-time">{{$post->published}} МСК</span>
                                                        </div>
                                                    </div><!-- /.entry-header-content -->
                                                </div><!-- /.entry-header -->
                                                @if($post->title_image)
                                                <div class="entry-cover">
                                                    <a href="{{route('showpost', $post->slug)}}">
                                                        <img src="{{$post->title_image}}" alt="images">
                                                    </a>
                                                </div><!-- /.entry-cover -->                                            
                                                @endif
                                                <div class="entry-content">
                                                    {{$post->shortedContent}}
                                                    <div class="readmore"><a href="{{route('showpost', $post->slug)}}" class="more-link">Read More</a></div>
                                                </div><!-- /.entry-content -->
                                            </div><!-- /.entry-wrapper -->
                                        </article><!-- /.blog-post -->
                                        @endforeach
                                    </div><!-- /.content-inner -->

                                    <div class="navigation paging-navigation loadmore">
                                        <div class="loop-pagination">
                                            <a href="#">Load More</a>
                                        </div><!-- /.loop-pagination -->
                                    </div><!-- /.nagivation -->
                                    
                                </div><!-- /.main-content-wrap -->
                            </div><!-- /.main-content -->
                        </div><!-- /.content-wrap  -->
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.blog -->
        </div>
@endsection        