var THREE = require('three');
require('./lib/BinaryLoader');
require('./lib/STLBinaryExporter');
var fs = require('fs');
var path = require('path');
var util = require('util');
var request = require('request');

var exporter = new THREE.STLBinaryExporter();

var toArrayBuffer = function (buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
};

var fileLoader = function(file, callback){
    if(file.startsWith('http://') || file.startsWith('https://')){
        request(file, {encoding: null}, function (error, response, buffer) {
            if (!error) {
                if(response.statusCode == 200){
                    callback(null, buffer);
                }else{
                    callback(new Error('Http statusCode: ' + response.statusCode, response.statusCode));
                }
            }else{
                callback(error);
            }
        });
    }else{
        fs.readFile(file, callback);
    }
};

var jsonConverter = function (json) {
    var loader = new THREE.JSONLoader();
    var object = loader.parse(json, null);
    var scene = new THREE.Scene();
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(object.geometry, material);
    scene.add(mesh);
    return exporter.parse(scene);
};

var binaryConverter = function (json, binBuffer, callback) {
    var loader = new THREE.BinaryLoader();
    loader.parse(toArrayBuffer(binBuffer), function (geometry) {
        var scene = new THREE.Scene();
        var material = new THREE.MeshPhongMaterial();
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        callback(null, exporter.parse(scene));
    }, null, json.materials);
};

var convertJson = function (file, callback) {
    fileLoader(file, function (err, buffer) {
        if(!err){
            callback(null, jsonConverter(JSON.parse(buffer)));
        }else{
            callback(err);
        }
    });
};

var convertBinary = function (file, callback) {
    fileLoader(file, function (err, buffer) {
        if(!err){
            var json = JSON.parse(buffer);
            if(!json.hasOwnProperty('buffers')){
                callback(new Error('Not a binary file'));
                return false;
            }
            var binFile = file.replace(path.extname(file), '.bin');
            fileLoader(binFile, function (err2, buffer2) {
                if(!err2){
                    binaryConverter(json, buffer2, callback);
                }else{
                    callback(err2);
                }
            });
        }else{
            callback(err);
        }
    });
};

module.exports = {
    jsonConvert : convertJson,
    binaryConvert: convertBinary,
};