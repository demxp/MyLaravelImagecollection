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
                                                            Регистрация
                                                        </h2>
                                                    </div><!-- /.entry-header-content -->
                                                </div><!-- /.entry-header -->
                                            </div><!-- /.entry-wrapper -->
                                        </article><!-- /.blog-post -->
                                    </div><!-- /.content-inner -->

                                    <div id="comments" class="comments-area">
									    @include('admin.errors')                                    
                                        <div id="respond" class="comment-respond">
									        <form id="registerform" class="register-form" method="POST" action="/register">
									        	{{csrf_field()}}
                                                <p class="comment-form-author"><label>Имя <span class="required">*</span></label> <input id="name" name="name" type="text" value="{{old('name')}}" required="required"></p>

                                                <p class="comment-form-email"><label>Email <span class="required">*</span></label> <input id="email" name="email" type="text" value="{{old('email')}}"></p>

                                                <p class="comment-form-password"><label>Пароль <span class="required">*</span></label> <input id="password" name="password" type="password" value=""></p>                                                
                                                <p class="form-submit"><input type="submit" id="submit" class="submit" value="Зарегистрироваться"></p>
                                            </form>
                                        </div><!-- /.comment-respond -->
                                    </div><!-- /.comments-area -->                                    
                                </div><!-- /.main-content-wrap -->
                            </div><!-- /.main-content -->
                        </div><!-- /.content-wrap  -->
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.blog -->
        </div><!-- /#site-content -->
@endsection