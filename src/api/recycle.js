import request from './request'
// 获取回收站数据
export async function recycleFileList(data) {
    return request({
        url: '/file/getRecyclePage',
        method: 'get',
        params: data
    })
}
// 删除回收站的文件
export async function deleteRecycle(data) {
    return request({
        url: '/file/deleteRecycle',
        method: 'delete',
        params: data
    })
}
//  恢复回收站的文件
export async function recovery(data) {
    return request({
        url: '/file/recovery',
        method: 'put',
        params: data
    })
}