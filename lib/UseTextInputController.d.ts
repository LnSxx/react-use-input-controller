/// <reference types="react" />
interface UseTextInputControllerArguments {
    initialValue: string;
    validators?: Array<(value: string) => string | null>;
}
export declare function useTextInputController({ initialValue, validators }: UseTextInputControllerArguments): [
    string,
    string | null,
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    () => void
];
export {};
