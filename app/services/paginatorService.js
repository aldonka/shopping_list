/**
 * Created by Dominika on 2016-11-26.
 */
angular.module('PaginatorService', [])
    .service('paginatorService', [function () {
        var numPerSite = 4;
        return {
            getPaginatorLength: function (tasksSize) {
                var v = tasksSize / numPerSite;
                console.log("Paginator size: " + Math.ceil(v) + " task size: " + tasksSize);
                return Math.ceil(tasksSize / numPerSite);
            },
            getTaskToShow: function (currentSite, user) {
                var tasks = user.tasks;
                var result = [];
                var last = currentSite * numPerSite;
                var start = (currentSite - 1) * numPerSite;

                while (start != last) {
                    if (!user.archived[start]) {
                        result.push(start);
                    } else {
                        last++;
                    }
                    start++;
                    if (start == tasks.length) {
                        break;
                    }
                }
                console.log("New tasks: " + result);
                return result;
            }
        }
    }]);