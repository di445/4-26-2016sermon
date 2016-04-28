angular.module("ngAudioDemo", ['ngAudio', 'ui.router'])
    .config(function($urlRouterProvider, $stateProvider) {
        // $urlRouterProvider
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "partial/home.html",
                controller: function($scope, ngAudio, songRemember) {
                    var url = 'http://mediastorage.cloversites.com/firstchristianchurchoftitusville/media_player/2016-04-24%20Sermon%20-%20Mark%20Boggess.mp3';
                    
                    if (songRemember[url]) {
                        $scope.audio = songRemember[url];
                    } else {
                        $scope.audio = ngAudio.load(url);
                        $scope.audio.volume = 0.8;
                        songRemember[url] = $scope.audio;

                        
                    }
                }
            })

        .state('docs', {
            url: "/docs",
            templateUrl: "partial/ngAudioDocs.html",
        })

        .state("audio", {
            url: "/audio",
            templateUrl: "partial/audioFullView.html",

        })

        .state('audio.detail', {
            url: "/:id",
            templateUrl: "partial/audioEditView.html",
            controller: function($stateParams, $scope, ngAudio,songRemember) {
                var url = $stateParams.id;

                if (songRemember[url]) {
                    $scope.audio = songRemember[url];
                } else {
                    $scope.audio = ngAudio.load(url);
                    $scope.audio.volume = 0.8;
                    songRemember[url] = $scope.audio;                    
                }
            }
        })



        $urlRouterProvider.otherwise('/');


    })
.value("songRemember",{})
    .controller('Demo', function($scope, ngAudio) {
        $scope.audios = [
            ngAudio.load('https://ia601307.us.archive.org/24/items/20151004SermonMarkBoggess/2015-10-04%20Sermon%20-%20Mark%20Boggess.mp3'),
            ngAudio.load('audio/song2.mp3'),
            ngAudio.load('audio/song3.mp3'),
            ngAudio.load('audio/daniel_stern_robot_hitchiker.mp3'),
        ]
    })
