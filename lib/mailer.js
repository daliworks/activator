/*jslint node:true, nomen:true */
'use strict';

module.exports = function(url,templates, logger){
	var sendmail = require('./sendmail')(url, logger), mailcomposer = require('./mailcomposer');
	mailcomposer.init(templates);
	
	return function(type,lang,data,to,callback) {
		mailcomposer.compile(type,lang,data,function(subject,text,html){
			if (subject && (text||html)) {
				sendmail(to,subject,text,html,callback);
			} else {
				callback('missingmailfile');
			}
		});		
	};
};
