@extends('front.layout')

@section('content')        
        <div class="site-content">  
            <div id="page-body">
                <div class="flat-row pad-top0px">
                    <div class="container">
                        <div class="row">
                            <div class="project-single project-content-fullwidth">
                                <div class="project-single-wrap">
                                    <div class="project-content">
                                        <h3 class="project-title">{{$category->title}}</h3>
                                    </div><!-- /.project-content -->
                                    <div id="iview">
                                        @foreach($category->images as $image)
                                            @if ($image->status == 1)                                    
                                                <div data-iview:image="{{$image->getImageFile()}}">
                                                    <div class="iview-caption caption1" data-x="0" data-y="0" data-transition="expandLeft">{{$image->title}}</div>
                                                </div>
                                            @endif
                                        @endforeach
                                    </div>

                                </div><!-- /.project-single-wrap -->
                            </div><!-- /.project-single -->

                            <div class="navigation post-navigation">
                                <ul class="nav-links">
                                    <li class="prev-post">
                                        @if($category->hasPrevious())
                                            <a href="{{route('showcategory', $category->getPrevious()->slug)}}">
                                                <div class="link-inner">
                                                    <span class="post-title">{{$category->getPrevious()->title}}</span>
                                                </div>
                                            </a>
                                        @endif
                                    </li>
                                    <li class="go-back">
                                        <a href="{{route('showcategoryaslist', $category->slug)}}">
                                            <div class="icon">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="next-post">
                                        @if($category->hasNext())
                                        <a href="{{route('showcategory', $category->getNext()->slug)}}">
                                            <div class="link-inner">
                                                <span class="post-title">{{$category->getNext()->title}}</span>
                                            </div>
                                        </a>
                                        @endif
                                    </li>
                                </ul>
                            </div><!-- /.navigation .post-navigation -->
                        </div><!-- /.row -->
                    </div><!-- /.container -->
                </div><!-- /.flat-row -->               
            </div><!-- #page-body -->
        </div><!-- /#site-content -->
@endsection        