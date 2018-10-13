(function(document){
    var imgArray = [
        '/img/slide_bg/bg_kosmos1.jpg',
        '/img/slide_bg/bg_kosmos2.jpg',
        '/img/slide_bg/bg_kosmos3.jpg',
        '/img/slide_bg/bg_kosmos4.jpg',
        '/img/slide_bg/bg_kosmos5.jpg',
        '/img/slide_bg/bg_kosmos6.jpg',
        '/img/slide_bg/bg_kosmos7.jpg'            
    ];
    var changeTime = 2000;
    var bgElement = document.getElementById('slideBgShower');
    function getRandomNum(min, max) {
      return Math.random() * (max - min) + min;
    }            
    function process(){
        bgElement.style.opacity = 0;
        setTimeout(function() {
            var url = imgArray[Math.floor(getRandomNum(0, imgArray.length))];
            bgElement.style.transitionTimingFunction = 'cubic-bezier(1, .46, 1, .75)';
            bgElement.style.backgroundImage = 'url('+url+')';   
            bgElement.style.transitionTimingFunction = 'cubic-bezier(.46, 0, .75, 0)';
            setTimeout(function(){
                bgElement.style.opacity = 1;
            }, changeTime/2);
        }, changeTime/2);            
    }                
    setInterval(function(){
        process();
    },10000);
    var num = getRandomNum(0, imgArray.length);
    bgElement.style.backgroundImage = 'url('+imgArray[Math.floor(num)]+')';                  
})(document)