import axios from 'axios';
async function logn(getData) {
    let data;
    await axios({
        method: "post",
        url: '/logn',
        data: {
            col: getData.col,
            id: getData.id,
            password: getData.password
        }
    }).then(res => {
        data = res.data;
    })
    return data
}
export default logn;