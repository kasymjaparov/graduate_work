export function getCookie(name: string) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts: string[] = v.split('=')
        if (!parts[1]) return ''
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}