module
.controller('profileCtrl', function($scope, $http, $resource, $window, $uibModal, $location, Session, _topNav, User){
  $scope.info_obj = {};
  $scope.submission_activity = {submitting: false};
  $scope.validation_activity = {invalid: false, msg: ""};
  $scope.userInfo = Session.getUserObj();
  $scope.email = $scope.userInfo.email;
  $scope.info_obj.aboutMe = $scope.userInfo.aboutme;
  $scope.info_obj.lastName = $scope.userInfo.lastname;
  $scope.info_obj.firstName = $scope.userInfo.firstname;
  
  $scope.initSearchComponent = function(){
    _globalSearch();
  }
  $scope.initTopNav = function(){
    _topNav();
  }

  $scope.handleCancel = function(){
    $window.history.back();
  }

  $scope.onSubmit = function(valid){
    if (!valid){
      $scope.validation_activity.invalid = true;
      $scope.validation_activity.msg = "Invalid input. Please try again.";
      return;
    }
    if ($scope.info_obj.password != $scope.info_obj.password_confirm){
      $scope.validation_activity.invalid = true;
      $scope.validation_activity.msg = "Passwords should match";
      return; 
    }
    var post_params = $scope.userInfo;

    post_params.aboutme = $scope.info_obj.aboutMe;
    post_params.lastname = $scope.info_obj.lastName;
    post_params.firstname = $scope.info_obj.firstName;
    if ($scope.info_obj.password){
      post_params.password = $scope.info_obj.password;
    }

    var User_endpoint = new User(post_params);

    $scope.submission_activity.submitting = true;
    User_endpoint.$update({}, function(success_obj){
      $scope.submission_activity.submitting = false;
      Session.updateCookie(post_params);
      openSuccessModal({
        title: "Profile changes",
        description: "Your changes have been saved" 
      });
    }, function(fail_obj){
      $scope.submission_activity.submitting = false;
      $scope.validation_activity.invalid = true;
      $scope.validation_activity.msg = fail_obj.data.msg;
    });
  };

  function openSuccessModal(info){

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'changeSuccessModal.html',
      controller: 'successModalCtrl',
      resolve: {
        info: info
      }
    });

    modalInstance.result.then(function(confirmed){
      $window.history.back();
    }, function(){
      console.log("something went wrong");
    });
  }
});
