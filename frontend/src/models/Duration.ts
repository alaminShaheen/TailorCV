export type Duration = {
    from: Date;
} & ({
    isPresent: true;
    to?: never;
} | {
    isPresent: false;
    to: Date
})