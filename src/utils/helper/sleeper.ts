export function sleeper(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {resolve(true)}, ms)
    })
}