
//计算过去到现在的时间
const getDate = (date) => {
	let nowDate = new Date();
	let oldDate = new Date(Date.parse(date.replace(/-/g,"/")));
	let diff = parseInt(Math.abs(nowDate.getTime()- oldDate.getTime())/1000/60/60/24)
	return diff;
}
export default{
	getDate
}