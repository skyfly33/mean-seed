angular.module('KakaoCtrl', []).controller('KakaoController', function($scope, $http) {

	$scope.tagline = 'Kakao Controller!';

    var refresh = function() {
        $http.get('/').success(function(response){
            console.log('refresh!!');
            $scope = response;
        });
    };

    $scope.kakaoSave = function(userInfo) {
        console.log("scope : ");
        console.log(userInfo);
        $http.post('/kakaousersave', userInfo).success(function(response) {
            console.log("response : ");
            console.log(response);
            refresh();
        });
    };

    $scope.kakaoUpdate = function() {

    };

    $scope.kakaoDelete = function() {

    };

	$scope.kakaoLogin = function() {
        console.log("scope : ");
    	console.log($scope);

    	var access_token = Kakao.Auth.getAccessToken();
    	console.log("access_token : " + access_token);
    	var refresh_token = Kakao.Auth.getRefreshToken();
    	console.log("refresh_token : " + refresh_token);

    };

    $scope.kakaoLogout = function() {
        Kakao.Auth.setAccessToken("");
        Kakao.Auth.setRefreshToken("");
        var access_token = Kakao.Auth.getAccessToken();
        console.log("access_token : " + access_token);
        var refresh_token = Kakao.Auth.getRefreshToken();
        console.log("refresh_token : " + refresh_token);

        Kakao.Auth.logout();        

        alert("이용해 주셔서 갑사합니다.");
    };

    $scope.kakaoGetUserInfo = function() {
        Kakao.API.request({
            url: '/v1/user/me',
            success: function(res) {
                var arr = res;
                console.log(arr);
                console.log("id : " + arr.id);
                console.log("properties : ");
                console.log(arr.properties);
                var arr2 = arr.properties;
                console.log("nickname : " + arr2.nickname);
                console.log("thumnail_image : " + arr2.thumbnail_image);

                $scope.userId = arr.id;
                $scope.userNinckName = arr2.nickname;
                $scope.userThumbnail = arr2.thumbnail_image;
                $scope.userProfileImage = arr2.profile_image;
                $scope.userInfo = {
                    "id" : arr.id,
                    "nickname" : arr2.nickname,
                    "thumbnail_image" : arr2.thumbnail_image,
                    "profile_image" : arr2.profile_image
                }

                $http.post('/kakaousersave', $scope.userInfo).success(function(response) {
                    console.log("response : ");
                    console.log(response);
                    refresh();
                });

            },
            fail: function(error) {
              alert("먼저 로그인 해주세요.");
            }
            // persistAccessToken: false
            // persistRefreshToken: 'true'
        });
    };

    $scope.kakaoGetUserList = function() {
        Kakao.API.request({
            url: 'https://kapi.kakao.com/v1/user/ids',
            success: function(res) {
              alert("사용자 목록 가져오기!");
            },
            fail: function(error) {
              alert("먼저 로그인 해주세요.");
            }
            // persistAccessToken: false
            // persistRefreshToken: 'true'
        });
    };
});