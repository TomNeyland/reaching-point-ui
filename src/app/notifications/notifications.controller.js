'use strict';

angular.module('baseangular')

.controller('NotificationsCtrl', function($scope) {

	$scope.notifications = [
		{
			subject: 'So and So Joined Your Campaign!',
			summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta dolor quis fugiat sed reiciendis saepe consequuntur consectetur rem itaque est, facilis ipsa obcaecati necessitatibus blanditiis praesentium nisi, maxime perspiciatis, quod.',
			created: new Date,
			status: 'unread',
			type: 'campaign',
			from: 'Reaching Point',
			to: 'Company Name'
		},
		{
			subject: 'So and So Joined Your Campaign!',
			summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta dolor quis fugiat sed reiciendis saepe consequuntur consectetur rem itaque est, facilis ipsa obcaecati necessitatibus blanditiis praesentium nisi, maxime perspiciatis, quod.',
			created: new Date,
			status: 'deleted',
			type: 'campaign',
			from: 'Reaching Point',
			to: 'Company Name'
		},
		{
			subject: 'So and So Joined Your Campaign!',
			summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta dolor quis fugiat sed reiciendis saepe consequuntur consectetur rem itaque est, facilis ipsa obcaecati necessitatibus blanditiis praesentium nisi, maxime perspiciatis, quod.',
			created: new Date,
			status: 'unread',
			type: 'campaign',
			from: 'Reaching Point',
			to: 'Company Name'
		}
	]

});
