import ExcelJS from "exceljs"
// import * as fs from "file-saver"
import { filt, formalizeConditions } from "@/assets/filters/filter.js"

onmessage = async function(e) {
  switch (e.data.type) {
    case "output":
      const workbook = new ExcelJS.Workbook()

      workbook.xlsx.load(e.data.buffer).then(() => {
        e.data.needProcess = e.data.needProcess.map(item => {
          const ws = workbook.getWorksheet(item.name)

          return {
            checked: true,
            fields: item.fields,
            ws
          }
        })
        // TODO: 使多個 progressTo 不會卡頓...
        // const outputLength = e.data.ids.length
        e.data.ids.forEach((id, i) => {
          process(id, e.data.settings, e.data.needProcess)
          // postMessage({
          //   type: "progress",
          //   progress: (i / outputLength) * 100
          // })
        })
      })
      break
    case "field":

      const wb = new ExcelJS.Workbook()
      await wb.xlsx.load(e.data.blob)
      let result = []
      wb.eachSheet((worksheet, sheetId) => {
        result.push({
          checked: false,
          id: worksheet.id,
          name: worksheet.name,
          fields: worksheet.getRow(1).values
        })
      })
      postMessage(result)
      break
  }
}

function process(id, settings, needProcess) {
  const setting = settings[id]

  needProcess.forEach((wsInfo, i) => {
    const sheetDatas = getSheetData(wsInfo.ws)
    const fields = wsInfo.fields
    const outputFieldIndexes =
      setting.fields.length > 0
        ? getOutputFieldIndexes(fields, setting.fields)
        : fields.map((a, i) => i)

    let result = []

    result.push(setting.fields.length > 0 ? setting.fields : fields)

    setting.filterGroup.forEach(filters => {
      const formattedFilters = filters.map(filter => {
        return {
          field: fields.findIndex(f => f === filter.field),
          funcName: filter.funcName,
          values: Array.isArray(filter.value) ? filter.value : [filter.value]
        }
      })

      const conditions1 = formalizeConditions(formattedFilters)
      for (var i = 0, l = sheetDatas.length; i < l; i++) {
        if (filt(sheetDatas[i], conditions1) === true) {
          // TODO : make data sort as fields
          result.push(
            formatByFieldIndexes(sheetDatas[i], outputFieldIndexes)
          )
        }
      }
    })
    const finalFilename = produceFormatFilename(setting.filename)
    download(result, finalFilename)
  })
}

function formatByFieldIndexes(row , fieldIndexes){
  
  return fieldIndexes.map(index => row[index])
}

function getOutputFieldIndexes(allFields, outputFields) {
  return outputFields.map(f => allFields.indexOf(f)).filter(i => i > -1)
}

function getSheetData(sheet) {
  let result = []

  sheet.eachRow(row => {
    result.push(row.values)
  })
  return result
}

function produceFormatFilename(unformatFilename) {
  let result = unformatFilename
  const dayMili = 1000 * 60 * 60 * 24
  const diction = {
    "[昨天日期]": new Date(Date.now() - dayMili).toLocaleDateString(),
    "[當天日期]": new Date().toLocaleDateString(),
    "[明天日期]": new Date(Date.now() + dayMili).toLocaleDateString(),
    "[後天日期]": new Date(Date.now() + dayMili * 2).toLocaleDateString()
  }

  for (const format in diction) {
    if (Object.hasOwnProperty.call(diction, format)) {
      const value = diction[format]
      result = result.replace(format, value)
    }
  }

  return result
}

function download(data, name = `fname-${new Date().valueOf()}`) {
  const workbook = new ExcelJS.Workbook()
  const sh = workbook.addWorksheet("sheet1")
  sh.addRows(data)
  workbook.xlsx.writeBuffer().then(data => {
    let blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })
    postMessage({
      type: "complete",
      blob,
      name
    })
    // fs.saveAs(blob, `${name}.xlsx`)
  })
}
