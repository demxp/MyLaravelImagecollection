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
                                                            <span>Автор:</span>
                                                            <span class="entry-author"><span class="entry-author-name">{{$post->author->name}}</span></span>
                                                            <local-time utc-time="{{$post->published}}"></local-time>
                                                        </div>
                                                        @if(count($post->tags) > 0)
                                                        <div class="entry-meta">
                                                            <span>Тэги:</span>
                                                            @foreach($post->tags as $tag)
                                                                <a href="{{route('postsbytag', $tag->slug)}}">
                                                                    <span class="entry-tag">{{$tag->title}}</span>
                                                                </a>
                                                            @endforeach
                                                        </div>
                                                        @else
                                                        <div class="entry-meta">
                                                            <span>Тэги:</span>
                                                            <span class="entry-tag">ОТСУТСТВУЮТ</span>
                                                        </div>
                                                        @endif                                                        
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
                                                    <div class="readmore"><a href="{{route('showpost', $post->slug)}}" class="more-link">Читать далее</a></div>
                                                </div><!-- /.entry-content -->
                                            </div><!-- /.entry-wrapper -->
                                        </article><!-- /.blog-post -->
                                        @endforeach
                                    </div><!-- /.content-inner -->
                                    @if(1 == 0)
                                    <div class="navigation paging-navigation loadmore">
                                        <div class="loop-pagination">
                                            <a href="#">Load More</a>
                                        </div><!-- /.loop-pagination -->
                                    </div><!-- /.nagivation -->
                                    @endif
                                </div><!-- /.main-content-wrap -->
                            </div><!-- /.main-content -->
                        </div><!-- /.content-wrap  -->
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.blog -->
        </div>
@endsection        