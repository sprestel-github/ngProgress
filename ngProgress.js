var module = angular.module('ngProgress', []);

module.provider('progressbar', function() {
    this.count = 0;
    this.height = '2px';
    this.color = 'firebrick';
     
    this.$get = function($document, $window) {
        var count = this.count;
        var height = this.height;
        var color = this.color;
        var $body = $document.find('body');
        var progressbarContainer = angular.element('<div class="progressbar-container"></div>');
        var progressbar = angular.element('<div class="progressbar"></div>');
        
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".progressbar {-webkit-transition: all 0.5s ease-in-out; -moz-transition: all 0.5s ease-in-out; -o-transition: all 0.5s ease-in-out; transition: all 0.5s ease-in-out;}";
        document.body.appendChild(css);

        progressbarContainer.css('position', 'fixed');
        progressbarContainer.css('top', '0');
        progressbarContainer.css('left', '0');
        progressbarContainer.css('right', '0');

        progressbar.css('height', height);
        progressbar.css('box-shadow', '0px 0px 10px 0px ' + color);
        progressbar.css('width', count+'%');
        progressbar.css('background-color', color);

        // stylesheet.insertRule(".progressbar {-webkit-transition: all 0.5s ease-in-out; }", 0);
        // stylesheet.insertRule(".progressbar {-moz-transition: all 0.5s ease-in-out; }", 0);
        // stylesheet.insertRule(".progressbar {-o-transition: all 0.5s ease-in-out; }", 0);
        // stylesheet.insertRule(".progressbar {transition: all 0.5s ease-in-out; }", 0);

        progressbarContainer.append(progressbar);
        $body.append(progressbarContainer);


        return {
            start: function() {
                progressbar.css('width', count + '%');
                progressbar.css('opacity', '1');
                $window.interval = setInterval(function(){
                    if(count + 1 >= 100) {
                        clearInterval($window.interval);
                    } else {
                        var random = Math.floor(Math.random()*5)
                        count = count + random;
                        progressbar.css('width', count + '%');
                    }
                }, 200);
                // return "Hello, " + count + "!"
            },
            height: function(new_height) {
                progressbar.css('height', new_height);
            },
            color: function(color) {
                progressbar.css('box-shadow', '0px 0px 10px 0px ' + color);
                progressbar.css('background-color', color);
            },
            status: function() {
                return this.count;
            },
            stop: function() {
                clearInterval($window.interval);
            },
            set: function(new_count) {
                if(new_count >= 100) {
                    this.complete();
                }
                count = new_count;
                progressbar.css('width', count + '%');
                progressbar.css('opacity', '1');
                return count;
            },
            reset: function() {
                count = 0;
                progressbar.css('width', count + '%');
                progressbar.css('opacity', '1');
                return 0;
            },
            complete: function() {
                count = 100;
                progressbar.css('width', count + '%');
                setTimeout(function(){
                    progressbar.css('opacity', '0');
                }, 500);
                setTimeout(function(){
                    count = 0;
                    progressbar.css('width', count + '%');
                }, 1000);
                return count;
            }
        }
    };

    this.setColor = function(color) {
        this.color = color;
    };

    this.setHeight = function(height) {
        this.height = height;
    };

});