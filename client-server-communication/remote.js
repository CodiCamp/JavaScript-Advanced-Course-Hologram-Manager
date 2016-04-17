(function () {

    var status = document.getElementById('status');

    var coords = [0,0];

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
        console.log('WebSocket not supported');
        return;
    }

    var connection = new WebSocket('ws://192.168.77.144:1337');

    connection.onopen = function () {
        status.innerHTML = 'You are in control';
    };

    connection.onerror = function (error) {
        console.log('Connection error! Server down?');
    };

    document.onkeydown = function(e) {
        if (e.keyCode === 39) {
            coords[0] += 10;
            connection.send(coords);
        }
        else if (e.keyCode === 37) {
            coords[0] -= 10;
            connection.send(coords);
        }

        if (e.keyCode === 38) {
            coords[1] -= 10;
            connection.send(coords);
        }
        else if (e.keyCode === 40) {
            coords[1] += 10;
            connection.send(coords);
        }
    };
})();