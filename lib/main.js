const pageMod = require("sdk/page-mod");
const self = require("sdk/self");
const widgets = require("sdk/widget");
const tabs = require("sdk/tabs");
const data = self.data;
const prefs = require('sdk/simple-prefs');
const simpleStorage = require('sdk/simple-storage').storage;
const panel = require("sdk/panel");

exports.main = function (options, callbacks) {

    var configPanel = panel.Panel({
        width : 800,
        height : 650,
        contentScriptWhen: 'end',
        contentURL : data.url('option.html'),
        contentScriptFile : [data.url('jquery.js'), data.url('option.js')],
        onMessage: function(message) {
            if(message.name == 'updateLS'){
                    simpleStorage.backgroundImageData = JSON.stringify(message.data);
            }        
        },
        onShow: function(){
            configPanel.postMessage({
                name: 'onshow',
                data: JSON.parse(simpleStorage.backgroundImageData || '[]')
            });
        }
    });

    prefs.on('openPref', function (){
        configPanel.show().bind(configPanel)
    });

    pageMod.PageMod({
        include:  ["https://student.iimc.kyoto-u.ac.jp/iwproxy/KULASIS/student/*","https://www.k.kyoto-u.ac.jp/teacher/*"],
        contentScriptWhen: 'end',
        contentScriptFile: data.url("content.js"),
        contentStyleFile: data.url("content.css"),
        onAttach: function onAttach(worker){
            worker.postMessage({
                imageData : JSON.parse(simpleStorage.backgroundImageData || '[]')
            });
        }
    });

}
