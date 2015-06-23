'use strict';

angular.module('baseangular')

.controller('NotificationsCtrl', function($scope) {

	$scope.notifications = [
		{
			subject: '1 So and So Joined Your Campaign!',
			summary: 'Some people totally just joined your campaign',
			body: 'Content 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta dolor quis fugiat sed reiciendis saepe consequuntur consectetur rem itaque est, facilis ipsa obcaecati necessitatibus blanditiis praesentium nisi, maxime perspiciatis, quod.',
			created: moment(new Date).format('l'),
			status: 'unread',
			type: 'campaign',
			from: 'Point of reach',
			to: 'Jim bob'
		},
		{
			subject: 'You now have 456 influencers',
			summary: 'You just acquired a lot of more many lots of people influencing for you.',
			body: 'Content 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta dolor quis fugiat sed reiciendis saepe consequuntur consectetur rem itaque est, facilis ipsa obcaecati necessitatibus blanditiis praesentium nisi, maxime perspiciatis, quod.',
			created: moment(new Date).format('l'),
			status: 'deleted',
			type: 'campaign',
			from: 'Reaching Point',
			to: 'Cassie Wilcox'
		},
		{
			subject: 'You now have 3 brands working with you',
			summary: '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			body: '3 Content 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta dolor quis fugiat sed reiciendis saepe consequuntur consectetur rem itaque est, facilis ipsa obcaecati necessitatibus blanditiis praesentium nisi, maxime perspiciatis, quod.',
			created: moment(new Date).format('l'),
			status: 'unread',
			type: 'campaign',
			from: 'Reaching Point',
			to: 'Adam Karbiener'
		}
	];

	// initialize the page with the first tab active
	$scope.tab = 1;

	// set the tab properly
	$scope.setTab = function(newTab) {
		$scope.tab = newTab;
	};

	// check which tab is set
	$scope.tabIsSet = function(tab) {
		return $scope.tab === tab;
	};

	// choose a message to view
	$scope.selMsg = function(msg) {
		$scope.selectedMsg = msg;
	};

	// change the status property of the selectedMsg to `deleted`
	$scope.deleteMsg = function(msg) {
		msg.status = 'deleted';
	};

	$scope.unTrash = function(msg) {
		msg.status = 'read';
	}

});
