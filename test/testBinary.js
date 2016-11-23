var fs = require('fs');
var path = require('path');
var js2stl = require('../index');

var assetsPath = path.join(__dirname, '../assets');

var local_binary = path.join(assetsPath, '154388.js');

var remote_binary = 'http://of0u9bxj7.bkt.clouddn.com/20160901/02cf08cc88fec010eb1893953cee66a9.js';

var stlFile = function(file){
    return path.join(assetsPath, path.basename(file, '.js') + '.stl');
};

describe('convertLocalJson', function () {
    it("The local binary file convert to a buffer", function (done) {
        js2stl.binaryConvert(local_binary, function (err, buffer) {
            if(!err){
                fs.writeFile(stlFile(local_binary), buffer, function (err, buffer) {
                    if(err){
                        throw err;
                    }
                    done();
                });
            }else {
                throw err;
            }
        });
    });
});

describe('convertRemoteJson', function () {
    it("The remote binary file convert to a buffer", function (done) {
        js2stl.binaryConvert(remote_binary, function (err, buffer) {
            if(!err){
                fs.writeFile(stlFile(remote_binary), buffer, function (err, buffer) {
                    if(err){
                        throw err;
                    }
                    done();
                })
            }else {
                throw err;
            }
        });
    });
});