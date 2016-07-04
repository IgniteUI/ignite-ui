(function ($) {
    $.extend({
        mockServer: function () {
            this._files = [];
            this._settings = {
                step: 70000 * 1024,
                totalSize: 10 * 1024 * 1024
            }

            this.processRequest = function (k) {
                var theFile, bytesUploaded, s = this._settings;

                theFile = this.getFileByKey(k);

                if (theFile === null) {
                    theFile = this.createNewFile(k);
                } else {
                    bytesUploaded = theFile.uploadedBytes;
                    if (isNaN(bytesUploaded)) {
                        bytesUploaded = 0;
                        theFile.uploadedBytes = 0;
                    }
                    if (bytesUploaded + theFile.step >= theFile.totalSize) { // finish file
                        theFile.uploadedBytes = theFile.totalSize;
                        theFile.status = 2; //$.ig.Constants.Upload.Status.Finished;
                        //this.removeFileByKey(k);
                    } else {
                        theFile.uploadedBytes += theFile.step;
                        theFile.status = 1;// $.ig.Constants.Upload.Status.Started;
                    }
                }

                return this.getResponse(theFile);
            }

            this.getResponse = function (file) {
                return { bytesUploaded: file.uploadedBytes, status: file.status, size: file.totalSize, error: -1 };
            }

            this.createNewFile = function (k) {
                var s = this._settings,
                    theFile = { key: k, status: 1, step: s.step, totalSize: s.totalSize, uploadedBytes: 0 };

                this._files.push(theFile);
                return theFile;
            }

            this.getFileByKey = function (k) {
                var f = this._files,
                    res = null;


                for (index in f) {
                    if (f[index].key === k) {
                        res = f[index];
                        break;
                    }
                }

                return res;
            }

            this.removeFileByKey = function (k) {
                return $.grep(this._file, function (n, i) {
                    return (this._file[i].key !== k);
                });
            }

        }
    });

    /*	
    $.extend({
    ajax: function(origSettings) { 
    alert('ajax call');
    $.mockjax({
    url: 'http://localhost/asdfasdf*',
    contentType: 'text/json',
    responseText: {
    bytesUploaded: 3785397, status: 2, size: 3785397                
    }
    });
    }
    });
    */
})(jQuery);