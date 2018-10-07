  function addpicture (btn, size) {
  	(function(document, size){
  		function init(){
  			return new Promise(function(resolve, reject) {
		 		var fileselect = document.createElement('input');
				fileselect.type = 'file';
		 		fileselect.onchange = function(){
		 			var selected = this.files[0];
			  		if (!selected.type.match('image.*')) {
			        	return reject({
			        		text: "Можно загружать только изображения!",
			        		errorcode: "Upload no image file"
			        	});			  			
			  		}
			        return resolve(URL.createObjectURL(selected));
		  		};
		  		var event = new MouseEvent("click");
		  		fileselect.dispatchEvent(event);
  			})
  		};

		function imageLoader(src) {
			return new Promise(function(resolve, reject){
				var img = document.createElement("img");
				img.onload = function() {
					return resolve(img);
				};
				img.onerror = function(e) {
					return reject({
			        	text: "Ошибка загрузки",
			        	errorcode: e
			        });
				};
				img.src = src;				
			})
		}

		function cropToSquare(img){
			var left, top, side;
			if(img.height > img.width){
				left = 0;
				top = (img.height - img.width)/2;
				side = img.width;
			}else if(img.height < img.width){
				left = (img.width - img.height)/2;
				top = 0;		
				side = img.height;		
			}else{
				left = 0;
				top = 0;
				side = img.width;
			}

		    var canvas = document.createElement('canvas');
		    canvas.width = side;
		    canvas.height = side;
		    canvas.getContext('2d').drawImage(img, left, top, img.width, img.height, 0, 0, img.width, img.height);
		    img.src = 'about:blank';
		    img.width = 1;
		    img.height = 1;
		    img = canvas;		    
		    return {
		    	img: img,
		    	side: side
		    };
		}


		function resize(img, w) {
			return new Promise(function(resolve, reject){
			  setTimeout(function(){
			    console.log(img.width, img.height);

			    var steps = Math.ceil(Math.log(img.width / w) / Math.LN2);
			    var sW = w * Math.pow(2, steps - 1);
			    var sH = w * Math.pow(2, steps - 1);
			    var x = 2;

			    function run() {
			      if ( ! (steps--)) {
			        return resolve(img);
			      }

			      setTimeout(function() {
			        console.log(sW, sH);
			        var canvas = document.createElement('canvas');
			        canvas.width = sW;
			        canvas.height = sH;
			        canvas.getContext('2d').drawImage(img, 0, 0, sW, sH);
			        img.src = 'about:blank';
			        img.width = 1;
			        img.height = 1;
			        img = canvas;

			        sW = Math.round(sW / x);
			        sH = Math.round(sH / x);
			        run();
			      }, 0);
			    }
			    run();
			  }, 0);
			})
		}

  		init().then(function(src){
  			return imageLoader(src)
  		}).then(function(img){
  			var cropped = cropToSquare(img);
  			URL.revokeObjectURL(img.src);  			
      		return resize(cropped.img, size);
  		}).then(function(img){
  			document.getElementById('avatar_image').src = img.toDataURL("image/png");
  			document.getElementById('avatar_image_field').value = img.toDataURL("image/png");
  			console.log("FINAL");
  		}).catch(function(error){
  			alert(error.text);
  			console.error(error.errorcode);
  		})
  	})(document, size);
};