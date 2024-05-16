import axios from "axios";

async function createTeacher(getData) {
  let data;
  await axios({
    method: "post",
    url: "/create-teacher",
    data: {
      id: `t${+new Date()}`,
      name: getData.name,
      sex: getData.sex,
      subject: getData.subject,
      tel: getData.tel,
    },
  }).then(res => {
    data = res.data;
  });
  return data;
}
export default createTeacher;
