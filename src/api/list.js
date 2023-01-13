import request from './request'

export async function getFileList(initPath) {
    return request({
        url: '/file/getFilePageUser',
        method: 'post',
        data: JSON.stringify({
            initPath
        })
    })
}

// 新建文件夹
export function addFolder(initPath, addPath) {
    return request({
        url: '/file/addFolder',
        method: 'post',
        // data
        data: JSON.stringify({
            initPath,
            addPath
        })
    })
}

// 文件下载
export async function download(data) {
    return request({
        url: '/common/download',
        method: 'get',
        responseType: 'blob',
        params: data
    })
}
// 文件复制
export async function copy(originPath, targetPath) {
    return request({
        url: '/file/copy',
        method: 'post',
        data: JSON.stringify({
            originPath,
            targetPath
        })
    })
}
// 文件移动
export async function move(originPath, targetPath) {
    return request({
        url: '/file/move',
        method: 'put',
        data: JSON.stringify({
            originPath,
            targetPath
        })
    })
}
// 文件重命名
export async function rename(originName, targetName) {
    return request({
        url: '/file/rename',
        method: 'put',
        data: JSON.stringify({
            originName,
            targetName,
        })
    })
}