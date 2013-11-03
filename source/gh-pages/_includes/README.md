#jQuery.formtools.js#

*formtools.js* is a polyfill and helper library for **placeholder** and **required** form field attributes.

##Demo##

[View demo][1]

##Usage##

    $("#form").formtools(options);

##Available options##

    {	
    	placeholderClass: "placeholder",
    	invalidClass: "invalid",
    	hiddenClass: "hidden",
    	locale: "ru", // base.i18n
    	displayNotice: false,
    	noticeContainer: null
        // noticeContainer should be inside <form>.
    }

##Custom localization##

For example, you may insert the following after `formtools.js` script tag:

	$.formtools.i18n['en'] = {
		"notice_input_one": "Please fill in the following field: ",
		"notice_input": "Please fill in the following fields: "
	}

##Dependencies##

jQuery: 1.7.2 and newer.

##Building from source##

Ensure that you have Node.js and npm installed.

 1. Fork and clone the repository.
 2. run `npm install` to install all development dependencies.
 3. run `grunt`
 
  [1]: http://handmind.github.io/formtools/demo.html