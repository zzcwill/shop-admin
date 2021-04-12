// import wepy from 'wepy';
// import util from './util';
// import tip from './tip'

let apiUrl = '127.0.0.1:3000'
apiUrl = 'http://' + apiUrl + '/api/'


const wxRequest = (params = {}, callback) => {
    wx.request({
        url: apiUrl + params.url,
        method: params.method || 'GET',
        data: params.data,
        // header: { 'Content-Type': 'application/json' },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success (res) {
            callback(res)
        }
    })
};


module.exports = {
   wxRequest
}
