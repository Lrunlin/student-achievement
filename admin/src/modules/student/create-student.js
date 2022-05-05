import axios from 'axios';
import {
    v4
} from 'uuid';
async function createStudent(getData) {
    let data;
    await axios({
        method: "post",
        url: '/create-student',
        data: {
            id: `s${v4().replace(/-/g,'')}`,
            name: getData.name,
            sex: getData.sex,
            class: getData.class,
            tel: getData.tel
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default createStudent;