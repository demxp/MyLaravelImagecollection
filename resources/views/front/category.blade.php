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
                                        <div class="project-content-wrap clearfix">
                                            <div class="project-header">
                                                <h3 class="project-title">{{$category->title}}</h3>
                                            </div><!-- /.project-header -->
                                        </div><!-- /.project-content-wrap -->
                                    </div><!-- /.project-content -->

                                    <div class="project-gallery project-gallery-grid">
                                        <div class="project-gallery-wrap projects-items">
                                            @foreach($images as $image)
                                                @if ($image->status == 1)
                                                    <div class="project-media-item projects flat-column-3">
                                                        <a class="flat-hover popup-gallery progressive replace" href="{{$image->getImageFile()}}">
                                                            <img src="{{$image->getImageFile()}}" class="preview" alt="images">
                                                        </a>
                                                    </div><!-- /.project-media-item -->
                                                @endif
                                            @endforeach                                        
                                        </div><!-- /.project-gallery-wrap -->
                                        {{$images->links()}}
                                    </div><!-- /.project-gallery .project-gallery-list -->
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
                                        <a href="{{route('home')}}">
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