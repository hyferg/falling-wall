window.addEventListener('load', function () {
	  // The `g4` element is inside svg with `viewBox` and
	  // it has the initial `transform`. Panzoom should still work fine.
	  panzoom(document.getElementById('layer1'), {
        zoomSpeed: 0.010,
        pinchSpeed: 0.5,
    });
});
