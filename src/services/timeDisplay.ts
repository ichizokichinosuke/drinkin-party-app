export function alermDisplay(seconds: number): string {
    return Math.floor(seconds / 60).toString().padStart(2,"0") + ":" + (seconds % 60).toString().padStart(2,"0")
}

export function stopWatchDisplay(seconds: number): string {
    return Math.floor(seconds / 3600).toString().padStart(2,"0") + ":" + Math.floor((seconds / 60) % 60).toString().padStart(2,"0") + ":" + (seconds % 60).toString().padStart(2,"0")
}