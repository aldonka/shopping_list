/**
 * Created by Dominika on 2016-11-07.
 */
angular.module('myApp')
    .controller('mainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.$watch('username', function (old, newVal) {
            $scope.userIndex = getIndexFromShoppingList();
        });
        $scope.showArchive = false;
        $scope.basic = "Basic view";
        $scope.archive = {};
        $scope.usersTmp = [
            {
                usr: 'zosia',
                tasks: ['mleko', 'ogórki', 'banany'],
                dates: ['2016-11-10', '2016-11-15', '2016-11-18'],
                checked: [false, false, false],
                archived: [false, false, false]
            }, {
                usr: 'kasia',
                tasks: ['miód', 'pomidory', 'gąbka'],
                dates: ['2016-11-10', '2016-11-15', '2016-11-18'],
                checked: [false, false, false],
                archived: [false, false, false]
            }, {
                usr: 'marysia',
                tasks: ['mleko', 'ogórki', 'banany'],
                dates: ['2016-11-10', '2016-11-15', '2016-11-18'],
                checked: [false, false, false],
                archived: [false, false, false]
            }
        ];
        $scope.users = function () {
            var result = [];
            for (var i = 0; i < $scope.usersTmp.length; i++) {
                result.push($scope.usersTmp[i].usr)
            }
            return result;
        };
        $scope.username = $scope.users()[0];
        $scope.userIndex = getIndexFromShoppingList();
        $scope.getShoppingList = (function () {
            var result = [];
            var userIndex = getIndexFromShoppingList();
            for (var t = 0; t < $scope.usersTmp[userIndex].tasks.length; t++) {
                result.push({
                    task: $scope.usersTmp[userIndex].tasks[t],
                    date: $scope.usersTmp[userIndex].dates[t]
                });
            }
            $scope.shoppingList = result;
            return result;
        })();

        $scope.listColor = function () {
            var len = $scope.usersTmp[$scope.userIndex].tasks.length;
            console.log("Len: " + len);
            var color = '';
            if (len <= 3) {
                color = 'panel panel-danger';
            } else if (len > 3 && len < 5) {
                color = 'panel panel-info';
            } else {
                color = 'panel  panel-success';
            }
            return color;
        };

        $scope.moveToArchive = function (username, index) {
            if ($scope.usersTmp[$scope.userIndex].archived[index] == false && $scope.usersTmp[$scope.userIndex].checked[index] == true) {
                $scope.usersTmp[$scope.userIndex].checked[index] = false;
            } else {
                $scope.usersTmp[$scope.userIndex].archived[index] = true;
                $scope.usersTmp[$scope.userIndex].checked[index] = true;
            }
        };

        $scope.addToShoppingList = function (index) {
            $scope.usersTmp[$scope.userIndex].archived[index] = false;
            $scope.usersTmp[$scope.userIndex].checked[index] = true;
        };

        $scope.addAllToShoppingList = function () {
          var userIndex = getIndexFromShoppingList();
            for(var i=0; i < $scope.usersTmp[userIndex].tasks.length; i++){
                if($scope.usersTmp[userIndex].archived[i]){
                    $scope.addToShoppingList(i);
                }
            }
        };

        $scope.addNewTask = function () {
            $scope.usersTmp[$scope.userIndex].archived.push(false);
            $scope.usersTmp[$scope.userIndex].checked.push(false);
            $scope.usersTmp[$scope.userIndex].tasks.push($scope.task);
            $scope.usersTmp[$scope.userIndex].dates.push(Date.now());

            $scope.task = '';
        };

        function getIndexFromShoppingList() {
            for (var i = 0; i < $scope.usersTmp.length; i++) {
                if ($scope.usersTmp[i].usr == $scope.username) {
                    return i;
                }
            }
        }

        function getTaskIndexFromShoppingList(userIndex) {
            for (var i = 0; i < $scope.usersTmp.length; i++) {
                if ($scope.usersTmp[i].usr == $scope.username) {
                    for (var t = 0; t < $scope.usersTmp[i].tasks.length; t++) {
                        return t;
                    }
                }
            }
        }

    }])
;
