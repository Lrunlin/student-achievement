import axios from 'axios';
async function deleteUser(getData) {
    let data;
    await axios({
        method: "post",
        url: '/delete-user',
        data: {
            col:getData.col,
            id:getData.id
        }
    }).then(res => {
        data = res.data;
    })
    return data
}
export default deleteUser;
