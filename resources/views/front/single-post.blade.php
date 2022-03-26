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
                                                            <span class="entry-time">{{$post->published}}</span>
                                                        </div>
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
@if ($post->commenting == 1)
                                    <div id="comments" class="comments-area">
                                        <h4 class="comments-title">2 thoughts on “Modern Design In Britain”</h4>

                                        <ul class="comment-list">
                                            <li>
                                                <article class="comment-body">
                                                    <div class="comment-meta">
                                                        <div class="comment-author">
                                                            <img src="images/icon/1.png" alt="images">
                                                            <b class="fn"><a href="#" class="url">STEVEN GRAY</a></b>
                                                            <span class="says">says:</span>
                                                        </div>
                                                        <div class="comment-metadata">
                                                            <a href="#"><span>September 7, 2016 at 4:26 am</span></a>
                                                        </div>
                                                    </div>
                                                    <div class="comment-content">
                                                        <p>Stradling’s taste is not easy to predict, and there is no dominant aesthetic or obvious theme; Bauhaus side-tables and Somerset ceramics are viewed with equal respect. The two design connoisseurs share an</p>
                                                    </div>
                                                    <div class="reply"><a class="comment-reply-link" href="#">Reply</a></div>
                                                </article>
                                                <ul class="children">
                                                    <li>
                                                        <article class="comment-body">
                                                            <div class="comment-meta">
                                                                <div class="comment-author">
                                                                    <img src="images/icon/1.png" alt="images">
                                                                    <b class="fn"><a href="#" class="url">STEVEN GRAY</a></b>
                                                                    <span class="says">says:</span>
                                                                </div>
                                                                <div class="comment-metadata">
                                                                    <a href="#"><span>September 7, 2016 at 4:26 am</span></a>
                                                                </div>
                                                            </div>
                                                            <div class="comment-content">
                                                                <p>For this exhibition, titled “Modern Design in Britain”, Margaret Howell has selected fifty objects from the Ken Stradling Collection</p>
                                                            </div>
                                                            <div class="reply"><a class="comment-reply-link" href="#">Reply</a></div>
                                                        </article>
                                                    </li>
                                                </ul><!-- /.children -->
                                                <article class="comment-body">
                                                    <div class="comment-meta">
                                                        <div class="comment-author">
                                                            <img src="images/icon/1.png" alt="images">
                                                            <b class="fn"><a href="#" class="url">STEVEN GRAY</a></b>
                                                            <span class="says">says:</span>
                                                        </div>
                                                        <div class="comment-metadata">
                                                            <a href="#"><span>September 7, 2016 at 4:26 am</span></a>
                                                        </div>
                                                    </div>
                                                    <div class="comment-content">
                                                        <p>Stradling’s taste is not easy to predict, and there is no dominant aesthetic or obvious theme; Bauhaus side-tables and Somerset ceramics are viewed with equal respect. The two design connoisseurs share an</p>
                                                    </div>
                                                    <div class="reply"><a class="comment-reply-link" href="#">Reply</a></div>
                                                </article>
                                            </li>
                                        </ul><!-- /.comment-list -->

                                        <div id="respond" class="comment-respond">
                                            <h4 id="reply-title" class="comment-reply-title">Leave a Reply</h4>
                                            <form id="commentform" class="comment-form">
                                                <p class="comment-notes"><span id="email-notes">Your email address will not be published.</span> Required fields are marked <span class="required">*</span></p>

                                                <p class="comment-form-comment"><label>Comment</label> <textarea id="comment" name="comment" required="required"></textarea></p>

                                                <p class="comment-form-author"><label>Name <span class="required">*</span></label> <input id="author" name="author" type="text" value="" required="required"></p>

                                                <p class="comment-form-email"><label>Email <span class="required">*</span></label> <input id="email" name="email" type="email" value="" required="required"></p>

                                                <!-- <p class="comment-form-url"><label>Website<span class="required">*</span></label> <input id="url" name="url" type="url" value=""></p> -->

                                                <p class="comment-form-url"><label>Website</label> <input id="url" name="url" type="text" value="" required="required"></p>

                                                <p class="form-submit"><input name="submit" type="submit" id="submit" class="submit" value="Post Comment"></p>
                                            </form><!-- /#commentform -->
                                        </div><!-- /.comment-respond -->
                                    </div><!-- /.comments-area -->
@endif                                                                        
                                </div><!-- /.main-content-wrap -->
                            </div><!-- /.main-content -->
                        </div><!-- /.content-wrap  -->
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.blog -->
        </div><!-- /#site-content -->
@endsection        