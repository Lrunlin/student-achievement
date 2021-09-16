import axios from 'axios';
async function updataScore(getData) {
    let data;
    await axios({
        method: "post",
        url: '/updata-score',
        data: {
            id: getData.id,
            score: getData.score,
            subject: getData.subject
        }
    }).then(res => {
        data = res.data;
    })
    return data
}
export default updataScore;
