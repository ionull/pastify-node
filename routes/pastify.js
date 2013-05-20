/*
 * GET current clipboard
 */
var pastifing = '';

exports.get = function(req, res){
  res.contentType('application/json');
  res.send(JSON.stringify({
	  text: pastifing
  }));
};

exports.set = function(req, res) {
	var clipboard = req.body.text;
	console.log('setting paste: ' + clipboard);
	if(typeof req.body.os != 'undefined' && req.body.os == 'ios') {
		//set system clipboard
		var command = "echo '" + clipboard + "' | pbcopy";
		var exec = require('child_process').exec;
		var child = exec(command,
			function (error, stdout, stderr) {
				//console.log('stdout: ' + stdout);
				//console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			}
		);
	} else {
		pastifing = clipboard;
	}
	console.log(pastifing);
	res.send("success");
};
