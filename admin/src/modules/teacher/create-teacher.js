import axios from 'axios';
import {
    v4
} from 'uuid';
async function createTeacher(getData) {
    let data;
    await axios({
        method: "post",
        url: '/create-teacher',
        data: {
            id: `t${v4().replace(/-/g,'')}`,
            name: getData.name,
            sex: getData.sex,
            subject: getData.subject,
            tel: getData.tel
        }
    }).then(res => {
        data = res.data;
    })
    return data
}
export default createTeacher;
