import axios from "axios";
async function uploadExcel(file) {
    let data;
    await axios({
        method: "POST",
        url: '/upload-excel',
        data: file
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default uploadExcel;