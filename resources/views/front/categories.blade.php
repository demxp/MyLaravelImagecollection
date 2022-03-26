@extends('front.layout')

@section('content')
<div class="site-content">  
    <div id="page-body">
        <div class="flat-row pad-top0px">
            <div class="container">
                <div class="row">
                    <div class="flat-divider d50px"></div>
                    <div class="flat-projects projects-grid projects-shortcode projects-has-filter">
                        <div class="projects-items">
                            @foreach($categories as $category)
                                <div class="projects flat-column-2 hentry">
                                    <div class="project-wrap">
                                        <div class="project-thumbnail">
                                            <a href="{{route('showcategory', $category->slug)}}">
                                                <img src="{{$category->getTitleImage()}}" alt="images">
                                            </a>
                                        </div>
                                        <div class="project-info">
                                            <div class="project-info-wrap">
                                                <h3 class="project-title">
                                                    <a href="{{route('showcategory', $category->slug)}}">{{$category->title}}</a>
                                                </h3>
                                                <h6 class="project-buttons">
                                                    <a href="{{route('showcategory', $category->slug)}}" class="flat-button outline white">Открыть</a>
                                                </h6>
                                            </div>
                                        </div>
                                    </div><!-- /.project-wrap -->
                                </div><!-- /.hentry -->
                            @endforeach                            
                        </div><!-- /.projects-items -->
                    </div><!-- /.projects-masonry -->                            
                </div><!-- /.row -->
            </div><!-- /.container -->
        </div><!-- /.flat-row -->               
    </div><!-- #page-body -->
</div><!-- /#site-content -->
@endsection