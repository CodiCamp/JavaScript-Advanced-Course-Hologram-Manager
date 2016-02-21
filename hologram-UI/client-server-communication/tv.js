(function () {

    var coords = [];
    var box = document.getElementById('box');

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
        console.log('WebSocket not supported');
        return;
    }

    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onerror = function (error) {
        console.log('Connection error! Server down?');
    };

    connection.onmessage = function (str) {
        try {
            var json = JSON.parse(str.data);
        } catch (e) {
            console.log('JSON not valid', str.data);
            return;
        }

        if (json.type === 'history') {
            for (var i=0; i < json.data.length; i++) {
                addMessage(json.data[i].text);
            }
        }
        else if (json.type === 'message') {
            addMessage(json.data.text);
        }
        else {
            console.log('Strange JSON', json);
        }
    };

    function addMessage(string) {
        coords = string.split(',');
        box.style.left = coords[0] + 'px';
        box.style.top = coords[1] + 'px';
    }
})();