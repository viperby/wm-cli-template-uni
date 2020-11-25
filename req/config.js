export default {
	config: {
		baseUrl: '',
		url: '',
		timeout: 15000,
		header: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		method: 'GET',
		dataType: '',
		data: {}
	},
	interceptors: {
		request: null,
		response: null
	},
	request: function(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method

		return new Promise((resolve, reject) => {
			let _config = null

			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (process.env.NODE_ENV === 'debug') {
					if (statusCode === 200) {
						console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}
				if (this.interceptors.response) {
					let newResponse = this.interceptors.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				if (statusCode === 200) { //成功
					resolve(response);
				} else {
					reject(response)
				}
			}
			
			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()
			if (this.interceptors.request) {
				this.interceptors.request(_config)
			}

			if (process.env.NODE_ENV === 'debug') {
				console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}
			uni.request(_config);
		});
	},
	get: function(url, data, options) {
		if(!options)options={}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post: function(url, data, options) {
		if(!options)options={}
		options.url = url
		options.data = data
		options.method = 'POST'
		options.header={}
		options.header['Content-Type']='application/x-www-form-urlencoded'
		return this.request(options)
	},
	xml:function(url, data, options){
		if(!options)options={}
		options.url = url
		options.data = data
		options.method = 'POST'
		options.header={}
		options.header['Content-Type']='application/x-www-form-urlencoded'
		options.header['Xml']='true'
		return this.request(options)
	}
}
