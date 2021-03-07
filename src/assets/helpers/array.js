function rotate(arr = [], k = 1) {
  let copy = arr.slice(0)
  if (k <= arr.length) {
    copy.unshift(...copy.splice(-k))
    return copy
  } else {
    let counter = 0
    while (counter < k) {
      copy.unshift(...copy.splice(-1))
      ++counter
    }
    return copy
  }
}

function rotateNext(arr = [], index = 0, num = 0) {
  let next = (index + num) % arr.length
  return next >= 0 ? arr[next] : arr[arr.length + next]
}
