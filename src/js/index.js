/**
 * Your overall app entry point
 * Initialise your modules in this file
 */
require("../scss/index.scss");  
'use strict';

var playNow = prompt("Do you want to play?");

switch(playNow) {
	case 'yes':
		{
		var user = prompt("Enter your name");
		} console.log(user);
	case 'no': 
	break;
	default:
	break;
}
