;( function( o, undefined ) {
	// Initiate variables.
	o.base = window.location.protocol + '//' + window.location.host + '/' + '?action=log';
	
	// Error handler.
	o.onerror = function( message, url, line ) {
		// Build entry from parameters.
		var logEntry = {
			message: message,
			url: url,
			line: line,
			type: 'error'
		};
		
		// Send message to server.
		o.save( logEntry );
		
		// Tell window that error has been handled.
		return true;
	}
	
	// Make server request.
	o.save = function( logEntry ) {
		// Print to console if present.
		if ( typeof console !== undefined ) {
			console.log(
				'Type: ' + logEntry.type +
				'\nMessage: ' + logEntry.message +
				'\nURL: ' + logEntry.url +
				'\nLine Number: ' + logEntry.line
			);
		}
		
		// Check for function to encode URL.
		if ( encodeURIComponent ) {
			img = new Image( 1, 1 );
			img.src = o.base + 
				"&m=" + encodeURIComponent( logEntry.message ) +
				"&u=" + encodeURIComponent( logEntry.url ) +
				"&l=" + encodeURIComponent( logEntry.line );
		}
	}
	
	// Attach error handler to window.
	window.onerror = o.onerror;
} )( window.errorLog = window.errorLog || {} );