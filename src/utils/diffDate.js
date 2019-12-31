import moment from 'moment';

export default function (startTime, endTime, type, number) {
  if (!startTime) return true
  let diffNum = moment(endTime).diff(moment(startTime), type)
  return diffNum > number
}