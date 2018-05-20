if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb://HassanAli:1234@ds213338.mlab.com:13338/video-app'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost/video-app'}
}