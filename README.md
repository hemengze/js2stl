# js2stl
转换json文件或者binary文件为stl文件

# Usage
安装
`npm install js2stl`

# JSON文件
本地或者远程的json文件
```
  var js2stl = require('js2stl');   
  var fs = require('fs');   
  js2stl.jsonConvert('http://your_json_path.js', function(err, buffer){
    if(!err){
        fs.writeFileSync('./stl_path.stl', buffer)
    }else{
        console.log(err);
    }
  });
  js2stl.jsonConvert('./local_json_path.js', function(err, buffer){
     if(!err){
         fs.writeFileSync('./stl_path.stl', buffer)
     }else{
         console.log(err);
     }
  });
 ```
 
 # Binary文件
 本地或者远程的binary文件
 ```
  js2stl.binaryConvert('http://your_binary_path.js', function(err, buffer){
      if(!err){
          fs.writeFileSync('./stl_path.stl', buffer)
      }else{
          console.log(err);
      }
    });
  js2stl.binaryConvert('./local_binary_path.js', function(err, buffer){
       if(!err){
           fs.writeFileSync('./stl_path.stl', buffer)
       }else{
           console.log(err);
       }
    });
 
 ```