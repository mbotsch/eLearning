"use strict";

/*
    _/_/_/    _/_/_/    _/_/_/
  _/        _/        _/
 _/        _/  _/_/  _/  _/_/
_/        _/    _/  _/    _/
 _/_/_/    _/_/_/    _/_/_/

Hello, curious student!

This code was hacked together quickly.

If you look at it and think you can do better, or would be interested
in improving our teaching materials in other ways, we'd be delighted to
hear from you at opt-staff@list.inf.unibe.ch -- we are interesting in
hiring motivated and skilled students for this purpose.
*/


function deepcopy(obj)
{
    // this is a hack.
    return JSON.parse(JSON.stringify(obj));
}

function assert(expr) {
    if (!expr) {
        throw "Assert violated: " + str(expr);
    }
}

function encodeForHash(obj)
{
    var params = [];
    for (var key in obj) {
        params.push(key + "=" + encodeURIComponent(obj[key]));
    }
    return "#" + params.join('&');
}

function testFunc(param) {
    return function(f) {
        try {
            var res = f.evaluate(param);
        } catch (err) {
            alert('Problem evaluating "' + f.toString() + '": ' + err);
            return false;
        }
        if (typeof(res) !== 'number') {
            alert('Function "' + f.toString() + '" does not return a number. Got ' + typeof(res))
            return false;
        }
        return true;
    }
};
const testFunc1D = testFunc({'x':0});
const testFunc2D = testFunc({'x':0, 'y':0});

function getFormContents(form, funcTest)
{
    var elements = form.elements;
    var params = {};
    for (var i=0; i<elements.length; ++i) {
        var input = elements[i];
        if (input.nodeName !== 'INPUT') continue;

        var value = input.value;
        if (input.type == "checkbox") {
            value = input.checked ? "1" : "0";
        }
        if (input.classList.contains("funcinput")) {
            console.log('testing', value);
            try {
                var tmp = math.parse(value);
            } catch (err) {
                alert('Cannot parse "' + value + '": ' + err);
                return false;
            }
            if (funcTest && !funcTest(tmp)) {
                return false;
            }
        };
        params[input.name] = value;
    }
    window.location.hash = encodeForHash(params);
    return params;
}

function setFormContents(form, data)
{
    var elements = form.elements;
    var params = {};
    for (var i=0; i<elements.length; ++i) {
        var input = elements[i];
        if (input.nodeName !== 'INPUT') continue;
        if (! input.name in data) continue;

        const value = data[input.name];

        if (input.type == "checkbox") {
            input.checked = parseInt(value) ? "1" : "0";
        } else {
            input.value = value;
        }
        params[input.name] = value;
    }
    window.location.hash = encodeForHash(params);
    return params;
}

function nan_clamp(val, min, max) {
    if (val < min || val > max) {
        return Number.NaN;
    }
    return val;
}

var ploptly = (function()
    {
/*
    // trigger resize upon change of fullscreen status, even if the parent
    // window of an iframe is the one changing fs state.
    // Seems unnecessary with the current setup.

    var doc = window.parent.document;
    var previous_fschange_handler = doc.onfullscreenchange;
    doc.onfullscreenchange = function(ev) {
        console.log("fullscreen status changed");
        if (ev != null && ev.id != "theplot") {
            console.log("resizing plot");
            Plotly.Plots.resize(document.getElementById("theplot"));
        }
        if (previous_fschange_handler) {
            previous_fschange_handler(ev);
        }
    };
*/

    var previous_fullscreen_element = null;
    function onFullscreenButton(gd) {
        if (document.fullscreenElement == gd) {
            console.log("Exiting plotly fullscreen");
            if (previous_fullscreen_element) {
                previous_fullscreen_element.requestFullscreen();
            } else {
                document.exitFullscreen();
            }

        } else {
            console.log("Entering plotly fullscreen");
            previous_fullscreen_element = document.fullscreenElement;
            if (previous_fullscreen_element) {
                document.exitFullscreen().then(
                    () => gd.requestFullscreen().then(
                        () => Plotly.Plots.resize(gd),
                        () => console.log("gd fullscreen req failed")),
                    () => console.log("exitFullscreen failed"));
            } else {
                gd.requestFullscreen();
            }
        }
    }

    function getDefaultOptions() {
        var options = {
            responsive: true,
            //autosize: true,
            displaylogo: false,
            // modeBarButtonsToRemove: ['zoomIn2d', 'zoomOut2d'],
            modeBarButtonsToAdd: [{
                name: 'Fullscreen',
                icon: Plotly.Icons.movie, // possible icons: https://github.com/plotly/plotly.js/blob/master/src/fonts/ploticon.js
                click: onFullscreenButton
            }],
        };
        return options;
    }
    function getDefaultLayout() {
        var layout = {
            //  title:'Line and Scatter Plot'
            margin:{l:30, r:30, t:30, b:30},
            scene:{
                xaxis: {},
                yaxis: {},
                zaxis: {},
            },
        };
        return layout;
    }
    function getDefaultLayout2D() {
        var layout = getDefaultLayout();
        // hide grid, ticks etc, the exact numbers do not matter for this purpose.
        layout['xaxis'] = {showgrid: false, showline: false, zeroline: false, showticklabels: false, ticklen: 0};
        layout['yaxis'] = Object.assign(
            {scaleanchor: 'x', scaleratio: 1.}, // lock x and y scaling
            layout['xaxis']);
        return layout;
    }
    

    function range_eval_1d(f, xs) {
        // evaluate a math.js function on a 1d interval
        var cf = f.compile();
        return xs.map(function (x) {
            return cf.evaluate({x: x});
        });
    }
    function range_eval_2d(f, xs, ys) {
        // evaluate a math.js function on a 1d interval
        var cf = f.compile();
        return ys.map(function (y) {
            return xs.map(function(x) {
                return cf.evaluate({x: x, y:y});
            });
        });
    }
    function create_range(min, max, steps) {
        const step = (max - min) / steps;
        return math.range(min, max, step, true).toArray();
    }

    return {
        onFullscreenButton: onFullscreenButton,
        getDefaultOptions: getDefaultOptions,
        getDefaultLayout: getDefaultLayout,
        getDefaultLayout2D: getDefaultLayout2D,
        range_eval_1d: range_eval_1d,
        range_eval_2d: range_eval_2d,
        create_range: create_range,
    };
})();
