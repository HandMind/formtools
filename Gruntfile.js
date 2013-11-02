module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			demo: {
				options: {
					cleancss: true
				},
				files: {
					"demo/css/demo.css": ["source/demo/less/demo.less"]
				}
			}
		},

		copy: {
			demo: {
				files: [{
					expand: true,
					cwd: "source/demo/js/",
					src: '*',
					dest: 'demo/js/'
				}, {
					expand: true,
					cwd: "source/demo/",
					src: 'index.html',
					dest: 'demo/'
				}]
			},
			main: {
				files: [{
					expand: true,
					cwd: "source/",
					src: 'formtools.js',
					dest: 'min/'
				}]
			}
		},
		
		jshint: {
			options: {
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: false,
					$: false
				}
			},
			main: [
				'min/formtools.js'
			],
			demo: [
				'demo/js/demo.js'
			]
		},
		
		uglify: {
			main: {
				files: {
					'min/formtools.js': ['source/formtools.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['less', 'copy', 'jshint', 'uglify']);
};