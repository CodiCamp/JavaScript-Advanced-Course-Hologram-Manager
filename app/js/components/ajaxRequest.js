/*
 * function ajaxRequest
 * Abstracts the native XMLHttpRequest
 * main functionalities to
 * getData() and sendData()
 */
(function (Global) {
    /*
     * function getData
     * @param {Object} options can have the following properties:
     *   - {String}   responseType: the format of data we fetch
     *                              defaults to 'json' if not set;
     *   - {Function} dataHandler: reference to the function which handles the response;
     *   - {String}   url: where we fetch the data from;
     */

    function getData(options) {
        var xhr = new XMLHttpRequest();
        options.responseType = options.responseType || 'json';

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status > 199 && xhr.status < 300) {
                    var response = xhr.responseText;

                    if (options.responseType.toLowerCase() === 'json') {
                        response = JSON.parse(response);
                    }

                    options.dataHandler(response);
                }
            }
        }

        xhr.open('GET', options.url);
        xhr.send(null);
    }

    /*
     * function sendData
     * @param {Object} options can have the following properties:
     *   - {String}   contentType: the format of data we send
     *                             defaults to "application/x-www-form-urlencoded; charset=UTF-8" if not set;
     *   - {String}   responseType: the format of data we fetch
     *                              defaults to 'json' if not set;
     *   - {Object}   data: the information we want to send, key-value given;
     *   - {Function} dataHandler: reference to the function which handles the response;
     *   - {String}   serverHanlder: url to the server-side handler of the request;
     */
    function sendData(options) {
        var xhr = new XMLHttpRequest(),
            params = '';

        options.contentType = options.contentType || "application/x-www-form-urlencoded; charset=UTF-8";
        options.responseType = options.responseType || 'json';

        if (typeof options.dataHandler === 'function') {
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status > 199 && xhr.status < 300) {
                        var response = xhr.responseText;

                        if (options.responseType.toLowerCase() === 'json') {
                            response = JSON.parse(response);
                        }

                        options.dataHandler(response);
                    }
                }
            }
        }

        if (typeof options.data !== 'undefined') {
            for (var property in data) {
                if ({}.hasOwnProperty.call(data, property)) {
                    params += property + '=' + data[property] + '&';
                }
            }
        }

        xhr.open('POST', options.serverHanlder);
        xhr.setRequestHeader("Content-Type", options.contentType);
        xhr.send(params);
    }

    Global.ajaxRequest = {
        getData: getData,
        sendData: sendData
    }

})(window);