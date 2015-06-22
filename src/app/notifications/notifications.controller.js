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

	$scope.tab = 1;

	$scope.setTab = function(newTab) {
		$scope.tab = newTab;
	};

	$scope.tabIsSet = function(tab) {
		return $scope.tab === tab;
	}

	$scope.selMsg = function(msg) {
			$scope.selectedMsg = msg;
		}



});
