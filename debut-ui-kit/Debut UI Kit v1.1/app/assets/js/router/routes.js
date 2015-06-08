angular
	.module('ui.routes', ['ui.router', 'oc.lazyLoad'])
	// .config(function ($ocLazyLoadProvider) {
	// 	$ocLazyLoadProvider.config({
	// 		debug: true
	// 	});
	// })
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
		function ($stateProvider, $urlRouterProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			// root route
			.state('app', {
				abstract: true,
				templateUrl: 'partials/home.html',
				controller: 'MainCtrl',
				resolve: {
					load: function ($ocLazyLoad) {
						return $ocLazyLoad.load([
							{ name: 'cfp.loadingBar', files: ['assets/js/vendor/loading-bar.js'] },
							{ name: 'ui-notification', files: ['assets/js/vendor/angular/angular-ui-notification.js'] },
							{ name: 'angular.filter', files: ['assets/js/filters/angular-filter.js'] },
							{ name: 'mb-scrollbar', files: ['assets/js/vendor/mb-scrollbar.js'] },

							{ name: 'ctrl.main', files: ['assets/js/controllers/main.ctrl.js'] },

							
							// ui elements
							{ name: 'ui.c3', files: ['assets/js/directives/charts/c3.js'] },
							{ name: 'ui.sidemenu', files: ['assets/js/directives/ui.sidemenu.js'] },
							{ name: 'ui.panels', files: ['assets/js/directives/ui.panels.js'] },
							{ name: 'ui.dropdown', files: ['assets/js/vendor/bootstrap/ui.dropdown.js'] },
							{ name: 'ui.tabs', files: ['assets/js/vendor/bootstrap/ui.tab.js'] },
							{ name: 'ui.collapse', files: ['assets/js/vendor/bootstrap/ui.collapse.js'] },
							{ name: 'ui.code', files: ['assets/js/directives/ui.code.js', 'assets/js/vendor/thirdparty/highlight.pack.js'] },
							{ name: 'ui.tree', files: ['assets/js/vendor/angular/angular-ui-tree.js'] },
							{ name: 'ui.mask', files: ['assets/js/vendor/bootstrap/ui.mask.js'] },
							{ name: 'ui.select', files: ['assets/js/vendor/angular/angular-ui-select.js'] },
							{ name: 'ui.markdown', files: ['assets/js/directives/ui.makrdown.js', 'assets/js/vendor/thirdparty/marked.js'] },
							{ name: 'ui.multiselect', files: ['assets/js/directives/ui.multiselect.js'] },
							{ name: 'ui.tags', files: ['assets/js/directives/ui.tags.js'] },
							{ name: 'ui.wizard', files: ['assets/js/directives/ui.wizard.js'] },
							{ name: 'ui.chat', files: ['assets/js/directives/ui.chat.js'] },
							{ name: 'ui.countTo', files: ['assets/js/directives/ui.countTo.js'] },

							// editor
							{ name: 'ngQuill', files: ['assets/js/vendor/ng-quill.js', 'assets/js/vendor/thirdparty/quill.js'] },

							// genie.js
							{ name: 'uxGenie', files: ['assets/js/vendor/angular/angular-lamp.js'] },

							// angular-strap
							{ name: 'mgcrea.ngStrap.helpers.dimensions', files: ['assets/js/vendor/bootstrap/dimensions.js'] },
							{ name: 'mgcrea.ngStrap.helpers.parseOptions', files: ['assets/js/vendor/bootstrap/parse-options.js'] },
							{ name: 'mgcrea.ngStrap.helpers.dateParser', files: ['assets/js/vendor/bootstrap/date-parser.js'] },
							{ name: 'mgcrea.ngStrap.helpers.dateFormatter', files: ['assets/js/vendor/bootstrap/date-formatter.js'] },
							{ name: 'mgcrea.ngStrap.tooltip', files: ['assets/js/vendor/bootstrap/tooltip.js'] },
							{ name: 'mgcrea.ngStrap.typeahead', files: ['assets/js/vendor/bootstrap/typeahead.js'] },
							{ name: 'mgcrea.ngStrap.select', files: ['assets/js/vendor/bootstrap/select.js'] },
							{ name: 'mgcrea.ngStrap.tooltip', files: ['assets/js/vendor/bootstrap/tooltip.js'] },
							{ name: 'mgcrea.ngStrap.popover', files: ['assets/js/vendor/bootstrap/popover.js'] },
							{ name: 'mgcrea.ngStrap.modal', files: ['assets/js/vendor/bootstrap/modal.js'] },
							{ name: 'mgcrea.ngStrap.datepicker', files: ['assets/js/vendor/bootstrap/datepicker.js'] },
							{ name: 'mgcrea.ngStrap.timepicker', files: ['assets/js/vendor/bootstrap/timepicker.js'] },

							// vendor
							{ name: 'ngTable', files: ['assets/js/vendor/ng-table.js']},
							{ name: 'vr.directives.slider', files: ['assets/js/vendor/angular/angular-slider.js'] },

							// widgets
							{ name: 'month.widget', files: ['assets/js/directives/widgets/month.widget.js'] },
							{ name: 'balance.widget', files: ['assets/js/directives/widgets/balance.widget.js'] },
							{ name: 'planner.widget', files: ['assets/js/directives/widgets/planner.widget.js'] },

							// thirdparty
							{ files: [
								'assets/js/vendor/thirdparty/moment.js',
								'assets/js/vendor/thirdparty/d3.js', 
								'assets/js/vendor/thirdparty/c3.js'
							] },
						])
					}
				},
			})

				// admin panel
				.state('app.admin', {
					abstract: true,
					views: {
						'sidebar': { templateUrl: 'partials/sidebar.html' }
					}
				})

				// dashboard
				.state('app.admin.dashboard', {
					url: '/',
					views: {
						'content@app': {
							controller: 'DashboardCtrl',
							templateUrl:'partials/admin/dashboard.html'
						}
					},
					resolve: {
						load: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								{ name: 'ctrl.dashboard', files: ['assets/js/controllers/dashboard.ctrl.js'] }
							]);
						}
					}
				})
				// end

				// ui Elements
				.state('app.admin.ui', {
					url: '/ui-elements',
					abstract: true,
					resolve: {
						load: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								{ name: 'ctrl.elements', files: ['assets/js/controllers/elements.ctrl.js'] }
							]);
						}
					}
				})
					.state('app.admin.ui.panels', {
						url: '/panels',
						views: {
							'content@app': {
								controller: 'ElementsCtrl',
								templateUrl: 'partials/uielements/panels.html'
							}
						}
					})
					.state('app.admin.ui.grids', {
						url: '/grid',
						views: {
							'content@app': {
								controller: 'ElementsCtrl',
								templateUrl: 'partials/uielements/grid.html'
							}
						}
					})
					.state('app.admin.ui.typography', {
						url: '/typography',
						views: {
							'content@app': {
								controller: 'ElementsCtrl',
								templateUrl: 'partials/uielements/typography.html'
							}
						}
					})
					.state('app.admin.ui.buttons', {
						url: "/buttons",
						views: {
							'content@app': {
								controller: 'ElementsCtrl',
								templateUrl: 'partials/uielements/buttons.html'
							}
						}
					})
					.state('app.admin.ui.tables', {
						url: '/tables',
						views: {
							'content@app': {
								templateUrl: 'partials/uielements/tables.html',
								controller: 'TableCtrl'
							}
						},
						resolve: {
							load: function ($ocLazyLoad) {
								return $ocLazyLoad.load([
									{ name: 'ctrl.tables', files: ['assets/js/controllers/table.ctrl.js'] }
								]);
							}
						}
					})
					.state('app.admin.ui.components', {
						url: '/components',
						views: {
							'content@app': {
								controller: 'ElementsCtrl',
								templateUrl: 'partials/uielements/components.html'
							}
						}
					})
					.state('app.admin.ui.forms', {
						url: '/forms',
						views: {
							'content@app': {
								controller: 'ElementsCtrl',
								templateUrl: 'partials/uielements/forms.html'
							}
						}
					})
					.state('app.admin.ui.icons', {
						url: '/icons',
						views: {
							'content@app': {
								controller: 'ElementsCtrl',
								templateUrl: 'partials/uielements/icons.html'
							}
						}
					})
					.state('app.admin.ui.editors', {
						url: '/editors',
						views: {
							'content@app': {
								controller: 'ElementsCtrl',
								templateUrl: 'partials/uielements/editors.html'
							}	
						}
					})
				// end 

				// widgets
				.state('app.admin.widgets', {
					url: '/widgets',
					views: {
						'content@app': {
							controller: 'WidgetsCtrl',
							templateUrl: 'partials/widgets/index.html'
						}
					},
					resolve: {
						load: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								{ name: 'ngVideo', files: ['assets/js/vendor/ng-video.js'] },
								{ name: 'widgets.ctrl', files: ['assets/js/controllers/widgets.ctrl.js'] }
							], { serie: true });
						}
					}
				})
				// end

				// extras
				.state('app.admin.extras', {
					url: '/extras',
					abstract: true
				})
					.state('app.admin.extras.sortable', {
						url: '/sortable',
						views: {
							'content@app': {
								templateUrl: 'partials/extras/sortable.html',
								controller: 'SortableCtrl'
							}
						},
						resolve: {
							load: function ($ocLazyLoad) {
								return $ocLazyLoad.load([
									{ name: 'ctrl.sortable', files: ['assets/js/controllers/extras/sortable.ctrl.js'] },
								]);
							}
						}
					})
					.state('app.admin.extras.timeline', {
						url: '/timeline',
						views: {
							'content@app': {
								templateUrl: 'partials/extras/timeline.html',
								controller: 'TimelineCtrl'
							}
						},	
						resolve: {
							load: function ($ocLazyLoad) {
								return $ocLazyLoad.load([
									{ name: 'timeline.ctrl', files: ['assets/js/controllers/extras/timeline.ctrl.js'] }
								]);
							}
						}
					})
					.state('app.admin.extras.invoice', {
						url: '/invoice',
						views: {
							'content@app': {
								templateUrl: 'partials/extras/invoice.html',
								controller: 'InvoiceCtrl'
							}
						},
						resolve: {
							load: function ($ocLazyLoad) {
								return $ocLazyLoad.load([
									{ name: 'ctrl.invoice', files: ['assets/js/controllers/extras/invoice.ctrl.js'] }
								]);
							}
						}
					})
					.state('app.admin.extras.invoice-show', {
						url: '/invoice/show-invoice',
						views: {
							'content@app': {
								templateUrl: 'partials/extras/invoice-show.html',
								controller: 'InvoiceCtrl'
							}
						},
						resolve: {
							load: function ($ocLazyLoad) {
								return $ocLazyLoad.load([
									{ name: 'ctrl.invoice', files: ['assets/js/controllers/extras/invoice.ctrl.js'] }
								]);
							}
						}
					})
					.state('app.admin.extras.wizard', {
						url: '/form-wizard',
						views: {
							'content@app': {
								templateUrl: 'partials/extras/wizard.html',
								controller: 'WizardCtrl'
							}
						},
						resolve: {
							load: function ($ocLazyLoad) {
								return $ocLazyLoad.load([
									{ name: 'ctrl.wizard', files: ['assets/js/controllers/extras/wizard.ctrl.js'] }
								]);
							}
						}
					})
					// end extras

				// maps
				.state('app.admin.maps', {
					url: '/maps',
					abstract: true
				})
					.state('app.admin.maps.gmaps', {
						url: '/google-maps',
						views: {
							'content@app': {
								templateUrl: 'partials/maps/gmaps.html',
								controller: 'MapsCtrl',
							}
						},
						resolve: {
							load: function ($ocLazyLoad) {
								return $ocLazyLoad.load([
									{ name: 'ctrl.maps', files: ['assets/js/controllers/maps.ctrl.js'] },
									{ files: ['assets/js/vendor/thirdparty/lodash.js'] },
									{ name: 'uiGmapgoogle-maps', files: ['assets/js/vendor/angular/angular-google-maps.js'] },
								]);
							}
						}
					})
				// end maps
				
				.state('app.admin.tasks', {
					url: '/tasks',
					views: {
						'content@app': {
							templateUrl: 'partials/tasks/index.html',
							controller: 'TasksCtrl'
						}
					},
					resolve: {
						load: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								{ files: ['assets/js/vendor/thirdparty/d3.js'] },
								{ files: ['assets/js/vendor/charts/nvd3/nv.d3.js'] },
								{ name: 'nvd3', files: ['assets/js/vendor/charts/nvd3/angular-nvd3.js' ]},
								{ name: 'tasks.ctrl', files: ['assets/js/controllers/tasks.ctrl.js'] },
							], {serie :true });
						}
					}
				})

				// charts
				.state('app.admin.charts', {
					url: '/charts',
					abstract: true
				})
					.state('app.admin.charts.nvd3', {
						url: '/nvd3-charts',
						views: {
							'content@app': {
								templateUrl: 'partials/charts/n3charts.html',
								controller: 'Nvd3Ctrl'
							}
						},
						resolve: {
							load: function ($ocLazyLoad) {
								return $ocLazyLoad.load([
									{ files: ['assets/js/vendor/thirdparty/d3.js'] },
									{ files: ['assets/js/vendor/charts/nvd3/nv.d3.js'] },
									{ name: 'nvd3', files: ['assets/js/vendor/charts/nvd3/angular-nvd3.js' ]},
									{ name: 'ctrl.nvd3', files: ['assets/js/controllers/charts/nvd3.js'] }
								], {serie :true });
							}
						}
					})
					.state('app.admin.charts.c3', {
						url: '/c3',
						views: {
							'content@app': {
								templateUrl: 'partials/charts/c3.html',
								controller: 'C3Ctrl'
							}
						},
						resolve: {
							load: function ($ocLazyLoad) {
								return $ocLazyLoad.load([
									{ name: 'ctrl.c3', files: ['assets/js/controllers/charts/c3.js'] },
									{ name: 'ui.c3', files: ['assets/js/directives/charts/c3.js'] }
								], {serie :true });
							}
						}
					})
			// mail
			.state('app.mail', {
				url: '/mail',
				abstract: true,
				views: {
					'sidebar@app': { templateUrl: 'partials/mail/sidebar.html' },
					'content@app': { 
						controller: 'MailCtrl',
						templateUrl: 'partials/mail/index.html' 
					}
				},
				resolve: {
					load: function ($ocLazyLoad) {
						return $ocLazyLoad.load([
							{ name: 'mail.ctrl', files: ['assets/js/controllers/mail.ctrl.js'] },
							{ name: 'angular.filter', files: ['assets/js/filters/angular-filter.js'] },
						]);
					}
				}
			})
				.state('app.mail.inbox', {
					url: '/inbox',
				})
				.state('app.mail.new', {
					url: '/new',
					views: {
						'subcontent': {
							controller: 'SingleMailCtrl', 
							templateUrl: 'partials/mail/new.html' 
						}
					}
				})
				.state('app.mail.inbox.read', {
					url: '/:id',
					views: {
						'subcontent@app.mail': {
							controller: 'SingleMailCtrl',
							templateUrl: 'partials/mail/read.html'
						}
					}
				})
			// end

			// pages
			.state('app.page', {
				url: '/pages',
				abstract: true
			})
				.state('app.page.login', {
					url: '/login',
					views: {
						'@': {
							templateUrl: 'partials/pages/login.html'
						}
					}
				})
				.state('app.page.blank', {
					url: '/blank',
					views: {
						'@': {
							templateUrl: 'partials/pages/blank.html'
						}
					}
				})
				.state('app.page.lock', {
					url: '/lock',
					views: {
						'@': {
							templateUrl: 'partials/pages/lock.html'
						}
					}
				})
				.state('app.page.register', {
					url: '/register',
					views: {
						'@': {
							templateUrl: 'partials/pages/registration.html'
						}
					}
				})
				.state('app.page.404', {
					url: '/404',
					views: {
						'@': {
							templateUrl: 'partials/pages/404.html'
						}
					}
				})
				.state('app.page.500', {
					url: '/500',
					views: {
						'@': {
							templateUrl: 'partials/pages/500.html'
						}
					}
				})
				.state('app.page.loading', {
					url: '/loading',
					views: {
						'@': {
							templateUrl: 'partials/pages/loading.html'
						}
					}
				});

			// $locationProvider.html5Mode({
			// 	enabled: true,
			// 	requireBase: false
			// });
}]);