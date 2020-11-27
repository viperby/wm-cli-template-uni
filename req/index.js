import http from './config'
import conf from '../conf/conf.js'
http.config.timeout = 20000
http.config.baseUrl = conf.getCurrentAddr();
http.config.baseImgUrl = conf.getCurrentServe().imgServe;
if (process.env.NODE_ENV === 'development') {
	http.config.baseUrl = conf.getCurrentAddr();
	http.config.baseImgUrl = conf.getCurrentServe().imgServe;
	//http.config.baseUrl = 'http://www.bumingshenfen.cn:9091/api'
}
function toXml(v, name, ind) {
    var xml = "";
    if (v instanceof Array) {
        for (var i = 0, n = v.length; i < n; i++) xml += ind + toXml(v[i], name, ind + "\t") + "\n";
    } else if (typeof v == "object") {
        var hasChild = false;
        xml += ind + "<" + name;
        for (var m in v) {
            if (m.charAt(0) == "@") xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\""; else hasChild = true;
        }
        xml += hasChild ? ">" : "/>";
        if (hasChild) {
            for (var m in v) {
                if (m == "#text") xml += v[m]; else if (m == "#cdata") xml += "<![CDATA[" + v[m] + "]]>"; else if (m.charAt(0) != "@") xml += toXml(v[m], m, ind + "\t");
            }
            xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
        }
    } else if (typeof v == "function") {
        return "";
    } else if (v !== undefined && v !== null) {
        xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
    } else { }
    return xml;
};

function getXML(jsonObj, root) {
    var xml = "";
    if (jsonObj instanceof Array) {
        for (var i = 0; i < jsonObj.length; i++) {
            xml += GetXML(jsonObj[i], true);
        }
        return "<xml>" + xml + "</xml>";
    } else {
        for (var f in jsonObj) {
            if (jsonObj[f] && jsonObj.hasOwnProperty(f)) {
                xml += toXml(jsonObj[f], f, "");
            }
        }
    }
    if (!root) {
        xml = "<xml>" + xml.replace(/\t|\n/g, "") + "</xml>";
    } else {
        xml = xml.replace(/\t|\n/g, "");
    }

    return xml;
};
// 请求拦截器
http.interceptors.request=(request) => {
	// 添加自定义header
	request.header['AppAlias'] = conf.alias;
	request.header['DeviceId'] = uni.getStorageSync('DeviceId')
	request.header['AccessToken'] = uni.getStorageSync('AccessToken')
	/*if(request.header['Xml'] === 'true'){
		request.data = getXML(request.data)
	}*/
	return request
}
// 响应拦截器
http.interceptors.response=(response) => {
	return response.data
}

export default http
