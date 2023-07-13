export const toBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result?.toString() || "")
        }
        fileReader.onerror = error => {
            reject(error)
        }
    })
}