var fs = require('fs');
var path = require('path');
var js2stl = require('../index');

var assetsPath = path.join(__dirname, '../assets');

var local_json = path.join(assetsPath, '125716.js');

var remote_json = 'http://of0u9bxj7.bkt.clouddn.com/20160901/01bb3542c3311aeb4a6bd41b3d36b45c.js';

var stlFile = function(file){
    return path.join(assetsPath, path.basename(file, '.js') + '.stl');
};

describe('convertLocalJson', function () {
    it("The local json file convert to a buffer", function (done) {
        js2stl.jsonConvert(local_json, function (err, buffer) {
            if(!err){
                fs.writeFile(stlFile(local_json), buffer, function (err, buffer) {
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

describe('convertRemoteJson', function () {
    it("The remote json file convert to a buffer", function (done) {
        js2stl.jsonConvert(remote_json, function (err, buffer) {
            if(!err){
                fs.writeFile(stlFile(remote_json), buffer, function (err, buffer) {
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