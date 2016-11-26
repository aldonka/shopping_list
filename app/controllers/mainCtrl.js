/**
 * Created by Dominika on 2016-11-07.
 */
angular.module('myApp')
    .controller('mainCtrl', ['$scope', '$rootScope', 'paginatorService', function ($scope, $rootScope, paginator) {
        $scope.$watch('username', function (old, newVal) {
            $scope.userIndex = getIndexFromShoppingList();
            $scope.paginatorLength = paginator.getPaginatorLength($scope.usersTmp[$scope.userIndex].tasks.length);
            $scope.shoppingList = paginator.getTaskToShow($scope.currSite, $scope.usersTmp[$scope.userIndex]);
        });
        $scope.$watch('currSite', function (old, newVal) {
            $scope.shoppingList = paginator.getTaskToShow(old, $scope.usersTmp[$scope.userIndex]);
            console.log($scope.shoppingList);
        });

        $scope.showArchive = false;
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

        $scope.listColor = function () {
            var len = (function () {
                var tmp_len = 0;
                for (var i = 0; i < $scope.usersTmp[$scope.userIndex].tasks.length; i++) {
                    if (!$scope.usersTmp[$scope.userIndex].archived[i]) {
                        tmp_len += 1;
                    }
                }
                $scope.archivedTaskSize = $scope.usersTmp[$scope.userIndex].tasks.length - tmp_len;
                $scope.activeTaskSize = tmp_len;
                return tmp_len;
            })();
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
            console.log($scope.usersTmp[$scope.userIndex]);
        };

        $scope.addToShoppingList = function (index) {
            $scope.usersTmp[$scope.userIndex].archived[index] = false;
            $scope.usersTmp[$scope.userIndex].checked[index] = true;
        };

        $scope.addAllToShoppingList = function () {
            var userIndex = getIndexFromShoppingList();
            for (var i = 0; i < $scope.usersTmp[userIndex].tasks.length; i++) {
                if ($scope.usersTmp[userIndex].archived[i]) {
                    $scope.addToShoppingList(i);
                }
            }
        };

        $scope.isChecked = function (task) {
            for (var i = 0; i < $scope.usersTmp[getIndexFromShoppingList()].tasks.length; i++) {
                if (task == $scope.usersTmp[getIndexFromShoppingList()].tasks[i])
                    return $scope.usersTmp[getIndexFromShoppingList()].checked[i];
            }
            return false
        };
        $scope.currSite = 1;
        $scope.shoppingList = paginator.getTaskToShow($scope.currSite, $scope.usersTmp[$scope.userIndex]);

        $scope.nextSite = function (index) {
            $scope.currSite = index + 1;
            console.log("SIte page no: " + $scope.currSite);
        };
        $scope.addNewTask = function () {
            $scope.usersTmp[$scope.userIndex].archived.push(false);
            $scope.usersTmp[$scope.userIndex].checked.push(false);
            $scope.usersTmp[$scope.userIndex].tasks.push($scope.task);
            $scope.usersTmp[$scope.userIndex].dates.push(Date.now());
            // $scope.shoppingList.push($scope.usersTmp[$scope.userIndex].tasks.length -1);
            $scope.shoppingList = paginator.getTaskToShow($scope.currSite, $scope.usersTmp[$scope.userIndex]);
            $scope.paginatorLength = paginator.getPaginatorLength($scope.usersTmp[$scope.userIndex].tasks.length);
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
