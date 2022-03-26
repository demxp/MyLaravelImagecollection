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
    var displays = [];
    bgElement.style.zIndex = -3;
    for (let i in bgElement.children){
        if(typeof bgElement.children[i] == 'object'){
            bgElement.children[i].style.opacity = 0;
            bgElement.children[i].style.zIndex = -2;
            displays.push(bgElement.children[i]);
        }
    }

    let current = function(){
        let id = 1;
        return function(){
            if(id == 0){
                id = 1;
                return {
                    c: 0,
                    p: 1
                };
            }else{
                id = 0;
                return {
                    c: 1,
                    p: 0
                };
            }
        };
    }();

    function getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }            

    let image = function(){
        images = [];
        for(let i in imgArray){
            images.push({
                url: imgArray[i],
                rate: 1
            });
        }

        return function(){
            let max = images.length - 1;
            let find_flag = false;
            let ret = '';
            for(let i in images){
                if(images[i].rate >= max){
                    find_flag = true;
                    images[i].rate = 0;
                    ret = images[i].url;
                }else{
                    images[i].rate++;
                }
            }

            if(!find_flag){
                for(let k in images){
                    let r_find = getRandomNum(0, images.length);
                    if(images[r_find].rate >= 2){
                        ret = images[r_find].url;
                        images[r_find].rate = 0;
                        break;
                    }
                }
            }
            return ret;
        };
    }();

    function process(){
        setTimeout(function() {
            var url = imgArray[getRandomNum(0, imgArray.length)];
            let id = current();
            displays[id.c].style.transitionTimingFunction = 'cubic-bezier(1, .46, 1, .75)';
            displays[id.c].style.backgroundImage = 'url('+image()+')';
            displays[id.c].style.zIndex = -1;
            displays[id.p].style.zIndex = -2;
            displays[id.p].style.transitionTimingFunction = 'cubic-bezier(.46, 0, .75, 0)';
            setTimeout(function(){
                displays[id.c].style.opacity = 1;
                displays[id.p].style.opacity = 0;
            }, changeTime/2);
        }, changeTime/2);            
    }                
    setInterval(function(){
        process();
    },10000);
    let id = current();
    displays[id.c].style.backgroundImage = 'url('+image()+')';
    displays[id.c].style.zIndex = -1;
    displays[id.c].style.opacity = 1;
})(document)