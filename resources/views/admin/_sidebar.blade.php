      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="header">ГЛАВНОЕ МЕНЮ</li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-dashboard"></i> <span>Админ-панель</span>
          </a>
        </li>
        <li><a @click="setMode({'mode': 'indeximages', 'id': null})"><i class="fa fa-sticky-note-o"></i> <span>Картинки</span></a></li>
        <li><a @click="setMode({'mode': 'indexcategories', 'id': null})"><i class="fa fa-list-ul"></i> <span>Категории</span></a></li>
        <li><a @click="setMode({'mode': 'indexpages', 'id': null})"><i class="fa fa-list-ul"></i> <span>Страницы</span></a></li>        
        <li><a @click="setMode({'mode': 'indexusers', 'id': null})"><i class="fa fa-users"></i> <span>Пользователи</span></a></li>
        <li><a @click="setMode({'mode': 'indexposts', 'id': null})"><i class="fa fa-book"></i> <span>Посты блога</span></a></li>
      </ul>