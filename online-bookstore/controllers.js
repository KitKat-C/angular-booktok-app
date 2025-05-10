angular.module('bookStoreApp')

.controller('BookDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $http.get('data/booktok_books_38.json').then(function(response) {
    const bookId = $routeParams.bookId;
    $scope.book = response.data.find(book =>
      book.isbn13.toString() === bookId || book.isbn10 === bookId
    );
  });
}])

.controller('BookListCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.query = '';
  $scope.books = [];
  $scope.booksGrouped = [];

  const perRow = 6;

  $scope.getRandomPlaceholder = function () {
    return 'placeholders/placeholder_1.png';
  };  

  $http.get('data/booktok_books_38.json').then(function(response) {
    $scope.books = response.data;
    groupBooks();
  });

  $scope.$watch('query', function() {
    groupBooks();
  });

  function groupBooks() {
    $scope.booksGrouped = [];
    const filtered = $scope.books.filter(book => {
      const q = $scope.query.toLowerCase();
      return (
        book.title.toLowerCase().includes(q) ||
        book.authors.toLowerCase().includes(q) ||
        book.categories.toLowerCase().includes(q)
      );
    });

    for (let i = 0; i < filtered.length; i += perRow) {
      $scope.booksGrouped.push(filtered.slice(i, i + perRow));
    }
  }
}]);
