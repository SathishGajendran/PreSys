

var i=0;
var currentTime;
module.exports={
  generateId:function(){
      if(currentTime==new Date().getTime()){
          ++i;
      }else{
          i=1;
          currentTime=new Date().getTime();
      }
      var id=currentTime + i;
      return id;
  }
};