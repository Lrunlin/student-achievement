import axios from 'axios';
async function createStudent(getData) {
    let data;
    await axios({
        method: "post",
        url: '/create-student',
        data: {
            id:`s${new Date().getTime()}`,
            name: getData.name,
            sex: getData.sex,
            class:getData.class,
            tel:getData.tel
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default createStudent;












