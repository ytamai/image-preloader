var testsrc1='<img src="images/test01.jpg" />';
var errCase='<mg src="images/test01.jpg" />';
var testsrc2='<img src="images/test02.jpg" />';
var test=new ImagePreloader();

describe('setter getter',function(){
  beforeEach(function(){
    test.setImageSrc(testsrc1);
    test.setImageSrc(errCase);
    test.setImageSrc(testsrc2);
  });
    it('testsrc1が返ってくるか',function(){
      expect(test.getImagesArray()).toContain(testsrc1);
    });
    it('testsrc2が返ってくるか',function(){
      expect(test.getImagesArray()).toContain(testsrc2);
    });
    it('エラーを弾いているか',function(){
      expect(test.getImagesArray()).not.toContain(errCase);
    });
});
