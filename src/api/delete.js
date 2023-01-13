import request from './request'

// 删除文件夹
export async function deleteFolder(folderName) {
    return request({
        url: '/file/deleteFolder',
        method: 'post',
        data: JSON.stringify({
            folderName
        })
    })
}

// 删除文件
export async function deleteFile(data) {
    return request({
        url: '/file/deleteFile',
        method: 'delete',
        params: data
    })
}