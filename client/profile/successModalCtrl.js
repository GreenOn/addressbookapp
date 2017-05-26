module
.controller('successModalCtrl', function($scope, $uibModalInstance, info){
	$scope.info = info;

	$scope.confirm = function(){
		$uibModalInstance.close(true);
	}
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
});