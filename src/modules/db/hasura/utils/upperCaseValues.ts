import { mapValues } from "@utils/common";

export const upperCaseValues = (obj: any): any => {
    if (!obj) return undefined;
    return mapValues(obj, (v: string) => v.toUpperCase());
};
