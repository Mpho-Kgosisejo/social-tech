export const number = ({min = 1, max = 1000000000}) => (
    Math.floor(Math.random() * (max - min) + min)
)