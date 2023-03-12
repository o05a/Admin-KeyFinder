import { read, utils } from 'xlsx'

const fileToCSV = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsArrayBuffer(file)

		reader.onload = () => {
			const workBook = read(reader.result, { WTF: true })
			const data = utils.sheet_to_csv(workBook.Sheets[workBook.SheetNames[0]])
			resolve(data)
		}
		reader.onerror = error => reject(error)
	})

export default fileToCSV
