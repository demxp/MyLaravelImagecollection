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
                                                            {{$post->title}}
                                                        </h2>
                                                        <div class="entry-meta">
                                                            <span>By</span>
                                                            <span class="entry-author">
                                                                <a href="blog-single.html" class="entry-author-link">
                                                                    <span class="entry-author-name">{{$post->author->name}}</span>
                                                                </a>
                                                            </span>
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
                                                @if (!is_null($post->title_image))
                                                <div class="entry-cover">
                                                    <img src="{{$post->title_image}}" alt="images">
                                                </div><!-- /.entry-cover -->                                            
                                                @endif
                                                <div class="entry-content">
                                                    {!! $post->noRMContent !!}
                                                </div><!-- /.entry-content -->
                                            </div><!-- /.entry-wrapper -->
                                        </article><!-- /.blog-post -->
                                    </div><!-- /.content-inner -->

                                    <div class="navigation post-navigation">
                                        <ul class="nav-links">
                                            <li class="prev-post">
                                                @if($prev = $post->hasPrevious())                                                
                                                <a href="{{route('showpost', $prev->slug)}}">
                                                    <div class="link-inner">
                                                        <span class="post-title">{{$prev->title}}</span>
                                                    </div>
                                                </a>
                                                @endif
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
                                                @if($next = $post->hasNext())
                                                <a href="{{route('showpost', $next->slug)}}">
                                                    <div class="link-inner">
                                                        <span class="post-title">{{$next->title}}</span>
                                                    </div>
                                                </a>
                                                @endif
                                            </li>
                                        </ul>       
                                    </div><!-- /.nagivation -->
                                    @if ($post->commenting != 0)
                                    <comments-block
                                        post-id="{{$post->id}}"
                                        post-slug="{{$post->slug}}"
                                        comment-limit="{{config('app.commentLimit')}}"
                                        @if (\Auth::check() && \Auth::user()->is_admin)
                                        admin-mode
                                        @endif
                                    ></comments-block>
                                    @endif                                                                        
                                </div><!-- /.main-content-wrap -->
                            </div><!-- /.main-content -->
                        </div><!-- /.content-wrap  -->
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.blog -->
        </div><!-- /#site-content -->
@endsection        