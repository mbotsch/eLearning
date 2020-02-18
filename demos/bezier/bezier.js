/*
 * Cubic Bezier curves & deCasteljau algorithm
 *
 * adapted from Craig Buckler's example code
 *
 */

/*
 * Canvas curves example
 *
 * By Craig Buckler,		http://twitter.com/craigbuckler
 * of OptimalWorks.net		http://optimalworks.net/
 * for SitePoint.com		http://sitepoint.com/
 *
 * Refer to:
 * http://blogs.sitepoint.com/html5-canvas-draw-quadratic-curves/
 * http://blogs.sitepoint.com/html5-canvas-draw-bezier-curves/
 *
 * This code can be used without restriction.
 */


var t = 0.5;
var radius = 10;

var dragPoint=null, mousePoint;

var canvas, ctx, canvasScale, viewScale, targetWidth;
var gui = null;

// should we draw control poly and deCasteljau steps?
var ControlPolygon = true, DeCasteljau = false;

var curves = [];
var continuity = -1;


// linear interpolation between two points
function lerp(a,b,t)
{
    return [ (1-t)*a[0] + t*b[0],
             (1-t)*a[1] + t*b[1] ];
}


function drawControlPolygon(p)
{
	ctx.lineWidth   = 2;
	ctx.strokeStyle = "#000000";

	ctx.beginPath();
    ctx.moveTo(p[0][0], p[0][1]);
    for (var i=1; i<p.length; ++i)
    {
        ctx.lineTo(p[i][0], p[i][1]);
    }
	ctx.stroke();
}


function drawControlPoints(p,r)
{
	ctx.lineWidth   = 2;
	ctx.strokeStyle = "#000000";
	ctx.fillStyle   = "#e6e6e6";

    for (var i=0; i<p.length; i++)
    {
		ctx.beginPath();
		ctx.arc(p[i][0], p[i][1], r, 0, 2*Math.PI, true);
		ctx.fill();
		ctx.stroke();
	}
}


function drawDeCasteljau(p)
{
	ctx.lineWidth   = 2;
	ctx.strokeStyle = "#aaaaaa";

    var p0, p1, p2;

    if (p.length == 4)
    {
        p0 = lerp(p[0], p[1], t);
        p1 = lerp(p[1], p[2], t);
        p2 = lerp(p[2], p[3], t);

        ctx.setLineDash([7,7]);
	    ctx.beginPath();
	    ctx.moveTo(p0[0], p0[1]);
	    ctx.lineTo(p1[0], p1[1]);
	    ctx.lineTo(p2[0], p2[1]);
	    ctx.stroke();
    }
    else
    {
        p0 = p[0];
        p1 = p[1];
        p2 = p[2];
    }

    var q0 = lerp(p0, p1, t);
    var q1 = lerp(p1, p2, t);

    ctx.setLineDash([2,4]);
	ctx.beginPath();
	ctx.moveTo(q0[0], q0[1]);
	ctx.lineTo(q1[0], q1[1]);
	ctx.stroke();

    ctx.setLineDash([]);

	var x = lerp(q0, q1, t);

	ctx.lineWidth   = 1;
	ctx.strokeStyle = "rgb(50,50,50)";
	ctx.fillStyle   = "#2a9ddf";

	ctx.beginPath();
	ctx.arc(x[0], x[1], 4, 0, 2*Math.PI, true);
	ctx.fill();
	ctx.stroke();
}


// draw Bezier curve
function drawBezier(p)
{
	ctx.lineWidth   = 4;
	ctx.strokeStyle = "#2a9ddf";

	ctx.beginPath();
	ctx.moveTo(p[0][0], p[0][1]);

    if (p.length == 4)
    {
        ctx.bezierCurveTo(p[1][0], p[1][1],
                          p[2][0], p[2][1],
                          p[3][0], p[3][1]);
    }
    else if (p.length == 3)
    {
        ctx.quadraticCurveTo(p[1][0], p[1][1],
                             p[2][0], p[2][1]);
    }
    else
    {
        console.log("Only cubic and quadratic curves supported");
    }

	ctx.stroke();
}


function drawCurve(p)
{
	// draw control polygon
    if (ControlPolygon) drawControlPolygon(p);

    // draw curve
    drawBezier(p);

    // draw steps of deCasteljau
    if (DeCasteljau) drawDeCasteljau(p);

    // draw control points
    if (ControlPolygon) drawControlPoints(p, radius);
}


// draw canvas
function DrawCanvas()
{
    // resize to current css dimensions
    var w = canvasScale * canvas.clientWidth;
    var h = canvasScale * canvas.clientHeight;
    if (canvas.width  != w || canvas.height != h)
    {
        canvas.width  = w;
        canvas.height = h;
        ctx.scale(canvasScale, canvasScale);
    }

    // clear canvas
	ctx.clearRect(0, 0, canvas.width/canvasScale, canvas.height/canvasScale);

    // scale viewport
    viewScale = canvas.clientWidth / targetWidth;
    ctx.scale(viewScale, viewScale);

	// line style defaults
	ctx.lineCap  = "round";
	ctx.lineJoin = "round";

    for (var c=0; c<curves.length; c++)
    {
        drawCurve(curves[c]);
    }

    // restore view scaling
    ctx.scale(1.0/viewScale, 1.0/viewScale);
}


// start dragging
function DragStart(evt)
{
    //evt.preventDefault();
	var p = MousePos(evt);
	var dx, dy;

    for (var c=0; c<curves.length; c++)
    {
        var points = curves[c];
        for (var i=0; i<points.length; i++)
        {
		    dx = points[i][0] - p.x;
		    dy = points[i][1] - p.y;
		    if ((dx * dx) + (dy * dy) < radius*radius)
            {
                dragPoint = points[i];
			    mousePoint = p;
			    canvas.style.cursor = "move";
			    return;
		    }
        }
	}

}


// dragging
function Dragging(evt)
{
	if (dragPoint)
    {
        //evt.preventDefault();
		var p = MousePos(evt);
		dragPoint[0] += p.x - mousePoint.x;
		dragPoint[1] += p.y - mousePoint.y;
		mousePoint = p;
        enforceContinuity();
		DrawCanvas();
	}
}


// end dragging
function DragEnd(evt)
{
    //evt.preventDefault();
	dragPoint = null;
	canvas.style.cursor = "default";
	DrawCanvas();
}


// get position of mouse cursor
function MousePos(event)
{
    return { 
        x: event.offsetX / viewScale, 
        y: event.offsetY / viewScale 
    };
}


function KeyDown(event)
{
    switch (event.keyCode)
    {
        case 32: // space
        {
            ControlPolygon = !ControlPolygon;
            break;
        }

        case 48: // 0
        case 49: // 1
        case 50: // 2
        {
            continuity = event.keyCode-48;
            enforceContinuity();
            break;
        }

        case 70: // F
        {
            if (document.fullscreenElement)
                document.exitFullscreen();
            else 
                document.getElementById('body').requestFullscreen();
            break;
        }
    }

    DrawCanvas();
}


function enforceContinuity()
{
    if (curves.length == 2)
    {
        var a = curves[0];
        var b = curves[1];
        var n = a.length;

        // C0 continuity
        if (continuity >= 0)
        {
            b[0][0] = a[n-1][0];
            b[0][1] = a[n-1][1];
        }

        // C1 continuity
        if (continuity >= 1)
        {
            b[1] = lerp(a[n-2], a[n-1], 2.0);
        }

        // C2 continuity
        if (continuity >= 2)
        {
            var d = lerp(a[n-3], a[n-2], 2.0);
            b[2]  = lerp(d, b[1], 2.0);
        }

        DrawCanvas();
    }
}
