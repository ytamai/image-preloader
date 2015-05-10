
var ImagePreloader=function(){
  var images=[],status=[];
  this.setImageSrc=function(img){
    var result=action({
      type:'SET_IMAGE',
      data:img
    });
  };
  this.getImagesArray=function(){
    var result=action({
      type:'GET_ARRAY'
    });
    return result;
  };
  function action(obj){
    switch(obj.type){
      case 'SET_IMAGE':
        var src=isImgSrc(obj.data);
        if(src){
          var id=images.length;
          images.push({
            id:id,
            src:src
          });
          status.push({
            id:id,
            status:'never'
          });
        }
        break;
      case 'GET_ARRAY':
        return images.map(function(obj){
          return obj.src;
        });
    }
  }
  function isImgSrc(imgsrc){
    return (/^<img/.test(String(imgsrc)))? String(imgsrc):console.error(new Error('This is not an image src...'));
  }
};


//browsertest
