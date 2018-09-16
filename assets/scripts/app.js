var myApp = angular.module('myApp',['ngRoute','angular.filter','angularUtils.directives.dirPagination']);

angular
.module('myApp').service('fileUpload', function ($http,$log) {
  this.uploadFileToUrl = function(file, uploadUrl,type){

    var fd = new FormData();
    fd.append('file',file);
    fd.append('param',type);

    if(file != undefined){  
      console.log(file.type);
    var validExts = ['text/plain','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']; // Allowed Extensions
    if(validExts.indexOf(file.type)==-1){
      alert('Check File Type','Allowed files are pdf,jpg,jpeg and png.','warning');
      return;
    }
    if(file.type == "text/plain"){
      file.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }
    if(file.size >= 10*1024*1024 ){  // Max Upload Size is 2MB
      alert('Check File Size','Max Upload size is 2 Mb','warning');
      return;
    }
   }
 
    var ret = $http.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined, withCredentials: true}
               }).then(function(response){
                if(response.data.error == true)
                alert('Problem in Upoading file',response.data.msg,'warning');
         return response;   
               }).catch(function(response){  
        alert('Error','File Could Not Be Uploaded..','error');
               });
    return ret;

       }
  
});



myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/login.html',
        controller: 'loginController'
    })
    .when('/upload', {
      templateUrl: 'pages/upload.html',
      controller: 'uploadController'
  })
   
});

myApp.controller('loginController', ['$scope', '$http', '$location','$window','$rootScope','$route','fileUpload', function($scope,$http,$location,$window,$rootScope,$route,fileUpload){

$scope.login = function(){

  $http({
    //https://jwire.herokuapp.com
    // url: 'https://jwire.herokuapp.com:3000/login',
    url: 'https://jwire.herokuapp.com/login',
    method: "POST",
    data: { 'username' : $scope.username, 'password':$scope.password}
    //data:{'data': data}
})
.then(function(response) {
       console.log(response);
  if(response.data == "0"){
    swal("Invalid", "There was some error while processing", "error", {
      button: "Ok",
    });
  }else  if(response.data == "1"){
    $window.sessionStorage.setItem("user",$scope.username );
    $window.location.href = '#/upload';
  }
       
});

}

}]);
myApp.controller('uploadController', ['$scope', '$http', '$location','$window','$rootScope','$route','fileUpload', function($scope,$http,$location,$window,$rootScope,$route,fileUpload){

 
  var file_upload = [];
  $scope.show_table = false;
  $scope.show_label = false;
  $scope.show_checklist = false;
 $scope.upload = function(files) {
  console.log(files[0].name);
  myFile1 = [];
    myFile1.push(files[0]);
file_name = files[0].name;
        }

        $http({
          url: 'https://jwire.herokuapp.com/get_master',
          method: "POST",
          data: { 'user':$window.sessionStorage.user}
         
      })
      .then(function(response) {
        console.log(response);
        if(response.data != "no"){
        $scope.show_table = true;
        $scope.mytable = response.data;
        $http({
          url: 'https://jwire.herokuapp.com/fetch_label',
          method: "POST",
          data: { 'user':$window.sessionStorage.user}
         
      })
      .then(function(response) {
        console.log(response);
      $scope.show_label = true;
      $scope.lables = response.data;
      $scope.show_checklist = true;
      $scope.checklists = response.data;

      }); 
    }
      }); 
  $scope.insertdata = function() {
   var promise = fileUpload.uploadFileToUrl(myFile1[0], 'https://jwire.herokuapp.com/upload3','dimensionfile');
          promise.then(
                function(response) {
                  console.log(response);

                  $http({
                    url: 'https://jwire.herokuapp.com/insert_master',
                    method: "POST",
                    data: { 'filename' : response.data,'user':$window.sessionStorage.user}
                   
                })
                .then(function(response) {
                  console.log(response);

                  $http({
                    url: 'https://jwire.herokuapp.com/get_master',
                    method: "POST",
                    data: { 'user':$window.sessionStorage.user}
                   
                })
                .then(function(response) {
                  console.log(response);
                  $scope.show_table = true;
                  $scope.mytable = response.data;
                  $http({
                    url: 'https://jwire.herokuapp.com/fetch_label',
                    method: "POST",
                    data: { 'user':$window.sessionStorage.user}
                   
                })
                .then(function(response) {
                  console.log(response);
                $scope.show_label = true;
                $scope.lables = response.data;
                $scope.show_checklist = true;
                $scope.checklists = response.data;
                swal("File Processed Successfully", "Open Master and Label tabs", "success", {
                  button: "Ok",
                });

                }); 

                }); 

                });    
                });
              } 
             
              
             

}]);

// myApp.controller('uploadController', ['$scope', '$http', '$location','$window','$rootScope','$route', function($scope,$http,$location,$window,$rootScope,$route){
// }]);