function includes(value, str) {
  if (isString(value) && isString(str)) {
    return value.includes(str)
  }
}

function startsWith(value, str) {
  if (isString(value) && isString(str)) {
    return value.startsWith(str)
  }
}

function endsWith(value, str) {
  if (isString(value) && isString(str)) {
    return value.endsWith(str)
  }
}

function moreThan(value, num) {
  if (isNumber(value) && isNumber(num)) {
    return value > num
  }
}

function moreThanOrEqual(value, num) {
  if (isNumber(value) && isNumber(num)) {
    return value >= num
  }
}

function lessThan(value, num) {
  if (isNumber(value) && isNumber(num)) {
    console.log(value, num)
    return value < num
  }
}
function lessThanOrEqual(value, num) {
  if (isNumber(value) && isNumber(num)) {
    return value <= num
  }
}

function inNumRange(value, min, max) {
  if (isNumber(value) && isNumber(min) && isNumber(max)) {
    return value >= min && value <= max
  }
}

function laterThan(value, dateValue) {
  
  if (isValidDate(value)) {
    const end = new Date(dateValue)
    end.setHours(23)
    end.setMinutes(59)
    end.setSeconds(59)

    const t = value.getTime()

    return t > end
  } else {
    return false
  }
}

function earlierThan(value, dateValue) {
  
  if (isValidDate(value)) {
    const start = new Date(dateValue).getTime()
    const t = value.getTime()

    return t < start
  } else {
    return false
  }
}

function isCertainDay(value, dateValue) {
  
  const anchor = new Date(dateValue)
  const start = anchor.getTime()
  anchor.setHours(23, 59, 59)
  const end = anchor.getTime() 
  const t = Date.parse(value)

  return t <= end && t >= start
}

function inDateRange(value, start, end) {
  const target = new Date(value)
  const startTime = new Date(start)
  const endTime = new Date(end)
  if (isValidDate(target) && isValidDate(comparer)) {
    return (
      target.getTime() >= startTime.getTime() &&
      target.getTime() <= endTime.getTime()
    )
  }
}

function isString(value) {
  return typeof value === "string"
}

function isNumber(value) {
  return typeof value === "number" && !isNaN(value)
}

// https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
function isValidDate(value) {
  return !isNaN(Date.parse(value))
}

module.exports = {
  includes,
  startsWith,
  endsWith,
  moreThan,
  moreThanOrEqual,
  lessThan,
  lessThanOrEqual,
  inNumRange,
  laterThan,
  earlierThan,
  isCertainDay,
  inDateRange
}
