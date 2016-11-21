/**
 * Created by Dominika on 2016-11-07.
 */
angular.module('myApp')
    .controller('mainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.basic = "Basic view";
        $scope.archive = {};
        $scope.users = ['zosia', 'kasia', 'konfacela'];
        $scope.username = $scope.users[0];
        $scope.shoppingList = {
            zosia : ['mleko', 'ogórki', 'banany'],
            kasia : ['mąka', 'pomidory', 'mleko'],
            konfacela : ['orzechy']
        };

        $scope.moveToArchive = function (username, index) {
            if($scope.archive[username] === undefined){
                $scope.archive[username] = [];
            }
            $scope.archive[username].push($scope.shoppingList[username][index]);
            $scope.shoppingList[username].splice(index, 1);
        };

        $scope.addToShoppingList = function (index) {
            $scope.shoppingList[$scope.username].push($scope.archive[$scope.username][index]);
            $scope.archive[$scope.username].splice(index, 1);
        };

        $scope.addNewTask = function () {
            $scope.shoppingList[$scope.username].push($scope.task);
            $scope.task = '';
        }
    }]);
