var app = app || {};

(function(){

	app.templates = {

		main : [

			'<div class="wrapper">',            

				'<main class="">',
					'<div class="">1st</div>',  // first triangle
					'<div class="">2nd</div>',  // second triangle
					'<div class="">3rd</div>',  //turth triangle
					'<div class="">4th</div>',  //fourth triangle
				'</main>',
				'<footer class="">',
					'<div class="">EDIT</div>',   // EDIT button
				'</footer>',

			'</div>'
			],

		edit: [

			'<div class="wrapper">',

				'<header class="">',
				 	'<div class="">Button for close window</div>',   // close button for current window
				 '</header>',
				 '<section class="">', 
				 	'<div class="">PREVIEW</div>',		// preview
				 	'<div class="">SCALE</div>',		// scale
				 	'<div class="">TRANSLATE</div>',	// translate
				 	'<div class="">ROTATE</div>',		//rotate
				 	'<div class="">FLIP</div>',			// flip
				 '</section>',
				 '<footer>',
				 	'<div class=""> LOAD</div>',		// Load button
				 	'<div class=""> UPLOAD</div>',		// Upload button
				 '</footer>',

			'</div>'
		],

		preset: [

			'<div class="">',

				'<div> PRESET 1 </div>',    // preset 1
				'<div> PRESET 2 </div>',    // preset 2
				'<div> PRESET 3 </div>',    // preset 3
				'<div> PRESET 4 </div>',    // preset 4
				'<div> PRESET 5 </div>',    // preset 5

			'</div>'
		]
	}

})()