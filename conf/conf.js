module.exports = {
	model:"user",
	serves:{
		user:{
			addr:"http://localhost:12887/api",
			wx:"http://localhost:12887/api"
		}
	},
	getWxServe(){
		return this.getCurrentServe().wx;
	},
	getCurrentServe(){
		return this.serves[this.model];
	},
	getCurrentAddr(){
		return this.getCurrentServe().addr;
	}
}