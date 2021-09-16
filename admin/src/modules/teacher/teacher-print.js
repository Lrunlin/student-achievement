import axios from 'axios';
async function teacherPrint(getData) {
    let data;
    await axios({
        method: "post",
        url: '/teacher-print',
        data: {
            data: getData.data
        }
    }).then(res => {
        data = res.data;
    })
    return data
}
export default teacherPrint;