import XLSX from 'xlsx'

function downloadExl(json, downName, type) { // 导出到excel
    let keyMap = [] // 获取键
    for (let k in json[0]) {
        keyMap.push(k)
    }
    console.info('keyMap', keyMap, json)
    let tmpdata = [] // 用来保存转换好的json
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach(function(v) {
        tmpdata[v.position] = {
            v: v.v
        }
    })
    let outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
    let tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
            'mySheet': Object.assign({},
                tmpdata, // 内容
                {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
                })
        }
    }
    let tmpDown = new Blob([s2ab(XLSX.write(tmpWB, {
                bookType: (type === undefined ? 'xlsx' : type),
                bookSST: false,
                type: 'binary'
            } // 这里的数据是用来定义导出的格式类型
        ))], {
            type: ''
        }) // 创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown) // 创建对象超链接
    var a = document.createElement('a')
    a.download = downName + '.xlsx' // 下载名称
    a.href = href // 绑定a标签
    a.click() // 模拟点击实现下载
    setTimeout(function() { // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
    }, 100)
}

function importExl(obj) { // 导入excel
    if (!obj.files) {
        return;
    }
    return new Promise((resolve, reject) => {
        var f = obj.files[0];
        var reader = new FileReader();
        reader.readAsArrayBuffer(f);
        reader.onload = function(e) {
            var data = e.target.result;
            try {
                var wb = XLSX.read(btoa(fixedData(data)), {
                    type: 'base64'
                }); //将数据转化为二进制
                resolve(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
            } catch (error) {
                reject(error)
            }
        };
    })
}

function fixedData(data) {
    let o = ''
    let l = 0
    const w = 10240
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w,
        l * w + w)))
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
    return o
}

function s2ab(s) { // 字符串转字符流
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
}

export {
    downloadExl,
    importExl
}