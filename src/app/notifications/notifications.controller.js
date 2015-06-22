'use strict';

angular.module('baseangular')

.controller('NotificationsCtrl', function($scope) {

	$scope.notifications = [
		{
			subject: '1 So and So Joined Your Campaign!',
			summary: '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			body: 'Content 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta dolor quis fugiat sed reiciendis saepe consequuntur consectetur rem itaque est, facilis ipsa obcaecati necessitatibus blanditiis praesentium nisi, maxime perspiciatis, quod.',
			created: moment(new Date).format('l'),
			status: 'unread',
			type: 'campaign',
			from: 'Reaching Point',
			to: 'Company Name'
		},
		{
			subject: '2 So and So Joined Your Campaign!',
			summary: '2 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			body: 'Content 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta dolor quis fugiat sed reiciendis saepe consequuntur consectetur rem itaque est, facilis ipsa obcaecati necessitatibus blanditiis praesentium nisi, maxime perspiciatis, quod.',
			created: moment(new Date).format('l'),
			status: 'deleted',
			type: 'campaign',
			from: 'Reaching Point',
			to: 'Company Name'
		},
		{
			subject: '3 So and So Joined Your Campaign!',
			summary: '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			body: '3 Content 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta dolor quis fugiat sed reiciendis saepe consequuntur consectetur rem itaque est, facilis ipsa obcaecati necessitatibus blanditiis praesentium nisi, maxime perspiciatis, quod.',
			created: moment(new Date).format('l'),
			status: 'unread',
			type: 'campaign',
			from: 'Reaching Point',
			to: 'Company Name'
		}
	];

	$scope.tab = 1;

	$scope.setTab = function(newTab) {
		$scope.tab = newTab;
	};

	$scope.setMessage = function(msg) {
		$scope.selected = msg;
	}


});
