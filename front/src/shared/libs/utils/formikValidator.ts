//@ts-nocheck
import { operators } from "@/shared/data"

class FormikCustomValidator {
    phoneWithout996Checker(value: string | undefined) {
        if (!value) {
            return false
        }
        if (value?.length == 10 && operators.includes(value.slice(1, 3))) return true
        return false
    }
    phoneChecker(value: string | undefined) {
        if (!value) {
            return false
        }
        if (value?.length == 13 && operators.includes(value.slice(4, 6)) && Number.isInteger(Number(value))) return true
        return false
    }
    innChecker(value: string | undefined) {
        if (!value) return false
        if (value?.length == 14 && Number(value[0]) < 3 && Number(value[0]) > 0 && Number(value.slice(1, 3)) < 32 && Number(value.slice(2, 3)) < 13 && Number(
            value.slice(5, 9)) > 1920 && Number(value.slice(5, 9)) > 1920 && Number(value.slice(5, 9)) < new Date().getFullYear() - 15) return true
        return false
    }
    checkSizeAttachedFiles(value: FileList, size: number) {
        if (!value) {
            return false
        }
        const mb = 1024 * 1024
        let files: File[] = Array.from(value)
        let filesSize = 0
        for (let i = 0; i < files.length; i++) {
            filesSize += files![i].size
        }
        if (filesSize <= size * mb) {
            return true
        }
        return false
    }
    checkSizeAttachedFile(value: File, size: number) {
        if (!value) {
            return false
        }
        const mb = 1024 * 1024
        if (value.size <= size * mb) {
            return true
        }
        return false
    }

}
export const formikCustomValidator = new FormikCustomValidator()
