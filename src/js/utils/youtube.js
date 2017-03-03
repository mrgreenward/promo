
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var uber,
    get,
    ya;
function onYouTubeIframeAPIReady() {
    uber = new YT.Player('video_uber', {
        height: '100%',
        width: '100%',
        videoId: 'kl90DvdNd5g',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    gett = new YT.Player('video_gett', {
        height: '100%',
        width: '100%',
        videoId: '1jnIDW5XbR0',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    ya = new YT.Player('video_ya', {
        height: '100%',
        width: '100%',
        videoId: 'PPk4eRAdH2A',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
    // event.target.playVideo();
}
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo(frame) {
    var id = $(frame).attr('id');
 switch (id){
     case 'video_gett':
        gett.stopVideo();
         break;
     case 'video_ya':
         ya.stopVideo();
         break;
     case 'video_uber':
         uber.stopVideo();
         break;
     default:
         return;
 }
}