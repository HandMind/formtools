module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			docs: {
				options: {
					cleancss: true
				},
				files: {
					"source/gh-pages/css/demo.css": ["source/gh-pages/_assets/less/demo.less"],
					"source/gh-pages/css/styles.css": ["source/gh-pages/_assets/less/styles.less"]
				}
			}
		},

		copy: {
			docs: {
				files: [{
					expand: true,
					cwd: "min/",
					src: 'formtools.js',
					dest: 'source/gh-pages/js/'
				}, {
					expand: true,
					src: 'README.md',
					dest: 'source/gh-pages/_includes/'
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
			docs: [
				'demo/js/demo.js'
			]
		},
		
		uglify: {
			main: {
				files: {
					'min/formtools.js': ['source/formtools.js']
				}
			}
		},
		
		jekyll: {
			docs: { 
				options: {
					src: 'source/gh-pages',
					dest: 'gh-pages'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jekyll');
	
	grunt.registerTask('default', ['copy:main', 'jshint:main', 'uglify']);
	grunt.registerTask('docs', ['less:docs', 'copy:docs', 'jshint:docs', 'jekyll']);
};