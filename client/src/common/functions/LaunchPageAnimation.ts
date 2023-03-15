export const launchPageAnimation = (setState : (value: React.SetStateAction<boolean>) => void)  => {
    setTimeout(() => {
        setState(false)
    }, 250);
}