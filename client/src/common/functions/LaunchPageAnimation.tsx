export const LaunchPageAnimation = (setState : (value: React.SetStateAction<boolean>) => void)  => {
    setTimeout(() => {
        setState(false)
    }, 250);
}