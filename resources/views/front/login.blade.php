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
                                                            Вход
                                                        </h2>
                                                    </div><!-- /.entry-header-content -->
                                                </div><!-- /.entry-header -->
                                            </div><!-- /.entry-wrapper -->
                                        </article><!-- /.blog-post -->
                                    </div><!-- /.content-inner -->

                                    <div id="login" class="login-area">
									    @include('admin.errors')
                                        @if(session('status'))
                                        <div class="loginerror">
                                            {{session('status')}}
                                        </div>
                                        @endif
									        <form id="loginform" class="login-form" method="POST" action="/login">
									        	{{csrf_field()}}
                                                <p><label>Email <span class="required">*</span></label> <input id="email" name="email" type="text" value="{{old('email')}}"></p>
                                                <p><label>Пароль <span class="required">*</span></label> <input id="password" name="password" type="password" value=""></p>
                                                <p><input type="submit" id="submit" class="submit" value="Войти"></p>
                                            </form>
                                    </div><!-- /.comments-area -->                                    
                                </div><!-- /.main-content-wrap -->
                            </div><!-- /.main-content -->
                        </div><!-- /.content-wrap  -->
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.blog -->
        </div><!-- /#site-content -->
@endsection