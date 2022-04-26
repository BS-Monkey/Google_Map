import React from 'react'

type Props = {
  date: number;
  seconds: number;
}
const intervals = [
  { label: 'year', seconds: 31536000 },
{ label: 'month', seconds: 2592000 },
{ label: 'day', seconds: 86400 },
{ label: 'hour', seconds: 3600 },
{ label: 'minute', seconds: 60 },
{ label: 'second', seconds: 1 }

]

const Tester3 = (props: Props, date: { getDate: () => number; }) => {
  const seconds = Math.floor((Date.now() - Date.now()) / 1000)
  const interval = intervals.find(i => i.seconds < seconds)
  const count = Math.floor(seconds / interval.seconds)
  return (
    <div>;</div>
  )
}

export default Tester3